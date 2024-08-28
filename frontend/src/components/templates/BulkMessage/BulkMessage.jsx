// import { Card, Upload, Button, Input } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
// import React from 'react';

// const BulkMessage = () => {
//   return (
//     <div className='w-3/4 h-3/4 flex justify-around items-center border-2 border-gray-600 m-20 rounded-lg'>
//       <div className='w-full h-1/2 border-2 border-gray-400 m-10'>
//         <Card className='m-10'>
//           <Upload>
//             <Button icon={<UploadOutlined />}>Upload File 1</Button>
//           </Upload>
//         </Card>
//         <Card className='m-10'>
//           <Upload>
//             <Button icon={<UploadOutlined />}>Upload File 2</Button>
//           </Upload>
//         </Card>
//       </div>

//       <div className='w-full h-1/2 border-2 border-gray-400 m-10 flex flex-col justify-between'>
//         <Input.TextArea  rows={12} placeholder="Enter your message here..." />
//         <div className='flex justify-around mt-4'>
         
//         </div>
       
//       </div>
      
//       <Button
//             type="primary"
//             className='bg-green-500 border-none flex items-center'
//             icon={<FaWhatsapp />}
//           >
//             WhatsApp
//           </Button>
//           <Button
//             type="primary"
//             className='bg-blue-500 border-none flex items-center'
//             icon={<FaTelegramPlane />}
//           >
//             Telegram
//           </Button>
//       </div>
   
//   );
// };

// export default BulkMessage;


import { Card, Upload, Button, Input, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import React, { useState } from 'react';
import ExistingContactList from './ExistingContactList';

const BulkMessage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={`w-3/4 h-3/4 flex flex-col justify-center items-center border-2 border-gray-600 m-20 rounded-lg ${isModalVisible ? 'backdrop-blur-sm' : ''}`}>
            <div className='w-full h-full flex justify-around items-center m-10'>
                <div className='w-full h-full border-2 border-gray-400 m-10'>
                    <Card className='m-20'>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Card>
                    <Card className='m-20'>
                        <Button className='border-dotted' onClick={showModal}>
                            Choose from existing contact model
                        </Button>
                    </Card>
                </div>

                <div className='w-full h-full m-8 flex flex-col justify-between'>
                    <h1 className='text-center font-bold text-xl'>Message here</h1>
                    <Input.TextArea rows={15} placeholder="Enter your message here..." />
                </div>
            </div>

            <div className='flex m-5'>
                <Button
                    type="primary"
                    className='bg-green-500 border-none flex items-center'
                    icon={<FaWhatsapp />}
                >
                    WhatsApp
                </Button>
                <Button
                    type="primary"
                    className='bg-blue-500 border-none flex items-center ml-4'
                    icon={<FaTelegramPlane />}
                >
                    Telegram
                </Button>
            </div>

            {/* Modal for ExistingContactList */}
            <Modal
                visible={isModalVisible}
                onCancel={hideModal}
                footer={null}
                centered
                bodyStyle={{ padding: 0 }}
                maskClosable={false}
            >
                <ExistingContactList onClose={hideModal} />
            </Modal>
        </div>
    );
};

export default BulkMessage;
