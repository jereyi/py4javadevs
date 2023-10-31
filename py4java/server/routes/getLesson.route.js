import { Router } from 'express';
const router = Router();
import get from '../controllers/getLesson.controller.js';

/* GET lesson. */
router.get('/', get);
  
export default router;