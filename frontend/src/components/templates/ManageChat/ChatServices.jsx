import axios from "axios";

export const getChats = async (filter) => {
  const { type, startDate, endDate } = filter;
  const response = await axios.get("/api/chats", {
    params: { type, startDate, endDate },
  });
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await axios.post("/api/chats", messageData);
  return response.data;
};
