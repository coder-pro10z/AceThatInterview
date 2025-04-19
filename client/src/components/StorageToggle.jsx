import React from 'react';

const StorageToggle = ({ onToggle }) => {
  const handleChange = (e) => {
    onToggle(e.target.checked);
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        onChange={handleChange}
        className="toggle toggle-primary"
      />
      <span className="text-gray-700 font-medium">Save to Database</span>
    </label>
  );
};

export default StorageToggle;
