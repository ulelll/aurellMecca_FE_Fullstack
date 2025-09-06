import api from './axios';
import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
  products: [],
  meta: { total: 0, per_page: 10, current_page: 1, last_page: 1 },
  product: null,
  loading: false,
  error: null,

  fetchProducts: async (page = 1, per_page = 10, search = '') => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/products', { params: { page, per_page, search } });
      set({
        products: res.data.data || [],
        meta: res.data.meta || {},
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  createProduct: async (payload) => {
    set({ loading: true, error: null });
    try {
      await api.post('/products', payload);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  updateProduct: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/products/${id}`, payload);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/products/${id}`);
      await get().fetchProducts();
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },
}));
