import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessages from "./ChatMessages";

const ManageChat = ({ selectedUrl }) => {
  const [sortedMembers, setSortedMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
<<<<<<< HEAD
  // const [userType, setUserType] = useState("");
  // const [userMessages, setUserMessages] = useState([]);
  // const messageEndRef = useRef(null);

  // Dummy users and messages
  const dummyUsers = [
    { uid: '1', name: 'John Doe', lastMessage: 'Hello! Can you help me?', type: 'Auth Users' },
    { uid: '2', name: 'Jane Smith', lastMessage: 'I am having issues with my order.', type: 'Guest Users' },
    { uid: '3', name: 'Mike Johnson', lastMessage: 'Can I change my password?', type: 'Auth Users' },
    { uid: '4', name: 'Emily Davis', lastMessage: 'I need support with my account.', type: 'Guest Users' },
  ];

  const dummyMessages = {
    '1': [
      { message: 'Hello! Can you help me?', username: 'John Doe', time: '2024-10-18T12:00:00Z' },
      { message: 'Sure, how can I assist?', username: 'admin', time: '2024-10-18T12:05:00Z' },
    ],
    '2': [
      { message: 'I am having issues with my order.', username: 'Jane Smith', time: '2024-10-18T12:10:00Z' },
      { message: 'Can you provide more details?', username: 'admin', time: '2024-10-18T12:15:00Z' },
    ],
    '3': [
      { message: 'Can I change my password?', username: 'Mike Johnson', time: '2024-10-18T12:20:00Z' },
      { message: 'Yes, go to settings to update it.', username: 'admin', time: '2024-10-18T12:25:00Z' },
    ],
    '4': [
      { message: 'I need support with my account.', username: 'Emily Davis', time: '2024-10-18T12:30:00Z' },
      { message: 'How can we assist you?', username: 'admin', time: '2024-10-18T12:35:00Z' },
    ],
  };

  const handleUserSelect = (userId) => {
    // Set the selected user's chat messages
    setSelectedChat({ uid: userId, messages: dummyMessages[userId] });
  };
=======
  const [userType, setUserType] = useState("");
  const [userMessages, setUserMessages] = useState([]); // State to store messages of the selected user
  const [staffId, setStaffId] = useState(null); // State to store staff ID
  const messageEndRef = useRef(null);
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]); // State to store user IDs associated with the staff

  useEffect(() => {
    // Get the user ID from localStorage
    const storedUserId = localStorage.getItem('currentUserId');
    
    // Set the userId state if found
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("User ID not found in localStorage");
    }
  }, []); // Empty dependency array to run once on component mount


  useEffect(() => {
    const fetchUserIds = async () => {
      if (staffId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usar/user/${staffId}`, {
           // headers: {
            //  Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include your auth token if required
            //},
          });
          setUserIds(response.data.userIds); // Assuming the response structure contains userIds
        } catch (error) {
          console.error('Error fetching user IDs:', error);
        }
      }
    };

    fetchUserIds(); // Call the function to fetch user IDs
  }, [staffId]); // Run this effect when staffId changes

>>>>>>> 752afd1398fec11351f87428625c8ab9e2db51dd

  useEffect(() => {
    const fetchData = async () => {
      //if (!selectedUrl) return; // Fetch only if selectedUrl is defined

      try {
        const [chatResponse, generalResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/chat`, {
            params: { url: selectedUrl }, // Send selectedUrl as a parameter
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/general`, {
            params: { url: selectedUrl }, // Send selectedUrl as a parameter
          }),
        ]);

        const chatData = Array.isArray(chatResponse.data) ? chatResponse.data : [];
        const generalChatData = Array.isArray(generalResponse.data) ? generalResponse.data : [];

        // Combine data from both routes and map to include user info
        const allChats = [
          ...chatData.map(item => ({ ...item.lastMessage, type: 'Auth Users' })),
          ...generalChatData.map(item => ({ ...item.lastMessage, type: 'Guest Users' })),
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

    fetchData();
  }, [selectedUrl]); // Re-fetch when selectedUrl changes

  // const handleUserTypeChange = (e) => {
  //   setUserType(e.target.value);
  // };

  // const handleUserSelect = async (userId) => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${userId}`);
  //     setSelectedChat({ uid: userId, messages: response.data });
  //   } catch (error) {
  //     console.error('Error fetching user messages:', error);
  //   }
  // };

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

  console.log("sortedMembers===>", sortedMembers);

  // Filter sortedMembers based on selected userType
  // const filteredMembers = userType
  //   ? sortedMembers.filter((chat) => chat.type === userType)
  //   : sortedMembers;

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 shadow-md rounded-lg overflow-hidden">
        {/* <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 text-center py-2">
            Chat List for {selectedUrl}
          </h2>
<<<<<<< HEAD
          <select
            onChange={handleUserTypeChange}
            value={userType}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">All Users</option>
            <option value="Auth Users">Auth Users</option>
            <option value="Guest Users">Guest Users</option>
          </select>
        </div> */}
=======
          {staffId && <p>Staff ID: {staffId}</p>} {/* Display staff ID */}
        </div>
>>>>>>> 752afd1398fec11351f87428625c8ab9e2db51dd
        <div className="p-4 overflow-y-auto h-full space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer">Hello</div>
          {/* {sortedMembers.map((chat, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => handleUserSelect(chat.uid)}
            >
              <p className="font-semibold text-gray-900">User ID: {chat.uid}</p>
              <p className="text-gray-600 truncate">{chat.message}</p>
            </div>
          ))} */}
           {dummyUsers.map((user, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => handleUserSelect(user.uid)}
            >
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-600 truncate">{user.lastMessage}</p>
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
