// import React from "react";
// import { Form, Input, Select, Button, Upload, Checkbox, Row, Col, Space } from "antd";
// // import { UploadOutlined } from '@ant-design/icons';
// import { TbUpload } from "react-icons/tb";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useAppSelector } from "../../../../store/store";
// import axios from "axios";

// import { BiSolidCloudUpload } from "react-icons/bi";
// import { MdDeleteOutline } from "react-icons/md";

// const { Option } = Select;

// const CreateSignalForm = () => {
//   const signalPlans = ["All", "Diamound", "Gold", "Platinium", "Silver"];
//   const accessToken = useAppSelector(
//     (state) => state.authentication.accessToken
//   );
//   console.log("accessToken", accessToken);

//   //   const validationSchema = Yup.object().shape({
//   //     title: Yup.string().required("Signal title is required"),
//   //     asset: Yup.string().required("Select an asset"),
//   //     type: Yup.string().required("Select a type"),
//   //     openPrice: Yup.number().required("Open price is required").positive(),
//   //     stopLoss: Yup.number().required("Stop loss is required").positive(),
//   //     takeProfit1: Yup.number().required("Take profit 1 is required").positive(),
//   //     takeProfit2: Yup.number().nullable().positive(),
//   //     description: Yup.string().required("Description is required"),
//   //   });

//   return (
//     <Formik
//       initialValues={{
//         signalTitle: "Test Signal",
//         type: "sell",
//         sector: "Bank",
//         scrips: "NBL",
//         signalType: "Buy",
//         suitableFor: "Aggresive Investor",
//         openPrice: "100",
//         stopLoss: "50",
//         bookProfit1: "150",
//         bookProfit2: "200",
//         bookProfit3: "340",
//         buyRange1: "100",
//         buyRange2: "120",
//         buyRange3: "140",
//         status: "pending",
//         timeFrame: "hour",
//         signalDescription: "This is testsdfsd",
//         signalPlans: ["All", "Diamound", "Silver"],
//         signalImage: null,
//       }}
//       onSubmit={async (values, { setSubmitting, resetForm }) => {
//         console.log("values", values);
//         try {
//           // Create FormData to send the file
//           const formData = new FormData();
//           formData.append("signalImage", values.signalImage);

//           // Upload the image to the backend
//           const response = await axios.post(
//             "${import.meta.env.VITE_BACKEND_URL}/sikinchaa/upload",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );

//           // Get the image URL from the response
//           const imageUrl = response.data.url;

//           // Create the new signal with the image URL
//           const signalData = {
//             ...values,
//             signalImage: imageUrl,
//           };

//           // Send the signal data to your backend
//           await axios.post(
//             "${import.meta.env.VITE_BACKEND_URL}/sikinchaa/create_signal",
//             signalData,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//           alert("signal creation success");
//           // Handle success (e.g., show a success message, redirect, etc.)
//           resetForm();
//         } catch (error) {
//           console.error("Error uploading signal:", error);
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ handleSubmit, handleChange, setFieldValue, values }) => (
//         <Form layout="vertical">
//           <h2
//             style={{
//               margin: "80px 100px 20px 100px",
//               fontSize: "2rem",
//             }}
//           >
//             Create New Signal
//           </h2>
//           <Row style={{ margin: "20px 100px" }}>
//             {/* signal title  */}
//             <Col span={12} style={{ padding: "0 10px 0 0" }}>
//               <Form.Item label="Signal Title">
//                 <Input
//                   name="signalTitle"
//                   onChange={handleChange}
//                   value={values.signalTitle}
//                 />
//               </Form.Item>
//             </Col>

//             {/* select plans  */}
//             <Col span={12} style={{ padding: "0 0 0 80px" }}>
//               <Form.Item label="Select Plans">
//                 {/* {console.log(signalPlans)} */}
//                 <Checkbox.Group
//                   name="signalPlans"
//                   options={signalPlans.map((signalPlans) => ({
//                     label: signalPlans,
//                     value: signalPlans,
//                   }))}
//                   onChange={(checkedValues) =>
//                     setFieldValue("signalPlans", checkedValues)
//                   }
//                 />
//               </Form.Item>
//             </Col>

//             {/* suitable for  */}
//             <Col span={8} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="Suitable For">
//                 <Select
//                   name="suitableFor"
//                   onChange={(value) => setFieldValue("status", value)}
//                   value={values.suitableFor}
//                 >
//                   <Option value="Active Investor">Acive Investor</Option>
//                   <Option value="Passive Investor">Passive Investor</Option>
//                   <Option value="Aggresive Investor">Aggresive Investor</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* open price  */}
//             <Col span={8} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="Open Price">
//                 <Input
//                   name="openPrice"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.openPrice}
//                 />
//               </Form.Item>
//             </Col>

//             {/* stopLoss  */}
//             <Col span={8}>
//               <Form.Item label="Stop Loss">
//                 <Input
//                   name="stopLoss"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.stopLoss}
//                 />
//               </Form.Item>
//             </Col>

//             {/* sector  */}
//             <Col span={6} style={{ padding: "0 31px 0 0" }}>
//               <Form.Item label="Sector">
//                 <Select
//                   name="sector"
//                   onChange={(value) => setFieldValue("type", value)}
//                   value={values.sector.toUpperCase()}
//                 >
//                   <Option value="Bank">Bank</Option>
//                   <Option value="Hydropower">Hydropower</Option>
//                   <Option value="finance">finance</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* scrips  */}
//             <Col span={6} style={{ padding: "0 30px 0 0" }}>
//               <Form.Item label="Scrips">
//                 <Select
//                   name="scrips"
//                   onChange={(value) => setFieldValue("type", value)}
//                   value={values.scrips.toUpperCase()}
//                 >
//                   <Option value="EBL">EBL</Option>
//                   <Option value="NBL">NBL</Option>
//                   <Option value="NABIL">NABIL</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* signalType  */}
//             <Col span={6} style={{ padding: "0 30px 0 0" }}>
//               <Form.Item label="Select Signal Type">
//                 <Select
//                   name="signalType"
//                   onChange={(value) => setFieldValue("type", value)}
//                   value={values.signalType.toUpperCase()}
//                 >
//                   <Option value="SELL">SELL</Option>
//                   <Option value="BUY">BUY</Option>
//                   <Option value="HOLD">HOLD</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* time frame  */}
//             <Col span={6}>
//               <Form.Item label="Time Frame">
//                 <Select
//                   name="timeFrame"
//                   onChange={(value) => setFieldValue("type", value)}
//                   value={values.signalType}
//                 >
//                   <Option value="hour">HOUR</Option>
//                   <Option value="day">DAY</Option>
//                   <Option value="week">WEEK</Option>
//                   <Option value="month">MONTH</Option>
//                   <Option value="year">YEAR</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//             {/* buyRange1  */}
//             <Col span={24} style={{ padding: "0 40px 10px 0", fontWeight: "bold" }}>
//               <h1>BUY RANGE</h1>
//             </Col>
//             <Col span={12} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="From: ">
//                 <Input
//                   name="buyRange1"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.buyRange1}
//                 />
//               </Form.Item>
//             </Col>

//             {/* buyRange2  */}
//             <Col span={12} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="To: ">
//                 <Input
//                   name="buyRange2"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.buyRange2}
//                 />
//               </Form.Item>
//             </Col>

//             {/* SELL RANGE  */}
//             <Col span={24} style={{ padding: "0 40px 10px 0", fontWeight: "bold" }}>
//               <h1>SELL RANGE</h1>
//             </Col>
//             <Col span={12} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="From: ">
//                 <Input
//                   name="bookProfit1"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.bookProfit1}
//                 />
//               </Form.Item>
//             </Col>

//             {/* buyRange2  */}
//             <Col span={12} style={{ padding: "0 40px 0 0" }}>
//               <Form.Item label="To: ">
//                 <Input
//                   name="bookProfit2"
//                   type="number"
//                   onChange={handleChange}
//                   value={values.bookProfit2}
//                 />
//               </Form.Item>
//             </Col>

// <Col span={24}>
//               <Form.Item label="Signal Image">
//                 <Upload
//                   beforeUpload={(file) => {
//                     setFieldValue("signalImage", file);
//                     return false;
//                   }}
//                   fileList={values.signalImage ? [values.signalImage] : []} // Control the file list
//                   showUploadList={{ showRemoveIcon: false }} // Prevent showing remove icon
//                 >
//                   <Button
//                     style={{ padding: "20px 850px 20px 20px" }}
//                     icon={<TbUpload />}
//                   >
//                     Choose File
//                   </Button>
//                 </Upload>
//                 {values.signalImage && (
//                   <Space style={{ marginTop: "40px" }}>
//                     <img
//                       src={URL.createObjectURL(values.signalImage)}
//                       alt="Signal"
//                       style={{ width: "100px", height: "100px", objectFit: "cover", marginRight:"auto" }}
//                     />
//                     <Button
//                       type="danger"
//                       icon={<MdDeleteOutline />}
//                       onClick={() => setFieldValue("signalImage", null)}
//                       style={{      
//                         border: "none",
//                         fontSize: "25px",
//                       }}
//                     >
//                     </Button>
//                   </Space>
//                 )}
//               </Form.Item>
//             </Col>

//             <Col span={24}>
//               <Form.Item label="Signal Description">
//                 <Input.TextArea
//                   name="signalDescription"
//                   onChange={handleChange}
//                   value={values.signalDescription}
//                   rows={5}
//                   cols={4}
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={24} style={{ margin: "20px 0" }}>
//               <Button
//                 icon={<BiSolidCloudUpload size={30} />}
//                 style={{ padding: "23px 425px 23px 415px", fontWeight: "bold" }}
//                 type="primary"
//                 onClick={handleSubmit}
//               >
//                 Upload Signal
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateSignalForm;



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
        signalDescription: "This is testsdfsd",
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
              `${import.meta.env.VITE_BACKEND_URL}/sikinchaa/upload`,
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
            `${import.meta.env.VITE_BACKEND_URL}/sikinchaa/create_signal`,
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
        <Form layout="vertical">
          <h2 style={{ margin: "80px 100px 20px 100px", fontSize: "2rem" }}>
            Create New Signal
          </h2>
          <Row style={{ margin: "20px 100px" }}>
            <Col span={12} style={{ padding: "0 10px 0 0" }}>
              <Form.Item label="Signal Title">
                <Input
                  name="signalTitle"
                  onChange={handleChange}
                  value={values.signalTitle}
                />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: "0 0 0 80px" }}>
              <Form.Item label="Select Plans">
                <Checkbox.Group
                  name="signalPlans"
                  options={signalPlans.map((plan) => ({
                    label: plan,
                    value: plan,
                  }))}
                  onChange={(checkedValues) =>
                    setFieldValue("signalPlans", checkedValues)
                  }
                  value={values.signalPlans}
                />
              </Form.Item>
            </Col>

            <Col span={8} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="Suitable For">
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

            <Col span={8} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="Open Price">
                <Input
                  name="openPrice"
                  type="number"
                  onChange={handleChange}
                  value={values.openPrice}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Stop Loss">
                <Input
                  name="stopLoss"
                  type="number"
                  onChange={handleChange}
                  value={values.stopLoss}
                />
              </Form.Item>
            </Col>

            <Col span={6} style={{ padding: "0 31px 0 0" }}>
              <Form.Item label="Sector">
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

            <Col span={6} style={{ padding: "0 30px 0 0" }}>
              <Form.Item label="Scrips">
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

            <Col span={6} style={{ padding: "0 30px 0 0" }}>
              <Form.Item label="Select Signal Type">
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

            <Col span={6}>
              <Form.Item label="Time Frame">
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

            <Col span={24} style={{ padding: "0 40px 10px 0", fontWeight: "bold" }}>
              <h1>BUY RANGE</h1>
            </Col>
            <Col span={12} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="From: ">
                <Input
                  name="buyRange1"
                  type="number"
                  onChange={handleChange}
                  value={values.buyRange1}
                />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="To: ">
                <Input
                  name="buyRange2"
                  type="number"
                  onChange={handleChange}
                  value={values.buyRange2}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ padding: "0 40px 10px 0", fontWeight: "bold" }}>
              <h1>SELL RANGE</h1>
            </Col>
            <Col span={12} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="From: ">
                <Input
                  name="bookProfit1"
                  type="number"
                  onChange={handleChange}
                  value={values.bookProfit1}
                />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="To: ">
                <Input
                  name="bookProfit2"
                  type="number"
                  onChange={handleChange}
                  value={values.bookProfit2}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="Additional Target: ">
                <Input
                  name="bookProfit3"
                  type="number"
                  onChange={handleChange}
                  value={values.bookProfit3}
                />
              </Form.Item>
            </Col>



            <Col span={24} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="Upload Image">
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
                  <Button
                    style={{ padding: "20px 950px 20px 20px" }}
                    icon={<TbUpload />}
                  >
                    Choose File
                  </Button>

                </Upload>
              </Form.Item>
            </Col>

            <Col span={24} style={{ padding: "0 40px 0 0" }}>
              <Form.Item label="Signal Description">
                <Input.TextArea
                  name="signalDescription"
                  onChange={handleChange}
                  value={values.signalDescription}
                  rows={5}
                  cols={4}
                />
              </Form.Item>
            </Col>
            <Col span={24} style={{ padding: "20px 0" }}>
              <Button
                icon={<BiSolidCloudUpload size={30} />}
                style={{ padding: "23px 430px 23px 430px", fontWeight: "bold" }}
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                disabled={loading}//disable button while loading
              >
                {loading ? "Uploading..." : "Upload Signal"}
              </Button>
            </Col>
            set
          </Row>
          {/* Modal for displaying loading spinner */}
          <Modal visible={loading} footer={null} closable={false} centered>
            <Spin size="large" />
            <p style={{ textAlign: "center", marginTop: "10px" }}>Uploading... Please wait.</p>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSignal;
