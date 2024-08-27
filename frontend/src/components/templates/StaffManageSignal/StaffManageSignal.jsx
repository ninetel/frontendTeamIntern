import { useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";
import StaffSidebar, { SidebarItem } from "../sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ManageSignal from "../ManageSignal/ManageSignal";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";
// import ManagePrompt from "../../orgamisms/ManagePrompt/ManagePrompt"

const StaffManageSignal = () => {
  const navigate = useNavigate();
  const handleRouteHome = () => {
    navigate("/staff/dashboard");
  };

  const handleRouteAddSignal = () => {
    navigate("/staff/dashboard/createsignal");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "250px" }}>
        <StaffSidebar>
          <SidebarItem
            icon={<FaHome size={30} />}
            text="Home"
            handleClick={handleRouteHome}
          />
          <SidebarItem
            icon={<IoMdAdd size={30} />}
            text="Add Signal"
            handleClick={handleRouteAddSignal}
          />
          <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Manage Signal"
            alert
            active
          />
          <SidebarItem
            icon={<MdOutlineMarkChatRead size={30} />}
            text="Add Prompt"
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Prompt"
          />
          <SidebarItem
            icon={<IoSettingsOutline size={30} />}
            text="Change Password"
          />
        </StaffSidebar>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <ManageSignal />
      </Box>
    </Box>
  );
};

export default StaffManageSignal;
