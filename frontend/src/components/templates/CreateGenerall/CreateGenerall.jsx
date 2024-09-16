// src/CreateGenerall.js
import React, { useState } from 'react';
import CreateGenerallAI from '../CreateGenerallAI/CreateGenerallAI.jsx';

const CreateGenerall = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      <button
        className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center"
        onClick={toggleChat}
        style={{ 
          bottom: '16px', 
          right: '16px' 
        }}
      >
        {isChatOpen ? (
          <span className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span>Close</span>
          </span>
        ) : (
          <span className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Chat</span>
          </span>
        )}
      </button>

      {isChatOpen && (
        <div
          className="fixed bg-white shadow-lg rounded-lg flex flex-col"
          style={{ 
            position:'fixed',
            maxWidth: '280px', 
            maxHeight: '500px', 
            bottom: '16px', 
            right: '16px' 
          }}
        >
          <div
            className="flex-shrink-0 bg-green-600 text-white p-3 rounded-t-lg cursor-pointer flex items-center justify-between"
            onClick={toggleChat}
          >
            <span>Chat</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div className="flex-1 overflow-auto">
            <CreateGenerallAI />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGenerall;
