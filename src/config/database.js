/**
 * Database Configuration
 * Establishes and manages the CognoDB (Neo4j-compatible) driver connection.
 * Connection details are read from environment variables — never hardcoded.
 */

import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.DB_URI,
  neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD),
  {
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 30000,
    connectionTimeout: 20000,
    logging: neo4j.logging.console("warn"),
  }
);

/** Verifies database connectivity on startup. */
export const verifyConnectivity = async () => {
  try {
    await driver.verifyConnectivity();
    console.log("✅  Connected to CognoDB successfully");
    return true;
  } catch (error) {
    console.error("❌  Failed to connect to CognoDB:", error.message);
    return false;
  }
};

/** Gracefully closes the driver connection. */
export const closeDriver = async () => {
  try {
    await driver.close();
    console.log("🔌  CognoDB connection closed");
  } catch (error) {
    console.error("Error closing CognoDB connection:", error.message);
  }
};

export { driver };
