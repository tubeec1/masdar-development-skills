import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Accept: "application/json",
  },
});

// ==============================
// Request Interceptor
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ==============================
// Response Interceptor
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the request URL includes the login route
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    // Only force redirect if it's a 401 error AND NOT a login attempt failing
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Smooth bypass: avoid hard reloads if possible, but if using window.location:
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);

export default api;
