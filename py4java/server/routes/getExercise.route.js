import { Router } from 'express';
const router = Router();
import get from '../controllers/getExercise.controller.js';

/* GET exercise. */
router.get('/', get);
  
export default router;