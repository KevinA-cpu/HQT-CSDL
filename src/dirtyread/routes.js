import { Router } from "express";
import controller from "./controller.js";
const router = Router();

router.get("/T1", controller.T1);

router.get("/T2/:isolationlevel", controller.T2);

export default router;
