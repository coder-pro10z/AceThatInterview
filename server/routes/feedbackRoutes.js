import express from 'express';
import { getFeedback } from '../controllers/feedbackController.js';
import { useDbToggle } from '../middleware/useDbToggle.js';
import { getAIFeedback } from '../utils/AIfeedback.js';
const router = express.Router();

router.post('/', useDbToggle,getFeedback);

// router.post('/save-all',async(req,res)=>{
//     const { questions, answers } = req.body;
//     console.log('Request body:', req.body);
//     const useDb = req.headers['x-use-db'] === 'true';
//     try{
//         //try code to execute
//         for (const question of questions) {
//             // const answer = answers[question.id]
//             //
//              try
//             {

                
//                 const answer = answers[String(question.id)];
//                 if (!answer) continue;
                
//                 const feedback = await getAIFeedback(question.question, answer); // Separate util
//                 if (useDb) {
//                     await saveToDatabase(question.question, answer, feedback);
//                 } else {
//                     await saveToLocalFile(question.question, answer, feedback);
//                 }
//             }catch (err) {
//                 console.error(`Error processing question ID ${question.id}:`, err.message);
//               }
//           }
//           res.json({ success: true, message: 'All feedback saved successfully' });
      
//     }
//     catch(err){
//         //throw error
//         console.error('Save-all error:', err);
//         res.status(500).json({ error: 'Failed to save feedback' });
//     }
// })

export default router;
