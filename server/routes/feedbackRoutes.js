import express from 'express';
import { getFeedback } from '../controllers/feedbackController.js';
import { useDbToggle } from '../middleware/useDbToggle.js';

const router = express.Router();

router.post('/', useDbToggle,getFeedback);

export default router;
