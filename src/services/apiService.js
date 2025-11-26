import axios from "axios";

// Access environment variables
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const APP_API_URL = import.meta.env.VITE_APP_API_URL;

// Debugging: Check if URL is loaded (check console if issues persist)
if (!APP_API_URL) {
  console.error("CRITICAL: VITE_APP_API_URL is undefined. Check your .env file.");
}

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  signup: async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/auth/signup`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },
};

export const dashboardAPI = {
  getAllClients: async () => {
    try {
      const response = await axios.get(`/api/clients`);
      return response.data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw new Error("Failed to load client list");
    }
  },

  addClient: async (clientData) => {
    try {
      const response = await axios.post(`/api/clients`, clientData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(error.response?.data?.message || "Failed to add client");
    }
  },
};

export const meetingsAPI = {
  getAllMeetings: async () => {
    try {
      const response = await axios.get(`/api/meetings`);
      return response.data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw new Error("Failed to load meetings list");
    }
  },

  addMeeting: async (meetingData) => {
    try {
      const response = await axios.post(`/api/meetings`, meetingData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      console.error("Request Data:", meetingData);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.response?.data?.details || error.message;
      throw new Error(errorMessage || "Failed to schedule meeting");
    }
  },
};
