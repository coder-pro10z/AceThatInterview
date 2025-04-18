import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Summary = () => {
  const location = useLocation();
  const { questions, answers } = location.state;
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackResponses = await Promise.all(
          questions.map(async (q) => {
            const res = await axios.post('http://localhost:5000/api/feedback', {
              question: q.question,
              answer: answers[q.id],
            });
            return {
              question: q.question,
              answer: answers[q.id],
              feedback: res.data.feedback,
            };
          })
        );
        setFeedbackList(feedbackResponses);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [questions, answers]);

  if (loading) return <p className="text-center mt-10">Generating feedback...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Interview Summary</h2>
      {feedbackList.map((item, index) => (
        <div key={index} className="mb-6 p-4 border rounded shadow">
          <h3 className="font-semibold text-lg mb-2">Q{index + 1}: {item.question}</h3>
          <p className="mb-2"><strong>Your Answer:</strong> {item.answer}</p>
          <p className="text-green-700"><strong>Feedback:</strong> {item.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default Summary;
