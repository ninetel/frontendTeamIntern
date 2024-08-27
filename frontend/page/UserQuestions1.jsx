import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./userQuestion.css";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
} from "@mui/material";

const validationSchema = Yup.object({
  bankBalance: Yup.string().required("Required"),
  monthlySalary: Yup.string().required("Required"),
  jobCategory: Yup.string().required("Required"),
  investmentType: Yup.string().required("Required"),
  age: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  anyInvestorsInFamily: Yup.boolean(),
  expectationFromTheSikinchhaApp: Yup.string().required("Required"),
});

const UserQuestions = () => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector(
    (state) => state.currentLoggedInUser.userInfo.id
  );
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  console.log("currentUserId in app", currentUserId);

  const [loading, setLoading] = useState(true);
  const [hasAnsweredQuestions, setHasAnsweredQuestions] = useState(false);

  useEffect(() => {
    if (hasAnsweredQuestions) {
      navigate("/user/dashboard");
    } else {
      setLoading(false);
    }
  }, [currentUserId, navigate, hasAnsweredQuestions]);

  const handleSubmit = async (values) => {
    console.log("values of form -->", values);
    try {
      await axios.put(
        `http://localhost:3000/api/user/responses/${currentUserId}`,
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

  if (loading) return <CircularProgress />;

  return (
    <Formik
      initialValues={{
        bankBalance: "1000",
        monthlySalary: "2000",
        jobCategory: "programmer",
        investmentType: "Long term",
        age: "22",
        location: "Bafal",
        anyInvestorsInFamily: false,
        expectationFromTheSikinchhaApp: "To get Stocks to invest in..",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form className="root-form">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="What is Your Bank Balance"
              name="bankBalance"
              value={values.bankBalance}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.bankBalance && Boolean(errors.bankBalance)}
              helperText={touched.bankBalance && errors.bankBalance}
            />
            <TextField
              label="What is Your Monthly Salary"
              name="monthlySalary"
              value={values.monthlySalary}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.monthlySalary && Boolean(errors.monthlySalary)}
              helperText={touched.monthlySalary && errors.monthlySalary}
            />
            <TextField
              label="Your Job Category"
              name="jobCategory"
              value={values.jobCategory}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.jobCategory && Boolean(errors.jobCategory)}
              helperText={touched.jobCategory && errors.jobCategory}
            />
            <TextField
              label="Which Investment Type are you interested into"
              name="investmentType"
              value={values.investmentType}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.investmentType && Boolean(errors.investmentType)}
              helperText={touched.investmentType && errors.investmentType}
            />
            <TextField
              label="What is your age"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.age && Boolean(errors.age)}
              helperText={touched.age && errors.age}
            />
            <TextField
              label="Location"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="anyInvestorsInFamily"
                  checked={values.anyInvestorsInFamily}
                  onChange={handleChange}
                />
              }
              label="Are there any investors in your family?"
            />
            <TextField
              label="What is your expectation from the Sikinchha App"
              name="expectationFromTheSikinchhaApp"
              value={values.expectationFromTheSikinchhaApp}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.expectationFromTheSikinchhaApp &&
                Boolean(errors.expectationFromTheSikinchhaApp)
              }
              helperText={
                touched.expectationFromTheSikinchhaApp &&
                errors.expectationFromTheSikinchhaApp
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserQuestions;


/*
  const steps = [
    {
      title: "Personal Information",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            age: "30",
            occupation: "Software Developer",
            monthlyIncome: "60000",
            monthlyExpenses: "25000",
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Market Experience",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            marketExperience: "5",
            investmentProfile: "Moderate",
            portfolioSize: "10-25L",
            investmentGoal: "double1Year",
          }}
        >
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
        </Form>
      ),
    },
  ];






    {
      title: "Investment Preferences",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            knowledgeSource: ["Youtube", "Groups"],
            tradingSource: "Yes",
            follow: ["Shiva Chandra"],
            idol: "Subash Chandra Dhungana",
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Investment Goals",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            primaryGoal: ["futureWealth"],
            investmentHorizon: "longTerm",
            portfolioReview: "monthly",
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Portfolio Details",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            timeSpent: "2 hours",
            currentHoldings: ["IT", "Finance"],
            sectorPreferences: ["banking", "finance"],
            sectorAvoid: "hydropower",
            investmentRestrictions: "No tobacco or alcohol stocks",
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Investment Strategy",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            portfolioAllocation: {
              swingTrading: "20",
              positionalShort: "15",
              longPositions: "30",
              investment: "25",
              emergencyFund: "10",
            },
            specificScrips: "ABC Ltd, XYZ Corp",
            investmentStrategy: "Value Investing",
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Recommendations and Preferences",
      content: (
        <Form
          initialValues={{
            recommendations: ["buy", "hold"],
            updateFrequency: "weekly",
            advisoryPreference: "personal",
          }}
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
        >
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
        </Form>
      ),
    },
    {
      title: "Additional Information",
      content: (
        <Form
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
          initialValues={{
            existingInvestments: "Real Estate, Mutual Funds",
            incorporateInvestments: "yes",
            specificGoals: "Retirement, Buying a House",
          }}
        >
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
        </Form>
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
        <Form
          initialValues={{
            additionalNotes: "No additional notes",
          }}
          onValuesChange={(changedValues, allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
        >
          <Form.Item
            name="additionalNotes"
            label="Please provide any additional notes or comments that may help us better understand your investment needs: / कृपया कुनै अतिरिक्त नोटहरू वा टिप्पणीहरू प्रदान गर्नुहोस् जसले हामीलाई तपाईको लगानी आवश्यकताहरूलाई राम्रोसँग बुझ्न मद्दत पुर्याउँछ:"
          ></Form.Item>
          <TextArea rows={4} />
        </Form>
      ),
    },
*/
