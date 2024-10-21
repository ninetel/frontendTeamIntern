// import { Card, Upload, Button, Input, Modal } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
// import React, { useState } from 'react';
// import ExistingContactList from './ExistingContactList';

// const BulkMessage = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const hideModal = () => {
//         setIsModalVisible(false);
//     };

//     return (
//         <div className={`w-3/4 h-3/4 flex flex-col justify-center items-center bg-white border-2 border-gray-300 shadow-lg rounded-xl p-8 m-10 ${isModalVisible ? 'backdrop-blur-sm' : ''}`}>
//             <div className='w-full flex justify-between items-start space-x-8'>
//                 <div className='w-1/2 flex flex-col space-y-6'>
//                     <Card className='shadow-sm'>
//                         <Upload>
//                             <Button icon={<UploadOutlined />} className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700">
//                                 Upload File
//                             </Button>
//                         </Upload>
//                     </Card>
//                     <Card className='shadow-sm'>
//                         <Button className='w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 border-dotted' onClick={showModal}>
//                             Choose from existing contacts
//                         </Button>
//                     </Card>
//                 </div>

//                 <div className='w-1/2 flex flex-col space-y-4'>
//                     <h1 className='text-center font-semibold text-2xl text-gray-700'>Message</h1>
//                     <Input.TextArea rows={10} placeholder="Enter your message here..." className="p-4 text-gray-700 border-gray-300 rounded-md focus:ring focus:ring-blue-200" />
//                 </div>
//             </div>

//             <div className='flex space-x-4 mt-8'>
//                 <Button
//                     type="primary"
//                     className='bg-green-500 hover:bg-green-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
//                     icon={<FaWhatsapp className='mr-2' />}
//                 >
//                     WhatsApp
//                 </Button>
//                 <Button
//                     type="primary"
//                     className='bg-blue-500 hover:bg-blue-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
//                     icon={<FaTelegramPlane className='mr-2' />}
//                 >
//                     Telegram
//                 </Button>
//             </div>

//             {/* Modal for ExistingContactList */}
//             <Modal
//                 open={isModalVisible}  // Replaced 'visible' with 'open'
//                 onCancel={hideModal}
//                 footer={null}
//                 centered
//                 bodyStyle={{ padding: 0 }}
//                 maskClosable={false}
//                 className="rounded-lg overflow-hidden"
//             >
//                 <ExistingContactList onClose={hideModal} />
//             </Modal>
//         </div>
//     );
// };

// export default BulkMessage;




import { Card, Button, Input, Modal, Select, message as antdMessage } from 'antd'; // Added 'message' from antd
import { UploadOutlined } from '@ant-design/icons';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const { Option } = Select;

const BulkMessage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/types`);
        setContactTypes(response.data);
      } catch (error) {
        console.error("Error fetching contact types:", error);
      }
    };

    fetchContactTypes();
  }, []);

  const fetchContent = async (type) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/content/${type}`);
      const contacts = response.data;

      // Extract phone numbers
      const numbers = contacts.map(contact => contact.phoneNumber);

      // Update phone numbers state
      setPhoneNumbers(numbers);
    } catch (error) {
      console.error("Error fetching contact content:", error);
    }
  };

  const handleContactTypeChange = (value) => {
    setSelectedContactType(value);
    fetchContent(value);
    console.log(selectedContactType)
  };

  const sendToWhatsApp = async () => {
    if (!message || !selectedContactType) {
      console.error("Message and contact type must be selected");
      return;
    }

    try {
      const payload = {
        phone_numbers: phoneNumbers,
        message: message
      };

      // Send the payload to your API
      //await axios.post('http://81.181.198.75:5000/send_notifications', payload);
      await axios.post('http://localhost:5000/send_notifications', payload);
      console.log('Payload sent to API:', payload);

      // Clear selected contact type and message
      setSelectedContactType('');
      setMessage('');

      // Show success message
      antdMessage.success('Message sent successfully!');
    } catch (error) {
      console.error("Error sending payload:", error);
    }
  };

  const sendToTelegram = async () => {
    // Similar implementation to sendToWhatsApp if needed
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (


    <div className={`w-full h-full flex flex-col justify-center items-center bg-white border-2 border-gray-300 shadow-lg rounded-xl p-4 md:p-8 m-4 md:m-10 ${isModalVisible ? 'backdrop-blur-sm' : ''}`}>
      <div className='w-full flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-8'>
        <div className="w-full md:w-1/3">
          <Card className="shadow-sm p-2 rounded-lg">
            <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium  rounded-md transition-all duration-300 flex-wrap " onClick={showModal}>
              Choose existing contacts
              {/* <span className="text-center ">Choose</span>
              <span className="hidden lg:block ">existing contacts</span> */}
            </Button>
          </Card>
        </div>

        <div className='w-full md:w-2/3 flex flex-col space-y-4'>
          <h1 className='text-center font-semibold text-4xl text-gray-700'>
            Message
            </h1>
          <Input.TextArea
            rows={12}
            placeholder="Enter your message here..."
            className="text-gray-700 border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-10 m-10 pl-4'>
        <Button
          type="primary"
          className='bg-green-500 hover:bg-green-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
          icon={<FaWhatsapp className='mr-2' />}
          onClick={sendToWhatsApp}
          disabled={!message || !selectedContactType}
        >
          WhatsApp
        </Button>
        <Button
          type="primary"
          className='bg-blue-500 hover:bg-blue-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
          icon={<FaTelegramPlane className='mr-2' />}
          onClick={sendToTelegram}
          disabled={!message || !selectedContactType}
        >
          Telegram
        </Button>
      </div>

      <Modal
        title={<div className="text-xl font-semibold text-gray-800">Choose Contact Type</div>}
        open={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Button key="ok" onClick={hideModal} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300">
            Ok
          </Button>
        ]}
        className="p-5 rounded-lg shadow-lg"
        bodyStyle={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Select
          className="w-full bg-gray-100 border-2 rounded-lg focus:outline-none transition-colors duration-300 p-1"
          placeholder="Select a contact type"
          onChange={handleContactTypeChange}
          value={selectedContactType}
        >
          {contactTypes.map((type) => (
            <Option key={type} value={type} className="p-2">
              {type}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>



  );
};

export default BulkMessage;
