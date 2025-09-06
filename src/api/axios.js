import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tes-amazink.test/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
 
    let token = localStorage.getItem('token');
    if (!token) {
      try {
        const zustandAuth = require('./auth');
        token = zustandAuth.useAuthStore.getState().token;
      } catch {}
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
