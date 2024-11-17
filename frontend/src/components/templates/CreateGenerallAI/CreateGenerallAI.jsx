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
import { BsThreeDots } from "react-icons/bs";
import axios from 'axios';
import { MdOutlineAttachFile, MdFileDownload } from "react-icons/md";



const { TabPane } = Tabs;
const socket = io('http://localhost:5003');

const predefinedMessages = [
  'Hello, how can I assist you?',
  'Please provide more details.',
  'I am looking into that for you.',
  'Thank you for your patience.',
  'Can I help with anything else?'
];

const CreateGenerallAI = () => {
  const [messages, setMessages] = useState([]);

  const accessToken = useAppSelector((state) => state.authentication.accessToken);
  const userInfo = useSelector((state) => state.currentLoggedInUser?.userInfo || {});
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewBinary, setImagePreviewBinary] = useState(null);
  const [imagePreviewBinaryBuffer, setImagePreviewBinaryBuffer] = useState(null);
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
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  const uidValue = localStorage.getItem('uid') ? 1 : 0;
  const uid = useRef(localStorage.getItem('uid') || uuidv4());
  const [urlValue, setUrlValue] = useState(''); // State to hold the URL value
  const [categories, setCategories] = useState([]);
  const [predefinedQuestions, setPredefinedQuestions] = useState([]);
  const [hideDiv, setHideDiv] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [file, setFile] = useState(null);
  const delayInProgress = useRef(false);  // Track if the delay is in progress

   var varr = 0
  const [messageDetails, setMessageDetails] = useState({
    type: "text",
    url: "",
    receiver_id: ""
  });
  const refff = useRef(0);  // Store refff in useRef to persist its value

  // if (refff === 0) {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   refff = 1;  // Update variable after action
  // }
  useEffect(() => {
    if (refff.current === 0) {
      // This runs only once when the component is first mounted
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      refff.current = 1;  // Update to ensure it only runs once
          // setRefff(1);

  }
  }, []); 
  
  const messagesEndRef = useRef(null);
  useEffect(() => {
    fetchCategories();
    fetchPredefinedQuestions();
  }, []);
  useEffect(() => {

    if (uid) {

      fetchStaffs();

    }
  }, []);

  const checkUid = async (staffz) => {

    localStorage.setItem('uid', uid.current);

    // console.log("ram hari")


if (uidValue==0 && varr==0) {

  localStorage.setItem('uid', uid.current);

  // console.log("ram hari")


    selectRandomStaffAndSend(staffz, uid)

    varr = 1

  }

  // console.log("hari hari hari")
}
const shouldShowTypingIndicator = () => {
  if (messages.length === 0) {
    return false;
  }
  const lastMessage = messages[messages.length - 1];
  return lastMessage.type === 'user';
};

useEffect(() => {
  setShowTypingIndicator(shouldShowTypingIndicator());
}, [messages]);

const fetchMessages = async () => {
 
  try {
    // console.log('uid')
    // console.log(uid)
    // console.log('uid')

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/guest-messages/${uid.current}`);
    const allMessages = response.data.allMessages || [];

    // Filter out messages containing '+'
    const filteredMessages = allMessages.filter(msg => !msg.message.includes('+'));

    // Sort messages by timestamp in descending order
    const sortedMessages = filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    setMessages(sortedMessages);

    if (sortedMessages.length > 0) {
      const lastMessage = sortedMessages[sortedMessages.length - 1];
      setMessageDetails({
        type: lastMessage.type,
        url: lastMessage.url,
        receiver_id: lastMessage.sender_id,
      });
    }

    // console.log('sortedMessages')
    // console.log(sortedMessages)
    // console.log('sortedMessages')
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};  

useEffect(() => {
  

  fetchMessages();
}, []);

// useEffect(() => {
//   // Fetch messages whenever the messages state changes
//   if (messages.length > 0) {
//   //  let a=0;
//     fetchMessages();
//   }
// }, [messages]);
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
}, [messages]);  // Depend on messages, so whenever they change, the effect runs



const fetchCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
  setCategories(response.data);
};  const fetchPredefinedQuestions = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`);
  setPredefinedQuestions(response.data);
};
const selectRandomStaffAndSend= async (staffs, uid)=> {
 
  const randomIndex = Math.floor(Math.random() * staffs.length);
   const selectedStaffId = staffs[randomIndex]._id;


    const data = { uid: uid.current, staffId: selectedStaffId };


    try {




      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usar/assign`, data

      );




    } catch (error) {

      console.error("Error sending data:", error);

    }

  };




  const fetchStaffs = async () => {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/staff`);

    checkUid(response.data);

  };
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

  // const handleFileChange = (e) => { const file = e.target.files[0];  setImagePreviewBinary(file);}
    // This is the raw binary data of the image setUploadedImagebinary(arrayBuffer); // Optionally store this data in state }; };
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
  
        if (file.type.startsWith('image/')) {
          setImagePreview(URL.createObjectURL(file));
        } else {
          // Handle other file types, for example, show a generic preview or icon
          setImagePreview(null);  // Clear the image preview for non-image files
        }
            const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          setImagePreviewBinary(arrayBuffer);
        };
        reader.readAsArrayBuffer(file);
      }
    };
  // Helper function to map MIME type to file extension
function getFileExtension(mimeType) {
  const mimeTypes = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/zip': '.zip',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'video/mp4': '.mp4',
    // Add more mappings as needed
  };
  return mimeTypes[mimeType] || ''; // Returns an empty string if the MIME type is not found
}
// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
  const onFinish = async (values) => {
      let imageUrl = "";
      if (values.message && values.message.trim()) {
        
  
        if (imagePreviewBinary) {
      
          try {
            const formData = new FormData();
            const base64Image = arrayBufferToBase64(imagePreviewBinary);

            const payload = {
              imageData: base64Image,
            };
      
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
            
                'file': file, 
            },{  
              headers: { 'Content-Type': 'multipart/form-data' } 
            });
          imageUrl = response.data.imageUrl; // Get the image URL from the backend response
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image. Please try again.");
        }
      }

      setHideDiv(true);

      const newMessage = {
        uid: uid.current,
        text: values.message.trim(),
        type: 'sent',
        isImage: !!imagePreview,
        image: imageUrl,
        url: urlValue
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      form.resetFields();
      setImagePreview(null);
      setImagePreviewBinary(null);
      setInputValue('');
      const payload = imagePreview
        ? {
          uid: uid.current,
          img_message: values.message.trim(),
          image: imageUrl,
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
        setMessages([...messages, payload]);

      try {
        socket.emit('send_message', payload);
        socket.emit('user_typing', { uid: uid });

        fetchMessages();
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
      // console.log(reader)
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <RiImageLine />;  // Use an image icon for image files
    } else if (fileType === 'application/pdf') {
      return <RiFileTextLine />;  // Use a PDF icon for PDF files
    } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return <RiFileTextLine />;  // Word file icon
    } else if (fileType === 'application/zip') {
      return <RiFolderUploadLine />;  // ZIP file icon
    } else {
      return <RiFileTextLine />;  // Default generic file icon
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      setShowOptions(false);
      event.preventDefault();
      form.submit();
      setShowSuggestions(false);

    }
  };
  const getSentencesByName = (name) => { const found = predefinedQuestions.find(item => item.name.trim() === name); return found ? found.sentences : []; };
  const handleInputChange = (event) => {
    const value = event.target.value;
    // console.log("predefinedQuestions")
    // console.log(predefinedQuestions)
    // console.log("predefinedQuestions")
    const sentences = getSentencesByName('nepsetrends');
    // console.log("sentences")
    // console.log(sentences)
    // console.log("sentences")
    setInputValue(value);
    if (value) {
      const filtered = sentences.filter((msg) =>
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


  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
 
  useEffect(() => {
    socket.on('new_message', () => {
      // Handle the incoming data here
    //  console.log(data); // Log the received data for debugging
      // Update your state or UI with the new message
      fetchMessages();
      // setMessages([...messages, data]);
    });
  
    return () => {
      socket.off('new_message'); // Clean up the event listener
    };
  }, [messages]);
  

  return (

    <div className="flex flex-col absolute w-[400px] h-[500px] p-6 py-6 from-green-50 to-white shadow-lg rounded-lg">
     
      
      
      {/* Options Icon */}
      <div className="flex justify-between items-center mb-4">
        <div>
         </div>
        
      </div>

      {/* Options Content */}
      {showOptions && (
        <div className="mb-4">
         
        </div>
      )}
      

      {
        hideDiv ? <div className='ml-[90%] -mt-10 text-black cursor-pointer'><BsThreeDots size={40} onClick={() => setHideDiv(!hideDiv)} /></div> :
          <div className={`flex flex-col z-50`}>
            <div className="bg-green-500 text-white rounded p-3 flex justify-between items-center">
  <div>
    <h1 className="text-lg font-bold">Welcome to Sikkincha</h1>
    <p>नमस्ते, तपाईलाई स्वागत छ</p>
  </div>
  <button className='ml-4'>
    <RxCross2 size={40} onClick={() => setHideDiv(!hideDiv)} />
  </button>
</div>


            <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-lg">
              <Tabs
                defaultActiveKey="2"
                items={categories.map((category) => ({
                  key: category._id,
                  label: category.name,
                  children: (

                    <div className={` flex h-[150px] overflow-x-hidden relative pt-3 overflow-y-scroll -mt-4`}>
                      <Row className="flex flex-wrap" gutter={16}>
                        {category.subcategories?.map((subcat, index) => (
                          <Col key={index} span={8}>
                            <Card
                              hoverable
                              onClick={() => {
                                setActiveCategory(category._id === activeCategory ? null : category._id);
                                setSelectedContent(subcat.items[0].content);
                              }}
                              style={{ transition: 'border 0.3s', border: '1px solid #f0f0f0', width: "200px" }}
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
                      {selectedContent && (
                        <div className=" absolute w-full h-[150px] px-2 bg-white rounded-lg shadow">
                          <div className='flex justify-between'>
                            <h2 className="text-lg font-bold">Content</h2>
                            <button
                              onClick={() => setSelectedContent('')}
                              className=" text-red-500 hover:text-red-700"
                            >
                              <RxCross2 />
                            </button>
                          </div>
                          <p>{selectedContent}</p>
                        </div>
                      )}
                    </div>
                  )
                }))}
              />

            </div>

          </div>
      }

      <div className='fixed w-[350px] bottom-0 '>
        {console.log(messages)}
        <div className="flex flex-col-reverse bottom-0 h-[60vh] overflow-y-scroll mt-4 flex-grow overflow-auto">
        <div ref={refff.current === 0 ? messagesEndRef : null} />
        <div className="flex flex-col space-y-2 mb-2">
            {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-2 rounded-lg shadow-md ${msg.type === 'user'
      ? 'self-end bg-green-100 text-green-700'
      : 'self-start bg-white text-green-700'
      }`}
  >
    {(msg.type === 'Chatbot' || msg.type === 'staff') && (
      <div className="flex items-center space-x-2 mb-1">
        <FaUser className="text-green-700" />
        <p className="font-bold">{msg.type}</p>
      </div>
    )}
    {msg.type === 'user' && (
      <p className="font-bold mb-1">{msg.type}</p>
    )}
    <div>
      {(msg.type === 'Chatbot' || msg.type === 'staff') && (
        <p>{msg.message}</p>
      )}
      {msg.type === 'user' && (
        <p>{msg.message}</p>
      )}
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

  </div>
))}

            {/* {typing && (
              <div className="-start bg-white text-green-700 p-2 rounded-lg shadow-md">
                Typing...
              </div>
            )} */}
          </div>
        </div>
        {showSuggestions && (
          <div className="suggestions-container z-50 bg-green-400 text-white">
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
          <div className="absolute left-2 bottom-2 flex p-2 justify-center items-center overflow-hidden rounded-full bg-gray-200 hover:bg-gray-300">
            <input
              type="file"
              accept="image/*,application/pdf,.doc,.docx,.zip,.mp3,.wav"  // Specify allowed file types

              // ref={ref}
              onChange={handleFileChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Uploaded" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="text-black">+</div>
            )}
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="absolute right-2 bottom-2 p-2 rounded-full bg-green-500 hover:bg-green-600"
            icon={<LuSendHorizonal />}
          />
        </div>
      </Form.Item>
    </Form>
      </div>
      


    </div >
  );

}

export default CreateGenerallAI;
