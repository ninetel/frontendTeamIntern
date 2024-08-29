
// import React, { useState, useEffect } from "react";
// import { Form, Input, Select, Button, Modal, Row, Col, Upload } from "antd";
// import { BiSolidCloudUpload } from "react-icons/bi";
// import { PlusOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { RiFolderUploadLine } from "react-icons/ri";
// import { TbUpload } from "react-icons/tb"; 
// const { Option } = Select;


// const CreateBulkContact = () => {
     
//   const [options, setOptions] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [newOption, setNewOption] = useState("");
//   const [form] = Form.useForm();

//   // Fetch contact types when the component mounts
//   useEffect(() => {
//     const fetchContactTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/contacts/types");
//         const uniqueTypes = Array.from(new Set(response.data)); // Ensure unique types
//         setOptions(uniqueTypes);
//       } catch (err) {
//         console.error("Error fetching contact types:", err);
//       }
//     };

//     fetchContactTypes();
//   }, []);

//   const showAddOptionModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleAddOption = () => {
//     if (newOption && !options.includes(newOption)) {
//       setOptions([...options, newOption]);
//     }
//     setNewOption("");
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setNewOption("");
//   };

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       await axios.post("http://localhost:3000/api/contacts", {
//         contactType: values.ContactType,
//         username: values.username,
//         phoneNumber: values.phoneNumber,
//         email: values.email,
//       });
      
//       alert("Contact saved successfully!");
//       form.resetFields();
//     } catch (err) {
//       console.error("Error saving contact:", err);
//       alert("There was an issue saving the contact. Please try again.");
//     }
//   };
//   return (
//     <div>
//       <Form>
//       <h2 className="text-2xl font-bold mb-4 text-center mt-6">Import from file</h2>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item label="Upload File" name="upload" rules={[{ required: true }]}>
//             <Upload name="file" listType="picture">
//               <Button icon={<BiSolidCloudUpload size={20} />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item label="Contact Type" name="ContactType" rules={[{ required: true }]}>
//             <Select
//               dropdownRender={(menu) => (
//                 <>
//                   {menu}
//                   <Button
//                     type="text"
//                     icon={<PlusOutlined />}
//                     onClick={showAddOptionModal}
//                     className="w-full text-center py-2"
//                   >
//                     Contact Type
//                   </Button>
//                 </>
//               )}
//             >
//               {options.map((option) => (
//                 <Option key={option} value={option}>
//                   {option}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Button
//         icon={<BiSolidCloudUpload size={30} />}
//         className="w-full py-4 font-bold bg-blue-500 text-white hover:bg-blue-600 mt-6"
//         type="primary"
//         htmlType="submit"
//       >
//         Bulk Add
//       </Button>

//       <Modal
//         title="Add New Contact Type"
//         visible={isModalVisible}
//         onOk={handleAddOption}
//         onCancel={handleCancel}
//         okText="Add"
//       >
//         <Input
//           placeholder="Enter new contact type"
//           value={newOption}
//           onChange={(e) => setNewOption(e.target.value)}
//         />
//       </Modal>
//       </Form>
//     </div>
//   )
// }

// export default CreateBulkContact
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal, Row, Col, Upload } from "antd";
import { BiSolidCloudUpload } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import * as XLSX from "xlsx";

const { Option } = Select;

const CreateBulkContact = () => {
  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        console.log("Fetching contact types...");
        const response = await axios.get("http://localhost:3000/api/contacts/types");
        console.log("Received contact types:", response.data);
        const uniqueTypes = Array.from(new Set(response.data)); // Ensure unique types
        setOptions(uniqueTypes);
      } catch (err) {
        console.error("Error fetching contact types:", err);
      }
    };

    fetchContactTypes();
  }, []);

  const showAddOptionModal = () => {
    console.log("Showing add option modal...");
    setIsModalVisible(true);
  };

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      console.log("Adding new option:", newOption);
      setOptions([...options, newOption]);
    }
    setNewOption("");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Canceling add option...");
    setIsModalVisible(false);
    setNewOption("");
  };

  const handleFileChange = ({ fileList }) => {
    console.log("File list changed:", fileList);
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    try {
      console.log("Handling submit...");
      const values = await form.validateFields();
      console.log("Form values:", values);

      if (fileList.length === 0) {
        alert("Please upload a file.");
        return;
      }

      // Read and parse the file content
      const file = fileList[0].originFileObj;
      console.log("Reading file:", file);
      const reader = new FileReader();
      reader.onload = async (e) => {
        console.log("File read completed.");
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        console.log("Sheet name:", sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log("Parsed JSON data:", jsonData);

        const contacts = jsonData.map(({ username, phoneNumber, email }) => ({
          contactType: values.ContactType,
          username,
          phoneNumber: String(phoneNumber), // Ensure phoneNumber is a string
          email,
        }));

        console.log("Contacts data to be sent to backend:", contacts);

        try {
          const response = await axios.post("http://localhost:3000/api/contacts/bulk", contacts);
          console.log("Backend response:", response.data);
          alert("Contacts saved successfully!");
          form.resetFields();
          setFileList([]);
        } catch (err) {
          console.error("Error sending data to backend:", err);
          alert("There was an issue saving the contacts. Please try again.");
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error handling submit:", err);
      alert("There was an issue saving the contacts. Please try again.");
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center mt-6">Import from file</h2>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Upload File" name="upload" rules={[{ required: true }]}>
              <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
                <Button icon={<BiSolidCloudUpload size={20} />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Contact Type" name="ContactType" rules={[{ required: true }]}>
              <Select
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
          icon={<BiSolidCloudUpload size={20} />}
          className="w-full py-4 font-bold bg-blue-500 text-white hover:blue-600"
          type="primary"
          htmlType="submit"
        >
          Upload Contacts
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
  );
};

export default CreateBulkContact;
