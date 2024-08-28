import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExistingContactList = () => {
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   const fetchContactTypes = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/contacts/types");
  //       console.log("Fetched data:", response.data);
  //       const uniqueTypes = Array.from(new Set(response.data.map(item => item.contactType)));
  //       setOptions(uniqueTypes);
  //     } catch (err) {
  //       console.error("Error fetching contact types:", err);
  //     }
  //   };

  //   fetchContactTypes();
  // }, []);

  const option = ["saas","personal","hello","hello5","hello2","hello3" ]

  return (
    <Card
      className="border border-gray-300 rounded-lg shadow-lg p-4 overflow-auto max-h-[80vh] bg-white"
    >
      {option.map((option, index) => (
        <Card
          key={index}
          className="shadow-sm my-2 p-3 border border-gray-200 rounded-md hover:shadow-md transition-shadow duration-300"
        >
          <p className="font-semibold text-gray-800">{option}</p>
        </Card>
      ))}
    </Card>
  );
}

export default ExistingContactList;
