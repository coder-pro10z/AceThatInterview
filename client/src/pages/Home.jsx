import React, { useState } from 'react';
import StorageToggle from '../components/StorageToggle';
import Interview from './Interview';

const questionTypes = ['Technical', 'Behavioral', 'HR'];
const techStacks = ['React', 'Node', 'SQL', 'System Design'];

const Home = () => {
  const [useDb, setUseDb] = useState(false);
  const [formData, setFormData] = useState({
    questionType: '',
    techTopics: [],
    role: '',
    time: '',
    company: '',
    experience: '',
  });
  const [startInterview, setStartInterview] = useState(false);

  const handleToggleChange = (value) => {
    setUseDb(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, techTopics: options }));
  };

  const handleStart = () => {
    if (formData.questionType && formData.techTopics.length && formData.role) {
      setStartInterview(true);
    } else {
      alert('Please fill out required fields before starting.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-[#33678A] mb-6">🧠 AceThatInterview</h1>

        <div className="flex items-center justify-between mb-4">
          <StorageToggle onToggle={handleToggleChange} />
          <p className="text-gray-700">
            Currently saving to: <span className="text-highlight font-medium">{useDb ? 'Database' : 'Local File'}</span>
          </p>
        </div>

        {!startInterview ? (
          <div className="space-y-4">
            {/* Question Type */}
            <div>
              <label className="block text-primary font-semibold mb-1">Select Question Type</label>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                className="input w-full border border-secondary rounded px-3 py-2"
              >
                <option value="">-- Select --</option>
                {questionTypes.map((type, idx) => (
                  <option key={idx} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-primary font-semibold mb-1">Select Tech Topics</label>
              <select
  name="techTopics"
  multiple
  value={formData.techTopics}
  onChange={handleMultiSelect}
  className="w-full h-40 px-4 py-2 border-2 border-secondary rounded-xl bg-background text-gray-800 focus:outline-none focus:ring-2 focus:ring-highlight scrollbar-thin scrollbar-thumb-highlight scrollbar-track-secondary/20"
>
  {techStacks.map((topic, idx) => (
    <option
      key={idx}
      value={topic.toLowerCase()}
      className="text-sm text-gray-700 bg-white hover:bg-secondary/10"
    >
      {topic}
    </option>
  ))}
</select>
            </div>

            {/* Role */}
            <input
              type="text"
              name="role"
              placeholder="Role you are applying for"
              value={formData.role}
              onChange={handleChange}
              className="input w-full border border-secondary px-3 py-2 rounded"
            />

            {/* Time */}
            <input
              type="number"
              name="time"
              placeholder="Interview Duration (in minutes)"
              value={formData.time}
              onChange={handleChange}
              className="input w-full border border-secondary px-3 py-2 rounded"
            />

            {/* Company */}
            <input
              type="text"
              name="company"
              placeholder="Target Company"
              value={formData.company}
              onChange={handleChange}
              className="input w-full border border-secondary px-3 py-2 rounded"
            />

            {/* Experience */}
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="input w-full border border-secondary px-3 py-2 rounded"
            />

            {/* CTA Button */}
            <button
            onClick={handleStart}
  className="bg-[#E65C4F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#cc4a3f] transition-all"
>
  Start Interview
</button>
          </div>
        ) : (
          <Interview useDb={useDb} interviewDetails={formData} />
        )}
      </div>
    </div>
  );
};

export default Home;
