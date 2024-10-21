import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ChatMessages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [userNameAndNumber, setUserNameAndNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const [messageDetails, setMessageDetails] = useState({
    type: "text",
    url: "",
    receiver_id: ""
  });
  const [staffList, setStaffList] = useState([]); // State for staff list
  const [selectedStaff, setSelectedStaff] = useState(""); // State for selected staff
  const [assignedStaff, setAssignedStaff] = useState(null); // State for assigned staff

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return;
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${userId}`);
        const allMessages = response.data.allMessages || [];
        const userNameAndNumber = response.data.userNameAndNumber;
  
        setMessages(allMessages);
        setUserNameAndNumber(userNameAndNumber);
  
        if (allMessages.length > 0) {
          const lastMessage = allMessages[allMessages.length - 1];
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
  
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
        setStaffList(response.data); // Set the staff list state with fetched data
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };
    
    const fetchAssignedStaff = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/by-user/${userId}`);
    
        // Log the full response object
        //console.log('Full response:', response);
    
        // Check if the data structure matches what we expect
        if (response.data && typeof response.data === 'object') {
          //console.log('Response Data:', response.data.staff);
    
          if (response.data.staff) {
            const staffId = response.data.staff; // Extract the staff ID from the response
            //console.log('Assigned Staff ID:', staffId); // Log the staff ID
    
            const assignedStaffObject = staffList.find(staff => staff._id === staffId);
            setAssignedStaff(assignedStaffObject);
            setSelectedStaff(assignedStaffObject);
          } else {
            console.log('No staff ID found in response data');
          }
        } else {
          console.log('Response data is not in the expected format:', response.data.staff);
        }
      } catch (error) {
        console.error('Error fetching assigned staff:', error);
      }
    };
    
  
    fetchMessages();
    fetchStaffList();
    fetchAssignedStaff();
  }, [userId, staffList]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !uploadedImage) return;

    const messageToSend = {
      sender: "admin2",
      sender_id: "66c5977ee15fe197f4ba0ff7",
      message: newMessage,
      image: uploadedImage || "",
      type: messageDetails.type,
      url: messageDetails.url,
      uid: userId, // Add uid here or adjust as needed
      receiver_id: messageDetails.receiver_id,
      timestamp: Date.now(),
    };

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
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/assign-user-to-staff`, {
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
//{console.log(selectedStaff)}
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-200 font-semibold">
        {userNameAndNumber}
      </div>
      <div className="flex items-center p-4">
        <select
          value={selectedStaff ? selectedStaff.firstName + " " + selectedStaff.lastName : ""}
          onChange={handleStaffChange}
          className="p-2 border rounded"
        >
          <option value="">Select staff</option>
          {staffList.map((staff) => (
            <option key={staff._id} value={staff.firstName + " " + staff.lastName}>
              {staff.firstName + " " + staff.lastName + " - " + staff.email}
            </option>
          ))}
        </select>
        <span className="ml-4">
          {selectedStaff ? `${selectedStaff.firstName} ${selectedStaff.lastName} - ${selectedStaff.email}` : "No staff assigned"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "70vh" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${msg.sender === "admin" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}>
            <p className="font-semibold text-gray-900">{msg.sender === "admin" ? "Admin" : "Client"}</p>
            <p className="text-gray-600">{msg.message}</p>
            {msg.image && (
              <img src={msg.image} alt="Message" className="mt-2 max-w-xs rounded" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUploadedImage(URL.createObjectURL(e.target.files[0]))}
          className="ml-2"
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Send
        </button>
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
