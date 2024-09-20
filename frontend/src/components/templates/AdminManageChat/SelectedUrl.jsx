import React from "react";

const urlOptions = ["nespsetrends", "otherurl"];

const UrlSelection = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Select a URL</h1>
      <div className="grid grid-cols-2 gap-4">
        {urlOptions.map((url) => (
          <div
            key={url}
            className="bg-blue-500 text-white p-4 rounded-lg cursor-pointer shadow-md hover:bg-blue-600 transition"
            onClick={() => onSelect(url)}
          >
            {url}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlSelection;
