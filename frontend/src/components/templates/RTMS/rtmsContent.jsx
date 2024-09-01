import { Card, Button, Input, Modal, Select, message as antdMessage } from 'antd';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TradeForm from './Form';

const { Option } = Select;

const RtmsContent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts/types");
        setContactTypes(response.data);
      } catch (error) {
        antdMessage.error("Error fetching contact types");
        console.error("Error fetching contact types:", error);
      }
    };

    fetchContactTypes();
  }, []);

  const fetchContent = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/contacts/content/${type}`);
      const contacts = response.data;

      const numbers = contacts.map(contact => contact.phoneNumber);
      setPhoneNumbers(numbers);
    } catch (error) {
      antdMessage.error("Error fetching contact content");
      console.error("Error fetching contact content:", error);
    }
  };

  const handleContactTypeChange = (value) => {
    setSelectedContactType(value);
    fetchContent(value);
  };

  const sendToWhatsApp = async () => {
    if (!message || !selectedContactType) {
      antdMessage.warning("Message and contact type must be selected");
      return;
    }

    try {
      const payload = {
        phone_numbers: phoneNumbers,
        message: message
      };

      await axios.post('http://localhost:5000/send_notifications', payload);
      setSelectedContactType('');
      setMessage('');
      antdMessage.success('Message sent successfully!');
    } catch (error) {
      antdMessage.error("Error sending message");
      console.error("Error sending payload:", error);
    }
  };

  const sendToTelegram = async () => {
    if (!message || !selectedContactType) {
      antdMessage.warning("Message and contact type must be selected");
      return;
    }

    try {
      const payload = {
        phone_numbers: phoneNumbers,
        message: message
      };

      await axios.post('http://localhost:5000/send_telegram_notifications', payload);
      setSelectedContactType('');
      setMessage('');
      antdMessage.success('Message sent successfully!');
    } catch (error) {
      antdMessage.error("Error sending message");
      console.error("Error sending payload:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`w-auto h-auto flex flex-col justify-center items-center bg-white border-2 border-gray-300 shadow-lg rounded-xl p-8 m- ${isModalVisible ? 'backdrop-blur-sm' : ''}`}>
        
        <div className='w-full flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0 md:space-x-8'>
  <div className='w-1/3 flex flex-col space-y-4'>
    <Card className='shadow-sm'>
    <Button
  className='w-full h-16 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 border-dotted '
  style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
  onClick={showModal}
>
  Choose from existing contacts
</Button>

    </Card>
  </div>

  <div className='w-full md:w-2/3 flex flex-col space-y-4'>
    {/* <h1 className='text-center font-semibold text-2xl text-gray-700'>Form</h1> */}
    <TradeForm />
  </div>
</div>



      <div className='flex justify-center space-x-20 mt-10'>
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
        title="Choose Contact Type"
        open={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal}>
            Cancel
          </Button>
        ]}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Select a contact type"
          onChange={handleContactTypeChange}
          value={selectedContactType}
        >
          {contactTypes.length > 0 ? contactTypes.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          )) : <Option disabled>No Contact Types Available</Option>}
        </Select>
      </Modal>
    </div>
  );
};

export default RtmsContent;
