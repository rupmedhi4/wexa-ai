/**
 * Skill Routes
 */

import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as skillController from "../controllers/skillController.js";

const router = Router();

router.get("/", asyncHandler(skillController.list));

export default router;
