import api from "../lib/axios.js";

export const getSeries = () => api.get("/series");
export const getSeriesById = (id) => api.get(`/series/${id}`);
export const createSeries = (data) => api.post("/series", data);
export const updateSeries = (id, data) => api.patch(`/series/${id}`, data);
export const deleteSeries = (id) => api.delete(`/series/${id}`);
