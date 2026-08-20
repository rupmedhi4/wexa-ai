/**
 * Company Service
 * Cypher queries for company-related operations.
 */

import { readQuery } from "../helpers/queryRunner.js";

/** Fetches all companies with employee counts. */
const getAll = async () => {
  const cypher = `
    MATCH (c:Company)
    OPTIONAL MATCH (d:Developer)-[:WORKS_AT]->(c)
    WITH c, COUNT(d) AS employeeCount
    RETURN c, employeeCount
    ORDER BY c.name
  `;
  const records = await readQuery(cypher);
  return records.map((r) => ({
    ...r.get("c").properties,
    id: r.get("c").identity.toString(),
    employeeCount: r.get("employeeCount").toNumber(),
  }));
};

export { getAll };
