// src/ChatAI.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatAII from "../src/components/templates/ChatAII/ChatAII";

const ChatAI = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [referrer, setReferrer] = useState('');
  const [allowedOrigins, setAllowedOrigins] = useState([]); // Ensure this is an array

  useEffect(() => {
    const fetchAllowedOrigins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/urls/allowed-origins'); // Adjust the URL if necessary
        console.log('Allowed Origins Response:', response.data); // Log the response
        setAllowedOrigins(response.data);
      } catch (error) {
        console.error('Failed to fetch allowed origins:', error);
      }
    };

    fetchAllowedOrigins();
    {console.log(allowedOrigins)}
  }, []);

  useEffect(() => {
    const parentUrl = document.referrer;
    setReferrer(parentUrl);

    // Check if allowedOrigins is an array and perform the check
    if (Array.isArray(allowedOrigins) && allowedOrigins.length > 0 && allowedOrigins.some(origin => parentUrl.startsWith(origin))) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

  }, [allowedOrigins]);

  if (!isAllowed && referrer) {
    return (
      <div>
        Access denied:
        <p>Referrer URL: {referrer}</p>
      </div>
    );
  }
 
  return (
    <div>
      <ChatAII />
    </div>
  );
};

export default ChatAI;
