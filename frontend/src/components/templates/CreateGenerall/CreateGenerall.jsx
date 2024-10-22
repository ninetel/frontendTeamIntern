// src/CreateGenerall.js
import  { useState } from 'react';
import gbull from '../../../assets/gbul.jpg';
import CreateGenerallAI from '../CreateGenerallAI/CreateGenerallAI.jsx';

const CreateGenerall = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative bg-black">
      <button
        className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center"
        onClick={toggleChat}
        style={{ 
          bottom: '16px', 
          right: '16px',
          background: 'transparent',
          boxShadow: 'none', 
          border: 'none', 

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
          <span className="relative flex flex-col items-center">

            <img 
              src={gbull}
              alt="bull"
              className="w-12 h-12 mb-3" 
            />
            <div className="relative bg-green-500 text-white p-2 text-center rounded-lg" style={{ width: '150px', marginTop: '-4px' }}>
              Namaste, how can I help you?
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0"
                style={{
                  borderLeft: '10px solid transparent', 
                  borderRight: '10px solid transparent', 
                  borderBottom: '10px solid #22c55e', 
                }}
              ></div>
            </div>
          </span>
        )}
      </button>

      {isChatOpen && (
        <div
          className="fixed bg-white  rounded-lg flex flex-col w-[400px] h-[550px]"
          style={{ 
            // position:'fixed',
            // maxWidth: '280px', 
            // maxHeight: '500px', 
            bottom: '20px', 
            right: '16px' 
          }}
        >
          <div
            className="flex-shrink-0 bg-green-600 text-white px-3 py-2 rounded-t-lg cursor-pointer flex items-center justify-between"
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
