import { Router } from "express";
import { verify, logout, isAuthenticated, getUser } from "../controllers/auth.controller.js";
const router = Router();
/*  */
router.get("/verify", verify);

/*  */
router.get("/logout", logout);

router.get("/isAuthenticated", isAuthenticated);

router.get("/getUser", getUser);

export default router;