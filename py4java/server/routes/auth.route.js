import { Router } from "express";
import { verify, getUser } from "../controllers/auth.controller.js";
const router = Router();
/*  */
router.get("/verify", verify);

/* */
router.get("/getUser", getUser);

export default router;