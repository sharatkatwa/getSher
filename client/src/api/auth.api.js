<<<<<<< HEAD
import api from "../lib/axios.js";
import { VITE_API_URL } from "../utils/env.js";

export const getGoogleAuthUrl = () => `${VITE_API_URL}/auth/google`;
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");
export const refreshAccessToken = () => api.get("/auth/getaccesshtoken");
export const logoutUser = () => api.get("/auth/logout");
=======
import api from '../lib/axios.js'
export const getMe = () => api.get('/auth/me')
>>>>>>> f85026e9f07eb0967c9f4013ca530350debd67ee
