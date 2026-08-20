/**
 * Developer Routes
 */

import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import * as developerController from "../controllers/developerController.js";

const router = Router();

router.get("/",                asyncHandler(developerController.list));
router.get("/:id",             asyncHandler(developerController.show));
router.post("/",               asyncHandler(developerController.store));
router.get("/:id/similar",     asyncHandler(developerController.similar));
router.get("/:id/recommendations", asyncHandler(developerController.recommendations));

export default router;
