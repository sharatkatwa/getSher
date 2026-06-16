import axios from "axios";
import { VITE_API_URL } from "../utils/env";

// Shared API client for future TanStack Query hooks and mutations.
const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const errorMessage = error.response?.data?.message
    const errorSuccess = error.response?.data?.errorSuccess
    const errorStatusCode = error.response?.status

    if (errorSuccess) return Promise.reject(error)

    if (errorMessage === 'Access token expired') {
      if (errorStatusCode !== 401 || originalRequest._retry) return Promise.reject(error)
      originalRequest._retry = true
    }

    try {
      await axios.get(`${API_URL}/auth/getaccesshtoken`, { withCredentials: true })
      return api(originalRequest)
    } catch (error) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }

)

export default api;
