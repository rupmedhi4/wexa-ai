/**
 * Graph Controller
 * Handles HTTP request/response for stats, search, and visualization.
 */

import * as graphService from "../services/graphService.js";

const stats = async (_req, res) => {
  const data = await graphService.getStats();
  res.json(data);
};

const search = async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }
  const results = await graphService.search(q.trim());
  res.json(results);
};

const visualization = async (_req, res) => {
  const graph = await graphService.getVisualization();
  res.json(graph);
};

export { stats, search, visualization };
