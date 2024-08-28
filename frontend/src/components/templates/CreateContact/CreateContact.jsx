// import React from "react";
// import { Form, Input, Select, Button, Upload, Checkbox, Row, Col } from "antd";
// import { BiSolidCloudUpload } from "react-icons/bi";

// const CreateContact = () => {
//   return (
//      <Form layout="vertical">
//      <h2
//        style={{
//          margin: "80px 100px 20px 100px",
//          fontSize: "2rem",
//        }}
//      >
//        Create New Contact
//      </h2>
//      <Row style={{ margin: "20px 100px" }}>

//        {/* username */}
//        <Col span={12} style={{ padding: "0 10px 0 0" }}>
//          <Form.Item label="Username">
//            <Input
//              name="username"
//            />
//          </Form.Item>
//        </Col>

//        {/* phone number */}
//        <Col span={12} style={{ padding: "0 10px 0 0" }}>
//          <Form.Item label="Phone Number">
//            <Input
//              name="phone number"
//            />
//          </Form.Item>
//        </Col>

//        {/* email */}
//        <Col span={12} style={{ padding: "0 10px 0 0" }}>
//          <Form.Item label="Email">
//            <Input
//              name="email"
//            />
//          </Form.Item>
//        </Col>

//        {/* Contact type */}
//        <Col span={12} style={{ padding: "0 10px 0 0" }}>
//               <Form.Item label="Contact type">
//                 <Select
//                   name="ContactType"
//                 >
//                   <Option value=""></Option>
//                   <Option value=""></Option>
//                   <Option value=""></Option>
//                 </Select>
//               </Form.Item>
//             </Col>
     

// <Col span={24} style={{ margin: "20px 0" }}>
//              <Button
//                 icon={<BiSolidCloudUpload size={30} />}
//                 style={{ padding: "23px 425px 23px 415px", fontWeight: "bold" }}
//                 // style={hover.stars{
//                 //   display:block;
//                 //   filter:
//                 // }}
//                 type="primary"
               
//               >
//                 Upload Contact
//               </Button>
//    </Col>
//      </Row>
//    </Form>
//   )
// }

// export default CreateContact

// src/components/CreateContact.js
 

// src/components/CreateContact.js
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal, Row, Col } from "antd";
import { BiSolidCloudUpload } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const CreateContact = () => {
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [form] = Form.useForm();

  // Fetch contact types when the component mounts
  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts/types");
        const uniqueTypes = Array.from(new Set(response.data)); // Ensure unique types
        setOptions(uniqueTypes);
      } catch (err) {
        console.error("Error fetching contact types:", err);
      }
    };

    fetchContactTypes();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3000/api/contacts", {
        contactType: values.ContactType,
        username: values.username,
        phoneNumber: values.phoneNumber,
        email: values.email,
      });
      
      alert("Contact saved successfully!");
      form.resetFields();
    } catch (err) {
      console.error("Error saving contact:", err);
      alert("There was an issue saving the contact. Please try again.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2 style={{ margin: "80px 100px 20px 100px", fontSize: "2rem" }}>
        Create New Contact
      </h2>
      <Row style={{ margin: "20px 100px" }}>
        <Col span={12} style={{ padding: "0 10px 0 0" }}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12} style={{ padding: "0 10px 0 0" }}>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12} style={{ padding: "0 10px 0 0" }}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12} style={{ padding: "0 10px 0 0" }}>
          <Form.Item label="Contact type" name="ContactType" rules={[{ required: true }]}>
            <Select
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={showAddOptionModal}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "8px 0",
                    }}
                  >
                    Add New Option
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

        <Col span={24} style={{ margin: "20px 0" }}>
          <Button
            icon={<BiSolidCloudUpload size={30} />}
            style={{
              width: "100%",
              padding: "15px 0",
              fontWeight: "bold",
            }}
            type="primary"
            htmlType="submit"
          >
            Upload Contact
          </Button>
        </Col>
      </Row>

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
  );
};

export default CreateContact;
