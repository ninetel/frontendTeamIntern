import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineAttachFile } from "react-icons/md";

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

  const ref = useRef(null)

  const handleButtonClick = () => {
    ref.current.click(); // Trigger the file input's click event
  };

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-200 font-semibold">
        {userNameAndNumber}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "70vh" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${msg.sender === "admin" ? "bg-blue-200 self-end" : "bg-gray-200 self-start ml-[50%]"}`}>
            <p className="font-semibold text-gray-900">{msg.sender === "admin" ? "Admin" : "Client"}</p>
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
