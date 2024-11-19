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
  SIGN_IN_STAFF_INITIAL_FORM_STATE,
} from "../../../../hooks/Form/useFormValidation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { StaffLoginRequest } from "../../../../api/WithoutAuthToken/BeforeLoginRequest";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../../../store/slices/currentLoggedInUserSlice";
import { fetchLoggedInUserInfo } from "../../../../api/Query/FetchLoggedInUserInfo";

const StaffLoginTemplate = () => {
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  const dispatch = useAppDispatch();
  const { mutate } = useMutation({
    mutationFn: StaffLoginRequest,
  });
  const navigate = useNavigate();
  const [fetchStaffInfo, setFetchStaffInfo] = useState(false);

  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ["getLoggedInStaffInfo", accessToken],
    queryFn: () => fetchLoggedInUserInfo(accessToken, "staff"),
    enabled: fetchStaffInfo,
  });

  useEffect(() => {
    if (isSuccess && data) {
      // console.log("data inside of useEffect", data);
      const { _id, email, name, phoneNumber, role } = data.data; // Extract only needed data
      setTimeout(() => {
        // console.log("Dispatching setCurrentUser action");
        dispatch(
          setCurrentUser({
            _id,
            email,
            name,
            phoneNumber,
            role,
          })
        );
        navigate("/staff/dashboard");
      }, 300);
    }
  }, [navigate, dispatch, data, isSuccess]);

  const handleFormSubmit = async (values, setFieldError) => {
    // console.log("values", values);
    mutate(
      { ...values },
      {
        onSuccess: (res) => {
          dispatch(setAuthenticationTokens(res.data));
          dispatch(toggleLoggedIn(true));
          setFetchStaffInfo(true);
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            if (err.response?.status === 400) {
              // console.log(err.response.data.message);
              setFieldError("password", err.response.data.message);
            } else if (err.response?.status === 401) {
              setFieldError("email", err.response.data.message);
            }
          }
          // console.log(err);
          // setSignInLoading(false);
          alert("Sing In Failed");
        },
      }
    );
  };

  // useQuery({
  //   queryKey: ["getLoggedInUserInfo"],
  //   queryFn: getLoggedInUserInfo,
  //   enabled: accessToken === null ? false : true,
  //   onSuccess: (res) => {
  //     setSignedIn(true);
  //     setSignInLoading(false);
  //     setTimeout(() => {
  //       dispatch(setCurrentUser(res.data));
  //       dispatch(toggleLoggedIn(true));
  //     }, 300);
  //     // alert('login SuccessFul');
  //     //doing this already navigate to dashboard in authentication page
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     setSignInLoading(false);
  //   },
  // });

  return (
    <Formik
      initialValues={{ ...SIGN_IN_STAFF_INITIAL_FORM_STATE }}
      validationSchema={SIGN_IN_VALIDATION_SCHEMA}
      onSubmit={(values, { setFieldError }) => {
        handleFormSubmit(values, setFieldError);
        // setSignInLoading(true);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Grid container sx={{ display: "flex", gap: "30px" }}>
              <Grid item xs={12} sx={{ height: "52px" }}>
                <InputField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={values.password}
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

export default StaffLoginTemplate;
