import express from 'express';
import questions from '../questions.json' assert { type: 'json' };

const router = express.Router();

router.get('/', (req, res) => {
  const { topic, type, limit } = req.query;

  let filtered = [...questions];

  if (topic) filtered = filtered.filter(q => q.topic === topic.toLowerCase());
  if (type) filtered = filtered.filter(q => q.type === type.toLowerCase());
  if (limit) filtered = filtered.slice(0, parseInt(limit));

  res.json(filtered);
});

export default router;
