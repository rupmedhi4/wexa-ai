/**
 * Project Routes
 */

import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as projectController from "../controllers/projectController.js";

const router = Router();

router.get("/", asyncHandler(projectController.list));

export default router;
