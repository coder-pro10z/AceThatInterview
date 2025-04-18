import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Summary = () => {
  const { state } = useLocation();
  const { questions, answers } = state;
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/feedback', {
          questions,
          answers
        });
        setFeedback(res.data.feedback); // Assuming your backend returns { feedback: [...] }
      } catch (err) {
        console.error('Error getting feedback:', err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your AI Feedback Summary</h2>
      {feedback.length ? (
        feedback.map((f, i) => (
          <div key={i} className="mb-6 p-4 border rounded shadow-sm">
            <h3 className="font-semibold mb-2">Q: {questions[i].question}</h3>
            <p className="mb-1"><strong>Your Answer:</strong> {answers[questions[i].id]}</p>
            <p><strong>Feedback:</strong> {f}</p>
          </div>
        ))
      ) : (
        <p>Loading feedback...</p>
      )}
    </div>
  );
};

export default Summary;
