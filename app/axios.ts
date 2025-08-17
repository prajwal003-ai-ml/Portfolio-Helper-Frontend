import axios from "axios";

// Base URL of your backend
const api = axios.create({
  baseURL:process.env.BACKEND_URL || "http://localhost:8000/api", // adjust to your routes
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token"); // your token key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
