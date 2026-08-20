/**
 * Skill Controller
 * Handles HTTP request/response for skill endpoints.
 */

import * as skillService from "../services/skillService.js";

const list = async (_req, res) => {
  const skills = await skillService.getAll();
  res.json(skills);
};

export { list };
