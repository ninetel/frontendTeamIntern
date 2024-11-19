import { useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";

const UserDashboard = () => {
  const userInfo = useSelector(
    (state) => state.currentLoggedInUser?.userInfo || {}
  );
  

  // console.log(
  //   "name, email, phoneNumber, role  *****",
  //   userInfo.name,
  //   userInfo.email,
  //   userInfo.phoneNumber,
  //   userInfo.role
  // );

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {userInfo?.name || "Guest"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Email: {userInfo?.email || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Phone Number: {userInfo?.phoneNumber || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Role: {userInfo?.role || "N/A"}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDashboard;
