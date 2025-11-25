// src/services/apiService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://gosolapi.phylon.in";

export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.message || 'Login failed');
    return data;
  },

  signup: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.message || 'Signup failed');
    return data;
  },
};