import api from "../lib/axios";

export const getMatches = async () => {
  const response = await api.get("/match");
  return response.data;
};

export const createMatch = async (data) => {
  const response = await api.post("/match", data);
  return response.data;
};

export const updateMatch = async (id, data) => {
  const response = await api.patch(`/match/${id}`, data);
  return response.data;
};

export const deleteMatch = async (id) => {
  const response = await api.delete(`/match/${id}`);
  return response.data;
};

export const getMatchById = async (id) => {
const response = await api.get(`/match/${id}`);
return response.data;
};

export const updatePlayingXI = async (id, data) => {
  const response = await api.patch(
    `/match/${id}/playing-xi`,
    data
  );
  return response.data;
};