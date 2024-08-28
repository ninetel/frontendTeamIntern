// import { Form, Input, Button, Upload, Card } from 'antd';
// import React, { useState } from 'react';
// import { LuSendHorizonal } from "react-icons/lu";
// import { RiFolderUploadLine } from "react-icons/ri";
// import { useAppSelector } from '../../../../store/store';
// import { FcBusinessman } from "react-icons/fc";
// import ManageChat from '../ManageChat/ManageChat';

// const CreateChat = () => {
//   const accessToken = useAppSelector(
//     (state) => state.authentication.accessToken
//   );

//   const [form] = Form.useForm();
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   const onFinish = (values) => {
//     if (values.message && values.message.trim()) {
//       const newMessage = {
//         text: values.message.trim(),
//         type: 'sent',
//         isImage: !!imagePreview,
//         image: imagePreview // Store the image data in the message object
//       };
//       setMessages([...messages, newMessage]);
//       form.resetFields();
//       setImagePreview(null); // Clear imagePreview after sending the message
//       simulateReceiveMessage();
//     }
//   };

//   const simulateReceiveMessage = () => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setIsTyping(false);
//       const responseMessage = { text: 'This is a response message!', type: 'received' };
//       setMessages((prevMessages) => [...prevMessages, responseMessage]);
//     }, 2000);
//   };

//   const handleUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//     return false;
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto', display: 'flex' }}>
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
//             padding: '10px',
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
//                   display: 'flex',
//                   flexDirection: 'column', // Change to column to separate image and text
//                   backgroundColor: message.type === 'sent' ? '#1890ff' : '#f0f0f0',
//                   color: message.type === 'sent' ? '#fff' : '#000',
//                   borderRadius: '10px',
//                   padding: '10px',
//                   maxWidth: '70%', // Adjusted for better display
//                   wordWrap: 'break-word',
//                 }}>
//                   {message.isImage && (
//                     <img
//                       src={message.image}
//                       alt="Uploaded"
//                       style={{
//                         maxWidth: '100%',
//                         maxHeight: '150px',  // Adjust this to control the image size
//                         borderRadius: '10px',
//                         marginBottom: '5px', // Add margin to separate the text
//                         backgroundColor: 'transparent' // Ensure no background color is applied to the image
//                       }}
//                     />
//                   )}
//                   <span>{message.text}</span>
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
//             <Card
//               style={{
//                 borderRadius: 'none',
//                 border: 'none',
//                 width: '20%',
//                 alignItems: "center"
//               }}
//             >
//               <Upload
//                 beforeUpload={handleUpload}
//                 showUploadList={false}
//               >
//                 <RiFolderUploadLine style={{ width: "25px", height: "30px", cursor: 'pointer' }} />
//               </Upload>
//             </Card>

//             <Form.Item
//               name="message"
//               style={{ flex: 1, marginBottom: 0, display: 'flex', alignItems: 'center' }}
//             >
//               <Input
//                 style={{ border: "1px solid #ddd", paddingLeft: imagePreview ? '10px' : '0px', height: "50px", padding:"20px" }}
//                 placeholder='Type a message...'
//                 prefix={
//                   imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px', borderRadius: '5px' }} // Reduced size
//                     />
//                   )
//                 }
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
//                 width: '40px',
//                 height: '40px',
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

// import { Form, Input, Button, Upload, Card } from 'antd';
// import React, { useState } from 'react';
// import { LuSendHorizonal } from "react-icons/lu";
// import { RiFolderUploadLine } from "react-icons/ri";
// import { useAppSelector } from '../../../../store/store';
// import { FcBusinessman } from "react-icons/fc";
// import ManageChat from '../ManageChat/ManageChat';

// const CreateChat = () => {
//   const accessToken = useAppSelector(
//     (state) => state.authentication.accessToken
//   );

//   const [form] = Form.useForm();
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   const onFinish = (values) => {
//     if (values.message && values.message.trim()) {
//       const newMessage = {
//         text: values.message.trim(),
//         type: 'sent',
//         isImage: !!imagePreview,
//         image: imagePreview
//       };
//       setMessages([...messages, newMessage]);
//       form.resetFields();
//       setImagePreview(null);
//       simulateReceiveMessage();
//     }
//   };

//   const simulateReceiveMessage = () => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setIsTyping(false);
//       const responseMessage = { text: 'This is a response message!', type: 'received' };
//       setMessages((prevMessages) => [...prevMessages, responseMessage]);
//     }, 2000);
//   };

//   const handleUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//     return false;
//   };

//   return (
//     <div className="p-5 max-w-7xl mx-auto flex gap-8">
//       <div className="w-1/4 bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-center font-bold text-xl mb-6 text-green-600">Members</h1>
//         <ManageChat />
//       </div>

//       <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 flex flex-col">
//         <h1 className="text-center font-bold text-xl mb-6 text-green-600">Chat with Us</h1>
//         <div className="flex-1 overflow-hidden border border-gray-200 rounded-lg flex flex-col justify-between">
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex mb-4 ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
//               >
//                 {message.type === 'received' && (
//                   <FcBusinessman size={30} className="mr-2" />
//                 )}
//                 <div className={`relative px-4 py-3 rounded-xl max-w-[70%] break-words shadow ${message.type === 'sent' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}>
//                   {message.isImage && (
//                     <img
//                       src={message.image}
//                       alt="Uploaded"
//                       className="max-w-full max-h-[150px] rounded-lg mb-2 bg-transparent shadow"
//                     />
//                   )}
//                   <span>{message.text}</span>
//                   <div className="absolute top-[-10px] right-[-10px] bg-white text-green-500 font-bold p-1 rounded-full shadow-lg">{index + 1}</div>
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="mb-4 text-left">
//                 <div className="inline-block bg-gray-300 px-4 py-2 rounded-lg max-w-full break-words italic text-green-500 shadow">
//                   Typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           <Form
//             form={form}
//             onFinish={onFinish}
//             className="flex items-center p-4 bg-white border-t border-gray-200"
//           >
//             <Upload
//               beforeUpload={handleUpload}
//               showUploadList={false}
//             >
//               <Button
//                 className="mr-4 border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
//                 icon={<RiFolderUploadLine className="w-6 h-6" />}
//               />
//             </Upload>

//             <Form.Item
//               name="message"
//               className="flex-1 mb-0"
//             >
//               <Input
//                 className={`h-12 rounded-lg border border-gray-300 px-4 shadow-inner focus:ring-2 focus:ring-blue-500 ${imagePreview ? 'pl-3' : ''}`}
//                 placeholder='Type a message...'
//                 prefix={
//                   imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="max-w-[30px] max-h-[30px] mr-2 rounded-sm"
//                     />
//                   )
//                 }
//               />
//             </Form.Item>

//             <Button
//               htmlType="submit"
//               shape="circle"
//               icon={<LuSendHorizonal className="text-white" />}
//               className="ml-4 bg-green-500 hover:bg-green-600 border-none text-white w-12 h-12 flex justify-center items-center shadow-md transform hover:scale-105 transition-transform"
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
import { LuSendHorizonal } from "react-icons/lu"; // Importing the icon
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
        image: imagePreview
      };
      setMessages([...messages, newMessage]);
      form.resetFields();
      setImagePreview(null);
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
    <div className="p-5 max-w-7xl mx-auto flex gap-8">
      <div className="w-1/4 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center font-bold text-xl mb-6 text-green-600">Members</h1>
        <ManageChat />
      </div>

      <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <h1 className="text-center font-bold text-xl mb-6 text-green-600">Chat with Us</h1>
        <div className="flex-1 overflow-hidden border border-gray-200 rounded-lg flex flex-col justify-between">
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'received' && (
                  <FcBusinessman size={30} className="mr-2" />
                )}
                <div className={`relative px-4 py-3 rounded-xl max-w-[70%] break-words shadow ${message.type === 'sent' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {message.isImage && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      className="max-w-full max-h-[150px] rounded-lg mb-2 bg-transparent shadow"
                    />
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block bg-gray-300 px-4 py-2 rounded-lg max-w-full break-words italic text-green-500 shadow">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            className="flex items-center p-4 bg-white border-t border-gray-200"
          >
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
            >
              <Button
                className="mr-4 border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                icon={<RiFolderUploadLine className="w-6 h-6 text-gray-800 hover:text-green-500 transition-colors" />}
              />
            </Upload>

            <Form.Item
              name="message"
              className="flex-1 mb-0"
            >
              <Input
                className={`h-12 rounded-lg border border-gray-300 px-4 shadow-inner focus:ring-2 focus:ring-blue-500 ${imagePreview ? 'pl-3' : ''}`}
                placeholder='Type a message...'
                prefix={
                  imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-[30px] max-h-[30px] mr-2 rounded-sm"
                    />
                  )
                }
              />
            </Form.Item>

            <Button
              htmlType="submit"
              shape="rectangle"
              icon={<LuSendHorizonal />} // Increase size here
              className="ml-4 bg-green-500 hover:bg-green-600 border-none text-white w-12 h-12 flex justify-center items-center shadow-md transform hover:scale-105 transition-transform"
              size={40}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;