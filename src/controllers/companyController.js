/**
 * Company Controller
 * Handles HTTP request/response for company endpoints.
 */

import * as companyService from "../services/companyService.js";

const list = async (_req, res) => {
  const companies = await companyService.getAll();
  res.json(companies);
};

export { list };
