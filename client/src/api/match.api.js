import api from "../lib/axios.js";

export const getMatches = (params) => api.get("/match", { params });
export const getMatchById = (id) => api.get(`/match/${id}`);
export const getMatchesByStatus = (status, params) =>
  api.get(`/match/status/${status}`, { params });
export const getMatchesBySeries = (seriesId) => api.get(`/match/series/${seriesId}`);
export const getMatchesByTeam = (teamId) => api.get(`/match/team/${teamId}`);
export const createMatch = (data) => api.post("/match", data);
export const updateMatch = (id, data) => api.put(`/match/${id}`, data);
export const updatePlayingXI = (id, data) => api.put(`/match/${id}/playing-xi`, data);
export const deleteMatch = (id) => api.delete(`/match/${id}`);
