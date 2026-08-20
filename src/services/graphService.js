/**
 * Graph Service
 * Aggregate queries: stats, search, and full graph visualization.
 */

import { readQuery } from "../helpers/queryRunner.js";

/** Returns aggregate statistics about the graph. */
const getStats = async () => {
  const cypher = `
    MATCH (d:Developer) WITH COUNT(d) AS devs
    MATCH (s:Skill) WITH devs, COUNT(s) AS skills
    MATCH (p:Project) WITH devs, skills, COUNT(p) AS projects
    MATCH (c:Company) WITH devs, skills, projects, COUNT(c) AS companies
    OPTIONAL MATCH ()-[r]->()
    RETURN devs, skills, projects, companies, COUNT(r) AS totalRelationships
  `;
  const records = await readQuery(cypher);
  const r = records[0];
  return {
    developers: r.get("devs").toNumber(),
    skills: r.get("skills").toNumber(),
    projects: r.get("projects").toNumber(),
    companies: r.get("companies").toNumber(),
    totalRelationships: r.get("totalRelationships").toNumber(),
  };
};

/** Full-text search across developers, skills, projects, and companies. */
const search = async (query) => {
  const cypher = `
    MATCH (n)
    WHERE labels(n)[0] IN ['Developer', 'Skill', 'Project', 'Company']
      AND toLower(n.name) CONTAINS toLower($query)
    RETURN labels(n)[0] AS label, n.name AS name, elementId(n) AS id
    ORDER BY label, name
    LIMIT 20
  `;
  const records = await readQuery(cypher, { query });
  return records.map((r) => ({
    type: r.get("label"),
    name: r.get("name"),
    id: r.get("id"),
  }));
};

/** Returns full graph data for the visualisation canvas (nodes + edges). */
const getVisualization = async () => {
  const cypher = `
    MATCH (n)
    WHERE n:Developer OR n:Skill OR n:Project OR n:Company
    OPTIONAL MATCH (n)-[r]->(m)
    WHERE m:Developer OR m:Skill OR m:Project OR m:Company
    RETURN COLLECT(DISTINCT {
      id: elementId(n),
      label: labels(n)[0],
      name: n.name,
      props: properties(n)
    }) AS nodes,
    COLLECT(DISTINCT {
      source: elementId(n),
      target: elementId(m),
      type: type(r)
    }) AS edges
  `;
  const records = await readQuery(cypher);
  const r = records[0];
  return {
    nodes: r.get("nodes"),
    edges: r.get("edges").filter((e) => e.target !== null),
  };
};

export { getStats, search, getVisualization };
