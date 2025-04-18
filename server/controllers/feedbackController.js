import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getFeedback = async (req, res) => {
  const { questions, answers } = req.body;

  try {
    const feedbackResults = [];

    for (let i = 0; i < questions.length; i++) {
      const prompt = `Evaluate the following answer:\n\nQuestion: ${questions[i].question}\nAnswer: ${answers[questions[i].id]}\n\nGive feedback in terms of clarity, completeness, and tone.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      feedbackResults.push(completion.choices[0].message.content);
    }

    res.json({ feedback: feedbackResults });
  } catch (error) {
    console.error("AI feedback error:", error);
    res.status(500).json({ error: "Something went wrong with AI feedback" });
  }
};
