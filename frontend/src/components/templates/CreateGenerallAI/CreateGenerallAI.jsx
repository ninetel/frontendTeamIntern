import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Upload, Tabs, List } from 'antd';
import io from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import { RiFolderUploadLine, RiChat1Line, RiImageLine, RiFileTextLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../store/store';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const socket = io('http://localhost:5004'); // Replace with your Flask server URL

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

  const messagesEndRef = useRef(null);

  useEffect(() => {
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

      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded-lg p-3">
        {openedIcon ? (
          <div>
            <div className="text-center mb-4">
              <Button onClick={handleBack}>Go Back</Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {textSnippets.map((text, index) => (
                <Button key={index} onClick={() => handleTextClick(text)}>
                  {text}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
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
                      <Button key={index} onClick={() => handleIconClick(icon.text)}>
                        {icon.icon}
                        <span className="ml-2">{icon.text}</span>
                      </Button>
                    ))}
                  </div>
                </TabPane>
              ))}
            </Tabs>
            {showTextList && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Text Snippets</h3>
                <div className="flex flex-wrap gap-4">
                  {textSnippets.map((text, index) => (
                    <Button key={index} onClick={() => handleTextClick(text)}>
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <List
  className="message-list"
  dataSource={messages.length ? messages : []}
  renderItem={(item) => (
    <List.Item className={`message-item ${item.type}`}>
      {item.isImage ? (
        <img src={item.image} alt="Message content" className="message-image" />
      ) : (
        item.text
      )}
    </List.Item>
  )}
  locale={{ emptyText: ' ' }} // Customize empty text
/>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {showSuggestions && (
        <div className="suggestions-popup mt-4">
          {filteredMessages.map((suggestion, index) => (
            <Button key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </Button>
          ))}
        </div>
      )}

      <Form form={form} onFinish={onFinish} className="mt-4">
        <Form.Item name="message">
          <Input.TextArea
            rows={2}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
          />
        </Form.Item>
        <Form.Item>
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button icon={<RiFolderUploadLine />}>Upload Image</Button>
          </Upload>
          <Button type="primary" htmlType="submit" icon={<LuSendHorizonal />}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGenerallAI;
