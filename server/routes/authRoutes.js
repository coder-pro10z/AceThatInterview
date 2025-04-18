import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Auth route working!');
});

export default router;