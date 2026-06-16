import api from '../lib/axios.js'
export const getMe = () => api.get('/auth/me')

export const loginUser = async (credentials) => {
    const response = await api.post(
        "/auth/login",
        credentials
    );

    return response.data;
};