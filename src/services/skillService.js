/**
 * Skill Service
 * Cypher queries for skill-related operations.
 */

import { readQuery } from "../helpers/queryRunner.js";

/** Fetches all skills grouped by category with developer counts. */
const getAll = async () => {
  const cypher = `
    MATCH (s:Skill)
    OPTIONAL MATCH (d:Developer)-[:KNOWS]->(s)
    WITH s, COUNT(d) AS devCount
    RETURN s, devCount
    ORDER BY s.category, s.name
  `;
  const records = await readQuery(cypher);
  return records.map((r) => ({
    ...r.get("s").properties,
    id: r.get("s").identity.toString(),
    developerCount: r.get("devCount").toNumber(),
  }));
};

export { getAll };
