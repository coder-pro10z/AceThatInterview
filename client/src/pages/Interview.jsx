// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Summary from './Summary';
// import { useNavigate } from 'react-router-dom';

// const Interview = ({ useDb }) => {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate(); // <-- add this
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await axios.get('http://localhost:5000/api/questions?limit=5');
//       setQuestions(res.data);
//     };
//     fetchQuestions();
//   }, []);

//   const handleAnswerChange = (e) => {
//     setAnswers({
//       ...answers,
//       [questions[current].id]: e.target.value,
//     });
//   };

//   const nextQuestion = async () => {
//     if (current < questions.length - 1) {
//       setCurrent(current + 1);
//     } else {
//       try {
//         // Send answers to backend
//         await axios.post(
//           'http://localhost:5000/api/feedback/save-all',
//           {
//             questions,
//             answers,
//           },
//           {
//             headers: {
//               'x-use-db': useDb.toString(), // Important: tells backend where to save
//             },
//           }
//         );
  
//         // Navigate to summary page
//         navigate('/summary', {
//           state: { questions, answers },
//         });
//       } catch (error) {
//         console.error('Failed to save feedback:', error);
//       }
//     }
//   };
  
//   // const nextQuestion = () => {
//   //   if (current < questions.length - 1) {
//   //     setCurrent(current + 1);
//   //   }
//   //   else {
//   //       navigate('/summary', {
//   //         state: { questions, answers }
//   //       });
//   //     }
      
//     //  else {
//     //   console.log("All answers submitted:", answers);
//     //   // Redirect to summary or feedback page next
//     // }
//   // };

//   if (!questions.length) return <p>Loading questions...</p>;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-2">Question {current + 1} of {questions.length}</h2>
//       <p className="mb-4">{questions[current].question}</p>
//       <textarea
//         className="w-full p-2 border rounded mb-4"
//         rows={5}
//         value={answers[questions[current].id] || ''}
//         onChange={handleAnswerChange}
//         placeholder="Type your answer here..."
//       />
//       <button
//         onClick={nextQuestion}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         {current < questions.length - 1 ? 'Next' : 'Finish'}
//       </button>
//     </div>
//   );
// };

// export default Interview;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load questions
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const res = await axios.get('/api/questions'); // or your endpoint
  //     setQuestions(res.data);
  //   };
  //   fetchQuestions();
  // }, []);
  const fetchQuestions = async (filters = {}) => {
    let query = '';
    if (filters.topic) query += `topic=${filters.topic}&`;
    if (filters.type) query += `type=${filters.type}&`;
    if (filters.limit) query += `limit=${filters.limit}`;
  
    const res = await axios.get(`http://localhost:5000/api/questions?${query}`);
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [questions[currentIndex].id]: e.target.value
    });
  };

  const getFeedback = async () => {
    const currentQ = questions[currentIndex];
    const answer = answers[currentQ.id];

    if (!answer) return alert('Please enter an answer');

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/feedback', {
        question: currentQ.question,
        answer
      });

      setFeedbacks((prev) => ({
        ...prev,
        [currentQ.id]: res.data.feedback
      }));

      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
      alert('Error generating feedback');
    }
    setLoading(false);
  };

  const currentQ = questions[currentIndex];

  // if (!currentQ) return <div>🎉 All questions completed!</div>;

  if (currentIndex >= questions.length) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">🎉 All Questions Completed!</h2>
        <p className="text-center text-gray-600 mb-6">Here's your feedback for each question:</p>
  
        <div className="space-y-6">
          {questions.map((q, index) => {
            const fb = feedbacks[q.id];
            return (
              <div
                key={q.id}
                className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Q{index + 1}: {q.question}
                </h3>
                <p className="mb-2"><span className="font-medium text-gray-700">Your Answer:</span> {answers[q.id]}</p>
  
                {fb ? (
                  <div className="space-y-2">
                    <p><span className="font-medium text-green-700">🧠 Rating:</span> {fb.rating}</p>
                    <p><span className="font-medium text-indigo-700">💬 Comment:</span> {fb.comment}</p>
                    <p><span className="font-medium text-yellow-700">📌 Suggestion:</span> {fb.suggestion}</p>
                    {fb.example && (
                      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800">
                        <span className="font-semibold block mb-1">🧪 Example:</span>
                        <pre className="whitespace-pre-wrap">{fb.example}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-red-600 font-semibold">⚠️ Feedback not available.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
     );
  }

  return (
    // <div className="interview-container">
    //   <h2>Question {currentIndex + 1}</h2>
    //   <p>{currentQ.question}</p>

    //   <textarea
    //     value={answers[currentQ.id] || ''}
    //     onChange={handleAnswerChange}
    //     placeholder="Write your answer..."
    //     rows={4}
    //   />

    //   <button onClick={getFeedback} disabled={loading}>
    //     {loading ? 'Generating Feedback...' : 'Submit Answer'}
    //   </button>

    //   {feedbacks[currentQ.id] && (
    //     <div className="feedback-card">
    //       <h4>💡 Feedback</h4>
    //       <p><strong>Rating:</strong> {feedbacks[currentQ.id].rating}</p>
    //       <p><strong>Comment:</strong> {feedbacks[currentQ.id].comment}</p>
    //       <p><strong>Suggestion:</strong> {feedbacks[currentQ.id].suggestion}</p>
    //       {feedbacks[currentQ.id].example && (
    //         <div>
    //           <strong>Example:</strong>
    //           <pre>{feedbacks[currentQ.id].example}</pre>
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </div>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
  <h2 className="text-2xl font-bold text-gray-800">
    Question {currentIndex + 1} of {questions.length}
  </h2>

  <p className="text-lg text-gray-700 font-medium">{currentQ.question}</p>

  <textarea
    className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    value={answers[currentQ.id] || ''}
    onChange={handleAnswerChange}
    placeholder="Write your answer here..."
    rows={5}
  />

  <button
    onClick={getFeedback}
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md disabled:bg-gray-400 transition"
  >
    {loading ? 'Generating Feedback...' : 'Submit Answer'}
  </button>

  {feedbacks[currentQ.id] && (
    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-6">
      <h4 className="text-lg font-semibold text-green-700 mb-2">💡 Feedback</h4>
      <p><span className="font-semibold text-gray-700">Rating:</span> {feedbacks[currentQ.id].rating}</p>
      <p><span className="font-semibold text-gray-700">Comment:</span> {feedbacks[currentQ.id].comment}</p>
      <p><span className="font-semibold text-gray-700">Suggestion:</span> {feedbacks[currentQ.id].suggestion}</p>
      {feedbacks[currentQ.id].example && (
        <div className="mt-3">
          <p className="font-semibold text-gray-700">Example:</p>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-auto">{feedbacks[currentQ.id].example}</pre>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default Interview;
