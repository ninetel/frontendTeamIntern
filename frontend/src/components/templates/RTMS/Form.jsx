// import React from 'react';
// import { Form, Input, Button, DatePicker, Row, Col } from 'antd';

// const TradeForm = ({ tradeData = {} }) => {
//   const {
//     buyRange = {},
//     buyRange2 = {},
//     buyRange3 = {},
//     stopLossBelow = {},
//     tpRange1 = {},
//     tpRange2 = {},
//     tpRange3 = {},
//     scrip = {},
//     createdAt = '',
//     updatedAt = '',
//     ...rest
//   } = tradeData;

//   return (
//     <Form
//       layout="vertical"
//       initialValues={{
//         ...rest,
//         buyRangeTo: buyRange.to || '',
//         buyRangeFrom: buyRange.from || '',
//         buyRangeConditions: buyRange.conditions || '',
//         buyRange2To: buyRange2.to || '',
//         buyRange2From: buyRange2.from || '',
//         buyRange2Conditions: buyRange2.conditions || '',
//         buyRange3To: buyRange3.to || '',
//         buyRange3From: buyRange3.from || '',
//         buyRange3Conditions: buyRange3.conditions || '',
//         stopLossValue: stopLossBelow.value || '',
//         stopLossConditions: stopLossBelow.conditions || '',
//         tpRange1To: tpRange1.to || '',
//         tpRange1From: tpRange1.from || '',
//         tpRange1Conditions: tpRange1.conditions || '',
//         tpRange2To: tpRange2.to || '',
//         tpRange2From: tpRange2.from || '',
//         tpRange2Conditions: tpRange2.conditions || '',
//         tpRange3To: tpRange3.to || '',
//         tpRange3From: tpRange3.from || '',
//         tpRange3Conditions: tpRange3.conditions || '',
//         scripSymbol: scrip.symbol || '',
//         scripCompanyName: scrip.companyName || '',
//         // createdAt: createdAt ? new Date(createdAt).toISOString().slice(0, 10) : '',
//         // updatedAt: updatedAt ? new Date(updatedAt).toISOString().slice(0, 10) : ''
//       }}
//     >
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Scrip Symbol" name="scripSymbol">
//             <Input  />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Scrip Company Name" name="scripCompanyName">
//             <Input  />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Holding Period" name="holdingPeriod">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range From" name="buyRangeFrom">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range To" name="buyRangeTo">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range Conditions" name="buyRangeConditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 2 From" name="buyRange2From">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 2 To" name="buyRange2To">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 2 Conditions" name="buyRange2Conditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 3 From" name="buyRange3From">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 3 To" name="buyRange3To">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Buy Range 3 Conditions" name="buyRange3Conditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Stop Loss Value" name="stopLossValue">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Stop Loss Conditions" name="stopLossConditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 1 From" name="tpRange1From">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 1 To" name="tpRange1To">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 1 Conditions" name="tpRange1Conditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 2 From" name="tpRange2From">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 2 To" name="tpRange2To">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 2 Conditions" name="tpRange2Conditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 3 From" name="tpRange3From">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 3 To" name="tpRange3To">
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12} md={8}>
//           <Form.Item label="Take Profit Range 3 Conditions" name="tpRange3Conditions">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       {/* <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12}>
//           <Form.Item label="Created At" name="createdAt">
//             <DatePicker format="YYYY-MM-DD"  />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={12}>
//           <Form.Item label="Updated At" name="updatedAt">
//             <DatePicker format="YYYY-MM-DD" disabled />
//           </Form.Item>
//         </Col>
//       </Row> */}

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="w-full">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default TradeForm;

import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';

const TradeForm = ({ tradeData = {} }) => {
  const {
    buyRange = {},
    buyRange2 = {},
    buyRange3 = {},
    stopLossBelow = {},
    tpRange1 = {},
    tpRange2 = {},
    tpRange3 = {},
    scrip = {},
    createdAt = '',
    updatedAt = '',
    ...rest
  } = tradeData;

  return (
    <Card title="Trade Form" bordered={false} style={{ maxWidth: 900, margin: 'auto' }}>
      <Form
        layout="vertical"
        initialValues={{
          ...rest,
          buyRangeTo: buyRange.to || '',
          buyRangeFrom: buyRange.from || '',
          buyRangeConditions: buyRange.conditions || '',
          buyRange2To: buyRange2.to || '',
          buyRange2From: buyRange2.from || '',
          buyRange2Conditions: buyRange2.conditions || '',
          buyRange3To: buyRange3.to || '',
          buyRange3From: buyRange3.from || '',
          buyRange3Conditions: buyRange3.conditions || '',
          stopLossValue: stopLossBelow.value || '',
          stopLossConditions: stopLossBelow.conditions || '',
          tpRange1To: tpRange1.to || '',
          tpRange1From: tpRange1.from || '',
          tpRange1Conditions: tpRange1.conditions || '',
          tpRange2To: tpRange2.to || '',
          tpRange2From: tpRange2.from || '',
          tpRange2Conditions: tpRange2.conditions || '',
          tpRange3To: tpRange3.to || '',
          tpRange3From: tpRange3.from || '',
          tpRange3Conditions: tpRange3.conditions || '',
          scripSymbol: scrip.symbol || '',
          scripCompanyName: scrip.companyName || '',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Symbol" name="scripSymbol">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Company Name" name="scripCompanyName">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Holding Period" name="holdingPeriod">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range From" name="buyRangeFrom">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range To" name="buyRangeTo">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range Conditions" name="buyRangeConditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 From" name="buyRange2From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 To" name="buyRange2To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 Conditions" name="buyRange2Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 From" name="buyRange3From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 To" name="buyRange3To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 Conditions" name="buyRange3Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Value" name="stopLossValue">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Conditions" name="stopLossConditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 From" name="tpRange1From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 To" name="tpRange1To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 Conditions" name="tpRange1Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 From" name="tpRange2From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 To" name="tpRange2To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 Conditions" name="tpRange2Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 From" name="tpRange3From">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 To" name="tpRange3To">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 Conditions" name="tpRange3Conditions">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TradeForm;
