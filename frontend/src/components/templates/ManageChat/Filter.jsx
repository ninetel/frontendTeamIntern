import React from "react";

const Filter = ({ setFilter }) => {
  return (
    <div className="p-4 mb-4 bg-gray-100 rounded">
      <div className="mb-2">
        <label className="block">Chat Type:</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="General">General</option>
          <option value="Guest">Guest</option>
          <option value="Auth">Auth</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
