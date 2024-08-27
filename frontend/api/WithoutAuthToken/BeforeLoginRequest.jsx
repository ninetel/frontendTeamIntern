import axios from "axios";
export const SignUpRequest = async ({ email, name, password, phoneNumber }) => {
  // console.log("Inside of the SignUpRequest");
  // console.log("email, name, password", email, name, password, phoneNumber);
  return await axios.post("http://localhost:3000/api/user/signup", {
    email,
    name,
    password,
    phoneNumber,
  });
};

export const UserLoginRequest = async ({ email, password }) => {
  try {
    // console.log("Inside of the UserLoginRequest");
    const response = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });
    // console.log("Response --->", response);
    return response;
  } catch (error) {
    console.error("Error during sign-in request:", error);
    throw error;
  }
};

export const AdminLoginRequest = async ({ email, password }) => {
  try {
    // console.log("Inside of the AdminLoginRequest");
    const response = await axios.post(
      "http://localhost:3000/api/admin/admin/login",
      {
        email,
        password,
      }
    );
    // console.log("Response --->", response);
    return response;
  } catch (error) {
    console.error("Error during sign-in request:", error);
    throw error;
  }
};
export const StaffLoginRequest = async ({ email, password }) => {
  try {
    // console.log("Inside of the Staff Login Request");
    const response = await axios.post(
      "http://localhost:3000/api/staff/login ",
      {
        email,
        password,
      }
    );
    // console.log("Response --->", response);
    return response;
  } catch (error) {
    console.error("Error during sign-in request:", error);
    throw error;
  }
};
