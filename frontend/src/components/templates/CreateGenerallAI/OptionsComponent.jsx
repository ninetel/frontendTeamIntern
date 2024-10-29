{% comment %} // src/components/OptionsComponent.jsx
import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { RiChat1Line, RiImageLine, RiFileTextLine, RiFolderUploadLine } from 'react-icons/ri';

const { TabPane } = Tabs;

const textLists = {
  'Chat': ['Chat message 1', 'Chat message 2', 'Chat message 3'],
  'Images': ['Image 1 description', 'Image 2 description', 'Image 3 description'],
  'Documents': ['Document 1 description', 'Document 2 description', 'Document 3 description'],
  'Upload': ['Upload 1 description', 'Upload 2 description', 'Upload 3 description'],
  'Files': ['Files 1 description', 'Files 2 description', 'Files 3 description']
};

const tabContent = {
  '1': {
    icon: <RiChat1Line />,
    title: 'Chat',
    icons: [
      { icon: <RiChat1Line size={32} />, text: 'Chat' },
      { icon: <RiImageLine size={32} />, text: 'Images' },
      { icon: <RiFileTextLine size={32} />, text: 'Files' },
      { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
    ]
  },
  '2': {
    icon: <RiImageLine />,
    title: 'Images',
    icons: [
      { icon: <RiImageLine size={32} />, text: 'Images' },
      { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
      { icon: <RiFileTextLine size={32} />, text: 'Documents' },
      { icon: <RiChat1Line size={32} />, text: 'Chat' },
    ]
  },
  '3': {
    icon: <RiFileTextLine />,
    title: 'Documents',
    icons: [
      { icon: <RiFileTextLine size={32} />, text: 'Documents' },
      { icon: <RiImageLine size={32} />, text: 'Images' },
      { icon: <RiChat1Line size={32} />, text: 'Chat' },
      { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
    ]
  },
  '4': {
    icon: <RiFileTextLine />,
    title: 'Files',
    icons: [
      { icon: <RiFileTextLine size={32} />, text: 'Documents' },
      { icon: <RiImageLine size={32} />, text: 'Images' },
      { icon: <RiChat1Line size={32} />, text: 'Chat' },
      { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
    ]
  }
};

const OptionsComponent = ({ handleIconClick }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [openedIcon, setOpenedIcon] = useState(null);
  const [textSnippets, setTextSnippets] = useState([]);
  const [showTextList, setShowTextList] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setOpenedIcon(null);
    setShowTextList(false);
  };

  const handleIconClicked = (iconText) => {
    setOpenedIcon(iconText);
    setTextSnippets(textLists[iconText] || []);
    setShowTextList(true);
    handleIconClick(iconText);
  };

  const handleBack = () => {
    setOpenedIcon(null);
    setShowTextList(false);
  };

  return (
    <div>
      {openedIcon ? (
        <div>
          <div className="text-center mb-4">
            <Button onClick={handleBack}>Go Back</Button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {textSnippets.map((text, index) => (
              <Button key={index} onClick={() => handleIconClicked(text)}>
                {text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {Object.keys(tabContent).map((key) => (
              <TabPane
                tab={
                  <span className="flex items-center gap-2">
                    {tabContent[key].icon} {tabContent[key].title}
                  </span>
                }
                key={key}
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  {tabContent[key].icons.map((icon, index) => (
                    <Button key={index} onClick={() => handleIconClicked(icon.text)}>
                      {icon.icon}
                      <span className="ml-2">{icon.text}</span>
                    </Button>
                  ))}
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default OptionsComponent; {% endcomment %}

import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Upload, Tabs, List } from 'antd';
import io from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import { RiFolderUploadLine, RiChat1Line, RiImageLine, RiFileTextLine, RiCloseLine, RiMenuLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../store/store';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const socket = io('http://81.181.198.75:5002'); // Replace with your Flask server URL

const predefinedMessages = [
  'Hello, how can I assist you?',
  'Please provide more details.',
  'I am looking into that for you.',
  'Thank you for your patience.',
  'Can I help with anything else?'
];

const textLists = {
  'Chat': ['Chat message 1', 'Chat message 2', 'Chat message 3'],
  'Images': ['Image 1 description', 'Image 2 description', 'Image 3 description'],
  'Documents': ['Document 1 description', 'Document 2 description', 'Document 3 description'],
  'Upload': ['Upload 1 description', 'Upload 2 description', 'Upload 3 description'],
  'Files': ['Files 1 description', 'Files 2 description', 'Files 3 description']
};

const CreateGenerallAI = () => {
  const accessToken = useAppSelector((state) => state.authentication.accessToken);
  const userInfo = useSelector((state) => state.currentLoggedInUser?.userInfo || {});
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [typing, setTyping] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [typingEnded, setTypingEnded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('1'); // Active tab
  const [openedIcon, setOpenedIcon] = useState(null); // Icon clicked
  const [textSnippets, setTextSnippets] = useState([]);
  const [showTextList, setShowTextList] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // State to track options visibility

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('new_message', (data) => {
      console.log('New message received:', data); // Debugging line

      setTyping(false);
      setTypingEnded(true);
      setUpdateTrigger((prev) => !prev);

      setTimeout(() => {
        if (typingEnded) {
          console.log('New message received:', data); // Debugging line

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
  }, [typingEnded]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onFinish = async (values) => {
    if (values.message && values.message.trim()) {
      const newMessage = {
        text: values.message.trim(),
        type: 'sent',
        sender_id: userInfo.id,
        isImage: !!imagePreview,
        image: imagePreview
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      form.resetFields();
      setImagePreview(null);
      setInputValue('');

      const payload = imagePreview
        ? {
            sender_id: userInfo?.id,
            receiver_id: '66c5977ee15fe197f4ba0ff7',
            img_message: values.message.trim(),
            image: imagePreview,
            message: '',
            image_sent: 1
          }
        : {
            sender_id: userInfo?.id,
            receiver_id: '66c5977ee15fe197f4ba0ff7',
            message: values.message.trim(),
            img_message: '',
            image: '',
            image_sent: 0
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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const filtered = predefinedMessages.filter((msg) =>
        msg.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMessages(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    form.setFieldsValue({ message: suggestion }); // Set the suggestion in the form
  };

  const handleIconClick = (iconText) => {
    setOpenedIcon(iconText);
    setTextSnippets(textLists[iconText] || []);
    setShowTextList(true);
    setShowSuggestions(false); // Hide suggestions when icons are clicked
  };

  const handleBack = () => {
    setOpenedIcon(null);
    setShowTextList(false);
  };

  const handleTextClick = (text) => {
    setInputValue(text);
    setShowTextList(false);
    form.setFieldsValue({ message: text }); // Set the clicked text in the form
  };

  const tabContent = {
    '1': {
      icon: <RiChat1Line />,
      title: 'Chat',
      icons: [
        { icon: <RiChat1Line size={32} />, text: 'Chat' },
        { icon: <RiImageLine size={32} />, text: 'Images' },
        { icon: <RiFileTextLine size={32} />, text: 'Files' },
        { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
      ]
    },
    '2': {
      icon: <RiImageLine />,
      title: 'Images',
      icons: [
        { icon: <RiImageLine size={32} />, text: 'Images' },
        { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
        { icon: <RiFileTextLine size={32} />, text: 'Documents' },
        { icon: <RiChat1Line size={32} />, text: 'Chat' },
      ]
    },
    '3': {
      icon: <RiFileTextLine />,
      title: 'Documents',
      icons: [
        { icon: <RiFileTextLine size={32} />, text: 'Documents' },
        { icon: <RiImageLine size={32} />, text: 'Images' },
        { icon: <RiChat1Line size={32} />, text: 'Chat' },
        { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
      ]
    },
    '4': {
      icon: <RiFileTextLine />,
      title: 'Files',
      icons: [
        { icon: <RiFileTextLine size={32} />, text: 'Documents' },
        { icon: <RiImageLine size={32} />, text: 'Images' },
        { icon: <RiChat1Line size={32} />, text: 'Chat' },
        { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
      ]
    }
  };

  return (
    <div className="flex flex-col h-full p-3 bg-gradient-to-br from-green-50 to-white shadow-lg rounded-lg">
      <h1 className="text-center font-extrabold text-xl mb-4 text-green-700">Chat</h1>

      {/* Options Icon */}
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* Placeholder for any other top-left content */}
        </div>
        <div>
          <Button
            icon={showOptions ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            onClick={() => setShowOptions(!showOptions)}
          />
        </div>
      </div>

      {/* Options Content */}
      {showOptions && (
        <div className="mb-4">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {Object.entries(tabContent).map(([key, { icon, title, icons }]) => (
              <TabPane
                tab={<span>{icon}{title}</span>}
                key={key}
                className="custom-tab"
              >
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {icons.map(({ icon, text }) => (
                    <div
                      key={text}
                      onClick={() => handleIconClick(text)}
                      className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
                    >
                      {icon}
                      <p className="mt-2 text-sm">{text}</p>
                    </div>
                  ))}
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}
      <div className="flex flex-col mt-4 flex-grow overflow-auto">
        <div className="flex flex-col space-y-2 mb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg shadow-md ${
                msg.type === 'sent' ? 'self-end bg-green-100 text-green-700' : 'self-start bg-white text-green-700'
              }`}
            >
              {msg.isImage ? (
                <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-lg" />
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          ))}
          {typing && (
            <div className="self-start bg-white text-green-700 p-2 rounded-lg shadow-md">
              Typing...
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>
      {showSuggestions && (
        <div className="suggestions-container">
          <ul>
            {filteredMessages.map((msg, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(msg)}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Form */}
      <Form form={form} onFinish={onFinish} className="flex flex-col mt-auto">
        <Form.Item name="message" className="w-full">
          <Input.TextArea
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder="Type your message here..."
            className="rounded-lg p-3 text-green-700"
          />
        </Form.Item>

         

        {showTextList && (
          <div className="text-list-container">
            <Button onClick={handleBack} className="mb-2">
              Back
            </Button>
            <List
              bordered
              dataSource={textSnippets}
              renderItem={(item) => (
                <List.Item onClick={() => handleTextClick(item)} className="cursor-pointer">
                  {item}
                </List.Item>
              )}
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button icon={<RiFolderUploadLine />} className="flex items-center">
              Upload
            </Button>
          </Upload>
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center rounded-lg"
            icon={<LuSendHorizonal />}
          >
            Send
          </Button>
        </div>
      </Form>

      
    </div>
  );
};

export default CreateGenerallAI;
