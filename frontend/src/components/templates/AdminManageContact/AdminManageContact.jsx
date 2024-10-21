import { useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";
import StaffSidebar, { SidebarItem } from "../sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { MoreVertical } from "lucide-react";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ManageSignal from "../ManageSignal/ManageSignal";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";
import ManagePrompt from "../../orgamisms/ManagePrompt/ManagePrompt";
import ManageContact from "../ManageContact/ManageContact";
import { LiaMailBulkSolid } from "react-icons/lia";

import { FaUserClock } from "react-icons/fa";
import { useState } from "react";

const AdminManageContact = () => {
  const [click, setClick] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const userInfo = useSelector(
    (state) => state.currentLoggedInUser?.userInfo || {}
  );

  const handleRouteHome = () => {
    navigate("/admin/dashboard");
  };

  const handleRouteAddSignal = () => {
    navigate("/admin/dashboard/addsignal");
  };
  const handleRouteAddContact = () => {
    navigate("/admin/dashboard/addcontact");
  };
  const handleRouteManagePrompt = () => {
    navigate("/admin/dashboard/manageprompt");
  };
  const handleRouteManageChat = () => {
    navigate("/admin/dashboard/managechat");
  };
  const handleRouteManagesignal = () => {
    navigate("/admin/dashboard/managesignal");
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
  const handleRouteChatIframe = () => {
    navigate("/admin/dashboard/manageChatIframe");
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
          <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Manage Signal"
            handleClick={handleRouteManagesignal}
          />
          <SidebarItem
            icon={<IoMdAdd size={30} />}
            text="Add Contact"
            handleClick={handleRouteAddContact}
          />

          <SidebarItem
            icon={<TfiWrite size={30} />}
            text="Manage Contact"
            active
            alert
          // active={Router.params === "managecontact" ? true : false}
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
          {/* <SidebarItem
            icon={<IoSettingsOutline size={30} />}
            text="Change Password"
          /> */}
          <SidebarItem
            icon={<IoChatbubbleEllipsesOutline size={30} />}
            text="Chat"
            handleClick={handleRouteChat}
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Chat"
            handleClick={handleRouteManageChat}
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={30} />}
            text="Manage Chat Iframe"
            handleClick={handleRouteChatIframe}

          />
          <SidebarItem
            icon={<LiaMailBulkSolid size={40} />}
            text="Bulk Message"
            handleClick={handleRouteBulkMessage}
          />
          <SidebarItem
            icon={<FaUserClock size={40} />}
            text="RTMS"
            handleClick={handleRouteRTMS}
          />
          {
            isLoggedIn &&
            <div onClick={() => setClick(!click)}
              className="
              flex justify-between items-center relative
              overflow-hidden transition-all px-5 mt-5 pb-20 py-3 cursor-pointer"
            >
              <div className="leading-4 ">
                <h4 className="font-semibold">{userInfo?.name}</h4>
                <span className="text-xs text-gray-600">
                  {userInfo?.email}
                </span>
              </div>
              <MoreVertical size={20} className="cursor-pointer" />
              {
                click &&
                <div className="px-4 absolute w-full left-0 top-16">
                  <button onClick={() => localStorage.clear()} className="bg-gray-300 rounded py-1 text-sm w-full">Logout</button>
                </div>
              }
            </div>
          }
        </StaffSidebar>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <ManageContact />
      </Box>
    </Box>
  );
};

export default AdminManageContact;
