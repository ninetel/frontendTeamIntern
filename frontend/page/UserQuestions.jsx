import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Steps,
  Checkbox,
  Radio,
  Row,
  Col,
  message,
  Upload,
  Progress,
} from "antd";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
const { Step } = Steps;
const { TextArea } = Input;

const FormContainer = styled.div`
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  margin-bottom: 26px;
  .ant-form-item-label {
    label {
      font-size: 1.6em; /* Increase font size */
    }
  }
  .ant-input,
  .ant-checkbox-group,
  .ant-radio-group {
    font-size: 1.3em; /* Increase font size */
  }
  .ant-form-item {
    margin-bottom: 10px; /* Adjust the margin to increase spacing */
    padding: 10px 0; /* Adjust padding for better spacing */
  }
`;

const StyledSteps = styled(Steps)`
  margin-bottom: 10px;
  .ant-steps-item-title {
    font-size: 1.5em; /* Increase font size */
  }
`;

const FullscreenContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 40px 80px;
  background: #e6f7ff;
`;

const CenteredRow = styled(Row)`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const LargeButton = styled(Button)`
  font-size: 1.3em; /* Increase font size */
  margin: 30px 0 0 0;
  padding: 20px 50px;
`;

const UserQuestions = () => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector(
    (state) => state.currentLoggedInUser.userInfo.id
  );
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );

  const [formData, setFormData] = useState({
    age: "30",
    occupation: "Software Developer",
    monthlyIncome: "60000",
    monthlyExpenses: "25000",
    marketExperience: "5",
    investmentProfile: "Moderate",
    portfolioSize: "10-25L",
    investmentGoal: "double1Year",
    knowledgeSource: ["Youtube", "Groups"],
    tradingSource: "Yes",
    follow: ["Shiva Chandra"],
    idol: "Subash Chandra Dhungana",
    primaryGoal: ["futureWealth"],
    investmentHorizon: "longTerm",
    portfolioReview: "monthly",
    timeSpent: "2 hours",
    currentHoldings: ["IT", "Finance"],
    sectorPreferences: ["banking", "finance"],
    sectorAvoid: "hydropower",
    investmentRestrictions: "No tobacco or alcohol stocks",
    portfolioAllocation: {
      swingTrading: "20",
      positionalShort: "15",
      longPositions: "30",
      investment: "25",
      emergencyFund: "10",
    },
    specificScrips: "ABC Ltd, XYZ Corp",
    investmentStrategy: "Value Investing",
    recommendations: ["buy", "hold"],
    updateFrequency: "weekly",
    advisoryPreference: "personal",
    existingInvestments: "Real Estate, Mutual Funds",
    incorporateInvestments: "yes",
    specificGoals: "Retirement, Buying a House",
    additionalNotes: "I just want invest my savings properly.",
  });

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [hasAnsweredQuestions, setHasAnsweredQuestions] = useState(false);

  useEffect(() => {
    if (hasAnsweredQuestions) {
      navigate("/user/dashboard");
    } else {
      setLoading(false);
    }
  }, [currentUserId, navigate, hasAnsweredQuestions]);

  const handleFormSubmit = async (values) => {
    console.log("values of form -->", values);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/responses/${currentUserId}`,
        {
          responses: values,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/user/dashboard");
    } catch (error) {
      console.log("Error when putting the user Response :::((");
      console.error("Error updating responses", error);
    }
  };

  if (loading) return <Progress />;

  // const next = ({ ...values }) => {
  //   setFormData((prevValues) => ({
  //     ...prevValues,
  //     ...values,
  //   }));
  //   setCurrent(current + 1);
  // };

  console.log("formData", formData);
  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prevValues) => ({
        ...prevValues,
        ...values,
      }));
      setCurrent(current + 1);
    } catch (error) {
      message.error("Please complete the current step before proceeding.");
    }
  };

  const prev = () => {
    // Reset the form values to the overall form data when going back
    // form.setFieldsValue(formData);

    setCurrent(current - 1);
  };
  const handleFinish = () => {
    console.log("Final Form Data: ", formData);
    handleFormSubmit(formData);
  };

  // const steps = [
  //   {
  //     title: "Personal Information",
  //     content: (
  //       <>
  //         <Form.Item
  //                 initialValues={{
  //         age: '30',
  //         occupation: 'Software Developer',
  //         monthlyIncome: '60000',
  //         monthlyExpenses: '25000',
  //       }}
  //           name="age"
  //           label="Age / उमेर"
  //           value="18"
  //           rules={[{ required: true, message: "Please input your age!" }]}
  //         >
  //           <Input value="18" />
  //         </Form.Item>
  //         <Form.Item
  //           name="occupation"
  //           label="Occupation / पेशा"
  //           value="18"
  //           rules={[
  //             { required: true, message: "Please input your occupation!" },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="monthlyIncome"
  //           label="Monthly Income / मासिक आम्दानी"
  //           rules={[
  //             { required: true, message: "Please input your monthly income!" },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="monthlyExpenses"
  //           label="Monthly Expenses / मासिक खर्च"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your monthly expenses!",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Market Experience",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="marketExperience"
  //           label="Secondary Market Experience (years) / द्वितीयक बजार अनुभव (वर्ष)"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your market experience!",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="investmentProfile"
  //           label="Investment Profile / लगानी प्रोफाइल"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your investment profile!",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="portfolioSize"
  //           label="What is the size of your current portfolio? / तपाईको हालको पोर्टफोलियोको आकार के हो?"
  //           rules={[
  //             { required: true, message: "Please select your portfolio size!" },
  //           ]}
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="below10L">
  //               Below 10 lakhs / १० लाख भन्दा तल
  //             </Checkbox>
  //             <Checkbox value="10-25L">10-25 lakhs / १०-२५ लाख</Checkbox>
  //             <Checkbox value="25-50L">25-50 lakhs / २५-५० लाख</Checkbox>
  //             <Checkbox value="50-1C">
  //               50 lakhs to 1 crore / ५० लाख देखि १ करोड
  //             </Checkbox>
  //             <Checkbox value="above1C">
  //               Above 1 crore / १ करोड भन्दा माथि
  //             </Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="investmentGoal"
  //           label="१ बर्षमा आफ्नो पैसा double बनाउन चहानुहुन्छ? कि 10 बर्ष मा १० गुणा? / Do you want to double your money in 1 year or 10 times in 10 years?"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please select your investment goal!",
  //             },
  //           ]}
  //         >
  //           <Radio.Group>
  //             <Radio value="double1Year">1 बर्षमा double</Radio>
  //             <Radio value="x10In10Years">10 बर्षमा १० गुणा</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Investment Preferences",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="knowledgeSource"
  //           label="ज्ञानको लागि के धेरै चलाउनुहुन्छ? / What do you use the most for knowledge?"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your knowledge source!",
  //             },
  //           ]}
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="Youtube">Youtube</Checkbox>
  //             <Checkbox value="Facebook">Facebook</Checkbox>
  //             <Checkbox value="Clubhouse">Clubhouse</Checkbox>
  //             <Checkbox value="Groups">
  //               Information from groups, brokers
  //             </Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="tradingSource"
  //           label="के हजुरले कसैको group मा trading गर्नुभएको छ, वा Youtube live हेरेर trading गर्नुहुन्छ? भएको थियो? कस्को? / Have you traded in someone's group or by watching YouTube live? Whose?"
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="follow"
  //           label="यी मध्ये को को लाई ज्यादा follow गर्नुहुन्छ? / Who do you follow the most?"
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="Shiva Chandra">Shiva Chandra</Checkbox>
  //             <Checkbox value="Subash Chandra Dhungana">
  //               Subash Chandra Dhungana
  //             </Checkbox>
  //             <Checkbox value="Subash Chandra Bhattarai">
  //               Subash Chandra Bhattarai
  //             </Checkbox>
  //             <Checkbox value="Nirmal Pradhaan">Nirmal Pradhaan</Checkbox>
  //             <Checkbox value="Rohan Karki">Rohan Karki</Checkbox>
  //             <Checkbox value="Bipin Kandel">Bipin Kandel</Checkbox>
  //             <Checkbox value="Basanta Adhikary">Basanta Adhikary</Checkbox>
  //             <Checkbox value="Dipendra Agrawal">Dipendra Agrawal</Checkbox>
  //             <Checkbox value="Other">Other (Specify)</Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="idol"
  //           label="यी मध्ये कोहि हजुरको Idol / Who is your Idol among these?"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Investment Goals",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="primaryGoal"
  //           label="What is your primary investment goal? / तपाईको मुख्य लगानी लक्ष्य के हो?"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your primary goal!",
  //             },
  //           ]}
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="futureWealth">
  //               भविष्यको लागि सम्पती जोड्ने / Future Wealth Accumulation
  //             </Checkbox>
  //             <Checkbox value="immediateEarnings">
  //               तत्काल कमाउने / Immediate Earnings
  //             </Checkbox>
  //             <Checkbox value="expenseManagement">
  //               खर्छ, ब्याज चलाउदै सम्पती जोड्ने / Expense Management & Wealth
  //               Accumulation
  //             </Checkbox>
  //             <Checkbox value="retirementPlan">Retirement Plan</Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="investmentHorizon"
  //           label="What is your preferred investment horizon? / तपाईको प्राथमिक लगानी समय सीमा के हो?"
  //         >
  //           <Radio.Group>
  //             <Radio value="shortTerm">
  //               Short-term (less than 1 year) / छोटो अवधि (१ बर्ष भन्दा कम)
  //             </Radio>
  //             <Radio value="mediumTerm">
  //               Medium-term (1-3 years) / मध्यम अवधि (१-३ बर्ष)
  //             </Radio>
  //             <Radio value="longTerm">
  //               Long-term (more than 3 years) / लामो अवधि (३ बर्ष भन्दा बढी)
  //             </Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="portfolioReview"
  //           label="How often do you review or track your portfolio? / तपाईले आफ्नो पोर्टफोलियो कति पटक समीक्षा वा ट्र्याक गर्नुहुन्छ?"
  //         >
  //           <Radio.Group>
  //             <Radio value="daily">Daily / दैनिक</Radio>
  //             <Radio value="weekly">Weekly / साप्ताहिक</Radio>
  //             <Radio value="monthly">Monthly / मासिक</Radio>
  //             <Radio value="quarterly">Quarterly / त्रैमासिक</Radio>
  //             <Radio value="annually">Annually / वार्षिक</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Portfolio Details",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="timeSpent"
  //           label="दिनमा कति समय share market मा बिताउनुहुन्छ? (TMS र अध्यन, छलफल) गरेर / How much time do you spend on the share market daily? (Including TMS, study, discussions)"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your time spent!",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="currentHoldings"
  //           label="Please provide details of your current holdings / कृपया तपाईको हालको होल्डिंग्सको विवरण प्रदान गर्नुहोस्:"
  //         >
  //           <Upload>
  //             <Button>Upload My shares.csv file</Button>
  //           </Upload>
  //         </Form.Item>
  //         <Form.Item
  //           name="sectorPreferences"
  //           label="Do you have any sector preferences? (e.g., Banking, Finance, hydropower, etc.) / तपाईलाई कुनै क्षेत्र प्राथमिकताहरु छन्? (जस्तै, बैंकिंग, वित्त, हाइड्रोपावर आदि)"
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="banking">Banking / बैंकिंग</Checkbox>
  //             <Checkbox value="finance">Finance / वित्त</Checkbox>
  //             <Checkbox value="hydropower">Hydropower / हाइड्रोपावर</Checkbox>
  //             <Checkbox value="other">
  //               Other (Specify) / अन्य (बिवरण दिनुहोस्)
  //             </Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="sectorAvoid"
  //           label="Are there any sectors you wish to avoid? / तपाईले बचाउन चाहानु भएको कुनै क्षेत्रहरु छन्?"
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="investmentRestrictions"
  //           label="Do you have any specific investment restrictions or guidelines? / तपाईसँग कुनै विशेष लगानी प्रतिबन्ध वा मार्गनिर्देशन छ?"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Investment Strategy",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="portfolioAllocation"
  //           label="What percentage of your portfolio would you like to allocate to the following? (Total should be 100%) / तपाईको पोर्टफोलियोको कुन प्रतिशत निम्नमा वितरण गर्न चाहानुहुन्छ? (कुल १००% हुनुपर्छ)"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please input your portfolio allocation!",
  //             },
  //           ]}
  //         >
  //           <Input.Group compact>
  //             <Form.Item
  //               name="swingTrading"
  //               label="Swing Trading / स्विंग ट्रेडिंग"
  //             >
  //               <Input suffix="%" />
  //             </Form.Item>
  //             <Form.Item
  //               name="positionalShort"
  //               label="Positional Short / पोसिशनल शॉर्ट"
  //             >
  //               <Input suffix="%" />
  //             </Form.Item>
  //             <Form.Item
  //               name="longPositions"
  //               label="Long Positions / लामो पोजिसन"
  //             >
  //               <Input suffix="%" />
  //             </Form.Item>
  //             <Form.Item name="investment" label="Investment / लगानी">
  //               <Input suffix="%" />
  //             </Form.Item>
  //             <Form.Item
  //               name="emergencyFund"
  //               label="Emergency Fund / आपतकालिन कोष"
  //             >
  //               <Input suffix="%" />
  //             </Form.Item>
  //           </Input.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="specificScrips"
  //           label="Do you have any specific scrips you are currently interested in? / तपाईलाई अहिले चासो भएको कुनै विशेष स्क्रिप्स छ?"
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="investmentStrategy"
  //           label="Do you follow any specific investment strategy or philosophy? (e.g., Value Investing, Growth Investing, Technical Analysis) / तपाई कुनै विशेष लगानी रणनीति वा दर्शन अनुसरण गर्नुहुन्छ? (जस्तै, मूल्य लगानी, वृद्धिशील लगानी, प्राविधिक विश्लेषण)"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Recommendations and Preferences",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="recommendations"
  //           label="What type of recommendations are you looking for? / तपाईलाई कस्तो प्रकारको सिफारिसहरू चाहिन्छ?"
  //         >
  //           <Checkbox.Group>
  //             <Checkbox value="buy">Buy / किन्नुहोस्</Checkbox>
  //             <Checkbox value="hold">Hold / होल्ड गर्नुहोस्</Checkbox>
  //             <Checkbox value="sell">Sell / बेच्नुहोस्</Checkbox>
  //             <Checkbox value="switch">Switch / सुइच गर्नुहोस्</Checkbox>
  //             <Checkbox value="accumulate">
  //               Accumulate / जम्मा गर्नुहोस्
  //             </Checkbox>
  //             <Checkbox value="exit">
  //               When to empty my portfolio? / मेरो पोर्टफोलियो खाली गर्ने समय
  //             </Checkbox>
  //           </Checkbox.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="updateFrequency"
  //           label="How frequently would you like to receive portfolio updates and recommendations? / तपाई कति पटक पोर्टफोलियो अपडेट र सिफारिसहरू प्राप्त गर्न चाहानुहुन्छ?"
  //         >
  //           <Radio.Group>
  //             <Radio value="daily">Daily / दैनिक</Radio>
  //             <Radio value="weekly">Weekly / साप्ताहिक</Radio>
  //             <Radio value="monthly">Monthly / मासिक</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="advisoryPreference"
  //           label="Do you prefer automated recommendations or personal advisory? / तपाईले स्वचालित सिफारिसहरू वा व्यक्तिगत सल्लाह चाहनुहुन्छ?"
  //         >
  //           <Radio.Group>
  //             <Radio value="automated">Automated / स्वचालित</Radio>
  //             <Radio value="personal">
  //               Personal Advisory / व्यक्तिगत सल्लाह
  //             </Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Additional Information",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="existingInvestments"
  //           label="Do you have any existing investments outside of the stock market? (e.g., Real Estate, Business, Mutual Funds) / तपाईसँग स्टक मार्केट बाहिर कुनै लगानीहरू छन्? (जस्तै, रियल इस्टेट, व्यवसाय, म्युचुअल फन्ड्स)"
  //         >
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           name="incorporateInvestments"
  //           label="Are you interested in incorporating these investments into your portfolio analysis? / तपाई यी लगानीहरूलाई तपाईको पोर्टफोलियो विश्लेषणमा समावेश गर्न इच्छुक हुनुहुन्छ?"
  //         >
  //           <Radio.Group>
  //             <Radio value="yes">Yes / हो</Radio>
  //             <Radio value="no">No / छैन</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="specificGoals"
  //           label="Do you have any specific goals or milestones you are targeting with your investments? (e.g., Retirement, Buying a House) / तपाईसँग तपाईको लगानीसँग कुनै विशेष लक्ष्यहरू वा माइलस्टोनहरू छन्? (जस्तै, रिटायरमेन्ट, घर किन्ने)"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Contact Preferences",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="contactMethod"
  //           label="Preferred method of communication: / संवादको प्राथमिकता विधि:"
  //         >
  //           <Radio.Group>
  //             <Radio value="email">Email / इमेल</Radio>
  //             <Radio value="phone">Phone / फोन</Radio>
  //             <Radio value="sms">SMS / एसएमएस</Radio>
  //             <Radio value="inApp">In-App Notifications / इन-एप सूचनाहरू</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item
  //           name="contactTime"
  //           label="Best time to contact: / सम्पर्क गर्नको लागि उत्तम समय:"
  //         >
  //           <Radio.Group>
  //             <Radio value="morning">Morning / बिहान</Radio>
  //             <Radio value="afternoon">Afternoon / दिउँसो</Radio>
  //             <Radio value="evening">Evening / साँझ</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Notes and Feedback",
  //     content: (
  //       <>
  //         <Form.Item
  //           name="additionalNotes"
  //           label="Please provide any additional notes or comments that may help us better understand your investment needs: / कृपया कुनै अतिरिक्त नोटहरू वा टिप्पणीहरू प्रदान गर्नुहोस् जसले हामीलाई तपाईको लगानी आवश्यकताहरूलाई राम्रोसँग बुझ्न मद्दत पुर्याउँछ:"
  //         >
  //           <TextArea rows={4} />
  //         </Form.Item>
  //       </>
  //     ),
  //   },
  // ];

  const steps = [
    {
      title: "Personal Information",
      content: (
        <>
          <Form.Item
            name="age"
            label="Age / उमेर"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="occupation"
            label="Occupation / पेशा"
            rules={[
              { required: true, message: "Please input your occupation!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="monthlyIncome"
            label="Monthly Income / मासिक आम्दानी"
            rules={[
              { required: true, message: "Please input your monthly income!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="monthlyExpenses"
            label="Monthly Expenses / मासिक खर्च"
            rules={[
              {
                required: true,
                message: "Please input your monthly expenses!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Market Experience",
      content: (
        <>
          <Form.Item
            name="marketExperience"
            label="Secondary Market Experience (years) / द्वितीयक बजार अनुभव (वर्ष)"
            rules={[
              {
                required: true,
                message: "Please input your market experience!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="investmentProfile"
            label="Investment Profile / लगानी प्रोफाइल"
            rules={[
              {
                required: true,
                message: "Please input your investment profile!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="portfolioSize"
            label="What is the size of your current portfolio? / तपाईको हालको पोर्टफोलियोको आकार के हो?"
            rules={[
              { required: true, message: "Please select your portfolio size!" },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="below10L">
                Below 10 lakhs / १० लाख भन्दा तल
              </Checkbox>
              <Checkbox value="10-25L">10-25 lakhs / १०-२५ लाख</Checkbox>
              <Checkbox value="25-50L">25-50 lakhs / २५-५० लाख</Checkbox>
              <Checkbox value="50-1C">
                50 lakhs to 1 crore / ५० लाख देखि १ करोड
              </Checkbox>
              <Checkbox value="above1C">
                Above 1 crore / १ करोड भन्दा माथि
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="investmentGoal"
            label="१ बर्षमा आफ्नो पैसा double बनाउन चहानुहुन्छ? कि 10 बर्ष मा १० गुणा? / Do you want to double your money in 1 year or 10 times in 10 years?"
            rules={[
              {
                required: true,
                message: "Please select your investment goal!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="double1Year">1 बर्षमा double</Radio>
              <Radio value="x10In10Years">10 बर्षमा १० गुणा</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Investment Preferences",
      content: (
        <>
          <Form.Item
            name="knowledgeSource"
            label="ज्ञानको लागि के धेरै चलाउनुहुन्छ? / What do you use the most for knowledge?"
            rules={[
              {
                required: true,
                message: "Please input your knowledge source!",
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="Youtube">Youtube</Checkbox>
              <Checkbox value="Facebook">Facebook</Checkbox>
              <Checkbox value="Clubhouse">Clubhouse</Checkbox>
              <Checkbox value="Groups">
                Information from groups, brokers
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="tradingSource"
            label="के हजुरले कसैको group मा trading गर्नुभएको छ, वा Youtube live हेरेर trading गर्नुहुन्छ? भएको थियो? कस्को? / Have you traded in someone's group or by watching YouTube live? Whose?"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="follow"
            label="यी मध्ये को को लाई ज्यादा follow गर्नुहुन्छ? / Who do you follow the most?"
          >
            <Checkbox.Group>
              <Checkbox value="Shiva Chandra">Shiva Chandra</Checkbox>
              <Checkbox value="Subash Chandra Dhungana">
                Subash Chandra Dhungana
              </Checkbox>
              <Checkbox value="Subash Chandra Bhattarai">
                Subash Chandra Bhattarai
              </Checkbox>
              <Checkbox value="Nirmal Pradhaan">Nirmal Pradhaan</Checkbox>
              <Checkbox value="Rohan Karki">Rohan Karki</Checkbox>
              <Checkbox value="Bipin Kandel">Bipin Kandel</Checkbox>
              <Checkbox value="Basanta Adhikary">Basanta Adhikary</Checkbox>
              <Checkbox value="Dipendra Agrawal">Dipendra Agrawal</Checkbox>
              <Checkbox value="Other">Other (Specify)</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="idol"
            label="यी मध्ये कोहि हजुरको Idol / Who is your Idol among these?"
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Investment Goals",
      content: (
        <>
          <Form.Item
            name="primaryGoal"
            label="What is your primary investment goal? / तपाईको मुख्य लगानी लक्ष्य के हो?"
            rules={[
              {
                required: true,
                message: "Please input your primary goal!",
              },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="futureWealth">
                भविष्यको लागि सम्पती जोड्ने / Future Wealth Accumulation
              </Checkbox>
              <Checkbox value="immediateEarnings">
                तत्काल कमाउने / Immediate Earnings
              </Checkbox>
              <Checkbox value="expenseManagement">
                खर्छ, ब्याज चलाउदै सम्पती जोड्ने / Expense Management & Wealth
                Accumulation
              </Checkbox>
              <Checkbox value="retirementPlan">Retirement Plan</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="investmentHorizon"
            label="What is your preferred investment horizon? / तपाईको प्राथमिक लगानी समय सीमा के हो?"
          >
            <Radio.Group>
              <Radio value="shortTerm">
                Short-term (less than 1 year) / छोटो अवधि (१ बर्ष भन्दा कम)
              </Radio>
              <Radio value="mediumTerm">
                Medium-term (1-3 years) / मध्यम अवधि (१-३ बर्ष)
              </Radio>
              <Radio value="longTerm">
                Long-term (more than 3 years) / लामो अवधि (३ बर्ष भन्दा बढी)
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="portfolioReview"
            label="How often do you review or track your portfolio? / तपाईले आफ्नो पोर्टफोलियो कति पटक समीक्षा वा ट्र्याक गर्नुहुन्छ?"
          >
            <Radio.Group>
              <Radio value="daily">Daily / दैनिक</Radio>
              <Radio value="weekly">Weekly / साप्ताहिक</Radio>
              <Radio value="monthly">Monthly / मासिक</Radio>
              <Radio value="quarterly">Quarterly / त्रैमासिक</Radio>
              <Radio value="annually">Annually / वार्षिक</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Portfolio Details",
      content: (
        <>
          <Form.Item
            name="timeSpent"
            label="दिनमा कति समय share market मा बिताउनुहुन्छ? (TMS र अध्यन, छलफल) गरेर / How much time do you spend on the share market daily? (Including TMS, study, discussions)"
            rules={[
              {
                required: true,
                message: "Please input your time spent!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="currentHoldings"
            label="Please provide details of your current holdings / कृपया तपाईका हालका होल्डिङहरूको विवरण प्रदान गर्नुहोस्"
          >
            <Checkbox.Group>
              <Checkbox value="IT">IT</Checkbox>
              <Checkbox value="Finance">Finance</Checkbox>
              <Checkbox value="Pharma">Pharma</Checkbox>
              <Checkbox value="Energy">Energy</Checkbox>
              <Checkbox value="ConsumerGoods">Consumer Goods</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="sectorPreferences"
            label="Which sectors do you prefer? / तपाई कुन क्षेत्रलाई प्राथमिकता दिनुहुन्छ?"
          >
            <Checkbox.Group>
              <Checkbox value="banking">Banking / बैंकिंग</Checkbox>
              <Checkbox value="finance">Finance / वित्त</Checkbox>
              <Checkbox value="healthcare">Healthcare / स्वास्थ्य</Checkbox>
              <Checkbox value="technology">Technology / प्रविधि</Checkbox>
              <Checkbox value="utilities">Utilities / उपयोगिता</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="sectorAvoid"
            label="Which sectors do you avoid? / तपाई कुन क्षेत्रहरूबाट बच्न चाहानुहुन्छ?"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="investmentRestrictions"
            label="Do you have any specific investment restrictions or preferences? / तपाईसँग कुनै विशेष लगानी प्रतिबन्ध वा प्राथमिकताहरू छन्?"
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Investment Strategy",
      content: (
        <>
          <Form.Item
            onValuesChange={(changedValues, allValues) => {
              setFormData({ ...formData, ...allValues });
            }}
            name="portfolioAllocation"
            label="What percentage of your portfolio would you like to allocate to the following? (Total should be 100%) / तपाईको पोर्टफोलियोको कुन प्रतिशत निम्नमा वितरण गर्न चाहानुहुन्छ? (कुल १००% हुनुपर्छ)"
            rules={[
              {
                required: true,
                message: "Please input your portfolio allocation!",
              },
            ]}
          >
            <Input.Group compact>
              <Form.Item
                name={["portfolioAllocation", "swingTrading"]}
                label="Swing Trading / स्विंग ट्रेडिंग"
                rules={[
                  {
                    required: true,
                    message: "Please input your Swing Trading allocation!",
                  },
                ]}
                style={{ display: "inline-block", width: "20%" }}
              >
                <Input suffix="%" />
              </Form.Item>
              <Form.Item
                name={["portfolioAllocation", "positionalShort"]}
                label="Positional Short / पोसिशनल शॉर्ट"
                rules={[
                  {
                    required: true,
                    message: "Please input your Positional Short allocation!",
                  },
                ]}
                style={{ display: "inline-block", width: "20%" }}
              >
                <Input suffix="%" />
              </Form.Item>
              <Form.Item
                name={["portfolioAllocation", "longPositions"]}
                label="Long Positions / लामो पोजिसन"
                rules={[
                  {
                    required: true,
                    message: "Please input your Long Positions allocation!",
                  },
                ]}
                style={{ display: "inline-block", width: "20%" }}
              >
                <Input suffix="%" />
              </Form.Item>
              <Form.Item
                name={["portfolioAllocation", "investment"]}
                label="Investment / लगानी"
                rules={[
                  {
                    required: true,
                    message: "Please input your Investment allocation!",
                  },
                ]}
                style={{ display: "inline-block", width: "20%" }}
              >
                <Input suffix="%" />
              </Form.Item>
              <Form.Item
                name={["portfolioAllocation", "emergencyFund"]}
                label="Emergency Fund / आपतकालिन कोष"
                rules={[
                  {
                    required: true,
                    message: "Please input your Emergency Fund allocation!",
                  },
                ]}
                style={{ display: "inline-block", width: "20%" }}
              >
                <Input suffix="%" />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item
            onValuesChange={(changedValues, allValues) => {
              setFormData({ ...formData, ...allValues });
            }}
            name="specificScrips"
            label="Do you have any specific scrips you are currently interested in? / तपाईलाई अहिले चासो भएको कुनै विशेष स्क्रिप्स छ?"
            style={{ marginTop: "90px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            onValuesChange={(changedValues, allValues) => {
              setFormData({ ...formData, ...allValues });
            }}
            name="investmentStrategy"
            label="Do you follow any specific investment strategy or philosophy? (e.g., Value Investing, Growth Investing, Technical Analysis) / तपाई कुनै विशेष लगानी रणनीति वा दर्शन अनुसरण गर्नुहुन्छ? (जस्तै, मूल्य लगानी, वृद्धिशील लगानी, प्राविधिक विश्लेषण)"
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Recommendations and Preferences",
      content: (
        <>
          <Form.Item
            name="recommendations"
            label="What type of recommendations are you looking for? / तपाईलाई कस्तो प्रकारको सिफारिसहरू चाहिन्छ?"
          >
            <Checkbox.Group>
              <Checkbox value="buy">Buy / किन्नुहोस्</Checkbox>
              <Checkbox value="hold">Hold / होल्ड गर्नुहोस्</Checkbox>
              <Checkbox value="sell">Sell / बेच्नुहोस्</Checkbox>
              <Checkbox value="switch">Switch / सुइच गर्नुहोस्</Checkbox>
              <Checkbox value="accumulate">
                Accumulate / जम्मा गर्नुहोस्
              </Checkbox>
              <Checkbox value="exit">
                When to empty my portfolio? / मेरो पोर्टफोलियो खाली गर्ने समय
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="updateFrequency"
            label="How frequently would you like to receive portfolio updates and recommendations? / तपाई कति पटक पोर्टफोलियो अपडेट र सिफारिसहरू प्राप्त गर्न चाहानुहुन्छ?"
          >
            <Radio.Group>
              <Radio value="daily">Daily / दैनिक</Radio>
              <Radio value="weekly">Weekly / साप्ताहिक</Radio>
              <Radio value="monthly">Monthly / मासिक</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="advisoryPreference"
            label="Do you prefer automated recommendations or personal advisory? / तपाईले स्वचालित सिफारिसहरू वा व्यक्तिगत सल्लाह चाहनुहुन्छ?"
          >
            <Radio.Group>
              <Radio value="automated">Automated / स्वचालित</Radio>
              <Radio value="personal">
                Personal Advisory / व्यक्तिगत सल्लाह
              </Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Additional Information",
      content: (
        <>
          <Form.Item
            name="existingInvestments"
            label="Do you have any existing investments outside of the stock market? (e.g., Real Estate, Business, Mutual Funds) / तपाईसँग स्टक मार्केट बाहिर कुनै लगानीहरू छन्? (जस्तै, रियल इस्टेट, व्यवसाय, म्युचुअल फन्ड्स)"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="incorporateInvestments"
            label="Are you interested in incorporating these investments into your portfolio analysis? / तपाई यी लगानीहरूलाई तपाईको पोर्टफोलियो विश्लेषणमा समावेश गर्न इच्छुक हुनुहुन्छ?"
          >
            <Radio.Group>
              <Radio value="yes">Yes / हो</Radio>
              <Radio value="no">No / छैन</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="specificGoals"
            label="Do you have any specific goals or milestones you are targeting with your investments? (e.g., Retirement, Buying a House) / तपाईसँग तपाईको लगानीसँग कुनै विशेष लक्ष्यहरू वा माइलस्टोनहरू छन्? (जस्तै, रिटायरमेन्ट, घर किन्ने)"
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Contact Preferences",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            contactMethod: "email",
            contactTime: "morning",
          }}
        >
          <Form.Item
            name="contactMethod"
            label="Preferred method of communication: / संवादको प्राथमिकता विधि:"
          >
            <Radio.Group>
              <Radio value="email">Email / इमेल</Radio>
              <Radio value="phone">Phone / फोन</Radio>
              <Radio value="sms">SMS / एसएमएस</Radio>
              <Radio value="inApp">In-App Notifications / इन-एप सूचनाहरू</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="contactTime"
            label="Best time to contact: / सम्पर्क गर्नको लागि उत्तम समय:"
          >
            <Radio.Group>
              <Radio value="morning">Morning / बिहान</Radio>
              <Radio value="afternoon">Afternoon / दिउँसो</Radio>
              <Radio value="evening">Evening / साँझ</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Notes and Feedback",
      content: (
        <>
          <Form.Item
            name="additionalNotes"
            label="Please provide any additional notes or comments that may help us better understand your investment needs: / कृपया कुनै अतिरिक्त नोटहरू वा टिप्पणीहरू प्रदान गर्नुहोस् जसले हामीलाई तपाईको लगानी आवश्यकताहरूलाई राम्रोसँग बुझ्न मद्दत पुर्याउँछ:"
          >
            <TextArea rows={4} />
          </Form.Item>
        </>
      ),
    },
  ];
  return (
    <FullscreenContainer>
      <FormContainer>
        <StyledSteps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </StyledSteps>
        <StyledForm
          form={form}
          name="questionnaire"
          onFinish={handleFinish}
          initialValues={formData}
          onValuesChange={(changedValues, allValues) => {
            // console.log("all values", allValues);
            // console.log("values change,", changedValues);
            // setFormData(allValues);
            setFormData((prevValues) => ({
              ...prevValues,
              ...changedValues,
            }));
          }}
          layout="vertical"
        >
          {steps[current].content}
          <CenteredRow>
            {current > 0 && (
              <LargeButton onClick={() => prev()}>Previous</LargeButton>
            )}
            {current < steps.length - 1 && (
              <LargeButton type="primary" onClick={next}>
                Next
              </LargeButton>
            )}
            {current === steps.length - 1 && (
              <LargeButton
                type="primary"
                htmlType="submit"
                // onClick={handleClick}
              >
                Submit
              </LargeButton>
            )}
          </CenteredRow>
        </StyledForm>
      </FormContainer>
    </FullscreenContainer>
  );
};

export default UserQuestions;
