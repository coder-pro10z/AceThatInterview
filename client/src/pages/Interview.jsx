import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate(); // <-- add this
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('http://localhost:5000/api/questions?limit=5');
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [questions[current].id]: e.target.value,
    });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
    else {
        navigate('/summary', {
          state: { questions, answers }
        });
      }
      
    //  else {
    //   console.log("All answers submitted:", answers);
    //   // Redirect to summary or feedback page next
    // }
  };

  if (!questions.length) return <p>Loading questions...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Question {current + 1} of {questions.length}</h2>
      <p className="mb-4">{questions[current].question}</p>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={5}
        value={answers[questions[current].id] || ''}
        onChange={handleAnswerChange}
        placeholder="Type your answer here..."
      />
      <button
        onClick={nextQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {current < questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
};

export default Interview;
