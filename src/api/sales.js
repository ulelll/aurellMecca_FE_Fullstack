import api from './axios';
import { create } from 'zustand';

export const useSalesReportStore = create((set, get) => ({
  transactions: [],
  meta: { total: 0, per_page: 10, current_page: 1, last_page: 1 },
  loading: false,
  error: null,

  fetchSalesReport: async (page = 1, per_page = 10, search = '') => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/sales-report', { params: { page, per_page, search } });
      set({
        transactions: res.data.data || [],
        meta: res.data.meta || {},
        loading: false,
      });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },
}));
