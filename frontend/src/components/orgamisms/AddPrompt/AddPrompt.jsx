import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Checkbox,
  Row,
  Col,
  Modal,
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import { TbUpload } from "react-icons/tb";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../../../store/store";
import axios from "axios";

import { BiSolidCloudUpload } from "react-icons/bi";

const { Option } = Select;

const AddPrompt = () => {
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  //   console.log("accessToken", accessToken);

  return (
    <Formik
      initialValues={{
        promptTitle: "Test Prompt",
        status: "pending",
        promptDescription: "Write prompt here....",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const createdDate = Date.now();
        const promptValues = { createdDate, ...values };
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/prompt/create_prompt`,
            promptValues,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          // console.log("create prompt response", response);
          alert("signal creation success");
          resetForm();
        } catch (error) {
          console.log("err while creating prompt", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => (
       <Form
       layout="vertical"
       className="max-w-4xl  mx-auto bg-white shadow-lg p-8 rounded-lg mt-6"
     >
       <h2 className="text-center text-3xl font-bold text-gray-600 mb-6">
         Create New Prompt
       </h2>
     
       <Row gutter={[16, 16]}>
         <Col span={24}>
           <Form.Item
           label={<span className=" font-bold">Prompt Title</span>}
             className="text-gray-600 font-semibold text-lg"
           >
             <Input
               size="large"
               name="promptTitle"
               onChange={handleChange}
               value={values.promptTitle}
               className="border-gray-300 rounded-lg w-full h-12 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
             />
           </Form.Item>
         </Col>
     
         <Col span={24}>
           <Form.Item
             label={<span className=" font-bold">Prompt Description:</span>}
             className="text-gray-500 font-semibold text-lg"
           >
             <Input.TextArea
               name="promptDescription"
               onChange={handleChange}
               value={values.promptDescription}
               rows={10}
               className="border-gray-300 rounded-lg w-full px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
             />
           </Form.Item>
         </Col>
     
         <Col span={24} className="mt-4">
           <Button
             icon={<BiSolidCloudUpload size={20} />}
             className="w-full py-4 text-white font-bold bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg transform transition-all duration-300 hover:scale-105"
             type="primary"
             onClick={handleSubmit}
           >
             Add Prompt
           </Button>
         </Col>
       </Row>
     </Form>
     
      )}
    </Formik>
  );
};

export default AddPrompt;
