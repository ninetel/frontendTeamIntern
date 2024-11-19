// api.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/signal`;

// export const fetchSignals = async (accessToken) => {
//   console.log('signal response is*******##########', accessToken);
//   const response = await axios.get(`${API_URL}/signals`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   return response.data;
// };
// export const fetchSignals = async (accessToken) => {
//   try {
//     console.log('signal response is*******##########', accessToken);
//     const response = await axios.get(`${API_URL}/signals`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching signals:", error);
//     throw error;
//   }
// };
export const fetchSignals = async () => {
  try {
    const response = await axios.get(`${API_URL}/signals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching signals:', error);
    throw error;
  }
};

// Similarly, add try-catch in other Axios functions

export const deleteSignal = async (id, accessToken) => {
  await axios.delete(`${API_URL}/delete_signal/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const editSignal = async ({ id, data, accessToken }) => {
  // console.log("id in edit signal---------", id);
  // console.log("accessToken", accessToken);
  // console.log("data ----->", data);
  const response = await axios.put(`${API_URL}/edit_signal/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getSignal = async (id) => {
  const response = await axios.get(`${API_URL}/signal/${id}`);
  return response.data;
};

export const createSignal = async (data, accessToken) => {
  const response = await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
