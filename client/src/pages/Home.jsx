import React, { useState } from 'react';
import StorageToggle from '../components/StorageToggle';
import Interview from './Interview';

const Home = () => {
  const [useDb, setUseDb] = useState(false);

  const handleToggleChange = (value) => {
    setUseDb(value);
    console.log('Use DB:', value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🧠 AceThatInterview</h1>

        <div className="flex items-center justify-between mb-6">
          <StorageToggle onToggle={handleToggleChange} />
          <p className="text-gray-600 text-sm sm:text-base">
            Currently saving to: <span className="font-semibold text-indigo-600">{useDb ? 'Database' : 'Local File'}</span>
          </p>
        </div>

        <div className="mt-4">
          <Interview useDb={useDb} />
        </div>
      </div>
    </div>
  );
};

export default Home;
