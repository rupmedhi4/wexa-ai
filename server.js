/**
 * Server Entry Point
 * Loads env, verifies DB connectivity, and starts the Express server.
 */

import "dotenv/config";
import app from "./src/app.js";
import { verifyConnectivity, closeDriver } from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  const dbConnected = await verifyConnectivity();
  if (!dbConnected) {
    console.warn(
      " Starting server without database connection. Some features may be unavailable."
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
};

/* ─── Graceful Shutdown ─── */
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  await closeDriver();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDriver();
  process.exit(0);
});

start();
