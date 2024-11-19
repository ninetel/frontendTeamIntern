

import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';

const TradeForm = ({ tradeData = {} }) => {
  const {
    buyRange = { to: 18, from: 12, conditions: 'dfn' },
    buyRange2 = { to: 78, from: 35, conditions: 'jdfkjs' },
    buyRange3 = { to: 35, from: 24, conditions: 'sndfbksdb' },
    stopLossBelow = { value: 34, conditions: 'nsdfsdn' },
    tpRange1 = { to: 53, from: 24, conditions: 'ndsfsndfjk' },
    tpRange2 = { to: 1, from: 4, conditions: 'sdjfnsdk' },
    tpRange3 = { to: 14, from: 1, conditions: 'jfdsdkfb' },
    scrip = { symbol: 'AHL', companyName: 'Asian Hydropower Limited' },
    holdingPeriod = '14',
    ...rest
  } = tradeData;

  const handleFinish = (values) => {
    // console.log('Form values:', values);
  };

  return (
    <Card title="Trade Form" bordered={false} style={{ maxWidth: 900, margin: 'auto' }}>
      <Form
        layout="vertical"
        initialValues={{
          ...rest,
          buyRangeTo: buyRange.to,
          buyRangeFrom: buyRange.from,
          buyRangeConditions: buyRange.conditions,
          buyRange2To: buyRange2.to,
          buyRange2From: buyRange2.from,
          buyRange2Conditions: buyRange2.conditions,
          buyRange3To: buyRange3.to,
          buyRange3From: buyRange3.from,
          buyRange3Conditions: buyRange3.conditions,
          stopLossValue: stopLossBelow.value,
          stopLossConditions: stopLossBelow.conditions,
          tpRange1To: tpRange1.to,
          tpRange1From: tpRange1.from,
          tpRange1Conditions: tpRange1.conditions,
          tpRange2To: tpRange2.to,
          tpRange2From: tpRange2.from,
          tpRange2Conditions: tpRange2.conditions,
          tpRange3To: tpRange3.to,
          tpRange3From: tpRange3.from,
          tpRange3Conditions: tpRange3.conditions,
          scripSymbol: scrip.symbol,
          scripCompanyName: scrip.companyName,
          holdingPeriod,
        }}
        onFinish={handleFinish}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Symbol" name="scripSymbol">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Scrip Company Name" name="scripCompanyName">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Holding Period" name="holdingPeriod">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range From" name="buyRangeFrom">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range To" name="buyRangeTo">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range Conditions" name="buyRangeConditions">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 From" name="buyRange2From">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 To" name="buyRange2To">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 2 Conditions" name="buyRange2Conditions">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 From" name="buyRange3From">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 To" name="buyRange3To">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Buy Range 3 Conditions" name="buyRange3Conditions">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Value" name="stopLossValue">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Stop Loss Conditions" name="stopLossConditions">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 From" name="tpRange1From">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 To" name="tpRange1To">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 1 Conditions" name="tpRange1Conditions">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 From" name="tpRange2From">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 To" name="tpRange2To">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 2 Conditions" name="tpRange2Conditions">
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 From" name="tpRange3From">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 To" name="tpRange3To">
              <Input disabled/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Take Profit Range 3 Conditions" name="tpRange3Conditions">
              <Input disabled/>
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
