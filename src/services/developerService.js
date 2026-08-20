/**
 * Developer Service
 * Cypher queries for developer CRUD and multi-hop traversals.
 */

import { readQuery, writeQuery } from "../helpers/queryRunner.js";

/** Fetches all developers with their skills and project counts. */
const getAll = async () => {
  const cypher = `
    MATCH (d:Developer)
    OPTIONAL MATCH (d)-[k:KNOWS]->(s:Skill)
    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
    WITH d,
         COLLECT(DISTINCT { name: s.name, level: k.level }) AS skills,
         COUNT(DISTINCT p) AS projectCount
    RETURN d, skills, projectCount
    ORDER BY d.name
  `;
  const records = await readQuery(cypher);
  return records.map((r) => ({
    ...r.get("d").properties,
    id: r.get("d").identity.toString(),
    skills: r.get("skills").filter((s) => s.name !== null),
    projectCount: r.get("projectCount").toNumber(),
  }));
};

/** Fetches a single developer with full details. */
const getById = async (id) => {
  const cypher = `
    MATCH (d:Developer) WHERE elementId(d) = $id
    OPTIONAL MATCH (d)-[k:KNOWS]->(s:Skill)
    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
    OPTIONAL MATCH (d)-[:WORKS_AT]->(c:Company)
    RETURN d,
           COLLECT(DISTINCT { name: s.name, level: k.level, category: s.category }) AS skills,
           COLLECT(DISTINCT { name: p.name, description: p.description }) AS projects,
           c
  `;
  const records = await readQuery(cypher, { id });
  if (records.length === 0) return null;

  const r = records[0];
  return {
    ...r.get("d").properties,
    id: r.get("d").identity.toString(),
    skills: r.get("skills").filter((s) => s.name !== null),
    projects: r.get("projects").filter((p) => p.name !== null),
    company: r.get("c") ? r.get("c").properties : null,
  };
};

/** Creates a new developer node. */
const create = async ({ name, title, experience, github }) => {
  const cypher = `
    CREATE (d:Developer {
      name: $name,
      title: $title,
      experience: $experience,
      github: $github,
      createdAt: datetime()
    })
    RETURN d
  `;
  const records = await writeQuery(cypher, { name, title, experience, github });
  return {
    ...records[0].get("d").properties,
    id: records[0].get("d").identity.toString(),
  };
};

/**
 * MULTI-HOP TRAVERSAL (2 hops)
 * Developer → KNOWS → Skill ← KNOWS ← Developer
 * Finds developers who share the most skills with a given developer.
 */
const findSimilar = async (developerId) => {
  const cypher = `
    MATCH (d1:Developer)-[:KNOWS]->(s:Skill)<-[:KNOWS]-(d2:Developer)
    WHERE elementId(d1) = $developerId AND d1 <> d2
    WITH d2, COLLECT(DISTINCT s.name) AS sharedSkills, COUNT(DISTINCT s) AS overlap
    RETURN d2, sharedSkills, overlap
    ORDER BY overlap DESC
    LIMIT 10
  `;
  const records = await readQuery(cypher, { developerId });
  return records.map((r) => ({
    ...r.get("d2").properties,
    id: r.get("d2").identity.toString(),
    sharedSkills: r.get("sharedSkills"),
    overlap: r.get("overlap").toNumber(),
  }));
};

/**
 * MULTI-HOP TRAVERSAL (3 hops)
 * Developer → WORKED_ON → Project ← WORKED_ON ← Colleague → KNOWS → Skill
 * Recommends skills based on what project collaborators know.
 */
const recommendSkills = async (developerId) => {
  const cypher = `
    MATCH (d:Developer)-[:WORKED_ON]->(p:Project)<-[:WORKED_ON]-(colleague:Developer)-[:KNOWS]->(s:Skill)
    WHERE elementId(d) = $developerId
      AND NOT (d)-[:KNOWS]->(s)
    WITH s, COUNT(DISTINCT colleague) AS recommendedBy, COLLECT(DISTINCT colleague.name) AS colleagues
    RETURN s, recommendedBy, colleagues
    ORDER BY recommendedBy DESC
    LIMIT 10
  `;
  const records = await readQuery(cypher, { developerId });
  return records.map((r) => ({
    ...r.get("s").properties,
    id: r.get("s").identity.toString(),
    recommendedBy: r.get("recommendedBy").toNumber(),
    colleagues: r.get("colleagues"),
  }));
};

/**
 * MULTI-HOP TRAVERSAL (shortestPath, up to 6 hops)
 * Finds the shortest path connecting two developers through the graph.
 */
const findConnectionPath = async (dev1Id, dev2Id) => {
  const cypher = `
    MATCH path = shortestPath(
      (d1:Developer)-[*..6]-(d2:Developer)
    )
    WHERE elementId(d1) = $dev1Id AND elementId(d2) = $dev2Id AND d1 <> d2
    RETURN [n IN nodes(path) | { labels: labels(n), props: properties(n) }] AS pathNodes,
           [r IN relationships(path) | type(r)] AS pathRels,
           length(path) AS pathLength
  `;
  const records = await readQuery(cypher, { dev1Id, dev2Id });
  if (records.length === 0) return null;

  const r = records[0];
  return {
    nodes: r.get("pathNodes"),
    relationships: r.get("pathRels"),
    length: r.get("pathLength").toNumber(),
  };
};

export {
  getAll,
  getById,
  create,
  findSimilar,
  recommendSkills,
  findConnectionPath,
};
