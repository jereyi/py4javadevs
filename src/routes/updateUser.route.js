import { Router } from "express";
import { addLesson, deleteLesson } from "../controllers/updateUser.controller.js";
const router = Router();
/*  */
router.put("/lesson", addLesson);

/*  */
router.delete("/lesson", deleteLesson);

export default router;