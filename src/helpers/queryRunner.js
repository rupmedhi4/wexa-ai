/**
 * Query Runner
 * Reusable helpers for executing Cypher queries against CognoDB.
 * Handles session lifecycle so services stay clean.
 */

import { driver } from "../config/database.js";

/** Executes a read transaction and returns result records. */
export const readQuery = async (cypher, params = {}) => {
  const session = driver.session();
  try {
    const result = await session.executeRead((tx) => tx.run(cypher, params));
    return result.records;
  } finally {
    await session.close();
  }
};

/** Executes a write transaction and returns result records. */
export const writeQuery = async (cypher, params = {}) => {
  const session = driver.session();
  try {
    const result = await session.executeWrite((tx) => tx.run(cypher, params));
    return result.records;
  } finally {
    await session.close();
  }
};
