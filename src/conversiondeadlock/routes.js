import { Router } from "express";
import controller from "./controller.js";
const router = Router();

router.get("/T1", controller.T1);
router.get("/T1_Fixed", controller.T1_Fixed);

router.get("/T2", controller.T2);
router.get("/T2_Fixed", controller.T2_Fixed);

export default router;
