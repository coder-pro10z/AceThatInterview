// {// // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import Summary from './Summary';
// // // import { useNavigate } from 'react-router-dom';

// // // const Interview = ({ useDb }) => {
// // //   const [questions, setQuestions] = useState([]);
// // //   const [current, setCurrent] = useState(0);
// // //   const [answers, setAnswers] = useState({});
// // //   const navigate = useNavigate(); // <-- add this
// // //   useEffect(() => {
// // //     const fetchQuestions = async () => {
// // //       const res = await axios.get('http://localhost:5000/api/questions?limit=5');
// // //       setQuestions(res.data);
// // //     };
// // //     fetchQuestions();
// // //   }, []);

// // //   const handleAnswerChange = (e) => {
// // //     setAnswers({
// // //       ...answers,
// // //       [questions[current].id]: e.target.value,
// // //     });
// // //   };

// // //   const nextQuestion = async () => {
// // //     if (current < questions.length - 1) {
// // //       setCurrent(current + 1);
// // //     } else {
// // //       try {
// // //         // Send answers to backend
// // //         await axios.post(
// // //           'http://localhost:5000/api/feedback/save-all',
// // //           {
// // //             questions,
// // //             answers,
// // //           },
// // //           {
// // //             headers: {
// // //               'x-use-db': useDb.toString(), // Important: tells backend where to save
// // //             },
// // //           }
// // //         );
  
// // //         // Navigate to summary page
// // //         navigate('/summary', {
// // //           state: { questions, answers },
// // //         });
// // //       } catch (error) {
// // //         console.error('Failed to save feedback:', error);
// // //       }
// // //     }
// // //   };
  
// // //   // const nextQuestion = () => {
// // //   //   if (current < questions.length - 1) {
// // //   //     setCurrent(current + 1);
// // //   //   }
// // //   //   else {
// // //   //       navigate('/summary', {
// // //   //         state: { questions, answers }
// // //   //       });
// // //   //     }
      
// // //     //  else {
// // //     //   console.log("All answers submitted:", answers);
// // //     //   // Redirect to summary or feedback page next
// // //     // }
// // //   // };

// // //   if (!questions.length) return <p>Loading questions...</p>;

// // //   return (
// // //     <div className="p-4 max-w-xl mx-auto">
// // //       <h2 className="text-xl font-bold mb-2">Question {current + 1} of {questions.length}</h2>
// // //       <p className="mb-4">{questions[current].question}</p>
// // //       <textarea
// // //         className="w-full p-2 border rounded mb-4"
// // //         rows={5}
// // //         value={answers[questions[current].id] || ''}
// // //         onChange={handleAnswerChange}
// // //         placeholder="Type your answer here..."
// // //       />
// // //       <button
// // //         onClick={nextQuestion}
// // //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //       >
// // //         {current < questions.length - 1 ? 'Next' : 'Finish'}
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default Interview;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Interview = () => {
// //   const [questions, setQuestions] = useState([]);
// //   const [answers, setAnswers] = useState({});
// //   const [feedbacks, setFeedbacks] = useState({});
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   // Load questions
// //   // useEffect(() => {
// //   //   const fetchQuestions = async () => {
// //   //     const res = await axios.get('/api/questions'); // or your endpoint
// //   //     setQuestions(res.data);
// //   //   };
// //   //   fetchQuestions();
// //   // }, []);
// //   const fetchQuestions = async (filters = {}) => {
// //     let query = '';
// //     if (filters.topic) query += `topic=${filters.topic}&`;
// //     if (filters.type) query += `type=${filters.type}&`;
// //     if (filters.limit) query += `limit=${filters.limit}`;
  
// //     const res = await axios.get(`http://localhost:5000/api/questions?${query}`);
// //     setQuestions(res.data);
// //   };

// //   useEffect(() => {
// //     fetchQuestions();
// //   }, []);

// //   const handleAnswerChange = (e) => {
// //     setAnswers({
// //       ...answers,
// //       [questions[currentIndex].id]: e.target.value
// //     });
// //   };

// //   const getFeedback = async () => {
// //     const currentQ = questions[currentIndex];
// //     const answer = answers[currentQ.id];

// //     if (!answer) return alert('Please enter an answer');

// //     setLoading(true);
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/feedback', {
// //         question: currentQ.question,
// //         answer
// //       });

// //       setFeedbacks((prev) => ({
// //         ...prev,
// //         [currentQ.id]: res.data.feedback
// //       }));

// //       setCurrentIndex((prev) => prev + 1);
// //     } catch (err) {
// //       console.error('Failed to fetch feedback:', err);
// //       alert('Error generating feedback');
// //     }
// //     setLoading(false);
// //   };

// //   const currentQ = questions[currentIndex];

// //   // if (!currentQ) return <div>🎉 All questions completed!</div>;

// //   if (currentIndex >= questions.length) {
// //     return (
// //       <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-md">
// //         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">🎉 All Questions Completed!</h2>
// //         <p className="text-center text-gray-600 mb-6">Here's your feedback for each question:</p>
  
// //         <div className="space-y-6">
// //           {questions.map((q, index) => {
// //             const fb = feedbacks[q.id];
// //             return (
// //               <div
// //                 key={q.id}
// //                 className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm"
// //               >
// //                 <h3 className="text-lg font-semibold text-blue-700 mb-2">
// //                   Q{index + 1}: {q.question}
// //                 </h3>
// //                 <p className="mb-2"><span className="font-medium text-gray-700">Your Answer:</span> {answers[q.id]}</p>
  
// //                 {fb ? (
// //                   <div className="space-y-2">
// //                     <p><span className="font-medium text-green-700">🧠 Rating:</span> {fb.rating}</p>
// //                     <p><span className="font-medium text-indigo-700">💬 Comment:</span> {fb.comment}</p>
// //                     <p><span className="font-medium text-yellow-700">📌 Suggestion:</span> {fb.suggestion}</p>
// //                     {fb.example && (
// //                       <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800">
// //                         <span className="font-semibold block mb-1">🧪 Example:</span>
// //                         <pre className="whitespace-pre-wrap">{fb.example}</pre>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <p className="text-red-600 font-semibold">⚠️ Feedback not available.</p>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //      );
// //   }

// //   return (
// //     // <div className="interview-container">
// //     //   <h2>Question {currentIndex + 1}</h2>
// //     //   <p>{currentQ.question}</p>

// //     //   <textarea
// //     //     value={answers[currentQ.id] || ''}
// //     //     onChange={handleAnswerChange}
// //     //     placeholder="Write your answer..."
// //     //     rows={4}
// //     //   />

// //     //   <button onClick={getFeedback} disabled={loading}>
// //     //     {loading ? 'Generating Feedback...' : 'Submit Answer'}
// //     //   </button>

// //     //   {feedbacks[currentQ.id] && (
// //     //     <div className="feedback-card">
// //     //       <h4>💡 Feedback</h4>
// //     //       <p><strong>Rating:</strong> {feedbacks[currentQ.id].rating}</p>
// //     //       <p><strong>Comment:</strong> {feedbacks[currentQ.id].comment}</p>
// //     //       <p><strong>Suggestion:</strong> {feedbacks[currentQ.id].suggestion}</p>
// //     //       {feedbacks[currentQ.id].example && (
// //     //         <div>
// //     //           <strong>Example:</strong>
// //     //           <pre>{feedbacks[currentQ.id].example}</pre>
// //     //         </div>
// //     //       )}
// //     //     </div>
// //     //   )}
// //     // </div>
// //     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
// //   <h2 className="text-2xl font-bold text-gray-800">
// //     Question {currentIndex + 1} of {questions.length}
// //   </h2>

// //   <p className="text-lg text-gray-700 font-medium">{currentQ.question}</p>

// //   <textarea
// //     className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //     value={answers[currentQ.id] || ''}
// //     onChange={handleAnswerChange}
// //     placeholder="Write your answer here..."
// //     rows={5}
// //   />

// //   <button
// //     onClick={getFeedback}
// //     disabled={loading}
// //     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md disabled:bg-gray-400 transition"
// //   >
// //     {loading ? 'Generating Feedback...' : 'Submit Answer'}
// //   </button>

// //   {feedbacks[currentQ.id] && (
// //     <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-6">
// //       <h4 className="text-lg font-semibold text-green-700 mb-2">💡 Feedback</h4>
// //       <p><span className="font-semibold text-gray-700">Rating:</span> {feedbacks[currentQ.id].rating}</p>
// //       <p><span className="font-semibold text-gray-700">Comment:</span> {feedbacks[currentQ.id].comment}</p>
// //       <p><span className="font-semibold text-gray-700">Suggestion:</span> {feedbacks[currentQ.id].suggestion}</p>
// //       {feedbacks[currentQ.id].example && (
// //         <div className="mt-3">
// //           <p className="font-semibold text-gray-700">Example:</p>
// //           <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-auto">{feedbacks[currentQ.id].example}</pre>
// //         </div>
// //       )}
// //     </div>
// //   )}
// // </div>

// //   );
// // };

// // export default Interview;
// // {
// // // src/pages/Interview.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   Row,
// //   Col,
// //   Card,
// //   Form,
// //   Input,
// //   Button,
// //   Progress,
// //   Space,
// //   Typography,
// //   message,
// // } from 'antd';
// // import VideoRecorder from '../components/VideoRecorder';

// // const { TextArea } = Input;
// // const { Text } = Typography;

// // export default function Interview({ interviewDetails, useDb }) {
// //   const [questions, setQuestions] = useState([]);
// //   const [answers, setAnswers] = useState({});
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch questions based on setup
// //   useEffect(() => {
// //     const { questionType, techTopics, time, experience } = interviewDetails;
// //     let params = [];
// //     if (questionType) params.push(`type=${questionType}`);
// //     if (techTopics?.length) params.push(`topic=${techTopics.join(',')}`);
// //     // you can adjust limit based on time or number of topics
// //     params.push(`limit=${techTopics.length || 5}`);
// //     const query = params.join('&');

// //     axios
// //       .get(`http://localhost:5000/api/questions?${query}`)
// //       .then(res => setQuestions(res.data))
// //       .catch(err => {
// //         console.error(err);
// //         message.error('Failed to load questions');
// //       });
// //   }, [interviewDetails]);

// //   const question = questions[currentIndex];
// //   if (!question) return <p>Loading questions…</p>;

// //   // When recording completes, you'd upload Blob to STT then set transcript
// //   const handleRecordingComplete = async (blobUrl) => {
// //     // Example placeholder: later replace with actual upload + STT
// //     message.success('Recording captured! You can edit or proceed.');
// //     // setAnswers(prev => ({ ...prev, [question.id]: transcript }));
// //   };

// //   const handleAnswerChange = (e) => {
// //     const value = e.target.value;
// //     setAnswers(prev => ({ ...prev, [question.id]: value }));
// //   };

// //   const submitAndNext = async () => {
// //     if (!answers[question.id]?.trim()) {
// //       return message.warning('Please provide an answer (record or type).');
// //     }
// //     setLoading(true);
// //     try {
// //       // Optionally send each QA pair to backend here:
// //       // await axios.post('/api/feedback', { question: question.question, answer: answers[question.id] }, { headers: { 'x-use-db': useDb } });

// //       // Move to next question
// //       setCurrentIndex(i => i + 1);
// //     } catch (err) {
// //       console.error(err);
// //       message.error('Failed to submit answer');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Finished all questions
// //   if (currentIndex >= questions.length) {
// //     return (
// //       <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-md">
// //         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
// //           🎉 All Questions Completed!
// //         </h2>
// //         <p className="text-center text-gray-600 mb-6">
// //           Thank you! Navigate to summary to view feedback.
// //         </p>
// //         <Button type="primary" onClick={() => window.location.reload()}>
// //           Restart Interview
// //         </Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ padding: 24, maxWidth: 960, margin: 'auto' }}>
// //       <Progress
// //         percent={((currentIndex + 1) / questions.length) * 100}
// //         format={() => `Question ${currentIndex + 1} of ${questions.length}`}
// //       />

// //       <Row gutter={16} style={{ marginTop: 24 }}>
// //         <Col span={12}>
// //           <Card title={`Q${currentIndex + 1}: ${question.question}`} bordered>
// //             <Text type="secondary">
// //               Topic: {question.topic} • Difficulty: {question.difficulty}
// //             </Text>
// //           </Card>
// //         </Col>

// //         <Col span={12}>
// //           <Card title="Record Your Answer" bordered>
// //             {/* <VideoRecorder onComplete={handleRecordingComplete} />
// //              */}
// //              {/* // inside Interview component */}
// //             <VideoRecorder
// //               onComplete={(blobUrl, blob) => {
// //                 // blobUrl: playback URL
// //                 // blob: raw data for upload or STT
// //                 handleRecordingComplete(blobUrl);
// //                 // You can also upload `blob` directly now
// //               }}
// //             />
// //           </Card>
// //         </Col>
// //       </Row>

// //       <Form layout="vertical" style={{ marginTop: 24 }}>
// //         <Form.Item label="Your Answer">
// //           <TextArea
// //             rows={4}
// //             value={answers[question.id] || ''}
// //             onChange={handleAnswerChange}
// //             placeholder="Your answer will appear here…"
// //           />
// //         </Form.Item>
// //       </Form>

// //       <Space style={{ float: 'right', marginTop: 16 }}>
// //         <Button
// //           onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
// //           disabled={currentIndex === 0}
// //         >
// //           Prev
// //         </Button>
// //         <Button
// //           type="primary"
// //           onClick={submitAndNext}
// //           loading={loading}
// //         >
// //           {currentIndex < questions.length - 1 ? 'Submit & Next' : 'Finish'}
// //         </Button>
// //       </Space>
// //     </div>
// //   );
// // }
// // }

// // {
// // import React, { useEffect, useRef, useState } from 'react';
// // import { Button, Typography } from 'antd';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const Interview = () => {
// //   const videoRef = useRef(null);
// //   const mediaRecorderRef = useRef(null);
// //   const chunksRef = useRef([]);
// //   const streamRef = useRef(null);

// //   const [recording, setRecording] = useState(false);
// //   const [videoUrl, setVideoUrl] = useState(null);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [cameraReady, setCameraReady] = useState(false);

// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const interviewDetails = location.state || {};
// //   const questions = interviewDetails.questions || [];

// //   // Setup camera preview
// //   useEffect(() => {
// //     const setupCamera = async () => {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //         streamRef.current = stream;
// //         if (videoRef.current) {
// //           videoRef.current.srcObject = stream;
// //         }
// //         setCameraReady(true);
// //       } catch (err) {
// //         console.error('Error accessing camera:', err);
// //         setCameraReady(false);
// //       }
// //     };

// //     setupCamera();

// //     return () => {
// //       streamRef.current?.getTracks().forEach(track => track.stop());
// //     };
// //   }, []);

// //   // Auto navigate to Feedback after last question
// //   useEffect(() => {
// //     if (questions.length > 0 && currentIndex >= questions.length) {
// //       navigate('/feedback', { state: { answers, interviewDetails } });
// //     }
// //   }, [currentIndex, questions.length, answers, navigate, interviewDetails]);

// //   const startRecording = () => {
// //     if (!streamRef.current) return;

// //     setRecording(true);
// //     setVideoUrl(null);

// //     mediaRecorderRef.current = new MediaRecorder(streamRef.current);
// //     chunksRef.current = [];

// //     mediaRecorderRef.current.ondataavailable = (e) => {
// //       if (e.data.size > 0) chunksRef.current.push(e.data);
// //     };

// //     mediaRecorderRef.current.onstop = () => {
// //       const blob = new Blob(chunksRef.current, { type: 'video/webm' });
// //       const url = URL.createObjectURL(blob);
// //       setVideoUrl(url);

// //       setAnswers(prev => [...prev, {
// //         question: questions[currentIndex],
// //         videoUrl: url
// //       }]);
// //     };

// //     mediaRecorderRef.current.start();
// //   };

// //   const stopRecording = () => {
// //     setRecording(false);
// //     mediaRecorderRef.current?.stop();
// //     setCurrentIndex(prev => prev + 1);
// //   };

// //   return (
// //     <div style={{ textAlign: 'center', padding: 40 }}>
// //       <Typography.Title level={2}>🎤 Interview Session</Typography.Title>

// //       <Typography.Title level={4}>
// //         Question {currentIndex + 1} of {questions.length}
// //       </Typography.Title>

// //       <Typography.Text strong style={{ display: 'block', margin: '20px 0' }}>
// //         {questions[currentIndex]}
// //       </Typography.Text>

// //       <div style={{ width: 640, height: 480, margin: '20px auto', border: '2px solid #ccc' }}>
// //         <video
// //           ref={videoRef}
// //           width="640"
// //           height="480"
// //           autoPlay
// //           playsInline
// //           muted
// //           style={{ background: '#000' }}
// //         />
// //       </div>

// //       {!recording && videoUrl && (
// //         <div style={{ marginBottom: 20 }}>
// //           <Typography.Text type="success">✔️ Answer recorded!</Typography.Text>
// //           <video src={videoUrl} controls width="640" height="480" style={{ marginTop: 10 }} />
// //         </div>
// //       )}

// //       <div style={{ marginTop: 20 }}>
// //         <Button
// //           type="primary"
// //           onClick={startRecording}
// //           disabled={!cameraReady || recording}
// //           style={{ marginRight: 10 }}
// //         >
// //           Start
// //         </Button>

// //         <Button
// //           danger
// //           onClick={stopRecording}
// //           disabled={!recording}
// //         >
// //           Stop
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Interview;
// // }

// // src/pages/Interview.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Card, Progress, Space, Button, Typography, Spin, message } from 'antd';
// import VideoRecorder from '../components/VideoRecorder';
// import axios from 'axios';

// const { Text } = Typography;

// export default function Interview() {
//   const { state } = useLocation();
//   const navigate   = useNavigate();
//   const { interviewDetails = {}, useDb } = state || {};

//   const [questions, setQuestions]       = useState([]);
//   const [answers, setAnswers]           = useState({});
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loadingQ, setLoadingQ]         = useState(true);

//   // 1️⃣ Fetch questions on mount
//   useEffect(() => {
//     const { questionType, techTopics } = interviewDetails;
//     let params = [];
//     if (questionType) params.push(`type=${questionType}`);
//     if (techTopics?.length) params.push(`topic=${techTopics.join(',')}`);
//     params.push(`limit=${techTopics?.length || 5}`);
//     const query = params.join('&');

//     axios
//       .get(`http://localhost:5000/api/questions?${query}`)
//       .then(res => {
//         setQuestions(res.data);
//       })
//       .catch(err => {
//         console.error(err);
//         message.error('Failed to load questions');
//       })
//       .finally(() => setLoadingQ(false));
//   }, [interviewDetails]);

//   // 2️⃣ Redirect when done
//   useEffect(() => {
//     if (!loadingQ && questions.length > 0 && currentIndex >= questions.length) {
//       // pass along answers and details
//       navigate('/feedback', { state: { questions, answers, interviewDetails, useDb } });
//     }
//   }, [loadingQ, questions, currentIndex, answers, navigate, interviewDetails, useDb]);

//   // 3️⃣ Render loading or no-questions
//   if (loadingQ) {
//     return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
//   }
//   if (questions.length === 0) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: 100 }}>
//         <Typography.Title level={3}>No questions available</Typography.Title>
//         <Button onClick={() => navigate(-1)}>Back to setup</Button>
//       </div>
//     );
//   }

//   // 4️⃣ Otherwise render the current question
//   const question = questions[currentIndex];

//   // Called when recording finishes
//   const handleRecordingComplete = (blobUrl) => {
//     setAnswers(prev => ({
//       ...prev,
//       [question.id]: blobUrl
//     }));
//     message.success('Answer recorded! You can re-record or proceed.');
//   };

//   // Move to next question after Stop
//   const onStopAndNext = () => {
//     setCurrentIndex(i => i + 1);
//   };

//   return (
//     <div style={{ padding: 24, maxWidth: 960, margin: 'auto' }}>
//       <Progress
//         percent={((currentIndex + 1) / questions.length) * 100}
//         format={() => `Question ${currentIndex + 1} of ${questions.length}`}
//       />

//       <Row gutter={16} style={{ marginTop: 24 }}>
//         <Col span={12}>
//           <Card title={question.question} bordered>
//             <Text type="secondary">
//               Topic: {question.topic} • Difficulty: {question.difficulty}
//             </Text>
//           </Card>
//         </Col>

//         <Col span={12}>
//           <Card title="Record Your Answer" bordered>
//             <VideoRecorder
//               onComplete={(blobUrl) => {
//                 handleRecordingComplete(blobUrl);
//                 onStopAndNext();
//               }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Space style={{ marginTop: 24, float: 'right' }}>
//         <Button
//           onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
//           disabled={currentIndex === 0}
//         >
//           Prev
//         </Button>
//         <Button
//           type="primary"
//           onClick={() => setCurrentIndex(i => i + 1)}
//           disabled={!answers[question.id]}
//         >
//           {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
//         </Button>
//       </Space>
//     </div>
//   );
// }

// }

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Progress, Space, Button, Typography, Spin, message, Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Text } = Typography;

export default function Interview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { interviewDetails = {}, useDb } = state || {};

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingQ, setLoadingQ] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const { questionType, techTopics } = interviewDetails;
    let params = [];
    if (questionType) params.push(`type=${questionType}`);
    if (techTopics?.length) params.push(`topic=${techTopics.join(',')}`);
    params.push(`limit=${techTopics?.length || 5}`);
    const query = params.join('&');

    axios
      .get(`http://localhost:5000/api/questions?${query}`)
      .then(res => {
        setQuestions(res.data);
      })
      .catch(() => {
        message.error('Failed to load questions');
      })
      .finally(() => setLoadingQ(false));
  }, [interviewDetails]);

  useEffect(() => {
    if (!loadingQ && questions.length > 0 && currentIndex >= questions.length) {
      navigate('/summary', { state: { questions, answers, interviewDetails, useDb } });
    }
  }, [loadingQ, questions, currentIndex, answers, navigate, interviewDetails, useDb]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      message.error('Speech recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setListening(true);
      message.info('Listening...');
    };

    recognitionRef.current.onend = () => {
      setListening(false);
      message.success('Stopped listening.');
    };

    // recognitionRef.current.onresult = event => {
    //   const speechResult = event.results[0][0].transcript;
    //   setTranscript(speechResult);
    //   setAnswers(prev => ({ ...prev, [questions[currentIndex]?.id]: speechResult }));
    // };

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult); // optional display
      setAnswers((prev) => ({
        ...prev,
        [questions[currentIndex].id]: speechResult,
      }));
    };

    recognitionRef.current.onerror = event => {
      message.error(`Error: ${event.error}`);
    };
  }, [questions, currentIndex]);

  const startListening = () => recognitionRef.current.start();

  if (loadingQ)
    return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;

  if (!questions.length)
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Typography.Title level={3}>No questions available</Typography.Title>
        <Button onClick={() => navigate(-1)}>Back to setup</Button>
      </div>
    );

  // const question = questions[currentIndex];
  const question = questions[currentIndex] || {};
if (currentIndex >= questions.length) return null;


  return (
    <div style={{ padding: 24, maxWidth: 960, margin: 'auto' }}>
      <Progress
        percent={((currentIndex + 1) / questions.length) * 100}
        format={() => `Question ${currentIndex + 1} of ${questions.length}`}
      />

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title={question.question} bordered>
            <Text type="secondary">
              Topic: {question.topic} • Difficulty: {question.difficulty}
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Record Your Answer" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button onClick={startListening} disabled={listening} type="primary">
                {listening ? 'Listening...' : 'Start Recording'}
              </Button>
              {/* <TextArea
                value={transcript}
                placeholder="Your answer will appear here..."
                rows={5}
              /> */}
              <TextArea
                value={answers[question.id] || ''}
                placeholder="Type your answer or use voice input..."
                rows={5}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: e.target.value,
                  }))
                }
              />


            </Space>
          </Card>
        </Col>
      </Row>

      <Space style={{ marginTop: 24, float: 'right' }}>
        <Button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setTranscript('');
            setCurrentIndex(i => i + 1);
          }}
          disabled={!answers[question.id]}
        >
          {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </Space>
    </div>
  );
}
