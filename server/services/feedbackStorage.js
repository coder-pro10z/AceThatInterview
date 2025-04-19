import FeedbackModel from '../models/feedback.js';

const useDb = process.env.USE_DB === 'true';

// In-memory fallback
let feedbackHistory = [];

// export const saveFeedback = async (entry) => {
//   if (useDb) {
//     const newEntry = new FeedbackModel(entry);
//     await newEntry.save();
//   } else {
//     feedbackHistory.push(entry);
//   }
// };

// export const getFeedback = async () => {
//   if (useDb) {
//     return await FeedbackModel.find().sort({ timestamp: -1 }).limit(50); // optional limit
//   } else {
//     return feedbackHistory;
//   }
// };
/////////////////////////////////
export const saveFeedback = async (entry, useDb) => {
    if (useDb) {
      const newEntry = new FeedbackModel(entry);
      await newEntry.save();
    } else {
      feedbackHistory.push(entry);
    }
  };
  
  export const getFeedback = async (useDb) => {
    if (useDb) {
      return await FeedbackModel.find().sort({ timestamp: -1 }).limit(50);
    } else {
      return feedbackHistory;
    }
  };
  
/////////////////////////////////



export const clearFeedback = async () => {
  if (useDb) {
    await FeedbackModel.deleteMany({});
  } else {
    feedbackHistory = [];
  }
};
