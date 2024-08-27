import SignUpTemplate from "../src/components/templates/SignUp/SignUpTemplate";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
// import { useAppSelector } from '../store/store';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9F2FF",
  },
});

const Authentication = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  // const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  // useEffect(() => {
  //     if (isLoggedIn) navigate('/dashboard');
  // }, [isLoggedIn]);

  return (
    <Box className={classes.container}>
      <SignUpTemplate />
    </Box>
  );
};

export default Authentication;
