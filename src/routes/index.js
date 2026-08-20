/**
 * Route Aggregator
 * Mounts all domain routers under the /api prefix.
 */

import { Router } from "express";

import developerRoutes from "./developerRoutes.js";
import skillRoutes     from "./skillRoutes.js";
import projectRoutes   from "./projectRoutes.js";
import companyRoutes   from "./companyRoutes.js";
import graphRoutes     from "./graphRoutes.js";

const router = Router();

router.use("/developers", developerRoutes);
router.use("/skills",     skillRoutes);
router.use("/projects",   projectRoutes);
router.use("/companies",  companyRoutes);
router.use("/",           graphRoutes);

export default router;
