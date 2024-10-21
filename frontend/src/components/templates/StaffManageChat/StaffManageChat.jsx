import { useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";
import StaffSidebar, { SidebarItem } from "../sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import axios from "axios"; // Import axios

import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import ManageChat from "./ManageChat";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";
import ManagePrompt from "../../orgamisms/ManagePrompt/ManagePrompt";
import { LiaMailBulkSolid } from "react-icons/lia";
import UrlSelection from "./SelectedUrl"
import { FaUserClock } from "react-icons/fa";

const StaffManageChat = () => {
  const navigate = useNavigate();
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [urlOptions, setUrlOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/urls`);
        setUrlOptions(response.data);
        console.log(urlOptions)
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleRoute = (route) => {
    navigate(route);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleRouteHome = () => {
    navigate("/staff/dashboard");
  };

  const handleRouteAddSignal = () => {
    navigate("/staff/dashboard/addsignal");
  };
  const handleRouteAddContact = () => {
    navigate("/staff/dashboard/addcontact");
  };
  const handleRouteManageContact = () => {
    navigate("/staff/dashboard/managecontact");
  };
  const handleRouteManagePrompt = () => {
    navigate("/staff/dashboard/manageprompt");
  };
  const handleRouteManageChat = () => {
    navigate("/staff/dashboard/managechat");
  };

  const handleRouteCreatePrompt = () => {
    navigate("/staff/dashboard/createprompt");
  };
  const handleRouteChat = () => {
    navigate("/staff/dashboard/Chat");
  };
  const handleRouteBulkMessage = () => {
    navigate("/staff/dashboard/BulkMessage");
  };
  const handleRouteRTMS = () => {
    navigate("/staff/dashboard/RTMS");
  };
  const handleRouteChatIframe=()=>{
    navigate("/staff/dashboard/manageChatIframe");
  }
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
          {/* <SidebarItem icon={<TfiWrite size={30} />} text="Manage Signal" /> */}
          <SidebarItem
            icon={<IoMdAdd size={30} />}
            text="Add Contact"
            handleClick={handleRouteAddContact}
          />

          {/* <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Manage Contact"
            handleClick={handleRouteManageContact}
          /> */}
          <SidebarItem
            icon={<MdOutlineMarkChatRead size={30} />}
            text="Add Prompt"
            handleClick={handleRouteCreatePrompt}
          />
          {/* <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Prompt"
            handleClick={handleRouteManagePrompt}
          /> */}
          {/* <SidebarItem
            icon={<IoSettingsOutline size={30} />}
            text="Change Password"
          /> */}
          {/* <SidebarItem
            icon={<IoChatbubbleEllipsesOutline size={30} />}
            text="Chat"
            handleClick={handleRouteChat}
          /> */}
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Chat"
            handleClick={handleRouteManageChat}
            alert
            active
          />

          {/* <SidebarItem
          icon={<PiChatsTeardropLight size={30} />}
          text="Manage Chat Iframe"
          handleClick={handleRouteChatIframe}

        /> */}
          {/* <SidebarItem
            icon={<LiaMailBulkSolid size={40} />}
            text="Bulk Message"
            handleClick={handleRouteBulkMessage}
          /> */}
          {/* <SidebarItem
            icon={<FaUserClock size={40} />}
            text="RTMS"
            handleClick={handleRouteRTMS}
          /> */}
        </StaffSidebar>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <ManageChat />
 
      </Box>
    </Box>
  );
};

export default StaffManageChat;
