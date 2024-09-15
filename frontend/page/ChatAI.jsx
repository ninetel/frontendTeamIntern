// src/ChatAI.js
import React, { useEffect, useState } from 'react';

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173/chatai', 'http://localhost:3000'];
import ChatAII from "../src/components/templates/ChatAII/ChatAII"
const ChatAI = () => {
  const [isAllowed, setIsAllowed] = useState(false);

  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    const parentUrl = document.referrer;
    setReferrer(parentUrl);
    if (allowedOrigins.some(origin => parentUrl.startsWith(origin))) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, []);


  if (!isAllowed && referrer) {
    return <div>Access denied:          <p>Referrer URL: {referrer}</p>
</div>;
  }

  return (
    <div >
      <ChatAII />
    </div>
  );
};

export default ChatAI;
