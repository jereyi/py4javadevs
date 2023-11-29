import { Router } from 'express';
import query from '../controllers/chatGpt.controller.js';
const router = Router();

/* POST GPT query. */
router.post('/', query);
  
export default router;