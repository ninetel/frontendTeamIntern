// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ChatMessages from "./ChatMessages";

// const ManageChat = ({ selectedUrl }) => {
//   const [sortedMembers, setSortedMembers] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [userType, setUserType] = useState("");
//   const [userMessages, setUserMessages] = useState([]); // State to store messages of the selected user
//   const [staffId, setStaffId] = useState(null); // State to store staff ID
//   const messageEndRef = useRef(null);
//   const [userId, setUserId] = useState('');
//   const [userIds, setUserIds] = useState([]); // State to store user IDs associated with the staff
//   const staffUserId = localStorage.getItem('currentUserId');
//   const [guestChat, setGuestChat] = useState([]);

//   // useEffect(() => {
//     // Get the user ID from localStorage
//     // const fetchStaffIds = async () => {

//     // try {
//     //   const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/id`

//     //     // , {headers: {
//     //     //  Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include your auth token if required
//     //     // },}
//     // );
//     // console.log(response)

//     //   // setUserIds(response.data.userIds); // Assuming the response structure contains userIds
//     //       console.log("response.data.userIds")
//     //       // console.log(response.data.userIds)
//     //   console.log("response.data.userIds")
//     // } catch (error) {
//     //   console.error('Error fetching user IDs:', error);
//     // }}
//     // fetchStaffIds();
//     // Set the userId state if found
   
//   // }, []); // Empty dependency array to run once on component mount

//   const fetchLastMessages = async (uidsArray) => { 
    
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/general/selecteduid`, 
//         { uids: uidsArray }, // Sending `uids` array in the request body
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Replace with actual token if needed
//             'Content-Type': 'application/json',
//           }
//         }
//       );
//       console.log('Last messages:', response.data);
//       setGuestChat(response.data)
//     } catch (error) {
//       console.error('Error fetching last messages:', error);
//     }
//   };
//   useEffect(() => {
    
    
//     const fetchUserIds = async () => {
//       if (staffUserId) {
//         try {
//           const cleanStaffId = staffUserId.replace(/['"]/g, '');

          
//           const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usar/user/${cleanStaffId}`, {
//             // headers: {
//             //  Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include your auth token if required
//             //},
//           });
//           setUserIds(response.data.userIds); // Assuming the response structure contains userIds
//           console.log("response.data.userIds")
//           console.log(response.data.userIds)
//           console.log("response.data.userIds")
//           fetchLastMessages(response.data.userIds)
//         } catch (error) {
//           console.error('Error fetching user IDs:', error);
//         }
//       }
//     };

//     fetchUserIds(); // Call the function to fetch user IDs
//   }, [staffUserId]); // Run this effect when staffId changes

//   useEffect(() => {
//     // Filter out messages without content and sort by timestamp
//     const filteredSortedMembers = guestChat
//       .filter(chat => chat.message !== 'No message found' && chat.message) // Filter out empty messages
//       .map(chat => ({
//         ...chat,
//         timestamp: new Date(chat.timestamp) // Convert timestamp to Date object
//       }))
//       .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first

//     setSortedMembers(filteredSortedMembers);
//   }, [guestChat]); // Run this effect whenever guestChat changes

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     //if (!selectedUrl) return; // Fetch only if selectedUrl is defined

//   //     try {
//   //       const [chatResponse, generalResponse] = await Promise.all([
//   //         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/chat`, {
//   //           params: { url: selectedUrl }, // Send selectedUrl as a parameter
//   //         }),
//   //         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/general`, {
//   //           params: { url: selectedUrl }, // Send selectedUrl as a parameter
//   //         }),
//   //       ]);

//   //       const chatData = Array.isArray(chatResponse.data) ? chatResponse.data : [];
//   //       const generalChatData = Array.isArray(generalResponse.data) ? generalResponse.data : [];

//   //       // Combine data from both routes and map to include user info
//   //       const allChats = [
//   //         ...chatData.map(item => ({ ...item.lastMessage, type: 'Auth Users' })),
//   //         ...generalChatData.map(item => ({ ...item.lastMessage, type: 'Guest Users' })),
//   //       ];

//   //       // Group by user ID and get the latest message for each unique user
//   //       const groupedChats = allChats.reduce((acc, chat) => {
//   //         const userId = chat.uid;
//   //         if (!acc[userId] || new Date(chat.time) > new Date(acc[userId].time)) {
//   //           acc[userId] = chat; // Keep the latest message for each user
//   //         }
//   //         return acc;
//   //       }, {});

//   //       // Convert grouped object back to an array and sort by time
//   //       const latestChats = Object.values(groupedChats).sort((a, b) => new Date(b.time) - new Date(a.time));

//   //       setSortedMembers(latestChats);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [selectedUrl]); // Re-fetch when selectedUrl changes

//   // const handleUserTypeChange = (e) => {
//   //   setUserType(e.target.value);
//   // };

//   // const handleUserSelect = async (userId) => {
//   //   try {
//   //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${userId}`);
//   //     setSelectedChat({ uid: userId, messages: response.data });
//   //   } catch (error) {
//   //     console.error('Error fetching user messages:', error);
//   //   }
//   // };

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" && !uploadedImage) return;

//     const messagesToSend = [];

//     if (newMessage.trim()) {
//       const userMessage = {
//         username: "admin", // Set the sender to admin
//         message: newMessage,
//         time: Date.now(),
//         url: selectedUrl,
//       };
//       messagesToSend.push(userMessage);
//       setNewMessage("");
//     }

//     if (uploadedImage) {
//       const imageMessage = {
//         username: "admin", // Set the sender to admin
//         message: uploadedImage, // Store the image URL
//         time: Date.now(),
//         url: selectedUrl,
//       };
//       messagesToSend.push(imageMessage);
//       setUploadedImage(null);
//     }

//     setSelectedChat((prevChat) => (prevChat ? {
//       ...prevChat,
//       messages: [...prevChat.messages, ...messagesToSend],
//     } : { messages: messagesToSend }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   console.log("sortedMembers===>", sortedMembers);

//   // Filter sortedMembers based on selected userType
//   // const filteredMembers = userType
//   //   ? sortedMembers.filter((chat) => chat.type === userType)
//   //   : sortedMembers;

//   return <>
//     <div className="flex h-screen w-full">
//       {/* <div className="w-1/3 shadow-md rounded-lg overflow-hidden"> */}
//       {/* <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800 text-center py-2">
//             Chat List for {selectedUrl}
//           </h2>
//           {staffId && <p>Staff ID: {staffId}</p>} {/* Display staff ID */}
//       {/* </div> */}
//       <div className="p-4 w-1/3 overflow-y-auto h-full space-y-4">
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"></div>
//         {/* {sortedMembers.map((chat, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
//             onClick={() => handleUserSelect(chat.uid)}
//           >
//             <p className="font-semibold text-gray-900">User ID: {chat.uid}</p>
//             <p className="text-gray-600 truncate">{chat.message}</p>
//           </div>
//         ))} */}
//         {/* {dummyUsers.map((user, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
//             onClick={() => handleUserSelect(user.uid)}
//           >
//             <p className="font-semibold text-gray-900">{user.name}</p>
//             <p className="text-gray-600 truncate">{user.lastMessage}</p>
//           </div>
//         ))} */}

// {sortedMembers.map((chat, index) => (
//           <div
//             key={index}
//             className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
//             onClick={() => handleUserSelect(chat.uid)}
//           >
//             <p className="font-semibold text-gray-900">User ID: {chat.uid}</p>
//             <p className="text-gray-600 truncate">{chat.message}</p>
//           </div>
//         ))}
//       </div>

//       <div className="w-2/3 bg-gray-50 p-4 flex flex-col">
//         {selectedChat ? (
//           <ChatMessages userId={selectedChat.uid} />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500">Select a chat to view messages</p>
//           </div>
//         )}
//       </div>
//     </div>
//   </>;
// };

// export default ManageChat;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessages from "./ChatMessages";
import moment from 'moment-timezone';

const ManageChat = ({ selectedUrl }) => {
  const [sortedMembers, setSortedMembers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userType, setUserType] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [staffId, setStaffId] = useState(null);
  const messageEndRef = useRef(null);
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const staffUserId = localStorage.getItem('currentUserId');
  const [guestChat, setGuestChat] = useState([]);

  const fetchLastMessages = async (uidsArray) => { 
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/last-messages/general/selecteduid`, 
        { uids: uidsArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Last messages:', response.data);
    //   setGuestChat(response.data);
    //   const filteredSortedMembers = guestChat
    //   .filter(chat => chat.message !== 'No message found' && chat.message) // Filter out empty messages
    //   .map(chat => ({
    //     ...chat,
    //     timestamp: new Date(chat.timestamp) // Convert timestamp to Date object
    //   }))
    //   .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first
    //   console.log('Sort messages:', filteredSortedMembers);
    //   // console.log('Sort messages:', response.data);
    //   // console.log('Sort messages:', response.data);

    // setSortedMembers(filteredSortedMembers);
  // Access lastMessages from the response data
  const lastMessages = response.data.lastMessages || []; // Ensure this is an array
        
  // Filter, convert timestamps, and sort the messages
  // const filteredSortedMembers = lastMessages
  //     .filter(chat => chat.message !== 'No message found' && chat.message) // Filter out empty messages
  //     .map(chat => ({
  //         ...chat,
  //         timestamp: new Date(chat.timestamp) // Convert timestamp to Date object
  //     }))
  //     .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first
  
  // console.log('Sorted messages:', filteredSortedMembers);
  const filteredSortedMembers = lastMessages
  .filter(chat => chat.message !== 'No message found' && chat.message) // Filter out empty messages
  .map(chat => {
    // Extract the timestamp part without the timezone
    const timestampWithoutTimezone = chat.timestamp.split('+')[0].split('.')[0];
    console.log("timestampWithoutTimezone")
    console.log(timestampWithoutTimezone)
    console.log("timestampWithoutTimezone")
    return {
      ...chat,
      timestamp: new Date(timestampWithoutTimezone) // Convert to Date object without timezone
    };
  })
  .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first

console.log(filteredSortedMembers);


  setGuestChat(lastMessages); // Keep the original messages if needed
  setSortedMembers(filteredSortedMembers); // Set the sorted messages
    } catch (error) {
      console.error('Error fetching last messages:', error);
    }
  };

  useEffect(() => {
    const fetchUserIds = async () => {
      if (staffUserId) {
        try {
          const cleanStaffId = staffUserId.replace(/['"]/g, '');
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usar/user/${cleanStaffId}`);
          setUserIds(response.data.userIds);
          fetchLastMessages(response.data.userIds);
        } catch (error) {
          console.error('Error fetching user IDs:', error);
        }
      }
    };

    fetchUserIds();
  }, [staffUserId]);

  // useEffect(() => {
  //   // Filter out messages without content and sort by timestamp
  //   // const 
  //   console.log("guestChat")
  //   console.log(guestChat)
  //   console.log("guestChat")
  //   const filteredSortedMembers = guestChat
  //     .filter(chat => chat.message !== 'No message found' && chat.message) // Filter out empty messages
  //     .map(chat => ({
  //       ...chat,
  //       timestamp: new Date(chat.timestamp) // Convert timestamp to Date object
  //     }))
  //     .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first

  //   setSortedMembers(filteredSortedMembers);
  // }, [guestChat]); // Run this effect whenever guestChat changes

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
        time: moment().tz('Asia/Kathmandu').format(),
        url: selectedUrl,
      };
      messagesToSend.push(userMessage);
      setNewMessage("");
    }

    if (uploadedImage) {
      const imageMessage = {
        username: "admin", // Set the sender to admin
        message: uploadedImage,
        time: moment().tz('Asia/Kathmandu').format(),
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

  return (
    <div className="flex h-screen w-full">
      <div className="p-4 w-1/3 overflow-y-auto h-full space-y-4">
      GUEST CHAT
        {sortedMembers.map((chat, index) => (
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
