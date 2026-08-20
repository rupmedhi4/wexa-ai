/**
 * Seed Script
 * Loads sample data from ./data into CognoDB using bulk UNWIND queries.
 * Run: npm run seed
 */

import "dotenv/config";
import neo4j from "neo4j-driver";

import {
  companies,
  skills,
  developers,
  projects,
  worksAt,
  knows,
  workedOn,
  usesTech,
} from "./data/index.js";

const driver = neo4j.driver(
  process.env.DB_URI,
  neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD),
  { logging: neo4j.logging.console("warn") }
);

/* ─── Build flat relationship arrays for UNWIND ─── */

const buildKnowsRels = () => {
  const levels = ["beginner", "intermediate", "advanced", "expert"];
  const rels = [];
  knows.forEach((entry, i) => {
    entry.skills.forEach((skill, j) => {
      rels.push({ dev: entry.dev, skill, level: levels[(i + j) % levels.length] });
    });
  });
  return rels;
};

const buildWorkedOnRels = () => {
  const roles = ["contributor", "lead", "reviewer"];
  const rels = [];
  workedOn.forEach((entry, i) => {
    entry.projects.forEach((project, j) => {
      rels.push({ dev: entry.dev, project, role: roles[(i + j) % roles.length] });
    });
  });
  return rels;
};

const buildUsesTechRels = () => {
  const rels = [];
  usesTech.forEach((entry) => {
    entry.techs.forEach((tech) => {
      rels.push({ project: entry.project, tech });
    });
  });
  return rels;
};

/* ─── Seed Execution ─── */

const seed = async () => {
  try {
    await driver.verifyConnectivity();
    console.log("✅  Connected to CognoDB successfully");
  } catch (err) {
    console.error("Cannot seed — database not reachable:", err.message);
    process.exit(1);
  }

  const session = driver.session();

  try {
    console.log("🗑️   Clearing existing data...");
    await session.executeWrite((tx) => tx.run("MATCH (n) DETACH DELETE n"));

    console.log("🏢  Creating Companies...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $data AS c
         CREATE (:Company { name: c.name, industry: c.industry, founded: c.founded, size: c.size })`,
        { data: companies }
      )
    );

    console.log("🛠️   Creating Skills...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $data AS s
         CREATE (:Skill { name: s.name, category: s.category })`,
        { data: skills }
      )
    );

    console.log("👩‍💻  Creating Developers...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $data AS d
         CREATE (:Developer { name: d.name, title: d.title, experience: d.experience, github: d.github })`,
        { data: developers }
      )
    );

    console.log("📦  Creating Projects...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $data AS p
         CREATE (:Project { name: p.name, description: p.description, status: p.status })`,
        { data: projects }
      )
    );

    console.log("🔗  Creating WORKS_AT relationships...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $rels AS r
         MATCH (d:Developer {name: r.dev}), (c:Company {name: r.company})
         CREATE (d)-[:WORKS_AT {since: r.since}]->(c)`,
        { rels: worksAt }
      )
    );

    console.log("🧠  Creating KNOWS relationships...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $rels AS r
         MATCH (d:Developer {name: r.dev}), (s:Skill {name: r.skill})
         CREATE (d)-[:KNOWS {level: r.level}]->(s)`,
        { rels: buildKnowsRels() }
      )
    );

    console.log("🔨  Creating WORKED_ON relationships...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $rels AS r
         MATCH (d:Developer {name: r.dev}), (p:Project {name: r.project})
         CREATE (d)-[:WORKED_ON {role: r.role}]->(p)`,
        { rels: buildWorkedOnRels() }
      )
    );

    console.log("⚙️   Creating USES_TECH relationships...");
    await session.executeWrite((tx) =>
      tx.run(
        `UNWIND $rels AS r
         MATCH (p:Project {name: r.project}), (s:Skill {name: r.tech})
         CREATE (p)-[:USES_TECH]->(s)`,
        { rels: buildUsesTechRels() }
      )
    );

    /* ─── Summary ─── */
    console.log("\n✅  Seed completed successfully!");
    console.log("📊  Summary:");

    const stats = await session.executeRead((tx) =>
      tx.run(`
        MATCH (d:Developer) WITH COUNT(d) AS devs
        MATCH (s:Skill)     WITH devs, COUNT(s) AS skills
        MATCH (p:Project)   WITH devs, skills, COUNT(p) AS projects
        MATCH (c:Company)   WITH devs, skills, projects, COUNT(c) AS companies
        MATCH ()-[r]->()    WITH devs, skills, projects, companies, COUNT(r) AS rels
        RETURN devs, skills, projects, companies, rels
      `)
    );
    const s = stats.records[0];
    console.log(`    Developers:    ${s.get("devs")}`);
    console.log(`    Skills:        ${s.get("skills")}`);
    console.log(`    Projects:      ${s.get("projects")}`);
    console.log(`    Companies:     ${s.get("companies")}`);
    console.log(`    Relationships: ${s.get("rels")}`);
  } catch (error) {
    console.error("❌  Seeding failed:", error.message);
    throw error;
  } finally {
    await session.close();
    await driver.close();
    console.log("🔌  CognoDB connection closed");
  }
};

seed().catch(() => process.exit(1));
