import api from "../lib/axios.js";

export const getAllteams = () => api.get("/team");
export const createTeam = (data) => api.post("/team", data);
export const updateTeam = (id, data) => api.patch(`/team/${id}`, data);
export const deleteTeam = (id) => api.delete(`/team/${id}`);
