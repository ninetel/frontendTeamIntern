// api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/contacts";

// Function to delete a contact by ID
export const deleteContact = async (id, accessToken) => {
  try {
    await axios.delete(`${API_URL}/delete_contact/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    throw error;
  }
};

// Function to edit a contact by ID
export const editContact = async ({ id, data, accessToken }) => {
  try {
    const response = await axios.put(`${API_URL}/edit_contact/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing contact:', error.message);
    throw error;
  }
};

// Function to get a contact by ID
export const getContact = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/content/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact:', error.message);
    throw error;
  }
};

// Function to create a new contact
export const createContact = async (data, accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error.message);
    throw error;
  }
};
