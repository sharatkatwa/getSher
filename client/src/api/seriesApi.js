import api from "../lib/axios";

export const getSeries = async () => {
  const response = await api.get("/series");
  return response.data;
};

export const getSeriesById = async (id) => {
  const response = await api.get(`/series/${id}`);
  return response.data;
};