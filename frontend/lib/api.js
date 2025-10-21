import axios from "axios";
import { getAuthHeader } from "./auth";
import { API_URL } from "@/app_config"

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to attach the auth header automatically
api.interceptors.request.use(
    (config) => {
        const authHeader = getAuthHeader();
        config.headers = {
            ...config.headers,
            ...authHeader,
        };
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
