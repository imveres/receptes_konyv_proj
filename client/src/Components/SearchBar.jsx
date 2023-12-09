import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Keress hozzávalókra vagy receptekre..."
        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
