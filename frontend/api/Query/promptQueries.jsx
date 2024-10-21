// api.js
import axios from "axios";
// /sikinchaa/prompt
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/sikinchaa`;

export const fetchPrompts = async (accessToken) => {
  const response = await axios.get(`${API_URL}/prompts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // console.log("fetchPrompt issssssssssssss", response.data);
  return response.data;
};

export const deletePrompt = async (id, accessToken) => {
  await axios.delete(`${API_URL}/prompt/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const editPrompt = async ({ id, data, accessToken }) => {
  const response = await axios.put(`${API_URL}/prompt/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
export const approvePrompt = async ({ id, data, accessToken }) => {
  const response = await axios.put(`${API_URL}/prompt/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
export const rejectPrompt = async ({ id, data, accessToken }) => {
  const response = await axios.put(`${API_URL}/prompt/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getPrompt = async (id) => {
  const response = await axios.get(`${API_URL}/prompt/${id}`);
  return response.data;
};

export const createPrompt = async (data, accessToken) => {
  const response = await axios.post(`${API_URL}/prompt/create`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
