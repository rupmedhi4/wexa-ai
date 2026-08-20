/**
 * Project Service
 * Cypher queries for project-related operations.
 */

import { readQuery } from "../helpers/queryRunner.js";

/** Fetches all projects with tech stack and contributors. */
const getAll = async () => {
  const cypher = `
    MATCH (p:Project)
    OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
    OPTIONAL MATCH (p)-[:USES_TECH]->(s:Skill)
    WITH p,
         COLLECT(DISTINCT { name: d.name, title: d.title }) AS contributors,
         COLLECT(DISTINCT s.name) AS techStack
    RETURN p, contributors, techStack
    ORDER BY p.name
  `;
  const records = await readQuery(cypher);
  return records.map((r) => ({
    ...r.get("p").properties,
    id: r.get("p").identity.toString(),
    contributors: r.get("contributors").filter((c) => c.name !== null),
    techStack: r.get("techStack").filter((t) => t !== null),
  }));
};

export { getAll };
