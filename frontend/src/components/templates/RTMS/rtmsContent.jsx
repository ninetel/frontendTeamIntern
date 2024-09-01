import { Card, Button, Input, Modal, Select, message as antdMessage, Form, Row, Col } from 'antd';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TradeForm from './Form';

const { Option } = Select;

const RtmsContent = ({ tradeData = {} }) => {
    const {
        buyRange = { to: 18, from: 12, conditions: 'dfn' },
        buyRange2 = { to: 78, from: 35, conditions: 'jdfkjs' },
        buyRange3 = { to: 35, from: 24, conditions: 'sndfbksdb' },
        stopLossBelow = { value: 34, conditions: 'nsdfsdn' },
        tpRange1 = { to: 53, from: 24, conditions: 'ndsfsndfjk' },
        tpRange2 = { to: 1, from: 4, conditions: 'sdjfnsdk' },
        tpRange3 = { to: 14, from: 1, conditions: 'jfdsdkfb' },
        scrip = { symbol: 'AHL', companyName: 'Asian Hydropower Limited' },
        holdingPeriod = '14',
        ...rest
      } = tradeData;
    
      const handleFinish = (values) => {
        console.log('Form values:', values);
      };
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
    <Card title="Trade Form" bordered={false} style={{ maxWidth: 900, margin: 'auto' }}>
      <Form
        layout="vertical"
        initialValues={{
          ...rest,
          buyRangeTo: buyRange.to,
          buyRangeFrom: buyRange.from,
          buyRangeConditions: buyRange.conditions,
          buyRange2To: buyRange2.to,
          buyRange2From: buyRange2.from,
          buyRange2Conditions: buyRange2.conditions,
          buyRange3To: buyRange3.to,
          buyRange3From: buyRange3.from,
          buyRange3Conditions: buyRange3.conditions,
          stopLossValue: stopLossBelow.value,
          stopLossConditions: stopLossBelow.conditions,
          tpRange1To: tpRange1.to,
          tpRange1From: tpRange1.from,
          tpRange1Conditions: tpRange1.conditions,
          tpRange2To: tpRange2.to,
          tpRange2From: tpRange2.from,
          tpRange2Conditions: tpRange2.conditions,
          tpRange3To: tpRange3.to,
          tpRange3From: tpRange3.from,
          tpRange3Conditions: tpRange3.conditions,
          scripSymbol: scrip.symbol,
          scripCompanyName: scrip.companyName,
          holdingPeriod,
        }}
        onFinish={handleFinish}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Symbol" name="scripSymbol">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Company Name" name="scripCompanyName">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Holding Period" name="holdingPeriod">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range From" name="buyRangeFrom">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range To" name="buyRangeTo">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range Conditions" name="buyRangeConditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 From" name="buyRange2From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 To" name="buyRange2To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 Conditions" name="buyRange2Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 From" name="buyRange3From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 To" name="buyRange3To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 Conditions" name="buyRange3Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Value" name="stopLossValue">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Conditions" name="stopLossConditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 From" name="tpRange1From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 To" name="tpRange1To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 Conditions" name="tpRange1Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 From" name="tpRange2From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 To" name="tpRange2To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 Conditions" name="tpRange2Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 From" name="tpRange3From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 To" name="tpRange3To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 Conditions" name="tpRange3Conditions">
              <Input/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          {/* <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button> */}
        </Form.Item>
      </Form>
    </Card>
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
