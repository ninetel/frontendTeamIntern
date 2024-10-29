import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Upload, Tabs, Card, Col, Row }
  from 'antd';
import io from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import { RiFolderUploadLine, RiChat1Line, RiImageLine, RiFileTextLine, RiCloseLine, RiMenuLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';



const { TabPane } = Tabs;
const socket = io('http://localhost:5003'); 
const predefinedMessages = [
  'Hello, how can I assist you?',
  'Please provide more details.',
  'I am looking into that for you.',
  'Thank you for your patience.',
  'Can I help with anything else?'
];




// const textLists = {
//   'Chat': ['Chat message 1', 'Chat message 2', 'Chat message 3'],
//   'Images': ['Image 1 description', 'Image 2 description', 'Image 3 description'],
//   'Documents': ['Document 1 description', 'Document 2 description', 'Document 3 description'],
//   'Upload': ['Upload 1 description', 'Upload 2 description', 'Upload 3 description'],
//   'Files': ['Files 1 description', 'Files 2 description', 'Files 3 description']
// };

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
  const [showOptions, setShowOptions] = useState(true); // State to track options visibility
  const [lastMessages, setLastMessages] = useState('');
  const uidValue = localStorage.getItem('uid') ? 1 : 0;
const uid = useRef(localStorage.getItem('uid') || uuidv4());
  const [urlValue, setUrlValue] = useState(''); // State to hold the URL value
  const [categories, setCategories] = useState([]);
  var varr=0

  const messagesEndRef = useRef(null);
  useEffect(() => {
    fetchCategories();
}, []);
useEffect(() => {
  if (uid){
    fetchStaffs();

  }
  
}, []);
const checkUid =async (staffz) => {
  // Check if uid is already present in localStorage
 // let storedUid = localStorage.getItem('uid');
  
  if (uidValue==0 && varr==0) {
    // Generate a new uid if not already stored
    // storedUid = uuidv4();
    localStorage.setItem('uid', uid.current);
   // console.log("hari hari")
    // window.location.reload();

   // console.log(staffz)
    console.log("ram hari")
    // const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
// const staffz= response.data
    selectRandomStaffAndSend(staffz,uid)
    varr=1
   }
  console.log("hari hari hari")

  // Update the uid reference
 // uid.current = storedUid;
};

const fetchCategories = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
    setCategories(response.data);
};
const selectRandomStaffAndSend= async (staffs, uid)=> {
  // Generate a random number and select a random staff ID
  {console.log(staffs)}
  const randomIndex = Math.floor(Math.random() * staffs.length);
  {console.log("randomIndex")}
  {console.log(randomIndex)}
  const selectedStaffId = staffs[randomIndex]._id;

  // Log the selected staff ID
  console.log("Selected Staff ID:", selectedStaffId);
  console.log("Selected UID:", uid.current);
  const data = { uid: uid.current, staffId: selectedStaffId };
  console.log("Selected data:", data);
  try {
    console.log("Selectssed UID:", uid.current);

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usar/assign`, data
    );

    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

  // API call with selected staff ID and uid
  // fetch('https://your-api-url.com/endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     staff_id: selectedStaffId,
    //     uid: uid,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("API Response:", data);
    //   })
    //   .catch(error => {
    //     console.error("Error:", error);
    //   });
    
    // Start server
    
  //}

const fetchStaffs = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);
  checkUid(response.data);
};
// Check if uid was newly generated


// useEffect to handle any additional setup related to uid
// useEffect(() => {
  // Any other logic depending on uid
// }, [uid]);
  useEffect(() => {
    localStorage.setItem('uid', uid.current);
    socket.on('new_message', (data) => {
      if (data.uid === uid.current) {
        setTyping(false);
        setTypingEnded(true);
        setUpdateTrigger((prev) => !prev);

        setTimeout(() => {
          if (typingEnded || !typing) {
            setLastMessages(data.response);
            setMessages((prevMessages) => [...prevMessages, { ...data, type: 'received' }]);
            setTypingEnded(false);
          }
        }, 10);
      }
    });

    socket.on('user_typing', (data) => {
      if (data.uid === uid.current) {

        setTyping(true);
        setTypingEnded(false);

      }
    });

    return () => {
      socket.off('new_message');
      socket.off('user_typing');
    };
  }, [typingEnded]);
  useEffect(() => {

    const getCurrentUrl = () => {
      const currentUrl = window.location.href;
      const urlRegex = /https?:\/\/(www\.)?([^\/]+)\.com/;
      const match = currentUrl.match(urlRegex);
      // console.log("localhostts currentUrl== " + currentUrl)
      // console.log("localhostts match== " + match)
      if (currentUrl == 'http://localhost:5173/chatgeneral') {
        setUrlValue('nespsetrends');
      }

      if (match && match[2]) {
        const domainPart = match[2];
        if (domainPart === 'nespsetrends') {
          setUrlValue('nespsetrends');
        } else {
          setUrlValue(domainPart);
        }
      }
    };

    getCurrentUrl();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onFinish = async (values) => {
    if (values.message && values.message.trim()) {
      console.log('uid===' + uid.current);
      console.log("localhostt== " + urlValue)

      const newMessage = {
        uid: uid.current,
        text: values.message.trim(),
        type: 'sent',
        isImage: !!imagePreview,
        image: imagePreview,
        url: urlValue
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      form.resetFields();
      setImagePreview(null);
      setInputValue('');

      const payload = imagePreview
        ? {
          uid: uid.current,
          img_message: values.message.trim(),
          image: imagePreview,
          message: '',
          image_sent: 1,
          url: urlValue
        }
        : {
          uid: uid.current,
          message: values.message.trim(),
          img_message: '',
          image: '',
          image_sent: 0,
          url: urlValue
        };

      try {
        socket.emit('send_message', payload);
        socket.emit('user_typing', { uid: uid });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  const onChange = (key) => {
    console.log(key);
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
      setShowOptions(false);
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
    form.setFieldsValue({ message: suggestion });
  };

  
  // const handleIconClick = (iconText) => {
  //   setOpenedIcon(iconText);
  //   setTextSnippets(textLists[iconText] || []);
  //   setShowTextList(true);
  //   setShowSuggestions(false);
  // };

  // const handleBack = () => {
  //   setOpenedIcon(null);
  //   setShowTextList(false);
  // };

  // const handleTextClick = (text) => {
  //   setInputValue(text);
  //   setShowTextList(false);
  //   form.setFieldsValue({ message: text });
  // };
  
  // const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
  // const getServiceContent = (service) => {
  //   switch (service) {
  //     case 'Learn and Earn':
  //       return LearnAndEarn;
  //     case 'Trade Support':
  //       return TradeSupport;

  //     default:
  //       return [];
  //   }
  // };
  // const tabContent = {
  //   '1': {
  //     icon: <RiChat1Line />,
  //     title: 'Chat',
  //     icons: [
  //       { icon: <RiChat1Line size={32} />, text: 'Chat' },
  //       { icon: <RiImageLine size={32} />, text: 'Images' },
  //       { icon: <RiFileTextLine size={32} />, text: 'Files' },
  //       { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
  //     ]
  //   },
  //   '2': {
  //     icon: <RiImageLine />,
  //     title: 'Images',
  //     icons: [
  //       { icon: <RiImageLine size={32} />, text: 'Images' },
  //       { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
  //       { icon: <RiFileTextLine size={32} />, text: 'Documents' },
  //       { icon: <RiChat1Line size={32} />, text: 'Chat' },
  //     ]
  //   },
  //   '3': {
  //     icon: <RiFileTextLine />,
  //     title: 'Documents',
  //     icons: [
  //       { icon: <RiFileTextLine size={32} />, text: 'Documents' },
  //       { icon: <RiImageLine size={32} />, text: 'Images' },
  //       { icon: <RiChat1Line size={32} />, text: 'Chat' },
  //       { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
  //     ]
  //   },
  //   '4': {
  //     icon: <RiFileTextLine />,
  //     title: 'Files',
  //     icons: [
  //       { icon: <RiFileTextLine size={32} />, text: 'Documents' },
  //       { icon: <RiImageLine size={32} />, text: 'Images' },
  //       { icon: <RiChat1Line size={32} />, text: 'Chat' },
  //       { icon: <RiFolderUploadLine size={32} />, text: 'Upload' },
  //     ]
  //   }
  // };

  

  return (

    <div className="flex flex-col absolute w-[400px] h-[500px] p-6 py-6 from-green-50 to-white shadow-lg rounded-lg">
      {console.log(categories)}
      {/* Options Icon */}
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* Placeholder for any other top-left content */}
        </div>
        {/* <div>
          <Button
            icon={showOptions ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            onClick={() => setShowOptions(!showOptions)}
          />
        </div> */}
      </div>

      {/* Options Content */}
      {showOptions && (
        <div className="mb-4">
          {/* <Tabs activeKey={activeTab} onChange={setActiveTab}>
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
          </Tabs> */}
        </div>
      )}
      {/* {showTextList && (
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
      )} */}

      <div className="bg-green-500 text-white rounded p-3 -mt-10">
        <h1 className="text-lg font-bold">Welome to Sikkincha</h1>
        <p>नमस्ते, तपाईलाई स्वागत छ</p>
      </div>

      
 <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-lg">
      <Tabs
        defaultActiveKey="2"
        items={categories.map((category) => ({
          key: category._id,
          label: category.name,
          children: (
            <div className="flex h-[100px] overflow-x-hidden pt-3 overflow-y-scroll -mt-4">
              <Row className="flex flex-wrap space-y-2" gutter={16}>
                {category.subcategories?.map((subcat, index) => (
                  <Col key={index} span={8}>
                    <Card
                      hoverable
                      onClick={() => {
                        setActiveCategory(category._id === activeCategory ? null : category._id);
                        setSelectedContent(subcat.items[0].content); 
                      }}
                      style={{ transition: 'border 0.3s', border: '1px solid #f0f0f0', width: "300px" }}
                      bodyStyle={{ cursor: 'pointer' }}
                    >
                      {subcat.name}
                    </Card>
                    {activeCategory === category._id && (
                      <div className="mt-2"> 
                    
                      </div>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          )
        }))}
      /> 

      
      {selectedContent && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow relative">
          <button
            onClick={() => setSelectedContent('')}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <RxCross2 />
          </button>
          <h2 className="text-lg font-bold">Content</h2>
          <p>{selectedContent}</p>
        </div>
      )}
    </div>




      <div className='fixed w-[329px] bottom-0'>
        <div className="flex flex-col text-center mt-4 flex-grow overflow-auto">
          <div className="flex flex-col  space-y-2 mb-2">
            {/* {console.log(messages)} */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg shadow-md ${msg.type === 'sent'
                  ? 'self-end bg-green-100 text-green-700'
                  : 'self-start bg-white text-green-700'
                  }`}
              >
                {msg.type === 'received' && (
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-green-700" />
                    <p>{msg.response}</p>
                  </div>
                )}
                {msg.type === 'sent' && (
                  <p>{msg.text}</p>
                )}
                {msg.isImage && (
                  <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-lg" />
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
          <div className="suggestions-container  bg-green-400 text-white">
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
        <Form form={form} onFinish={onFinish} className="flex flex-col mt-4 relative bottom-6">
          <Form.Item name="message" className="w-full">
            <div className="relative flex">
              <Input.TextArea
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                autoSize={{ minRows: 1, maxRows: 4 }}
                placeholder="Type your message here..."
                className="rounded-lg pl-10 py-3 text-green-700"
              />
              <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button className="absolute left-2 bottom-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                  +
                </Button>
              </Upload>
              <Button
                type="primary"
                htmlType="submit"
                className="absolute right-2 bottom-2 p-2 rounded-full bg-green-500 hover:bg-green-600"
                icon={<LuSendHorizonal />}
              >

              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>


    </div >
  );
};

export default CreateGenerallAI;
