// src/components/ButtonComponent.js
import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ type, onClick, children, style }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
