// utils/AIFeedback.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIFeedback = async (question, answer) => {
  const prompt = `
You are an interview preparation assistant. For the following technical interview question and answer, generate detailed feedback in JSON format. Include:

- rating: A brief overall rating (Excellent, Good, Fair, Poor, etc.)
- comment: Feedback on the quality and correctness of the answer.
- suggestion: Suggestions for improvement.
- example: (if needed) A better or more complete example answer.

Format your response strictly as JSON inside a markdown code block.

Question: ${question}
Answer: ${answer}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawContent = response.text();

    const jsonString = rawContent.replace(/```json|```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing AI feedback:', error.message);
    return {
      rating: 'Error',
      comment: 'Could not parse AI response.',
      suggestion: 'Check if the response was in correct JSON format.',
      example: '',
    };
  }
};
