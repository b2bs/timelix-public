import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Canvia a /api perquè Nginx ho proxyitzi
  withCredentials: true,
});

export default api;
