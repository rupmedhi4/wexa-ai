/**
 * Graph Routes
 * Stats, search, visualization, and connection-path endpoints.
 */

import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as graphController from "../controllers/graphController.js";
import * as developerController from "../controllers/developerController.js";

const router = Router();

router.get("/stats",           asyncHandler(graphController.stats));
router.get("/search",          asyncHandler(graphController.search));
router.get("/visualization",   asyncHandler(graphController.visualization));
router.get("/path/:id1/:id2",  asyncHandler(developerController.connectionPath));

export default router;
