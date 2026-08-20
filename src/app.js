/**
 * Express Application
 * Configures middleware, routes, and error handling.
 * Separated from server.js so the app can be tested independently.
 */

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { driver } from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ─── Middleware ─── */
app.use(cors());
app.use(express.json());

/* ─── Static Files (Production React Frontend) ─── */
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

/* ─── API Routes ─── */
app.use("/api", apiRoutes);

/* ─── Health Check ─── */
app.get("/api/health", async (_req, res) => {
  try {
    await driver.verifyConnectivity();
    res.json({ status: "healthy", database: "connected" });
  } catch (error) {
    res
      .status(503)
      .json({ status: "unhealthy", database: "disconnected", error: error.message });
  }
});

/* ─── SPA Fallback ─── */
app.get("{*path}", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

/* ─── Centralised Error Handler (must be last) ─── */
app.use(errorHandler);

export default app;
