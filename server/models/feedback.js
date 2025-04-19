import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  question: String,
  answer: String,
  feedback: {
    rating: String,
    comment: String,
    suggestion: String,
    example: String,
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);
