import { Grid, Box } from "@mui/material";
import Login from "../src/components/templates/Login/LoginTemplate";
import { makeStyles } from "@mui/styles";
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

const LogIn = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Login />
    </Box>
  );
};

export default LogIn;
