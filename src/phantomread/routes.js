import { Router } from "express";
import controller from "./controller.js";
const router = Router();

router.get("/T1", controller.T1);

router.get("/T1Fixed", controller.T1Fixed);

router.get("/T2", controller.T2);

export default router;
