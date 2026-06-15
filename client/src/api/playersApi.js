import api from "../lib/axios";

export const getPlayers = async () => {
  const response = await api.get("/player");
  return response.data;
};