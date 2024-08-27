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
        promptDescription: "This is Text prompt",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const createdDate = Date.now();
        const promptValues = { createdDate, ...values };
        try {
          const response = await axios.post(
            "http://localhost:3000/sikinchaa/create_prompt",
            promptValues,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("create prompt response", response);
          alert("signal creation success");
          // Handle success (e.g., show a success message, redirect, etc.)
          resetForm();
        } catch (error) {
          console.log("err while creating prompt", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => (
        <Form layout="vertical">
          <h2
            style={{
              margin: "80px 100px 20px 100px",
              fontSize: "2rem",
            }}
          >
            Create New Prompt
          </h2>
          <Row style={{ margin: "20px 100px" }}>
            {/* signal title  */}
            <Col span={24} style={{ padding: "0 0 0 0" }}>
              <Form.Item label="Prompt Title">
                <Input
                  size="large"
                  name="promptTitle"
                  onChange={handleChange}
                  value={values.promptTitle}
                  style={{ height: "50px" }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Prompt Description">
                <Input.TextArea
                  name="promptDescription"
                  onChange={handleChange}
                  value={values.promptDescription}
                  rows={12}
                  cols={4}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ margin: "20px 10px" }}>
              <Button
                icon={<BiSolidCloudUpload size={30} />}
                style={{ padding: "23px 425px 23px 415px", fontWeight: "bold" }}
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
