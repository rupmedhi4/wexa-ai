/**
 * Project Controller
 * Handles HTTP request/response for project endpoints.
 */

import * as projectService from "../services/projectService.js";

const list = async (_req, res) => {
  const projects = await projectService.getAll();
  res.json(projects);
};

export { list };
