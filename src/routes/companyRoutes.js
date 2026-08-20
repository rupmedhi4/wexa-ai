/**
 * Company Routes
 */

import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as companyController from "../controllers/companyController.js";

const router = Router();

router.get("/", asyncHandler(companyController.list));

export default router;
