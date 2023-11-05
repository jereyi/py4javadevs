import { Router } from "express";
import { verify, logout, getUser } from "../controllers/auth.controller.js";
const router = Router();
/*  */
router.get("/verify", verify);

/*  */
router.get("/logout", logout);

/* */
router.get("/getUser", getUser);

export default router;