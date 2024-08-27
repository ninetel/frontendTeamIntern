import { Formik, Form, ErrorMessage, useFormikContext } from "formik";
import {
  setAuthenticationTokens,
  toggleLoggedIn,
} from "../../../../store/slices/authenticationSlice";
import { Grid, Divider } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../../atoms/InputField/InputField";
import SubmitButton from "../../atoms/FormSubmitButton/SubmitButton";
import FormFooterSection from "../../molecules/LoginFooterSection/LoginFooterSection";
import {
  SIGN_IN_INITIAL_FORM_STATE,
  SIGN_IN_VALIDATION_SCHEMA,
} from "../../../../hooks/Form/useFormValidation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { UserLoginRequest } from "../../../../api/WithoutAuthToken/BeforeLoginRequest";
import { fetchLoggedInUserInfo } from "../../../../api/Query/FetchLoggedInUserInfo";
import { setCurrentUser } from "../../../../store/slices/currentLoggedInUserSlice";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();
  const [fetchUserInfo, setFetchUserInfo] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );

  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ["getLoggedInUserInfo", accessToken],
    queryFn: () => fetchLoggedInUserInfo(accessToken, "user"),
    enabled: fetchUserInfo,
  });
  // console.log("data, isSuccess", data, isSuccess);
  useEffect(() => {
    // dispatch(
    //   setCurrentUser({
    //     _id: null,
    //     email: null,
    //     name: null,
    //     phoneNumber: null,
    //     role: null,
    //     hasAnsweredQuestions: null,
    //   })
    // );
    // dispatch(toggleLoggedIn(false));
    // dispatch(setAuthenticationTokens(null));

    if (isSuccess && data) {
      // console.log("data inside of useEffect", data);
      setSignedIn(true);
      setSignInLoading(false);
      const { _id, email, name, phoneNumber, role, hasAnsweredQuestions } =
        data.data; // Extract only needed data
      setTimeout(() => {
        // console.log("Dispatching setCurrentUser action");
        dispatch(
          setCurrentUser({
            _id,
            email,
            name,
            phoneNumber,
            role,
            hasAnsweredQuestions,
          })
        );
        dispatch(toggleLoggedIn(true));
      }, 300);
      hasAnsweredQuestions
        ? navigate("/user/dashboard")
        : navigate("/user/questions");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const { mutate } = useMutation({
    mutationFn: UserLoginRequest,
  });

  const handleFormSubmit = async (values, setFieldError) => {
    console.log("values", values);
    mutate(
      { ...values },
      {
        onSuccess: (res) => {
          // console.log("Success login and response -->", res);
          dispatch(setAuthenticationTokens(res.data));
          setFetchUserInfo(true);
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            if (err.response?.status === 400) {
              console.log(err.response.data.message);
              setFieldError("password", err.response.data.message);
            } else if (err.response?.status === 401) {
              setFieldError("email", err.response.data.message);
            }
          }
          console.log(err);
          setSignInLoading(false);
          alert("Sing In Failed");
        },
      }
    );
  };
  const initialValues = {
    email: "user2@example.com",
    password: "userpassword2",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SIGN_IN_VALIDATION_SCHEMA}
      onSubmit={(values, { setFieldError, setSubmitting }) => {
        handleFormSubmit(values, setFieldError);
        setSignInLoading(true);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Grid container sx={{ display: "flex", gap: "30px" }}>
              <Grid item xs={12} sx={{ height: "52px" }}>
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  autoComplete="off"
                  touched={touched.email}
                  errorMessage={errors.email}
                  error={touched.email && errors.email ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ height: "52px" }}>
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  touched={touched.password}
                  errorMessage={errors.password}
                  error={touched.password && errors.password ? true : false}
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  height: "52px",
                }}
              >
                <SubmitButton
                  // isLoading={signInLoading}
                  // isSuccess={signedIn}
                  disabled={isSubmitting}
                  successText="Signed In"
                  fullWidth
                >
                  Submit
                </SubmitButton>
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: "27px",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "40px",
                  }}
                >
                  <Divider />
                  <FormFooterSection
                    color="#0F6EFB"
                    marginLeft="auto"
                    marginRight="0"
                  >
                    <Link to="/forgotpassword" style={{ color: "inherit" }}>
                      Forgot Password
                    </Link>
                  </FormFooterSection>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LogInForm;
