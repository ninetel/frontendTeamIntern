import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import io from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import { RiFolderUploadLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../store/store';
import { FcBusinessman } from 'react-icons/fc';
import axios from 'axios';
import { useSelector } from 'react-redux';

const socket = io('http://81.181.198.75:5002'); // Replace with your Flask server URL

const CreateChatAI = () => {
  const accessToken = useAppSelector((state) => state.authentication.accessToken);
  const userInfo = useSelector((state) => state.currentLoggedInUser?.userInfo || {});
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [typing, setTyping] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [typingEnded, setTypingEnded] = useState(false);
  const [urlValue, setUrlValue] = useState(''); // State to hold the URL value

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/get_chat_history`, {
          params: {
            sender_id: userInfo.id,
            receiver_id: '66c5977ee15fe197f4ba0ff7'
          }
        });
        if (response.data.status === 'success') {
          setMessages(response.data.data);
        } else {
          console.error('Failed to fetch chat history:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();

    socket.on('new_message', (data) => {
      setTyping(false);
      setTypingEnded(true);
      setUpdateTrigger((prev) => !prev);

      setTimeout(() => {
        if (typingEnded) {
          setMessages((prevMessages) => [...prevMessages, { ...data, type: 'received' }]);
          setTypingEnded(false);
        }
      }, 1000);
    });

    socket.on('user_typing', () => {
      setTyping(true);
      setTypingEnded(false);
    });

    return () => {
      socket.off('new_message');
      socket.off('user_typing');
    };
  }, [userInfo, updateTrigger, typingEnded]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Function to get the URL and set it in state
    const getCurrentUrl = () => {
      const currentUrl = window.location.href; // Get the current page URL
      const urlRegex = /https?:\/\/(www\.)?([^\/]+)\.com/; // Regex to match URLs
      const match = currentUrl.match(urlRegex);
      if (currentUrl=='http://localhost:5173/chatai'){
        setUrlValue('nespsetrends');
      }
      if (match && match[2]) {
        const domainPart = match[2];
        if (domainPart === 'nespsetrends') { // Replace with your condition
          setUrlValue('nespsetrends'); // Set the value you want
        } else {
          setUrlValue(domainPart); // Store the extracted domain part
        }
      }
    };

    getCurrentUrl(); // Call the function to get the URL on component mount
  }, []); // Empty dependency array to run only on mount


  const onFinish = async (values) => {
    if (values.message && values.message.trim()) {
      const newMessage = {
        text: values.message.trim(),
        type: 'sent',
        sender_id: userInfo.id,
        isImage: !!imagePreview,
        image: imagePreview,
        url:urlValue

      };
      setMessages([...messages, newMessage]);
      form.resetFields();
      setImagePreview(null);

      const payload = imagePreview
        ? {
            sender_id: userInfo?.id,
            receiver_id: '66c5977ee15fe197f4ba0ff7',
            img_message: values.message.trim(),
            image: imagePreview,
            message: '',
            image_sent: 1,
            url:urlValue

          }
        : {
            sender_id: userInfo?.id,
            receiver_id: '66c5977ee15fe197f4ba0ff7',
            message: values.message.trim(),
            img_message: '',
            image: '',
            image_sent: 0,
            url:urlValue

          };

      try {
        socket.emit('send_message', payload);
        socket.emit('user_typing');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.submit();
    }
  };

  return (
    <div className="flex flex-col h-full p-3 bg-gradient-to-br from-green-50 to-white shadow-lg rounded-lg ">
      <h1 className="text-center font-extrabold text-xl mb-4 text-green-700">Chat</h1>

      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded-lg p-3">
        {messages.map((message, index) => (
          (typingEnded && index === messages.length - 1 && message.sender_id === 'admin_id') ? null : (
            <div
              key={index}
              className={`flex mb-3 ${message.sender_id === userInfo.id ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender_id !== userInfo.id && (
                <FcBusinessman size={24} className="mr-2" />
              )}
              <div className={`relative px-3 py-2 rounded-xl max-w-[70%] break-words shadow ${message.sender_id === userInfo.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded"
                    className="max-w-full max-h-[100px] rounded-lg mb-1"
                  />
                )}
                <span>{message.message || message.text}</span>
              </div>
            </div>
          )
        ))}
        {typing && (
          <div className="flex mb-3 justify-start">
            <div className="relative px-3 py-2 rounded-xl max-w-[70%] break-words shadow bg-gray-200 text-black">
              <span>Typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        className="flex items-center p-3 bg-white border-t border-gray-200"
      >
        <Upload beforeUpload={handleUpload} showUploadList={false}>
          <Button
            className="mr-3 border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
            icon={<RiFolderUploadLine className="w-5 h-5 text-gray-800 hover:text-green-500 transition-colors" />}
          />
        </Upload>

        <Form.Item name="message" className="flex-1">
          <Input.TextArea rows={1} placeholder="Type a message" autoSize onKeyDown={handleKeyPress} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center gap-2 border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            <LuSendHorizonal className="w-5 h-5 text-gray-800 hover:text-green-500 transition-colors" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateChatAI;
