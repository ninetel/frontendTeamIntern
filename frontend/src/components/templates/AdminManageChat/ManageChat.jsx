import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessages from './ChatMessages'; // Import the new component

const ManageChat = ({ selectedUrl }) => {
  const [sortedMembers, setSortedMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userType, setUserType] = useState("");
  const [userMessages, setUserMessages] = useState([]); // State to store messages of the selected user
  const messageEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatResponse, generalResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/chat`, {
            params: { url: selectedUrl } // Send selectedUrl as a parameter
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/general`, {
            params: { url: selectedUrl } // Send selectedUrl as a parameter
          })
        ]);

        const chatData = Array.isArray(chatResponse.data) ? chatResponse.data : [];
        const generalChatData = Array.isArray(generalResponse.data) ? generalResponse.data : [];

        // Combine data from both routes and map to include user info
        const allChats = [
          ...chatData.map(item => ({ ...item.lastMessage, type: 'Auth Users' })),
          ...generalChatData.map(item => ({ ...item.lastMessage, type: 'Guest Users' }))
        ];

        // Group by user ID and get the latest message for each unique user
        const groupedChats = allChats.reduce((acc, chat) => {
          const userId = chat.uid;
          if (!acc[userId] || new Date(chat.time) > new Date(acc[userId].time)) {
            acc[userId] = chat; // Keep the latest message for each user
          }
          return acc;
        }, {});

        // Convert grouped object back to an array and sort by time
        const latestChats = Object.values(groupedChats).sort((a, b) => new Date(b.time) - new Date(a.time));
        
        setSortedMembers(latestChats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedUrl) { // Fetch data only if selectedUrl is defined
      fetchData();
    }
  }, [selectedUrl]); // Re-fetch when selectedUrl changes

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleUserSelect = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${userId}`);
      setSelectedChat({ uid: userId, messages: response.data });
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !uploadedImage) return;

    const messagesToSend = [];

    if (newMessage.trim()) {
      const userMessage = {
        username: "admin", // Set the sender to admin
        message: newMessage,
        time: Date.now(),
        url: selectedUrl,
      };
      messagesToSend.push(userMessage);
      setNewMessage("");
    }

    if (uploadedImage) {
      const imageMessage = {
        username: "admin", // Set the sender to admin
        message: uploadedImage, // Store the image URL
        time: Date.now(),
        url: selectedUrl,
      };
      messagesToSend.push(imageMessage);
      setUploadedImage(null);
    }

    setSelectedChat((prevChat) => (prevChat ? {
      ...prevChat,
      messages: [...prevChat.messages, ...messagesToSend],
    } : { messages: messagesToSend }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Filter sortedMembers based on selected userType
  const filteredMembers = userType
    ? sortedMembers.filter((chat) => chat.type === userType)
    : sortedMembers;

    console.log("filteredMembers===>", sortedMembers);

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 text-center py-2">
            Chat List for {selectedUrl}
          </h2>
          <select
            onChange={handleUserTypeChange}
            value={userType}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">All Users</option>
            <option value="Auth Users">Auth Users</option>
            <option value="Guest Users">Guest Users</option>
          </select>
        </div>
        <div className="p-4 overflow-y-auto h-full space-y-4">
          {filteredMembers.map((chat, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => handleUserSelect(chat.uid)}
            >
              <p className="font-semibold text-gray-900">User ID: {chat.uid}</p>
              <p className="text-gray-600 truncate">{chat.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 bg-gray-50 p-4 flex flex-col">
        {selectedChat ? (
          <ChatMessages userId={selectedChat.uid} />
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