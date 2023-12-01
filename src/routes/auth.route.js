import { Router } from "express";
import { verify, google, getUser } from "../controllers/auth.controller.js";
const router = Router();
/*  */
router.get("/verify", verify);

router.get("/google", google);
/* */
router.get("/getUser", getUser);

export default router;