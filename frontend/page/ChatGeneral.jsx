// src/CreateGeneral.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateGenerall from "../src/components/templates/CreateGenerall/CreateGenerall";

const CreateGeneral = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [referrer, setReferrer] = useState('');
  const [allowedOrigins, setAllowedOrigins] = useState([]);

  useEffect(() => {
    const fetchAllowedOrigins = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/urls/allowed-origins`); // Adjust the URL if necessary
        setAllowedOrigins(response.data);
      } catch (error) {
        console.error('Failed to fetch allowed origins:', error);
      }
    };

    fetchAllowedOrigins();
  }, []);

  useEffect(() => {
    const parentUrl = document.referrer;
    setReferrer(parentUrl);
    if (allowedOrigins.some(origin => parentUrl.startsWith(origin))) {
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
      <CreateGenerall />
    </div>
  );
};

export default CreateGeneral;
