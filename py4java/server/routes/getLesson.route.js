import { Router } from 'express';
import get from '../controllers/getLesson.controller.js';
const router = Router();

/* GET lesson. */
router.get('/', get);
  
export default router;