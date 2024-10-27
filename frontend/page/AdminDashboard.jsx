


import { useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import StaffSidebar, {
  SidebarItem,
} from "../src/components/templates/sidebar/Sidebar";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { IoChatbubbleEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useNavigation } from "react-router-dom";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { PiChatsTeardropLight } from "react-icons/pi";
import { LiaMailBulkSolid } from "react-icons/lia";
import { MoreVertical } from "lucide-react";

import { FaUserClock } from "react-icons/fa";
import { useState } from "react";
import { Button } from "antd";
// import "AdminDashboard.css";


const AdminDashboard = () => {

  const navigate = useNavigate();
  const buttonClick = () => {
    console.log("hhgfdfgi");
    navigate("/admin/login");
    window.location.reload();
    localStorage.clear();
  }
  const userInfo = useSelector(
    (state) => state.currentLoggedInUser?.userInfo || {}
  );


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
  const handleRouteManageChat = () => {
    navigate("/admin/dashboard/managechat");
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
  const handleRouteCategoryManagementGeneralChat=()=>{
    navigate("/admin/dashboard/manageCategory");

  }  
  const handleRouteContentManagementGeneralChat=()=>{
    navigate("/admin/dashboard/manageContent");
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // const logoutBtn = () => {
  //   setClick(!click);
  // }

  return (



    <div className=' flex flex-col gap-4 md:flex-row w-fit '>
      <div className="w-1/5 h-full shadow-lg ">
        <StaffSidebar>
          <SidebarItem
            icon={<FaHome size={25} />}
            text="Home"
            handleClick={handleRouteHome}
            active
            alert
          />
          <SidebarItem
            icon={<IoMdAdd size={25} />}
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
            icon={<TfiWrite size={25} />}
            text="Manage Contact"
            handleClick={handleRouteManageContact}
          />
          <SidebarItem
            icon={<MdOutlineMarkChatRead size={25} />}
            text="Add Prompt"
            handleClick={handleRouteCreatePrompt}
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={25} />}
            text="Manage Prompt"
            handleClick={handleRouteManagePrompt}
          />
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
            icon={<PiChatsTeardropLight size={25} />}
            text="Manage Chat"
            handleClick={handleRouteManageChat}
          />
          <SidebarItem
            icon={<PiChatsTeardropLight size={25} />}
            text="Manage Chat Iframe"
            handleClick={handleRouteChatIframe}
          />
          <SidebarItem
            icon={<LiaMailBulkSolid size={30} />}
            text="Bulk Message"
            handleClick={handleRouteBulkMessage}
          />
          <SidebarItem
            icon={<FaUserClock size={30} />}
            text="RTMS"
            handleClick={handleRouteRTMS}
          /><SidebarItem
          icon={<FaUserClock size={30} />}
          text="Category Management General Chat"
          handleClick={handleRouteCategoryManagementGeneralChat}
        /><SidebarItem
        icon={<FaUserClock size={30} />}
        text="Content Management General Chat"
        handleClick={handleRouteContentManagementGeneralChat}
      />
          
        </StaffSidebar>
      </div>
      <div className=" w-full flex flex-col gap-6 bg-white p-2 rounded-xl shadow-sm ">

        <div className=" flex justify-center ">
          <h1 className=" font-semibold text-xl pt-4 "> Sector Distribution </h1>
        </div>
        <div className=" flex flex-col lg:flex-row gap-2">
          <div className=" w-full lg:w-1/3 h-[450px] p-6">
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
              width={500}
              height={300}
            />
          </div>

        </div>

        <div className=" w-fit h-[500px] p-6">
        <h1 className=" font-semibold text-xl pt-4 justify-center text-center"> Sector Distribution </h1>

          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
            series={[
              {
                data: [1, 2, 3, 4, 3, 2, 3, 3, 4],
                valueFormatter: (value) => (value == null ? "NaN" : value),
              },
              { data: [3, 6, 4, 2, 7, 8, 10, 11.5, 15] },
              {
                data: [10, 9, 8, 7, 6, 5, 4, 4, 5],
                valueFormatter: (value) => (value == null ? "?" : value),
              },
            ]}
            height={350}
            width={700}
            margin={{ top: 10, bottom: 20 }}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-4 ">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-2xl font-semibold">
            Welcome, {userInfo?.name || "Guest"}
          </div>
          <div className="mt-4 text-lg">
            <p>Email: {userInfo?.email || "N/A"}</p>
            <p>Phone Number: {userInfo?.phoneNumber || "N/A"}</p>
            <p>Role: {userInfo?.role || "N/A"}</p>
          </div>
          <Button
            className="mt-4 text-green-500 bg-red-500 hover:bg-red-700  rounded-xl  text-2xl p-4 justify-end"
            onClick={buttonClick}
          >
            Log Out
          </Button>
        </div>
        <div className=" h-full ">
        <h1 className=" font-semibold text-xl pt-4 "> Sector Distribution </h1>

          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={450}
            height={300}
          />
        </div>

      </div>
    </div>


















  );
};

export default AdminDashboard;
