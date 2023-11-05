import { Router } from 'express';
import get from '../controllers/getExercise.controller.js';
const router = Router();

/* GET exercise. */
router.get('/', get);
  
export default router;