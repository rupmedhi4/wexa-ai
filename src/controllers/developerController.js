/**
 * Developer Controller
 * Handles HTTP request/response for developer endpoints.
 */

import * as developerService from "../services/developerService.js";

const list = async (req, res) => {
  const developers = await developerService.getAll();
  res.json(developers);
};

const show = async (req, res) => {
  const developer = await developerService.getById(req.params.id);
  if (!developer) return res.status(404).json({ error: "Developer not found" });
  res.json(developer);
};

const store = async (req, res) => {
  const { name, title, experience, github } = req.body;
  if (!name || !title) {
    return res.status(400).json({ error: "Name and title are required" });
  }
  const developer = await developerService.create({
    name,
    title,
    experience: experience || 0,
    github: github || "",
  });
  res.status(201).json(developer);
};

const similar = async (req, res) => {
  const results = await developerService.findSimilar(req.params.id);
  res.json(results);
};

const recommendations = async (req, res) => {
  const results = await developerService.recommendSkills(req.params.id);
  res.json(results);
};

const connectionPath = async (req, res) => {
  const path = await developerService.findConnectionPath(
    req.params.id1,
    req.params.id2
  );
  if (!path) {
    return res
      .status(404)
      .json({ error: "No connection path found between these developers" });
  }
  res.json(path);
};

export { list, show, store, similar, recommendations, connectionPath };
