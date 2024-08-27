import { Grid } from "@mui/material";
import InputField from "../../atoms/InputField/InputField";
import SubmitButton from "../../atoms/FormSubmitButton/SubmitButton";
import { Formik, Form } from "formik";
import PhoneInputWrapper from "../../atoms/PhoneInput/PhoneInputWrapper";
import {
  SIGN_UP_INITIAL_FORM_STATE,
  SIGN_UP_VALIDATION_SCHEMA,
} from "../../../../hooks/Form/useFormValidation";
import { SignUpRequest } from "../../../../api/WithoutAuthToken/BeforeLoginRequest";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: SignUpRequest,
    onSuccess: (response) => {
      // console.log(response);
      // alert("Account Created Successfully.");
      navigate("/user/login")

    },
    onError: (err) => {
      // console.log(err);
      alert("An error occured while submiting the form");
    },
  });
  const handleFormSubmit = async (values, action) => {
    // console.log("OnSubmit called");
    // console.log("values, action", values, action);
    mutate({ ...values });
  };

  return (
    <Formik
      initialValues={{ ...SIGN_UP_INITIAL_FORM_STATE }}
      validationSchema={SIGN_UP_VALIDATION_SCHEMA}
      onSubmit={(values, action) => {
        console.log("values in formik", values);
        handleFormSubmit(values, action);
        action.resetForm();
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Grid container gap="24px" >
              <Grid item xs={12} sx={{ height: "50px" }}>
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={touched.email && errors.email ? true : false}
                  errorMessage={errors.email}
                  touched={touched.email}
                />
              </Grid>
              <Grid item xs={12} sx={{ height: "50px" }}>
                <InputField
                  name="name"
                  label="Username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  fullWidth
                  error={touched.name && errors.name ? true : false}
                  errorMessage={errors.name}
                  touched={touched.name}
                />
              </Grid>

              <Grid item xs={12} sx={{ height: "50px" }}>
                <PhoneInputWrapper name="phoneNumber" label="Phone Number" />
              </Grid>

              <Grid item xs={12} sx={{ height: "50px" }}>
                <InputField
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={touched.password && errors.password ? true : false}
                  errorMessage={errors.password}
                  touched={touched.password}
                />
              </Grid>
              <Grid item xs={12} sx={{ height: "50px" }}>
                <SubmitButton
                  vairant="outlined"
                  color="primary"
                  fullWidth
                  isValid={isValid}
                  submitting={isSubmitting}
                >
                  Sign Up
                </SubmitButton>
                {/* <SubmitButton isLoading={isLoading} vairant="outlined" color="primary" fullWidth isValid={isValid} submitting={isSubmitting}>
                                    Sign Up
                                </SubmitButton> */}
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
