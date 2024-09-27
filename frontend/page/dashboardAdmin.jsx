/* eslint-disable react/jsx-props-no-spreading */
// import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import GenderSelect from "../src/components/molecules/GenderSelect/GenderSelect";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import axios from "axios";
import "../styles/AdminDashboard.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Personal email is required"),
  phoneNumber: Yup.string().required("Please enter valid phone number"),
  password: Yup.string().required("please enter password for staff"),
});

// {
//   initialValues,
//   onSubmit,
//   isLoading,
//   id,
//   reinitializeFormik = false,
// }

export default function AddStaff() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  const reinitializeFormik = false;

  const [open, setOpen] = useState(false);
  const [createdStaff, setCreatedStaff] = useState(null);

  const handleOpen = (staff) => {
    setCreatedStaff(staff);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("values from the form", values);
    try {
      const response = await axios.post(
        "${import.meta.env.VITE_BACKEND_URL}/api/staff/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Assuming the token is stored in localStorage
          },
        }
      );
      // handleOpen(response.data);
      alert("Staff created succesfully");
    } catch (e) {
      console.log("error in frontend", e);
      // Handle the error case
      alert("Error while creating staff -- frontend axios");
    }
  };
  const StaffFormInitState = {
    firstName: "random",
    lastName: "dsd",
    middleName: "damn",
    address: "bafal",
    phoneNumber: "987239433",
    emergencyContactName: "rick",
    emergencyContactNumber: "7397432223",
    gender: "MALE",
    email: "as@gmail.com",
    password: "staff1",
    role: "staff",
    ecRelationShip: "father",
  };

  const formik = useFormik({
    initialValues: StaffFormInitState,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: reinitializeFormik,
  });

  return (
    <div className="sikinchha__add_staff_root">
      <form onSubmit={formik.handleSubmit}>
        <div className="root_container">
          <Typography variant="h4" mt="16px">
            Staff Info
          </Typography>
          <Grid container spacing={2} sx={{ mt: "16px" }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">First Name*</Typography>
              <TextField
                placeholder="John"
                fullWidth
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Middle Name</Typography>
              <TextField
                name="middleName"
                placeholder="Bahadur"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.middleName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Last Name*</Typography>
              <TextField
                name="lastName"
                placeholder="Doe"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Personal Email*</Typography>
              <TextField
                name="email"
                placeholder="example@gmail.com"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Address</Typography>
              <TextField
                name="address"
                placeholder="Address"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Phone No.*</Typography>
              <TextField
                placeholder="xxxxxxxxxx"
                name="phoneNumber"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Gender</Typography>
              <GenderSelect
                onChange={(v) => formik.setFieldValue("gender", v)}
                value={formik.values.gender}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Emergency Contact No.</Typography>
              <TextField
                placeholder="xxxxxxxxxx"
                name="emergencyContactNumber"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.emergencyContactNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Password</Typography>
              <TextField
                placeholder="password"
                name="password"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Role</Typography>
              <TextField
                placeholder="role"
                name="role"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.role}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Emergency Contact Name
              </Typography>
              <TextField
                name="emergencyContactName"
                placeholder="Mark Doe"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.emergencyContactName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Relation</Typography>
              <TextField
                name="ecRelationShip"
                placeholder="Father"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.ecRelationShip}
              />
            </Grid>
          </Grid>
        </div>
        <div className="action_footer">
          <Button
            variant="contained"
            color="success"
            type="submit"
            // loading={isLoading}
            disabled={!formik.dirty}
          >
            Create Staff
          </Button>
        </div>
      </form>
    </div>
  );
}
