
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { MdOutlineAttachFile } from "react-icons/md";
// import moment from 'moment-timezone';

// const ChatMessages = ({ userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [userNameAndNumber, setUserNameAndNumber] = useState("");
//   const [newMessage, setNewMessage] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const messagesEndRef = useRef(null);
//   const staffUserId = localStorage.getItem('currentUserId');
//   const [selectedStaff, setSelectedStaff] = useState(""); // State for selected staff
//   // const [refff, setRefff] = useState(0);

//   const currentUserEmail = localStorage.getItem('currentUserEmail');
//   const [staffList, setStaffList] = useState([]); // State for staff list

//   const [messageDetails, setMessageDetails] = useState({
//     type: "text",
//     url: "",
//     receiver_id: ""
//   });
//   // useEffect(() => {
//   //   if (refff === 0) {
//   //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   //     setRefff(1);
//   //   }
//   // }, [refff]);
//   // let refff = 0;
//   const refff = useRef(0);  // Store refff in useRef to persist its value

//   // if (refff === 0) {
//   //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   //   refff = 1;  // Update variable after action
//   // }
//   useEffect(() => {
//     if (refff.current === 0) {
//       // This runs only once when the component is first mounted
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       refff.current = 1;  // Update to ensure it only runs once
//           // setRefff(1);

//   }
//   }, []);  // Empty dependency array to run only on mount

//   const ref = useRef(null);

//   const handleButtonClick = () => {
//     ref.current.click(); // Trigger the file input's click event
//   };
//   const fetchMessages = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/guest-messages/${userId}`);
//       const allMessages = response.data.allMessages || [];
//       const userNameAndNumber = response.data.userNameAndNumber;

//       // Filter out messages containing '+'
//       const filteredMessages = allMessages.filter(msg => !msg.message.includes('+'));

//       // Sort messages by timestamp in descending order
//       const sortedMessages = filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

//       setMessages(sortedMessages);
//       setUserNameAndNumber(userNameAndNumber);

//       if (sortedMessages.length > 0) {
//         const lastMessage = sortedMessages[sortedMessages.length - 1];
//         setMessageDetails({
//           type: lastMessage.type,
//           url: lastMessage.url,
//           receiver_id: lastMessage.sender_id,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };
//   useEffect(() => {
   

//     fetchMessages();
//   }, [userId]);
//   useEffect(() => {
//     // Fetch messages whenever the messages state changes
//     if (messages.length > 0) {
//       fetchMessages();
//     }
//   }, [messages]);
//   useEffect(() => {
//     const fetchStaffList = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
//         setStaffList(response.data); // Set the staff list state with fetched data
//       } catch (error) {
//         console.error('Error fetching staff list:', error);
//       }
//     };
//     fetchStaffList();
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "" && !uploadedImage) return;

//     const urlValue = getCurrentUrl();
//     const timestamp = moment().tz('Asia/Kathmandu').format();
//     const messageToSend = {
//       sender: currentUserEmail,
//       sender_id: staffUserId,
//       message: newMessage,
//       image: uploadedImage || "",
//       type: "staff",
//       url: window.location.href,
//       uid: userId, // Add uid here or adjust as needed
//       timestamp: timestamp,
//     };

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/send-message`, messageToSend);
//       setMessages(prev => [...prev, messageToSend]);
//       setNewMessage("");
//       setUploadedImage(null);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message. Please try again.'); // Add user feedback
//     }
//   };

//   const getCurrentUrl = () => {
//     const currentUrl = window.location.href;
//     const urlRegex = /https?:\/\/(www\.)?([^\/]+)\.com/;
//     const match = currentUrl.match(urlRegex);
//     let urlValue = ''; // Initialize urlValue

//     if (currentUrl === 'http://localhost:5173/chatgeneral') {
//       urlValue = 'nespsetrends';
//     } else if (match && match[2]) {
//       const domainPart = match[2];
//       if (domainPart === 'nespsetrends') {
//         urlValue = 'nespsetrends';
//       } else {
//         urlValue = domainPart;
//       }
//     }

//     return urlValue; // Return the computed urlValue
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   const handleStaffChange = async (e) => {
//     const selectedStaffValue = e.target.value;
//     const selectedStaffObject = staffList.find(staff => staff.firstName + " " + staff.lastName === selectedStaffValue);

//     if (selectedStaffObject) {
//       setSelectedStaff(selectedStaffObject);
//       try {
//         await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usar/${userId}`, {
//           staffId: selectedStaffObject._id, // Pass the staffId
//           userId: userId
//         });
//         console.log('Staff assignment updated successfully');
//       } catch (error) {
//         console.error('Error updating staff assignment:', error);
//       }
//     } else {
//       console.log("No staff selected");
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-4 bg-gray-200 font-semibold">
//         {userNameAndNumber}
//       </div>
//       <div className="flex items-center p-4">
//         <select
//           value={selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName}` : currentUserEmail}
//           onChange={handleStaffChange}
//           className="p-2 border rounded"
//         >
//           <option value="">{currentUserEmail || "Select staff"}</option>
//           {staffList.map((staff) => (
//             <option key={staff._id} value={staff.firstName + " " + staff.lastName}>
//               {staff.firstName + " " + staff.lastName + " - " + staff.email}
//             </option>
//           ))}
//         </select>
//         <span className="ml-4">
//           {selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName} - ${selectedStaff.email}` : currentUserEmail ? currentUserEmail : "No staff assigned"}
//         </span>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "70vh" }}>
//         {console.log(messages)}
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-4 rounded-lg shadow-sm ${msg.type === "user" ? "bg-gray-200 self-start ml-[50%]" : "bg-blue-200 self-end"}`}>
//             <p className="font-semibold text-gray-900">{msg.type === "user" ? "Client" : "Admin"}</p>
//             <p className="text-gray-600">{msg.message}</p>
//             {msg.image && (
//               <img src={msg.image} alt="Message" className="mt-2 max-w-xs rounded" />
//             )}
//           </div>
//         ))}
// <div ref={refff.current === 0 ? messagesEndRef : null} />
// </div>

//       <div className="flex items-center p-1 justify-between pr-8 mx-3 mr-10 border rounded">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-[600px] focus:outline-none px-3 bg-gray-50"
//           placeholder="Type your message..."
//         />
//         <input
//           type="file"
//           ref={ref}
//           accept="image/*"
//           onChange={(e) => setUploadedImage(URL.createObjectURL(e.target.files[0]))}
//           className="ml-2 hidden"
//         />
//         <div className="flex space-x-3">
//           <button onClick={handleButtonClick}>
//             <MdOutlineAttachFile size={30} />
//           </button>
//           <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-full">
//             Send
//           </button>
//         </div>
//       </div>

//       {uploadedImage && (
//         <div className="mt-2">
//           <p className="text-gray-600">Image ready to send:</p>
//           <img src={uploadedImage} alt="Preview" className="mt-2 max-w-xs rounded" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMessages;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineAttachFile, MdFileDownload } from "react-icons/md";
import moment from 'moment-timezone';

const ChatMessages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [userNameAndNumber, setUserNameAndNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImagebinary, setUploadedImagebinary] = useState("");
  const [uploadedImagebinaryFile, setUploadedImagebinaryFile] = useState("");
  const messagesEndRef = useRef(null);
  const staffUserId = localStorage.getItem('currentUserId');
  const [selectedStaff, setSelectedStaff] = useState("");
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const [staffList, setStaffList] = useState([]);
  const [staffUpdated, setStaffUpdated] = useState(false);
  const refff = useRef(0); // Store refff in useRef to persist its value across renders
  const [file, setFile] = useState(null);
  const delayInProgress = useRef(false);  // Track if the delay is in progress

  const refreshComponent = () => { window.location.reload(); };

  const [messageDetails, setMessageDetails] = useState({
    type: "text",
    url: "",
    receiver_id: ""
  });

  const ref = useRef(null);
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Set the uploaded file in state

    // For previewing the file (if it's an image)
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(uploadedFile);
      setUploadedImage(imageURL);
    }
  };
  // Fetch messages for the current user only when userId changes
  const fetchMessages = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/guest-messages/${userId}`);
      const allMessages = response.data.allMessages || [];
      const userNameAndNumber = response.data.userNameAndNumber;

      const filteredMessages = allMessages.filter(msg => !msg.message.includes('+'));
      const sortedMessages = filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setMessages(sortedMessages);
      setUserNameAndNumber(userNameAndNumber);

      if (sortedMessages.length > 0) {
        const lastMessage = sortedMessages[sortedMessages.length - 1];
        setMessageDetails({
          type: lastMessage.type,
          url: lastMessage.url,
          receiver_id: lastMessage.sender_id,
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  useEffect(() => {
    const fetchMessagesWithDelay = async () => {
      if (delayInProgress.current) {
        // If delay is in progress, ignore this call
        return;
      }
  
      // Start the delay
      delayInProgress.current = true;
  
      // Wait for 1 second before running the fetch function
      setTimeout(async () => {
        // Fetch messages after 1 second delay
        await fetchMessages();
  
        // After fetching, reset the delay flag
        delayInProgress.current = false;
      }, 1000);  // 1 second delay
    };
  
    // Run the delayed fetch only if there are messages
    if (messages.length > 0) {
      fetchMessagesWithDelay();
    }
  }, [messages]);
  useEffect(() => {
    fetchMessages();
    if (refff.current === 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      refff.current = 1;
    }
  }, [userId]);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };
    fetchStaffList();
  }, []);

  // Scroll to bottom only on initial mount or when userId changes
  useEffect(() => {
    if (refff.current === 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      refff.current = 1;
    }
  }, [userId]);

  // Scroll to bottom only when the current user sends a new message
  // useEffect(() => {
  //   if (messages.length > 0 && messages[messages.length - 1].sender_id === staffUserId) {
  //     // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  const handleButtonClick = () => {
    ref.current.click();
  };

  // const handleSendMessage = async () => {
  //   if (newMessage.trim() === "" && !uploadedImage) return;

  //   const urlValue = getCurrentUrl();
  //   const timestamp = moment().tz('Asia/Kathmandu').format();
  //   const messageToSend = {
  //     sender: currentUserEmail,
  //     sender_id: staffUserId,
  //     message: newMessage,
  //     image: uploadedImage || "",
  //     type: "staff",
  //     url: window.location.href,
  //     uid: userId,
  //     timestamp: timestamp,
  //   };

  //   try {
  //     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/send-message`, messageToSend);
  //     setMessages(prev => [...prev, messageToSend]);
  //     setNewMessage("");
  //     setUploadedImage(null);
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     alert('Failed to send message. Please try again.');
  //   }
  // };
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !uploadedImage) return;
    const urlValue = getCurrentUrl();
    const timestamp = moment().tz('Asia/Kathmandu').format();
    let imageUrl = "";
  
    // If there's an uploaded image, send it to the backend
    if (file) {
      // const formData = new FormData();
      // formData.append("image", uploadedImagebinaryFile); // append the image to FormData
      // console.log(formData)
      try {
        // {console.log("file")}
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
          "file":file
        }, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = response.data.imageUrl; // Get the image URL from the backend response
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  
    const messageToSend = {
      sender: currentUserEmail,
      sender_id: staffUserId,
      message: newMessage,
      image: imageUrl, // Use the image URL here
      type: "staff",
      url: window.location.href,
      uid: userId,
      timestamp: timestamp,
    };
  
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/send-message`, messageToSend);
      setMessages(prev => [...prev, messageToSend]);
      setNewMessage("");
      setUploadedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };
  
  
  const getCurrentUrl = () => {
    const currentUrl = window.location.href;
    const urlRegex = /https?:\/\/(www\.)?([^\/]+)\.com/;
    const match = currentUrl.match(urlRegex);
    let urlValue = '';

    if (currentUrl === 'http://localhost:5173/chatgeneral') {
      urlValue = 'nespsetrends';
    } else if (match && match[2]) {
      const domainPart = match[2];
      if (domainPart === 'nespsetrends') {
        urlValue = 'nespsetrends';
      } else {
        urlValue = domainPart;
      }
    }
    return urlValue;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleStaffChange = async (e) => {
    const selectedStaffValue = e.target.value;
    const selectedStaffObject = staffList.find(staff => staff.firstName + " " + staff.lastName === selectedStaffValue);

    if (selectedStaffObject) {
      setSelectedStaff(selectedStaffObject);
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usar/${userId}`, {
          staffId: selectedStaffObject._id,
          userId: userId
        });
        refreshComponent();

        // console.log('Staff assignment updated successfully');
        setStaffUpdated(prev => !prev);
      } catch (error) {
        console.error('Error updating staff assignment:', error);
      }
    } else {
      console.log("No staff selected");
    }

  };



  useEffect(() => {
    if (staffUpdated) {
      // console.log("Component re-rendered due to staff update.");
    }
  }, [staffUpdated]); 

  return (
    <>
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-200 font-semibold">
        {userNameAndNumber}
      </div>
      <div className="flex items-center p-4">
        <select
          value={selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName}` : currentUserEmail}
          onChange={handleStaffChange}
          className="p-2 border rounded"
        >
          <option value="">{ "Assign staff"}</option>
          {staffList.map((staff) => (
            <option key={staff._id} value={staff.firstName + " " + staff.lastName}>
              {staff.firstName + " " + staff.lastName + " - " + staff.email}
            </option>
          ))}
        </select>
        <div className="ml-4 flex-col">
          <p className="px-1 text-sm">your email :</p>
          {/* {selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName} - ${selectedStaff.email}` : currentUserEmail ? currentUserEmail : "No staff assigned"} */}
          { currentUserEmail}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "70vh" }}>
        {messages.length > 0 ? (
          <div>
            {messages.map((msg, index) => <>
              <div key={index} className={`p-4 rounded-lg shadow-sm ${msg.type === "user" ? "bg-gray-200 self-start mt-2 ml-[50%]" : "bg-blue-200 mt-2 w-[55%] self-end"}`}>
                <p className="font-semibold text-gray-900">{msg.type === "user" ? "Client" : "Admin"}</p>
                <p className="text-gray-600">{msg.message}</p>
                {/* {console.log(msg)} */}
                {/* {msg.image && ( <> {msg.image.endsWith('.jpg') || msg.image.endsWith('.png') ? ( <img src={msg.image} alt="Message" className="mt-2 max-w-xs rounded" style={{ width: '200px' }} />  ) : ( <a href={msg.image} download> {msg.image} </a> )} </> )} */}
                {/* {msg.image && ( <> {msg.image.endsWith('.jpg') || msg.image.endsWith('.png') ? ( <img src={`${import.meta.env.VITE_BACKEND_URL}${msg.image}`} alt="Message" className="mt-2 max-w-xs rounded" style={{ width: '200px' }} /> ) : ( <a href={`${import.meta.env.VITE_BACKEND_URL}${msg.image}`} download> {msg.image} </a> )} </> )} */}
                {msg.image && (
  <>
    {msg.image.endsWith('.jpg') || msg.image.endsWith('.jpeg') || msg.image.endsWith('.png') ? (
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${msg.image}`}
        alt="Message"
        className="mt-2 max-w-xs rounded"
        style={{ width: '200px' }}
      />
    ) : (
      <a href={`${import.meta.env.VITE_BACKEND_URL}${msg.image}`} download className="flex items-center space-x-2">
        <MdFileDownload size={24} />
        <span>{`.${msg.image.split('.').pop()}`}</span>
      </a>
    )}
  </>
)}

              </div>
              <div ref={messagesEndRef} />
            </>)}
          </div>
        
        ) : (
          <div>loading...</div>
        )}
      </div>

      <div className="flex items-center p-1 justify-between pr-8 mx-3 mr-10 border rounded">
        <input
          type="text"
          required
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-[600px] focus:outline-none px-3 bg-gray-50"
          placeholder="Type your message..."
        />
        <input
          type="file"
          ref={ref}
          accept="*/*"  // Accept all file types
  //         onChange={(e) =>    {setUploadedImage(URL.createObjectURL(e.target.files[0]))
  //           setUploadedImagebinaryFile(e.target.files[0])
  //           const file = e.target.files[0];
  //           setFile(file)
  //           const reader = new FileReader();
            
  //           reader.onload = () => {
  //             // `reader.result` contains the raw binary data as an ArrayBuffer
  //             const arrayBuffer = reader.result;
  //             console.log(arrayBuffer);  // This is the raw binary data of the image
  //             setUploadedImagebinary(arrayBuffer);  // Optionally store this data in state
  //           };
  //       // Read the file as an ArrayBuffer (raw binary form)
  //   reader.readAsArrayBuffer(file);
  // }}          onChange={handleFileUpload}
  onChange={handleFileUpload}

  className="ml-2 hidden"
/>
        <div className="flex space-x-3">
          <button onClick={handleButtonClick}>
            <MdOutlineAttachFile size={30} />
          </button>
          <button onClick={handleSendMessage} disabled={!newMessage.trim()} className="ml-2 bg-blue-500 text-white p-2 rounded-full">
            Send
          </button>
        </div>
      </div>

      {uploadedImage && (
        <div className="mt-2">
          <p className="text-gray-600">Image ready to send:</p>
          <img src={uploadedImage} alt="Preview" className="mt-2 max-w-xs rounded" />
        </div>
      )}
    </div>
    </>
  );
};

export default ChatMessages