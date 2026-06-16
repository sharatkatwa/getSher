import api from "../lib/axios.js";

export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.patch(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
