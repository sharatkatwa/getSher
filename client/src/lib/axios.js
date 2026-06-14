import axios from "axios";
import { VITE_API_URL } from "../utils/env";

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export default api;
