import { Grid } from "@mui/material";
import Heading from "../../atoms/Heading/Heading";
import FormTopSection from "../../molecules/LoginTopSection/LoginTopSection";
import LoginForm from "../../orgamisms/LogIn/LoginInForm";
import LoginFooterSection from "../../molecules/LoginFooterSection/LoginFooterSection"
const Login = () => {
  return (
    <Grid
      container
      sx={{
        width: "480px",
        height: "554px",
        gap: "15px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ height: "54px", display: "flex", justifyContent: "center" }}
      >
        <Heading />
      </Grid>

      <Grid
        item
        sx={{
          height: "440px",
          padding: "29px 33px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Grid container gap="28px">
          <Grid item sx={{ height: "50px" }}>
            <FormTopSection
              heading="Log in"
              text="Don't have an account?"
              link="Sign up"
            />
          </Grid>
          <Grid item>
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
