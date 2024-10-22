import { useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Container, Typography, Paper, Box } from "@mui/material";
import StaffSidebar, { SidebarItem } from "../src/components/templates/sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector(
    (state) => state.currentLoggedInUser?.userInfo || {}
  );

  console.log(
    "firstName, email, phoneNumber, role  *****",
    userInfo.firstName,
    userInfo.email,
    userInfo.phoneNumber,
    userInfo.role
  );

  const handleAddSignal = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/createsignal`;
    navigate(newPath);
  };

  const handleRouteManageSignal = () => {
    navigate("/staff/dashboard/managesignal");
  };

  const handleRouteAddPrompt = () => {
    navigate("/staff/dashboard/addprompt");
  };

  const handleRouteManagePrompt = () => {
    navigate("/staff/dashboard/manageprompt");
  };
  const handleRouteManageChat = () => {
    navigate("/staff/dashboard/managechat");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "250px" }}>
        <StaffSidebar>
          <SidebarItem icon={<FaHome size={30} />} text="Home" active alert />
          <SidebarItem
            icon={<IoMdAdd size={30} />}
            text="Add Signal"
            handleClick={handleAddSignal}
          />
          {/* <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Update Profile"
            handleClick={handleRouteManageSignal}
          /> */}
          <SidebarItem
            icon={<MdOutlineMarkChatRead size={30} />}
            text="Add Prompt"
            handleClick={handleRouteAddPrompt}
          />
          {/* <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Prompt"
            handleClick={handleRouteManagePrompt}
          /> */}
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Chat"
            handleClick={handleRouteManageChat}
          />
          {/* <SidebarItem
            icon={<IoSettingsOutline size={30} />}
            text="Change Password"
          /> */}
        </StaffSidebar>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Bank " },
                  { id: 1, value: 15, label: "Agriculture " },
                  { id: 2, value: 20, label: "Finance " },
                  { id: 3, value: 30, label: "Hydropower " },
                  { id: 4, value: 20, label: "Trading " },
                ],
              },
            ]}
            width={600}
            height={400}
          />
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
            series={[
              {
                data: [1, 2, 3, 4, 3, 2, 3, 3, 4],
                valueFormatter: (value) => (value == null ? "NaN" : value.toString()),
              },
              {
                data: [3, 6, 4, 2, 7, 8, 10, 11.5, 15],
              },
              {
                data: [10, 9, 8, 7, 6, 5, 4, 4, 5],
                valueFormatter: (value) => (value == null ? "?" : value.toString()),
              },
            ]}
            height={550}
            width={800}
            margin={{ top: 10, bottom: 20 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <BarChart
              xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              width={750}
              height={300}
            />
          </Box>
        </Box>
        <Box>
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
                Welcome, {userInfo?.firstName || "Staff Member"}
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
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDashboard;
