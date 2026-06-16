import api from "../lib/axios.js";

export const getHomeFeed = () => api.get("/home");
