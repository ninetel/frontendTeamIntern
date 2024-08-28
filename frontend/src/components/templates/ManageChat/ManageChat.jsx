// import React from 'react';
// import { Card } from 'antd';

// const ManageChat = () => {
//     const Member = [
//         {
//             username: "ram",
//             message: "hello, this is a short message.",
//             time: 20240826162526,
//         },
//         {
//             username: "ra1m",
//             message: "hello1, this message is a bit longer and might cause overflow depending on the card size.",
//             time: 20240826162536,
//         },
//         {
//             username: "ram2",
//             message: "hello2, this is another message that could potentially overflow the card if it's too long.",
//             time: 20240826162543,
//         },
//         {
//             username: "ram3",
//             message: "hello3, short message.",
//             time: 20240826162559,
//         },
//         {
//             username: "ram4",
//             message: "hello4, this message is quite long and should demonstrate how overflow is handled in this card. Let's see how it appears in the UI.",
//             time: 20240826162559,
//         },
//     ];

//     // Sort the Member array by time in descending order
//     const sortedMembers = [...Member].sort((a, b) => b.time - a.time);

//     return (
//         <Card
//             style={{
//                 border: '1px solid #ddd',
//                 width: '400px',
//                 borderRadius: '10px',
//                 minHeight: '600px',
//                 marginBottom: '10px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 height: "80vh",
//                 overflow: "auto",
//                 padding: '10px', // Added padding for the overall card
//             }}
//         >
//             {sortedMembers.map((member, index) => (
//                 <Card
//                     key={index}
//                     style={{
//                         boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                         width: "100%",
//                         margin: '10px',
//                         padding: '10px',
//                         wordWrap: 'break-word', // Wrap text to avoid overflow
//                         whiteSpace: 'normal',  // Allow normal wrapping of text
//                         overflow: 'hidden',    // Hide any overflowed content
//                         textOverflow: 'ellipsis', // Add ellipsis for overflowed text
//                     }}
//                 >
//                     <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{member.username}</p>
//                     <p style={{
//                         color:"gray",
//                         whiteSpace: 'nowrap',       // Prevents text from wrapping
//                         overflow: 'hidden',         // Hides the overflowed text
//                         textOverflow: 'ellipsis',   // Adds "..." at the end of the overflowed text
//                         maxWidth: '100%',}}
//                          >{member.message}</p>
//                 </Card>
//             ))}
//         </Card>
//     );
// };

//export default ManageChat;

import React from 'react';
import { Card } from 'antd';

const ManageChat = () => {
  const members = [
    {
      username: "ram",
      message: "Hello, this is a short message.",
      time: 20240826162526,
    },
    {
      username: "ra1m",
      message: "Hello1, this message is a bit longer and might cause overflow depending on the card size.",
      time: 20240826162536,
    },
    {
      username: "ram2",
      message: "Hello2, this is another message that could potentially overflow the card if it's too long.",
      time: 20240826162543,
    },
    {
      username: "ram3",
      message: "Hello3, short message.",
      time: 20240826162559,
    },
    {
      username: "ram4",
      message: "Hello4, this message is quite long and should demonstrate how overflow is handled in this card. Let's see how it appears in the UI.",
      time: 20240826162559,
    },
  ];

  // Sort the members array by time in descending order
  const sortedMembers = [...members].sort((a, b) => b.time - a.time);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 text-center">Member List</h2>
      </div>
      <div className="p-4 overflow-y-auto h-[600px] space-y-4">
        {sortedMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="font-semibold text-gray-900">{member.username}</p>
            <p className="text-gray-600 truncate">{member.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageChat;

