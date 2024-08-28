import React from "react";
import { Form, Input, Select, Button, Upload, Checkbox, Row, Col } from "antd";
import { BiSolidCloudUpload } from "react-icons/bi";

const CreateContact = () => {
  return (
     <Form layout="vertical">
     <h2
       style={{
         margin: "80px 100px 20px 100px",
         fontSize: "2rem",
       }}
     >
       Create New Contact
     </h2>
     <Row style={{ margin: "20px 100px" }}>

       {/* username */}
       <Col span={12} style={{ padding: "0 10px 0 0" }}>
         <Form.Item label="Username">
           <Input
             name="username"
           />
         </Form.Item>
       </Col>

       {/* phone number */}
       <Col span={12} style={{ padding: "0 10px 0 0" }}>
         <Form.Item label="Phone Number">
           <Input
             name="phone number"
           />
         </Form.Item>
       </Col>

       {/* email */}
       <Col span={12} style={{ padding: "0 10px 0 0" }}>
         <Form.Item label="Email">
           <Input
             name="email"
           />
         </Form.Item>
       </Col>

       {/* Contact type */}
       <Col span={12} style={{ padding: "0 10px 0 0" }}>
              <Form.Item label="Contact type">
                <Select
                  name="ContactType"
                >
                  <Option value=""></Option>
                  <Option value=""></Option>
                  <Option value=""></Option>
                </Select>
              </Form.Item>
            </Col>
     

<Col span={24} style={{ margin: "20px 0" }}>
             <Button
                icon={<BiSolidCloudUpload size={30} />}
                style={{ padding: "23px 425px 23px 415px", fontWeight: "bold" }}
                // style={hover.stars{
                //   display:block;
                //   filter:
                // }}
                type="primary"
               
              >
                Upload Contact
              </Button>
   </Col>
     </Row>
   </Form>
  )
}

export default CreateContact
