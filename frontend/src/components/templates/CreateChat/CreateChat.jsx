// import { Form, Input, Button } from 'antd';
// import React, { useState } from 'react';
// import { LuSendHorizonal } from "react-icons/lu";
// import { useAppSelector } from '../../../../store/store';
// import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
// import ManageChat from './ManageChat';
// const CreateChat = () => {
//   const accessToken = useAppSelector(
//     (state) => state.authentication.accessToken
//   );

//   const [form] = Form.useForm();
//   const [messages, setMessages] = useState([]); // State to hold the list of messages
//   const [isTyping, setIsTyping] = useState(false); // State to manage typing indicator

//   const onFinish = (values) => {
//     // Check if the message is not empty before sending
//     if (values.message && values.message.trim()) {
//       // Add the new message to the list of messages
//       const newMessage = { text: values.message.trim(), type: 'sent' };
//       setMessages([...messages, newMessage]);

//       form.resetFields(); // Reset the input field after submission

//       // Simulate receiving a response with typing indicator

//       simulateReceiveMessage();
//     }
//   };

//   const simulateReceiveMessage = () => {
//     setIsTyping(true); // Show typing indicator
//     setTimeout(() => {
//       setIsTyping(false); // Hide typing indicator
//       const responseMessage = { text: 'This is a response message!', type: 'received' };
//       setMessages((prevMessages) => [...prevMessages, responseMessage]);
//     }, 2000); // Simulate a 2-second delay for typing indicator
//   };

//   return (

//     <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', display: 'flex', }}>
//       <div>
//         <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Member</h1>
//       <ManageChat/>
//       </div>

//       <div>
//       <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Chat with us</h1>
//       <div 
//         style={{
//           border: '1px solid #ddd', 
//           width:'400px', 
//           padding: '20px 50px',
//           borderRadius: '10px', 
//           minHeight: '600px',
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',

//         }}
//       >

//         {/* Message display area */}
//         <div
//           style={{
//             flex: 1,
//             overflowY: 'auto',  // Add scrolling if messages overflow
//             marginBottom: '20px',
//           }}
//         >
//           {messages.map((message, index) => (
//             <div 
//             key={index} 
//             style={{ 
//               display: 'flex', 
//               justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
//               alignItems: 'center', 
//               marginBottom: '10px' 
//             }}
//             //style={{ marginBottom: '10px', textAlign: message.type === 'sent' ? 'right' : 'left' }}
//             >
//               {message.type === 'received' && (
//                 <FcBusinessman size={30} style={{ marginRight: '10px' }} />
//               )}
//               <div style={{
//                 display: 'inline-block',
//                 backgroundColor: message.type === 'sent' ? '#1890ff' : '#f0f0f0',
//                 color: message.type === 'sent' ? '#fff' : '#000',
//                 padding: '10px',
//                 borderRadius: '10px',
//                 maxWidth: '100%',
//                 wordWrap: 'break-word'
//               }}>

//                 {message.text}
//               </div>
//             </div>
//           ))}
//           {isTyping && (
//             <div style={{ marginBottom: '10px', textAlign: 'left' }}>
//               <div style={{
//                 display: 'inline-block',
//                 backgroundColor: '#ddd',
//                 padding: '10px',
//                 borderRadius: '10px',
//                 maxWidth: '100%',
//                 wordWrap: 'break-word',
//                 fontStyle: 'italic',
//                 color: '#1890ff', // Blue color for typing indicator
//               }}>
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input field and send button */}
//         <Form
//           form={form}
//           onFinish={onFinish}
//           style={{ display: 'flex', alignItems: 'center', marginTop: '10px'}}
//         >
//           <Form.Item
//             name="message"
//             style={{ flex: 1, marginBottom: 0 }}
//           >
//             <Input

//               style={{
//                 borderRadius: '20px',
//                 padding: '10px 30px',
//                 fontSize: '16px',
//                 border: '1px solid #ddd',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                 width: '100%',
//               }}
//               placeholder='Type a message...'
//             />
//           </Form.Item>
//           <Button
//             htmlType="submit"
//             shape="circle"
//             icon={<LuSendHorizonal />}
//             style={{
//               border: 'none',
//               backgroundColor: '#1890ff',
//               color: '#fff',
//               width: '50px',
//               height: '50px',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               marginLeft: '10px', // Add some space between input and button
//             }}
//           />
//         </Form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CreateChat;

// import { Form, Input, Button } from 'antd';
// import React, { useState } from 'react';
// import { LuSendHorizonal } from "react-icons/lu";
// import { RiFolderUploadLine } from "react-icons/ri";
// import { useAppSelector } from '../../../../store/store';
// import { FcBusinessman } from "react-icons/fc";
// import ManageChat from './ManageChat';

// const CreateChat = () => {
//   const accessToken = useAppSelector(
//     (state) => state.authentication.accessToken
//   );

//   const [form] = Form.useForm();
//   const [messages, setMessages] = useState([]); // State to hold the list of messages
//   const [isTyping, setIsTyping] = useState(false); // State to manage typing indicator

//   const onFinish = (values) => {
//     if (values.message && values.message.trim()) {
//       const newMessage = { text: values.message.trim(), type: 'sent' };
//       setMessages([...messages, newMessage]);
//       form.resetFields(); // Reset the input field after submission
//       simulateReceiveMessage();
//     }
//   };

//   const simulateReceiveMessage = () => {
//     setIsTyping(true); // Show typing indicator
//     setTimeout(() => {
//       setIsTyping(false); // Hide typing indicator
//       const responseMessage = { text: 'This is a response message!', type: 'received' };
//       setMessages((prevMessages) => [...prevMessages, responseMessage]);
//     }, 2000); // Simulate a 2-second delay for typing indicator
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', display: 'flex', }}>
//       <div>
//         <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Member</h1>
//         <ManageChat />
//       </div>

//       <div>
//         <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Chat with us</h1>
//         <div
//           style={{
//             border: '1px solid #ddd',
//             width: '400px',
//             paddingLeft: '30px',
//             borderRadius: '10px',
//             minHeight: '600px',
//             marginBottom: '20px',
//             height: "80vh",
//             overflow: "auto",
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//           }}
//         >
//           <div
//             style={{
//               flex: 1,
//               overflowY: 'auto',
//               marginBottom: '20px',
//             }}
//           >
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: 'flex',
//                   justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
//                   alignItems: 'center',
//                   marginBottom: '10px'
//                 }}
//               >
//                 {message.type === 'received' && (
//                   <FcBusinessman size={30} style={{ marginRight: '10px' }} />
//                 )}
//                 <div style={{
//                   display: 'inline-block',
//                   backgroundColor: message.type === 'sent' ? '#1890ff' : '#f0f0f0',
//                   color: message.type === 'sent' ? '#fff' : '#000',
//                   padding: '10px',
//                   borderRadius: '10px',
//                   maxWidth: '100%',
//                   wordWrap: 'break-word'
//                 }}>
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div style={{ marginBottom: '10px', textAlign: 'left' }}>
//                 <div style={{
//                   display: 'inline-block',
//                   backgroundColor: '#ddd',
//                   padding: '10px',
//                   borderRadius: '10px',
//                   maxWidth: '100%',
//                   wordWrap: 'break-word',
//                   fontStyle: 'italic',
//                   color: '#1890ff',
//                 }}>
//                   Typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           <Form
//             form={form}
//             onFinish={onFinish}
//             style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
//           >
//             <Form.Item
//               name="message"
//               style={{ flex: 1, marginBottom: 0 }}
//             >
//               <Input
//                 style={{
//                   borderRadius: '20px',
//                   padding: '10px 30px',
//                   fontSize: '16px',
//                   margin: "10px",
//                   border: '1px solid #ddd',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                   width: '100%',
//                 }}
//                 placeholder='Type a message...'
//                 prefix={<RiFolderUploadLine style={{ marginRight: '10px' }} />} // Added upload icon
//               />
//             </Form.Item>
//             <Button
//               htmlType="submit"
//               shape="circle"
//               icon={<LuSendHorizonal />}
//               style={{
//                 border: 'none',
//                 backgroundColor: '#1890ff',
//                 color: '#fff',
//                 width: '50px',
//                 margin: "10px",
//                 height: '50px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                 marginLeft: '10px',
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateChat;

import { Form, Input, Button, Upload, Card } from 'antd';
import React, { useState } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { RiFolderUploadLine } from "react-icons/ri";
import { useAppSelector } from '../../../../store/store';
import { FcBusinessman } from "react-icons/fc";
import ManageChat from '../ManageChat/ManageChat';

const CreateChat = () => {
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );

  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const onFinish = (values) => {
    if (values.message && values.message.trim()) {
      const newMessage = {
        text: values.message.trim(),
        type: 'sent',
        isImage: !!imagePreview,
        image: imagePreview // Store the image data in the message object
      };
      setMessages([...messages, newMessage]);
      form.resetFields();
      setImagePreview(null); // Clear imagePreview after sending the message
      simulateReceiveMessage();
    }
  };

  const simulateReceiveMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage = { text: 'This is a response message!', type: 'received' };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 2000);
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', display: 'flex' }}>
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Member</h1>
        <ManageChat />
      </div>

      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>Chat with us</h1>
        <div
          style={{
            border: '1px solid #ddd',
            width: '400px',
            padding: '10px',
            borderRadius: '10px',
            minHeight: '600px',
            marginBottom: '20px',
            height: "80vh",
            overflow: "auto",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '20px',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                {message.type === 'received' && (
                  <FcBusinessman size={30} style={{ marginRight: '10px' }} />
                )}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Change to column to separate image and text
                  backgroundColor: message.type === 'sent' ? '#1890ff' : '#f0f0f0',
                  color: message.type === 'sent' ? '#fff' : '#000',
                  borderRadius: '10px',
                  padding: '10px',
                  maxWidth: '70%', // Adjusted for better display
                  wordWrap: 'break-word',
                }}>
                  {message.isImage && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '150px',  // Adjust this to control the image size
                        borderRadius: '10px',
                        marginBottom: '5px', // Add margin to separate the text
                        backgroundColor: 'transparent' // Ensure no background color is applied to the image
                      }}
                    />
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#ddd',
                  padding: '10px',
                  borderRadius: '10px',
                  maxWidth: '100%',
                  wordWrap: 'break-word',
                  fontStyle: 'italic',
                  color: '#1890ff',
                }}>
                  Typing...
                </div>
              </div>
            )}
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
          >
            <Card
              style={{
                borderRadius: 'none',
                border: 'none',
                width: '20%',
                alignItems: "center"
              }}
            >
              <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
              >
                <RiFolderUploadLine style={{ width: "25px", height: "30px", cursor: 'pointer' }} />
              </Upload>
            </Card>

            <Form.Item
              name="message"
              style={{ flex: 1, marginBottom: 0, display: 'flex', alignItems: 'center' }}
            >
              <Input
                style={{ border: "1px solid #ddd", paddingLeft: imagePreview ? '10px' : '0px', height: "50px", padding:"20px" }}
                placeholder='Type a message...'
                prefix={
                  imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px', borderRadius: '5px' }} // Reduced size
                    />
                  )
                }
              />
            </Form.Item>


            <Button
              htmlType="submit"
              shape="circle"
              icon={<LuSendHorizonal />}
              style={{
                border: 'none',
                backgroundColor: '#1890ff',
                color: '#fff',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginLeft: '10px',
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
