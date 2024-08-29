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
        <div className={`w-3/4 h-3/4 flex flex-col justify-center items-center bg-white border-2 border-gray-300 shadow-lg rounded-xl p-8 m-10 ${isModalVisible ? 'backdrop-blur-sm' : ''}`}>
            <div className='w-full flex justify-between items-start space-x-8'>
                <div className='w-1/2 flex flex-col space-y-6'>
                    {/* <Card className='shadow-sm'>
                        <div className="flex justify-center">
                            <Upload>
                                <Button icon={<UploadOutlined />} className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700">
                                    Upload File
                                </Button>
                            </Upload>
                        </div>
                    </Card> */}
                    <Card className='shadow-sm'>
                        <Button className='w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 border-dotted' onClick={showModal}>
                            Choose from existing contacts
                        </Button>
                    </Card>
                </div>

                <div className='w-1/2 flex flex-col space-y-4'>
                    <h1 className='text-center font-semibold text-2xl text-gray-700'>Message</h1>
                    <Input.TextArea rows={10} placeholder="Enter your message here..." className="p-4 text-gray-700 border-gray-300 rounded-md focus:ring focus:ring-blue-200" />
                </div>
            </div>

            <div className='flex justify-center space-x-20 m-10'>
                <Button
                    type="primary"
                    className='bg-green-500 hover:bg-green-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
                    icon={<FaWhatsapp className='mr-2' />}
                >
                    WhatsApp
                </Button>
                <Button
                    type="primary"
                    className='bg-blue-500 hover:bg-blue-600 text-white flex items-center px-6 py-2 rounded-full shadow-sm'
                    icon={<FaTelegramPlane className='mr-2' />}
                >
                    Telegram
                </Button>
            </div>

            {/* Modal for ExistingContactList */}
            <Modal
                open={isModalVisible}  // Replaced 'visible' with 'open'
                onCancel={hideModal}
                footer={null}
                centered
                bodyStyle={{ padding: 0 }}
                maskClosable={false}
                className="rounded-lg overflow-hidden"
            >
                <ExistingContactList onClose={hideModal} />
            </Modal>
        </div>
    );
};

export default BulkMessage;

