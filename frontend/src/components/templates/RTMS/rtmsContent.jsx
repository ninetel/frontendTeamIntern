import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const CreateBulkContact = () => {
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]); // State to store phone numbers
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/types`);
        const uniqueTypes = Array.from(new Set(response.data)); // Ensure unique types
        setOptions(uniqueTypes);
      } catch (err) {
        console.error("Error fetching contact types:", err);
      }
    };

    fetchContactTypes();
  }, []);

  
  const handleContactTypeChange = async (value) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/content/${value}`);
      const numbers = response.data.map(contact => contact.phoneNumber);
      setPhoneNumbers(numbers); // Store the phone numbers as an array
  
    } catch (err) {
      console.error("Error fetching contacts for selected type:", err);
    }
  };

  const showAddOptionModal = () => {
    setIsModalVisible(true);
  };

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
    }
    setNewOption("");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewOption("");
  };
  const scripData = {
    scripName: "Nabil Bank Limited (NABIL)",
    sector: "Banking",
    capitalSize: "High cap",
    tradeType: "Positional",
    entryRanges: "Rs. 900 - Rs. 950",
    targetPrices: "TP1: Rs. 1,000, TP2: Rs. 1,050, TP3: Rs. 1,100, Ultimate Target: Rs. 1,150",
    stopLoss: "Rs. 850",
    entryRisk: "Medium",
    justification: "Nabil Bank is one of the leading banks in Nepal with a strong balance sheet and consistent dividend payouts. The stock is currently trading near a support zone, making it a favorable entry point. Technical indicators suggest potential upward movement.",
    chart: "Chart showing support at Rs. 900 and resistance levels at Rs. 1,050 and Rs. 1,100.",
  };

  const handleButtonClick = async (listType) => {
    try {
      // Validate form fields
      await form.validateFields();
  
      // Get form values
      const values = form.getFieldsValue();
      const contactType = values.ContactType;
  
      // Format message
      const formattedMessage = `${listType} alert: 
      Scrip Name: ${scripData.scripName}
      Sector: ${scripData.sector}
      Capital Size: ${scripData.capitalSize}
      Trade Type: ${scripData.tradeType}
      Entry Ranges: ${scripData.entryRanges}
      Target Prices: ${scripData.targetPrices}
      Stop Loss: ${scripData.stopLoss}
      Entry Risk: ${scripData.entryRisk}
      Justification: ${scripData.justification}
      Chart: ${scripData.chart}
      `;
      
      setMessage(formattedMessage);
  
      // Create log object
      const logObject = {
        phone_numbers: phoneNumbers,
        message: formattedMessage
      };
  
      // Send POST request
      try {
        const response = await axios.post('http://localhost:5000/send_notifications', logObject);
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    } catch (errorInfo) {
      console.error("Failed to get contact type:", errorInfo);
    }
  };
  



  const sendToWatchList = () => {
    handleButtonClick("WatchList");
  };

  const sendToTradeList = () => {
    handleButtonClick("TradeList");
  };

  

  return (
    <div className="flex">
      <div className="w-1/4">
        <Form form={form} layout="vertical" className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-center mt-6">Import from file</h2>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Contact Type" name="ContactType" rules={[{ required: true }]}>
                <Select
                  onChange={handleContactTypeChange}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={showAddOptionModal}
                        className="w-full text-center py-2"
                      >
                        Add New Contact Type
                      </Button>
                    </>
                  )}
                >
                  {options.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button
            className="w-full py-4 font-bold bg-blue-500 text-white hover:bg-blue-600"
            type="primary"
            onClick={sendToWatchList}
            disabled={phoneNumbers.length === 0}
          >
            Send To WatchList
          </Button>

          <Button
            className="w-full py-4 font-bold bg-green-500 text-white hover:bg-green-600 mt-4"
            type="primary"
            onClick={sendToTradeList}
            disabled={phoneNumbers.length === 0}

          >
            Send To TradeList
          </Button>

          <Modal
            title="Add New Contact Type"
            visible={isModalVisible}
            onOk={handleAddOption}
            onCancel={handleCancel}
            okText="Add"
          >
            <Input
              placeholder="Enter new contact type"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
          </Modal>
        </Form>
      </div>

      <div className="w-3/4 p-6 bg-gray-100">
        <h3 className="text-xl font-bold mb-4">Scrip Data</h3>
        <ul className="list-disc list-inside">
          <li><strong>Scrip Name:</strong> {scripData.scripName}</li>
          <li><strong>Sector:</strong> {scripData.sector}</li>
          <li><strong>Capital Size:</strong> {scripData.capitalSize}</li>
          <li><strong>Trade Type:</strong> {scripData.tradeType}</li>
          <li><strong>Entry Ranges:</strong> {scripData.entryRanges}</li>
          <li><strong>Target Prices:</strong> {scripData.targetPrices}</li>
          <li><strong>Stop Loss:</strong> {scripData.stopLoss}</li>
          <li><strong>Entry Risk:</strong> {scripData.entryRisk}</li>
          <li><strong>Justification:</strong> {scripData.justification}</li>
          <li><strong>Chart:</strong> {scripData.chart}</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateBulkContact;
