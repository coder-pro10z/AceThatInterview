import fs from 'fs';
import path from 'path';
import FeedbackModel from '../models/Feedback.js'; // adjust path to your model

const dir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const localPath = path.join(dir, 'history.json');
// const localPath = path.join(process.cwd(),'data', 'history.json');

// Save to local JSON file
const saveToLocal = async (entry) => {
  try {
    let data = [];
    if (fs.existsSync(localPath)) {
      const existing = fs.readFileSync(localPath);
      data = JSON.parse(existing);
    }
    data.push(entry);
    fs.writeFileSync(localPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to local history file:', err);
  }
};

// Save to MongoDB
const saveToDb = async (entry) => {
  try {
    const feedback = new FeedbackModel(entry);
    await feedback.save();
  } catch (err) {
    console.error('Error saving to DB:', err);
  }
};

export const saveFeedback = async (entry, useDb) => {
  if (useDb) {
    await saveToDb(entry);
  } else {
    await saveToLocal(entry);
  }
};
