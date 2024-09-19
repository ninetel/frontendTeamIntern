import LogIn from "../page/LogIn";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../page/Dashboard";
import Protected from "../hooks/ProtectedRoutes/ProtectedRoutes";
import { ThemeProvider, createTheme } from "@mui/material";
import AdminLogin from "../page/AdminLogin";
import StaffLogin from "../page/StaffLogin";
import SignUp from "../page/SignUp";
// import AdminDashboard from "../page/AdminDashboard";
// import NewSideBar from "../src/components/templates/NewSidebar/NewSidebar"
import UserDashboard from "../page/UserDashboard";
// import AddStaff from "../page/AdminDashboard2";
// import UserQuestions from "../page/UserQuestions";
// import UserQuestions from "../page/UserQuestions";
import StaffDashboard from "../page/StaffDashboard";
import StaffAddSignal from "./components/templates/StaffAddSignal/StaffAddSignal";
import StaffManageSignal from "./components/templates/StaffManageSignal/StaffManageSignal";
import StaffAddPrompt from "./components/templates/StaffAddPrompt/StaffAddPrompt.jsx";
import StaffManagePrompt from "./components/templates/StaffManagePrompt/StaffManagePrompt";
import AdminCreateStaff from "../page/AdminCreateStaff.jsx";
import AdminDashboard from "../page/AdminDashboard.jsx";
import ChatAI from "../page/ChatAI.jsx";
import ChatGeneral from "../page/ChatGeneral.jsx";
import AdminManageChat from "./components/templates/AdminManageChat/AdminManageChat.jsx";
import AdminAddSignal from "./components/templates/AdminAddSignal/AdminAddSignal.jsx";
import AdminManagePrompt from "./components/templates/AdminManagePrompt/AdminManagePrompt.jsx";
import AdminCreatePrompt from "./components/templates/AdminCreatePrompt/AdminCreatePrompt.jsx";
import AdminManageSignal from "./components/templates/AdminManageSignal/AdminManageSignal.jsx";
import AddContact from "./components/templates/AddContact/AddContact.jsx";
import AdminManageContact from "./components/templates/AdminManageContact/AdminManageContact.jsx";
// import AdminManageChat from "./components/templates/AdminManageChat/AdminManageChat.jsx";
import Chat from "./components/templates/Chat/Chat.jsx";
import AdminSendBulkMessage from "./components/templates/AdminSendBulkMessage/AdminSendBulkMessage.jsx";
import RTMS from "./components/templates/RTMS/RTMS.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f6efb",
    },
    success: {
      main: "#30cc65",
    },
    warning: {
      main: "#d50000",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/user/login" element={<LogIn />}></Route>
        <Route path="/user/signup" element={<SignUp />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/staff/login" element={<StaffLogin />}></Route>
        <Route path="/admin/createstaff" element={<AdminCreateStaff />}></Route>
        <Route path="/staff/dashboard" element={<StaffDashboard />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/chatai" element={<ChatAI />}></Route>
        <Route path="/chatgeneral" element={<ChatGeneral />}></Route>
        <Route
          path="/staff/dashboard/createsignal"
          element={<StaffAddSignal />}
        ></Route>
        <Route
          path="/staff/dashboard/managesignal"
          element={<StaffManageSignal />}
        ></Route>
        <Route
          path="/staff/dashboard/addprompt"
          element={<StaffAddPrompt />}
        ></Route>
        <Route
          path="/staff/dashboard/manageprompt"
          element={<StaffManagePrompt />}
        ></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/addsignal" element={<AdminAddSignal />} />
        <Route
          path="/admin/dashboard/managesignal"
          element={<AdminManageSignal />}
        />
        <Route path="/admin/dashboard/addcontact" element={<AddContact />} />
        <Route
          path="/admin/dashboard/managecontact"
          element={<AdminManageContact />}
        />
        <Route
          path="/admin/dashboard/managechat"
          element={<AdminManageChat />}
        />
        <Route
          path="/admin/dashboard/createprompt"
          element={<AdminCreatePrompt />}
        />
        <Route
          path="/admin/dashboard/manageprompt"
          element={<AdminManagePrompt />}
        />
        <Route path="/admin/dashboard/Chat" element={<Chat />} />
        <Route path="/chatAI" element={<ChatAI />} />
        <Route path="/chatGeneral" element={<ChatGeneral />} />
        <Route
          path="admin/dashboard/bulkmessage"
          element={<AdminSendBulkMessage />}
        />
        <Route path="admin/dashboard/RTMS" element={<RTMS />} />

        {/* <Route path="/admin/dashboard/changepassword" element={<ChangePassword />} /> */}

        {/* <Route
          path="/admin/dashboard/addsignal"
          element={<AdminAddSignal />}
        ></Route>
        <Route
        // /admin/dashboard/managesignal
          path="/admin/dashboard/managesignal"
          element={<AdminManageSignal />}
        ></Route>
        <Route
          path="/admin/dashboard/createprompt"
          element={<AdminCreatePrompt />}
        ></Route>
        <Route
          path="/admin/dashboard/manageprompt"
          element={<AdminManagePrompt />}
        ></Route> */}
        <Route
          path="/user/dashboard"
          element={
            <Protected>
              <UserDashboard />
            </Protected>
          }
        ></Route>
        {/* <Route path="/admin/dashboardNew" element={<AddStaff />}></Route> */}
        {/* <Route path="/user/questions" element={<UserQuestions />}></Route> */}

        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        ></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
