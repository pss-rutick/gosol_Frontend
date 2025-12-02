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

// ✅ NEW: Clients API
export const clientsAPI = {
  getAllClients: async () => {
    try {
      const response = await axios.get(`https://appgosolapi.phylon.in/api/clients`);
      // API returns array directly or wrapped in data object
      console.log("getAllClients Response:", response);
      return Array.isArray(response.data) ? response.data : response.data.data || response.data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw new Error("Failed to load client list");
    }
  },

  getClientById: async (clientId) => {
    try {
      const response = await axios.get(`https://appgosolapi.phylon.in/api/clients/${clientId}`);
      return response.data;
    } catch (error) {
      console.error("Get Client By ID Error:", error);
      throw new Error("Failed to load client details");
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

// ✅ NEW: Tasks API
export const tasksAPI = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`/api/tasks`);
      return response.data;
    } catch (error) {
      console.error("Tasks API Fetch Error:", error);
      throw new Error(error.response?.data?.message || "Failed to load tasks");
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`/api/tasks`, taskData);
      return response.data;
    } catch (error) {
      console.error("Tasks API Error:", error);
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      console.error("Request Data:", taskData);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.response?.data?.details || error.message;
      throw new Error(errorMessage || "Failed to create task");
    }
  },

  // Optional: Additional methods you might need later
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error("Update Task API Error:", error);
      throw new Error(error.response?.data?.message || "Failed to update task");
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Delete Task API Error:", error);
      throw new Error(error.response?.data?.message || "Failed to delete task");
    }
  },

  getTasksByClientId: async (clientId) => {
    try {
      const response = await axios.get(`/api/tasks/${clientId}`);
      return response.data;
    } catch (error) {
      console.error("Get Tasks by Client ID API Error:", error);
      throw new Error(error.response?.data?.message || "Failed to load client tasks");
    }
  }
};

export const aiAPI = {
  async generateResponse({ messages, onChunk, clientId = "10025" }) {
    try {
      let buffer = "";
      let lastProcessedIndex = 0;

      const response = await axios.post(
        `https://appgosolapi.phylon.in/conversation`,
        { 
          messages, 
          client_id: clientId
        },
        {
          responseType: "text",
          onDownloadProgress: (progressEvent) => {
            const fullText = progressEvent.event?.target?.responseText;
            
            if (fullText) {
              const newText = fullText.substring(lastProcessedIndex);
              buffer += newText;
              lastProcessedIndex = fullText.length;
              
              let startIdx = 0;
              let braceCount = 0;
              
              for (let i = 0; i < buffer.length; i++) {
                if (buffer[i] === '{') {
                  if (braceCount === 0) startIdx = i;
                  braceCount++;
                } else if (buffer[i] === '}') {
                  braceCount--;
                  
                  if (braceCount === 0 && startIdx !== i) {
                    const jsonStr = buffer.substring(startIdx, i + 1);
                    try {
                      const parsed = JSON.parse(jsonStr);
                      const word = parsed?.choices?.[0]?.messages?.[0]?.content;
                      
                      if (word && onChunk) {
                        onChunk(word);
                      }
                    } catch (err) {
                      // Silent error handling
                    }
                    
                    buffer = buffer.substring(i + 1);
                    i = -1;
                    startIdx = 0;
                  }
                }
              }
            }
          },
        }
      );

      return { success: true };
    } catch (error) {
      console.error("Stream API Error:", error);
      throw error;
    }
  },
};
