import axios from "axios";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_REST,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token.exp * 1000 < Date.now()) {
        // Token has expired, remove it from local storage
        localStorage.removeItem("token");
      } else {
        // Add the JWT to the request header
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["x-signature"] = `${secretKey}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
