import api from './axios';
import { create } from 'zustand';

export const useUsersStore = create((set, get) => ({
  users: [],
  meta: { total: 0, per_page: 10, current_page: 1, last_page: 1 },
  user: null,
  loading: false,
  error: null,

  fetchUsers: async (page = 1, per_page = 10, search = '') => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/users', { params: { page, per_page, search } });
      set({
        users: res.data.data || [],
        meta: res.data.meta || {},
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  createUser: async (payload) => {
    set({ loading: true, error: null });
    try {
      await api.post('/users', payload);
      await get().fetchUsers(); // refresh list
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  updateUser: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/users/${id}`, payload);
      await get().fetchUsers(); // refresh list
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/users/${id}`);
      await get().fetchUsers(); // refresh list
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },
}));
