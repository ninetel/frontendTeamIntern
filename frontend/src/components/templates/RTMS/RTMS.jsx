import { useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";
import StaffSidebar, { SidebarItem } from "../sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { IoChatbubbleEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";
import CreateContact from "../CreateContact/CreateContact";
import { LiaMailBulkSolid } from "react-icons/lia";

import { FaUserClock } from "react-icons/fa";
import BulkMessage from "../BulkMessage/BulkMessage";
import RtmsContent from "./rtmsContent";



const RTMS = () => {
  const navigate = useNavigate(); 
  const handleRouteHome = () => {
    navigate("/admin/dashboard");
  };

 const handleRouteAddSignal = () => {
   navigate("/admin/dashboard/addsignal");
 };
  const handleRouteManageSignal = () => {
    navigate("/admin/dashboard/managesignal");
  };
  const handleRouteAddContact = () => {
    navigate("/admin/dashboard/addcontact");
  };
  const handleRouteManageContact = () => {
    navigate("/admin/dashboard/managecontact");
  };
  const handleRouteManagePrompt = () => {
    navigate("/admin/dashboard/manageprompt");
  };
  const handleRouteCreatePrompt = () => {
    navigate("/admin/dashboard/createprompt");
  };
  const handleRouteChat = () => {
    navigate("/admin/dashboard/Chat");
  };
  const handleRouteBulkMessage = () => {
    navigate("/admin/dashboard/BulkMessage");
  };
const handleRouteRTMS = () => {
    navigate("/admin/dashboard/RTMS");
  };
//check
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
            handleClick={handleRouteManageSignal}
          />
            <SidebarItem
            icon={<IoMdAdd size={30} />}
            text="Add Contact"
            handleClick={handleRouteAddContact}
          />
          
          <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Manage Contact"
            handleClick={handleRouteManageContact}
          />
          <SidebarItem
            icon={<MdOutlineMarkChatRead size={30} />}
            text="Add Prompt"
            handleClick={handleRouteCreatePrompt}
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Prompt"
            handleClick={handleRouteManagePrompt}
          />
          <SidebarItem
            icon={<IoSettingsOutline size={30} />}
            text="Change Password"
          />
           <SidebarItem
            icon={<IoChatbubbleEllipsesOutline size={30} />}
            text="Chat"
            handleClick={handleRouteChat}
          />
          <SidebarItem
            icon={<LiaMailBulkSolid size={40} />}
            text="Bulk Message"
            handleClick={handleRouteBulkMessage}
          />
<SidebarItem
            icon={<FaUserClock  size={40} />}
            text="RTMS"
            handleClick={handleRouteRTMS}
            alert
            active
          />

        </StaffSidebar>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
       <RtmsContent/>
      </Box>
    </Box>
    
  );
};

export default RTMS;
