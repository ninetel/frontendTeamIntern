import React, { useState, useEffect, useRef } from "react";

const allChats = [
  {
    chatId: 1,
    messages: [
      {
        username: "ram",
        message: "Hello, this is a short message.",
        time: 20240826162526,
        url: "nespsetrends",
      },
      {
        username: "you",
        message: "Hi Ram! How are you?",
        time: 20240826162530,
        url: "nespsetrends",
      },
    ],
    type: "General",
  },
  {
    chatId: 2,
    messages: [
      {
        username: "ra1m",
        message: "Hello! How are you doing?",
        time: 20240826162536,
        url: "otherurl",
      },
      {
        username: "you",
        message: "I'm good, thank you! What about you?",
        time: 20240826162538,
        url: "otherurl",
      },
    ],
    type: "Guest",
  },
];

const ManageChat = ({ selectedUrl }) => {
  const [sortedMembers, setSortedMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userType, setUserType] = useState(""); // State to manage user type
  const messageEndRef = useRef(null);

  useEffect(() => {
    const filteredChats = allChats.filter((chat) =>
      chat.messages.some((msg) => msg.url === selectedUrl)
    );
    setSortedMembers(filteredChats);
  }, [selectedUrl]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !uploadedImage) return;

    const messagesToSend = [];

    if (newMessage.trim()) {
      const userMessage = {
        username: "you",
        message: newMessage,
        time: Date.now(),
        url: selectedUrl,
      };
      messagesToSend.push(userMessage);
      setNewMessage("");
    }

    if (uploadedImage) {
      const imageMessage = {
        username: "you",
        message: uploadedImage, // Store the image URL
        time: Date.now(),
        url: selectedUrl,
      };
      messagesToSend.push(imageMessage);
      setUploadedImage(null);
    }

    setSelectedChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, ...messagesToSend],
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat]);

  // Filter sortedMembers based on selected userType
  const filteredMembers = userType
    ? sortedMembers.filter((chat) => chat.type === userType)
    : sortedMembers;

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Chat List for {selectedUrl}
          </h2>
          <select
            onChange={handleUserTypeChange}
            value={userType}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">All Users</option>
            <option value="General">General</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <div className="p-4 overflow-y-auto h-full space-y-4">
          {filteredMembers.map((chat) => (
            <div
              key={chat.chatId}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => setSelectedChat(chat)}
            >
              <p className="font-semibold text-gray-900">
                Chat with {chat.messages[0].username}
              </p>
              <p className="text-gray-600 truncate">
                {chat.messages[chat.messages.length - 1].message}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 bg-gray-50 p-4 flex flex-col">
        {selectedChat ? (
          <div className="bg-white shadow-md rounded-lg p-4 flex-1 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat with {selectedChat.messages[0].username}
            </h2>
            <div className="mt-4 overflow-y-auto flex-1">
              <div className="flex flex-col space-y-4">
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-sm ${
                      msg.username === "you"
                        ? "bg-blue-100 self-end"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{msg.username}</p>
                    {msg.message.startsWith("data:image") || msg.message.startsWith("http") ? (
                      <img
                        src={msg.message}
                        alt="Uploaded"
                        className="mt-2 max-w-xs rounded"
                      />
                    ) : (
                      <p className="text-gray-600">{msg.message}</p>
                    )}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                className="w-full p-2 border rounded"
                placeholder="Type your message..."
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUploadedImage(URL.createObjectURL(e.target.files[0])) // Set image URL
                }
                className="mt-2"
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Send
              </button>
            </div>
            {uploadedImage && (
              <div className="mt-2">
                <p className="text-gray-600">Image ready to send:</p>
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="mt-2 max-w-xs rounded"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageChat;
