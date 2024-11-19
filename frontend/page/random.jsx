import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const UserQuestions = () => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector(
    (state) => state.currentLoggedInUser.userInfo.id
  );
  // console.log("currentUserId in app", currentUserId);

  const [responses, setResponses] = useState({
    bankBalance: "",
    monthlySalary: "",
    jobCategory: "",
    investmentType: "",
    age: "",
    location: "",
    anyInvestorsInFamily: false,
    expectationFromTheSikinchhaApp: "",
  });

  const [loading, setLoading] = useState(true);
  const [hasAnsweredQuestions, setHasAnsweredQuestions] = useState(false);
  useEffect(() => {
    if (hasAnsweredQuestions) {
      navigate("/user/dashboard");
    } else {
      setLoading(false);
    }
  }, [currentUserId, navigate, hasAnsweredQuestions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses({ ...responses, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/responses/${currentUserId}`,
        {
          responses,
        }
      );
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error updating responses", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>What is Your Bank Balance:</label>
        <input
          type="text"
          name="bankBalance"
          value={responses.bankBalance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>What is Your Monthly Salary:</label>
        <input
          type="text"
          name="monthlySalary"
          value={responses.monthlySalary}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Your Job Category:</label>
        <input
          type="text"
          name="jobCategory"
          value={responses.jobCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Which Investment Type are you interested into:</label>
        <input
          type="text"
          name="investmentType"
          value={responses.investmentType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>What is your age</label>
        <input
          type="text"
          name="age"
          value={responses.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={responses.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Any there any investors in family? :
          <input
            type="checkbox"
            name="anyInvestorsInFamily"
            checked={responses.anyInvestorsInFamily}
            onChange={(e) =>
              setResponses({
                ...responses,
                anyInvestorsInFamily: e.target.checked,
              })
            }
          />
        </label>
      </div>
      <div>
        <label>What is your expectation from the Sikinchha App:</label>
        <input
          type="text"
          name="expectationFromTheSikinchhaApp"
          value={responses.expectationFromTheSikinchhaApp}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserQuestions;
