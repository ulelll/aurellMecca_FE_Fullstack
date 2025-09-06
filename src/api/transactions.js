import api from './axios';
import { create } from 'zustand';

export const useTransactionsStore = create((set, get) => ({
	transactions: [],
	transaction: null,
	loading: false,
	error: null,

	fetchTransactions: async (page = 1, per_page = 10, search = '') => {
    set({ loading: true, error: null });
    try {
        const res = await api.get('/transactions', { params: { page, per_page, search } });
        set({
        transactions: res.data.data || [],
        meta: res.data.meta || {},
        loading: false,
        });
    } catch (err) {
        set({ error: err.response?.data?.message || err.message, loading: false });
    }
    },


	getTransaction: async (id) => {
		set({ loading: true, error: null });
		try {
			const res = await api.get(`/transactions/${id}`);
			set({ transaction: res.data.data || res.data, loading: false });
		} catch (err) {
			set({ error: err.response?.data?.message || err.message, loading: false });
		}
	},

	createTransaction: async (payload) => {
		set({ loading: true, error: null });
		try {
			await api.post('/transactions', payload);
			await get().fetchTransactions();
			set({ loading: false });
		} catch (err) {
			set({ error: err.response?.data?.message || err.message, loading: false });
		}
	},

	deleteTransaction: async (id) => {
		set({ loading: true, error: null });
		try {
			await api.delete(`/transactions/${id}`);
			await get().fetchTransactions();
			set({ loading: false });
		} catch (err) {
			set({ error: err.response?.data?.message || err.message, loading: false });
		}
	},
}));
