import axios from "axios";
export const fetchLoggedInUserInfo = async (accessToken, role) => {
  if (role === "user") {
    console.log("Inside of fetching user");
    try {
      const response = await axios.get("${import.meta.env.VITE_BACKEND_URL}/api/user/info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      // console.log('error', error)
      throw new Error("Failed to fetch user info");
    }
  }
  if (role === "staff") {
    try {
      // console.log("Inside of fetching staff");
      const response = await axios.get("${import.meta.env.VITE_BACKEND_URL}/api/staff/info", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw new Error("Failed to fetch user info");
    }
  }
  if (role === "admin") {
    try {
      // console.log("Inside of fetching admin");
      const response = await axios.get(
        "${import.meta.env.VITE_BACKEND_URL}/api/admin/admin/info",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response;
    } catch (error) {
      throw new Error("Failed to fetch user info");
    }
  }
};
