import api from "../lib/axios";

export const getTeams = async () => {
  const response = await api.get("/team");
  return response.data;
};

export const getTeamById = async (id) => {
  const response = await api.get(`/team/${id}`);
  return response.data;
};

export const getTeamSquad = async (id) => {
  const response = await api.get(`/team/${id}/squad`);
  return response.data;
};
