import api from "../lib/axios.js";

export const getCommentaryByMatch = (matchId) =>
  api.get(`/commentary/match/${matchId}`);
export const createCommentary = (data) => api.post("/commentary", data);
export const deleteCommentary = (id) => api.delete(`/commentary/${id}`);
