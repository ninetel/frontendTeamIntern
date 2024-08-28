import { Card } from 'antd';
import React from 'react';

const BulkMessage = () => {
  return (
    <Card className='w-1/2 h-1/2 flex flex-row'>
      <Card className='w-full h-1/2 mb-2'>
        {/* Content for the first card */}
      </Card>

      <Card className='w-full h-1/2'>
        {/* Content for the second card */}
      </Card>
    </Card>
  );
};

export default BulkMessage;
