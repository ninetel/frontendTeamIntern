import * as Yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const SIGN_IN_INITIAL_FORM_STATE = {
  email: "user2@example.com",
  password: "userpassword2",
};

export const SIGN_IN_STAFF_INITIAL_FORM_STATE = {
  email: "ranish@gmail.com",
  password: "ranish",
};

export const SIGN_IN_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    )
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required(),
});

export const SIGN_UP_INITIAL_FORM_STATE = {
  email: "",
  name: "",
  phoneNumber: "",
  password: "",
  role: "user",
  createdAt: Date.now,
  hasAnsweredQuestions: false,
  responses: {
    bankBalance: null,
    monthlySalary: null,
    jobCategory: null,
    investmentType: null,
    age: null,
    location: null,
    anyInvestorsInFamily: null,
    expectationFromTheSikinchhaApp: null,
  },
};

export const SIGN_UP_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    )
    .email("Invalid email")
    .required("Required"),
  name: Yup.string().min(2).max(25).required("Required"),
  phoneNumber: Yup.string().required("Required"),
  password: Yup.string()
    .matches(PASSWORD_REGEX, "Please Enter a strong password")
    .required("Required"),
});

// export const FORGOT_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
//   phoneNumber: Yup.string().required("Required"),
// });

export const VERIFY_OTP_VALIDATION_SCHEMA = Yup.object().shape({
  otp: Yup.string().required("Enter the complete otp code."),
  newPassword: Yup.string()
    .matches(PASSWORD_REGEX, "Please Enter a strong password")
    .required("Please enter a password"),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("newPassword")], "Your passwords do not match."),
});
