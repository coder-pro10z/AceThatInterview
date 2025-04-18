import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js'; 
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();
// Routes

const app = express();
app.use(cors());
app.use(express.json());

//Connect DB
connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/questions',questionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.get('/', (req, res) => res.send('API is running 🚀'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.error(err));
