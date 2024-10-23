
import React, { useState } from "react";
import { Form, Input, Select, Button, Upload, Checkbox, Row, Col, Modal, Spin } from "antd";
import { TbUpload } from "react-icons/tb";
import { Formik } from "formik";
import { useAppSelector } from "../../../../store/store";
import axios from "axios";
import { BiSolidCloudUpload } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const { Option } = Select;

const CreateSignal = () => {
  const signalPlans = ["All", "Diamound", "Gold", "Platinium", "Silver"];
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  // State to manage loading
  const [loading, setLoading] = useState(false);


  return (
    <Formik
      initialValues={{
        signalTitle: "Test Signal",
        type: "sell",
        sector: "Bank",
        scrips: "NBL",
        signalType: "Buy",
        suitableFor: "Aggresive Investor",
        openPrice: "100",
        stopLoss: "50",
        bookProfit1: "150",
        bookProfit2: "200",
        bookProfit3: "340",
        buyRange1: "100",
        buyRange2: "120",
        buyRange3: "140",
        status: "pending",
        timeFrame: "hour",
        signalDescription: "Write here....",
        signalPlans: ["All", "Diamound", "Silver"],
        signalImage: [],
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setLoading(true); // Start loading
        try {
          const imageUrls = [];
          for (const file of values.signalImage) {
            const formData = new FormData();
            formData.append("signalImage", file);

            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/signal/upload`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            imageUrls.push(response.data.url);
          }

          const signalData = {
            ...values,
            signalImage: imageUrls,
          };

          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/signal/create_signal`,
            signalData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          alert("Signal creation success");
          resetForm();
        } catch (error) {
          console.error("Error uploading signal:", error);
        } finally {
          setSubmitting(false);
          setLoading(false); // Stop loading
        }
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => (


        <div className=" bg-whitep-2 rounded-md shadow-md  mx-auto ">
          <h2 className="text-center text-3xl font-semibold p-8 ">
            Create New Signal
          </h2>
          <Form layout="vertical" className="space-y-4">
            <Row
              style={{ margin: "30px 100px" }}
              gutter={24}
              className="flex flex-wrap "
            >
              <Col style={{ padding: "0 10px 0 0" }}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                className="mb-4 md:mb-0 "
              >
                <Form.Item
                  label={<span className="font-bold">Signal Title</span>}
                >
                  <Input
                    name="signalTitle"
                    onChange={handleChange}
                    value={values.signalTitle}
                    className="rounded-md border-gray-400"
                  />
                </Form.Item>
              </Col>

              <Col style={{ padding: "0 10px 0 30px" }}
                xs={24}
                sm={24}
                md={12}
                lg={10}
                className="mb-4 md:mb-0 "
              >
                <Form.Item
                  label={<span className="font-bold">Select Plans:</span>}
                >
                  <Checkbox.Group
                    name="signalPlans"
                    options={signalPlans.map((plan) => ({
                      label: plan,
                      value: plan,
                    }))}
                    onChange={(checkedValues) => setFieldValue("signalPlans", checkedValues)}
                    value={values.signalPlans}
                  />
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "0 10px 0 0" }}>
                <Form.Item label={<span className="font-bold">Suitable For</span>}>
                  <Select
                    name="suitableFor"
                    onChange={(value) => setFieldValue("suitableFor", value)}
                    value={values.suitableFor}

                  >
                    <Option value="Active Investor">Active Investor</Option>
                    <Option value="Passive Investor">Passive Investor</Option>
                    <Option value="Aggresive Investor">Aggresive Investor</Option>
                  </Select>
                </Form.Item>
              </Col>


              <Col span={8} style={{ padding: "0 40px 0 40px" }}>
                <Form.Item label={<span className=" font-bold">Open Price</span>}>
                  <Input
                    name="openPrice"
                    type="number"
                    onChange={handleChange}
                    value={values.openPrice}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={<span className="font-bold">Stop Loss</span>}>
                  <Input
                    name="stopLoss"
                    type="number"
                    onChange={handleChange}
                    value={values.stopLoss}
                  />
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "0 10px 0 0" }}>
                <Form.Item label={<span className="font-bold">Sector</span>}>
                  <Select
                    name="sector"
                    onChange={(value) => setFieldValue("sector", value)}
                    value={values.sector}
                  >
                    <Option value="Bank">Bank</Option>
                    <Option value="Hydropower">Hydropower</Option>
                    <Option value="Finance">Finance</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "0 40px 0 40px" }}>
                <Form.Item label={<span className=" font-bold">Scrips</span>}>
                  <Select
                    name="scrips"
                    onChange={(value) => setFieldValue("scrips", value)}
                    value={values.scrips}
                  >
                    <Option value="EBL">EBL</Option>
                    <Option value="NBL">NBL</Option>
                    <Option value="NABIL">NABIL</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} >
                <Form.Item label={<span className=" font-bold">Select Signal Type</span>} >
                  <Select
                    name="signalType"
                    onChange={(value) => setFieldValue("signalType", value)}
                    value={values.signalType}
                  >
                    <Option value="SELL">SELL</Option>
                    <Option value="BUY">BUY</Option>
                    <Option value="HOLD">HOLD</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "0 10px 0 0" }}>
                <Form.Item label={<span className=" font-bold">Time Frame</span>}>
                  <Select
                    name="timeFrame"
                    onChange={(value) => setFieldValue("timeFrame", value)}
                    value={values.timeFrame}
                  >
                    <Option value="hour">HOUR</Option>
                    <Option value="day">DAY</Option>
                    <Option value="week">WEEK</Option>
                    <Option value="month">MONTH</Option>
                    <Option value="year">YEAR</Option>
                  </Select>
                </Form.Item>
              </Col>
              <div className="border-t border-gray-300 my-2 w-full"></div>
              <div className=" flex w-full ">
                <div className="flex flex-col w-1/3">
                  <h1 className="font-bold ">
                    BUY RANGE :
                  </h1>
                  <div className=" flex  ">
                    <Col span={12} style={{ padding: "0 8px 0 0" }}>
                      <Form.Item label="From " >
                        <Input
                          className=" w-full"
                          name="buyRange1"
                          type="number"
                          onChange={handleChange}
                          value={values.buyRange1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} style={{ padding: "0 8px 0 0" }}>
                      <Form.Item label="To ">
                        <Input
                          name="buyRange2"
                          type="number"
                          onChange={handleChange}
                          value={values.buyRange2}
                        />
                      </Form.Item>
                    </Col>
                  </div>
                </div>
                <div className=" flex flex-col  w-1/3 pl-10 ">
                  <h1 className=" font-bold ">SELL RANGE : </h1>
                  <div className=" flex ">
                    <Col span={12} style={{ padding: "0 8px 0 0" }}>
                      <Form.Item label="From: ">
                        <Input
                          name="bookProfit1"
                          type="number"
                          onChange={handleChange}
                          value={values.bookProfit1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} style={{ padding: "0 8px 0 0" }}>
                      <Form.Item label="To: ">
                        <Input
                          name="bookProfit2"
                          type="number"
                          onChange={handleChange}
                          value={values.bookProfit2}
                        />
                      </Form.Item>
                    </Col>
                  </div>

                </div>
                <div className=" flex flex-col  w-1/3 pl-10 ">
                  <h1 className=" font-bold ">Additional Target:: </h1>
                  <div className=" flex ">
                    <Col span={24} style={{ padding: "0 8px 0 0" }}>
                      <Form.Item label={<span >(Optional)</span>}>
                        <Input

                          name="bookProfit3"
                          type="number"
                          onChange={handleChange}
                          value={values.bookProfit3}
                        />
                      </Form.Item>
                    </Col>
                  </div>

                </div>
              </div>
              <Col span={4} style={{ padding: "20px 40px 50px 50px " }} className=" mr-4 bg-[#F5F6FA] rounded-2xl ">
                <div className=" justify-center flex  items-center w-full h-full   ">

                  <Form.Item label={<span className=" font-bold">Upload Image</span>}>
                    <Upload
                      multiple
                      listType="picture"
                      beforeUpload={(file) => {
                        setFieldValue("signalImage", [...values.signalImage, file]);
                        return false;
                      }}
                      onRemove={(file) => {
                        const index = values.signalImage.indexOf(file);
                        const newFileList = values.signalImage.slice();
                        newFileList.splice(index, 1);
                        setFieldValue("signalImage", newFileList);
                      }}
                      fileList={values.signalImage.map((file) => ({
                        uid: file.uid || file.name,
                        name: file.name,
                        status: "done",
                        url: URL.createObjectURL(file),
                      }))}
                    >
                      <Button icon={<TbUpload />} >
                        Choose File
                      </Button>

                    </Upload>
                  </Form.Item>
                </div>
              </Col>

              <Col span={18} className=" " style={{ padding: "0 40px 0 0" }}>
                <Form.Item label={<span className=" font-bold">Signal Description</span>}>
                  <Input.TextArea

                    name="signalDescription"
                    onChange={handleChange}
                    value={values.signalDescription}
                    rows={8}
                    cols={4}
                  />
                </Form.Item>
              </Col>
              <div className="flex justify-center w-full">
                <Button
                  icon={<BiSolidCloudUpload size={40} />}
                  className="font-bold text-center py-3 px-6 rounded-lg bg-green-500 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-white"
                  htmlType="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload Signal"}
                </Button>
              </div>
            </Row>
            <Modal visible={loading} footer={null} closable={false} centered>
              <Spin size="large" />
              <p style={{ textAlign: "center", marginTop: "10px" }}>Uploading... Please wait.</p>
            </Modal>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateSignal;
