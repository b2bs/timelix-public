import axios from 'axios';

// Creació d'una instància d'Axios amb configuració base
const api = axios.create({
  // URL base de l'API, es llegeix de les variables d'entorn o s'usa '/api' per proxy de Nginx
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // Incloure les credencials (cookies, auth) en les peticions CORS
  withCredentials: true,
});

export default api;
