// import { Card } from 'antd';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ExistingContactList = () => {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     const fetchContactTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/contacts/types");
//         const uniqueTypes = Array.from(new Set(response.data.map(item => item.contactType))); // Ensure unique types
//         setOptions(uniqueTypes);
//       } catch (err) {
//         console.error("Error fetching contact types:", err);
//       }
//     };

//     fetchContactTypes();
//   }, []);

//   return (
//     <div>
//       {options.map((option, index) => (
//     <Card key={index} 
//          style={{
//             boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//             width: "100%",
//             margin: '10px',
//             padding: '10px',
//             wordWrap: 'break-word', // Wrap text to avoid overflow
//             whiteSpace: 'normal',  // Allow normal wrapping of text
//             overflow: 'hidden',    // Hide any overflowed content
//             textOverflow: 'ellipsis', // Add ellipsis for overflowed text
//         }}>
//             <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{option.contactType}</p>
       
          
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default ExistingContactList;


import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExistingContactList = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts/types");
        const uniqueTypes = Array.from(new Set(response.data.map(item => item.contactType))); // Ensure unique types
        setOptions(uniqueTypes);
      } catch (err) {
        console.error("Error fetching contact types:", err);
      }
    };

    fetchContactTypes();
  }, []);
//  const option =[
    
//         "saas",

    
    
//         "personal"

//     ,
    
//         "hello"

//     ,
    
//         "hello5"

//     ,
    
//         "hello2"

//     ,
//         "hello3"

    
//  ]

  return (
    <Card
            style={{
                border: '1px solid #ddd',
                width: '400px',
                borderRadius: '10px',
                minHeight: '600px',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: "80vh",
                overflow: "auto",
                padding: '10px', // Added padding for the overall card
            }}
        >
      {options.map((option, index) => (
        <Card
          key={index}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: "100%",
            margin: '10px',
            padding: '10px',
            wordWrap: 'break-word', // Wrap text to avoid overflow
            whiteSpace: 'normal',  // Allow normal wrapping of text
            overflow: 'hidden',    // Hide any overflowed content
            textOverflow: 'ellipsis', // Add ellipsis for overflowed text
          }}
        >
          <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{option}</p>
        </Card>
      ))}
    </Card>
  );
}

export default ExistingContactList;
