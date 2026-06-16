import api from "../lib/axios.js";

export const getPlayers = () => api.get("/player");
export const getPlayerById = (id) => api.get(`/player/${id}`);
export const createPlayer = (data) => api.post("/player", data);
export const updatePlayer = (id, data) => api.patch(`/player/${id}`, data);
export const deletePlayer = (id) => api.delete(`/player/${id}`);
