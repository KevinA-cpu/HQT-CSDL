import { Router } from "express";
import controller from "./controller.js";
const router = Router();

router.get("/T1", controller.T1);
router.get("/T1/:isolationlevel", controller.T3);

router.get("/T2", controller.T2);
router.get("/T2/:isolationlevel", controller.T4);

export default router;
