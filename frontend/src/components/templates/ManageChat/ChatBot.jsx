import React, { useState } from "react";

const ChatBox = ({ chat, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-l">
      <div className="h-96 overflow-y-scroll">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 ${msg.isAdmin ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.isAdmin
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <strong>{msg.isAdmin ? "Admin" : chat.user}:</strong>{" "}
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
