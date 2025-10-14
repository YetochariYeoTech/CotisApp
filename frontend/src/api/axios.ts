import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending cookies (like JWT token)
});

// Optional: Add an interceptor to handle token expiration or other global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.log("Unauthorized, redirecting to login...");
      // window.location.href = '/login'; // Example redirect
    }
    return Promise.reject(error);
  }
);

export default api;
