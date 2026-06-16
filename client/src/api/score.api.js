import api from "../lib/axios.js";

export const getScoresByMatch = (matchId) => api.get(`/scores/match/${matchId}`);
export const createScore = (data) => api.post("/scores", data);
export const updateScore = (id, data) => api.patch(`/scores/${id}`, data);
