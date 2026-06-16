import api from '../lib/axios.js'
export const getMe = () => api.get('/auth/me')