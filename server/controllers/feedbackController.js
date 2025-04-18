import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getFeedback = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // if (!question || !answer) {
      if (!question) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawContent = response.text();

    // Clean and parse the JSON from markdown code block
    const jsonString = rawContent.replace(/```json|```/g, '').trim();
    let parsedFeedback;

    try {
      parsedFeedback = JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing Gemini JSON:', error.message);
      parsedFeedback = {
        rating: 'Error',
        comment: 'Could not parse the JSON response from Gemini.',
        suggestion: 'Check if the prompt returned properly formatted JSON.',
        example: '',
      };
    }

    res.json({
      question,
      answer,
      feedback: parsedFeedback,
    });

  } catch (error) {
    console.error('Gemini feedback error:', error.message);
    res.status(500).json({ error: 'Failed to generate feedback using Gemini' });
  }
};
