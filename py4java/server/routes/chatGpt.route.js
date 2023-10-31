import { Router } from 'express';
const router = Router();
import query from '../controllers/chatGpt.controller.js';

/* POST GPT query. */
router.post('/', query);
  
export default router;