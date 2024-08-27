import { Box, Grid } from "@mui/material";
import StaffLoginTemplate from "../src/components/templates/StaffLoginTemplate/StaffLoginTemplate";
import FormTopSection from "../src/components/molecules/LoginTopSection/LoginTopSection";
import Heading from "../src/components/atoms/Heading/Heading";
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

const StaffLogin = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
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
          <Heading text="Staff Login" />
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
              <StaffLoginTemplate />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffLogin;
