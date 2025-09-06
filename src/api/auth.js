import api from './axios';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/login', { email, password });
      const token = res.data.token; 
      set({ token, loading: false });
      localStorage.setItem('token', token);
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  logout: () => {
    set({ token: null });
    localStorage.removeItem('token');
  },

  setToken: (token) => {
    set({ token });
    localStorage.setItem('token', token);
  },
}));
