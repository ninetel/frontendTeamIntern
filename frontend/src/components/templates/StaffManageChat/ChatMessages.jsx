import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineAttachFile } from "react-icons/md";

const ChatMessages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [userNameAndNumber, setUserNameAndNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const staffUserId = localStorage.getItem('currentUserId');
  const [selectedStaff, setSelectedStaff] = useState(""); // State for selected staff

  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const [staffList, setStaffList] = useState([]); // State for staff list
  // const [urlValue, setUrlValue] = useState(''); // State to hold the URL value

  const [messageDetails, setMessageDetails] = useState({
    type: "text",
    url: "",
    receiver_id: ""
  });

  const ref = useRef(null)

  const handleButtonClick = () => {
    ref.current.click(); // Trigger the file input's click event
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/guest-messages/${userId}`);
        const allMessages = response.data.allMessages || [];
        const userNameAndNumber = response.data.userNameAndNumber;
        console.log("allMessages===>" + response) 

        setMessages(allMessages);
        setUserNameAndNumber(userNameAndNumber);

        if (allMessages.length > 0) {
          const lastMessage = allMessages[allMessages.length - 1];
          { console.log("LASTMESSAGE===>" + lastMessage) }
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

    fetchMessages();
  }, [userId]);
  useEffect(() => {
  const fetchStaffList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
      setStaffList(response.data); // Set the staff list state with fetched data
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }};
    fetchStaffList();
  }, []);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !uploadedImage) return;
   
    const urlValue=getCurrentUrl()
 console.log("urlValue")
    console.log(urlValue)
    console.log("urlValue")
    const messageToSend = {
      sender: currentUserEmail,
      sender_id: staffUserId,
      message: newMessage,
      image: uploadedImage || "",
      type: messageDetails.type,
      url: window.location.href,
      uid: userId, // Add uid here or adjust as needed

      receiver_id: messageDetails.receiver_id,
      timestamp: Date.now(),
    };
    { console.log(messageToSend) }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/send-message`, messageToSend);
      setMessages(prev => [...prev, messageToSend]);
      setNewMessage("");
      setUploadedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.'); // Add user feedback
    }
  };
  const getCurrentUrl = () => {
    const currentUrl = window.location.href; 
    const urlRegex = /https?:\/\/(www\.)?([^\/]+)\.com/; 
    const match = currentUrl.match(urlRegex);
    let urlValue = ''; // Initialize urlValue
  
    console.log("localhostts currentUrl== "+currentUrl);
    console.log("localhostts match== "+match);
  
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
  
    return urlValue; // Return the computed urlValue
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
          staffId: selectedStaffObject._id, // Pass the staffId
          userId: userId
        });
        console.log('Staff assignment updated successfully');
      } catch (error) {
        console.error('Error updating staff assignment:', error);
      }
    } else {
      console.log("No staff selected");
    }
  };
  return (
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
          <option value="">{currentUserEmail || "Select staff"}</option>
          {staffList.map((staff) => (
            <option key={staff._id} value={staff.firstName + " " + staff.lastName}>
              {staff.firstName + " " + staff.lastName + " - " + staff.email}
            </option>
          ))}
        </select>
        <span className="ml-4">
          {selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName} - ${selectedStaff.email}` : currentUserEmail?currentUserEmail:"No staff assigned"}
        </span>
      </div>
      {/* <div className="flex items-center p-4">
        <select
          value={selectedStaff}
          onChange={handleStaffChange}
          className="p-2 border rounded"
        >
          <option value="">Select staff</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.name}>
              {staff.name}
            </option>
          ))}
        </select>
        <span className="ml-4">
          {selectedStaff ? selectedStaff : "Not redirected"}
        </span>
      </div> */}
      {console.log(messages)}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "70vh" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${msg.type === "user" ?"bg-gray-200 self-start ml-[50%]": "bg-blue-200 self-end" }`}>
            <p className="font-semibold text-gray-900">{msg.type === "user" ?  "Client":"Admin" }</p>
            <p className="text-gray-600">{msg.message}</p>
            {msg.image && (
              <img src={msg.image} alt="Message" className="mt-2 max-w-xs rounded" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-1 justify-between pr-8 mx-3 mr-10 border rounded">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-[600px] focus:outline-none px-3 bg-gray-50"
          placeholder="Type your message..."
        />
        <input
          type="file"
          ref={ref}
          accept="image/*"
          onChange={(e) => setUploadedImage(URL.createObjectURL(e.target.files[0]))}
          className="ml-2 hidden"
        />
        <div className="flex space-x-3">
          <button onClick={handleButtonClick}>
            <MdOutlineAttachFile size={30} />
          </button>
          <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-full">
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
  );
};

export default ChatMessages;
