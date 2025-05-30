// {import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Summary = () => {
//   const location = useLocation();
//   //const { questions, answers } = location.state;
//   const [feedbackList, setFeedbackList] = useState([]);
//   const { questions = [], answers = {} } = location.state || {};
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const feedbackResponses = await Promise.all(
//           questions.map(async (q) => {
//             const res = await axios.post('http://localhost:5000/api/feedback', {
//               question: q.question,
//               answer: answers[q.id],
//             });
//             return {
//               question: q.question,
//               answer: answers[q.id],
//               feedback: res.data.feedback,
//             };
//           })
//         );
//         setFeedbackList(feedbackResponses);
//       } catch (err) {
//         console.error('Error fetching feedback:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedback();
//   }, [questions, answers]);

//   if (loading) return <p className="text-center mt-10">Generating feedback...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Interview Summary</h2>
//       {feedbackList.map((item, index) => (
//   <div key={index} className="mb-6 p-4 border rounded shadow">
//     <h3 className="font-semibold text-lg mb-2">Q{index + 1}: {item.question}</h3>
//     <p><strong>Your Answer:</strong> {item.answer}</p>
//     <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
//       <p><strong>Rating:</strong> {item.feedback.rating}</p>
//       <p><strong>Comment:</strong> {item.feedback.comment}</p>
//       <p><strong>Suggestion:</strong> {item.feedback.suggestion}</p>
//       {item.feedback.example && (
//         <div className="mt-2">
//           <p><strong>Example:</strong></p>
//           <pre className="bg-white p-2 rounded border text-sm overflow-auto">
//             {item.feedback.example}
//           </pre>
//         </div>
//       )}
//     </div>
//   </div>
// ))}

//     </div>
//   );
// };

// export default Summary;
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Typography, Card, Spin, Divider, List } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Summary = () => {
  const location = useLocation();
  const { questions = [], answers = {} } = location.state || {};
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="large" tip="Generating feedback..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: 'auto' }}>
      <Title level={2}>Interview Summary</Title>

      <List
        itemLayout="vertical"
        dataSource={feedbackList}
        renderItem={(item, index) => (
          <Card
            key={index}
            title={`Q${index + 1}: ${item.question}`}
            style={{ marginBottom: 24 }}
            bordered
          >
            <Paragraph>
              <Text strong>Your Answer:</Text> {item.answer}
            </Paragraph>

            <Divider />

            <Paragraph>
              <Text strong>Rating:</Text> {item.feedback.rating}
            </Paragraph>
            <Paragraph>
              <Text strong>Comment:</Text> {item.feedback.comment}
            </Paragraph>
            <Paragraph>
              <Text strong>Suggestion:</Text> {item.feedback.suggestion}
            </Paragraph>

            {item.feedback.example && (
              <div>
                <Text strong>Example:</Text>
                <pre
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: 6,
                    overflowX: 'auto',
                    marginTop: '8px',
                  }}
                >
                  {item.feedback.example}
                </pre>
              </div>
            )}
          </Card>
        )}
      />
    </div>
  );
};

export default Summary;
