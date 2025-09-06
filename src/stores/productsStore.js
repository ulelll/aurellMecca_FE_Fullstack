// // stores/product.js
// import { create } from 'zustand';
// import api from './../api/axios'; 

// export const useProductsStore = create((set, get) => ({

//   products: [],
//   product: null,
//   loading: false,
//   error: null,
//   pagination: {
//     current_page: 1,
//     last_page: 1,
//     per_page: 10,
//     total: 0,
//     from: 0,
//     to: 0
//   },
//   filters: {
//     search: '',
//     status: 'all',
//     per_page: 10
//   },

//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
//   clearError: () => set({ error: null }),

//   setFilters: (newFilters) => {
//     set(state => ({
//       filters: { ...state.filters, ...newFilters }
//     }));
//   },

//   fetchProducts: async (page = 1, customFilters = {}) => {
//     set({ loading: true, error: null });
    
//     try {
//       const currentFilters = get().filters;
//       const filters = { ...currentFilters, ...customFilters };
//       const params = new URLSearchParams({
//         page: page.toString(),
//         per_page: filters.per_page.toString(),
//       });

//       if (filters.search && filters.search.trim()) {
//         params.append('search', filters.search.trim());
//       }

//       if (filters.status && filters.status !== 'all') {
//         params.append('status', filters.status);
//       }

//       const response = await api.get(`/products?${params.toString()}`);
      
//       if (response.data.success) {
//         const { data, ...paginationData } = response.data.data;
        
//         set({
//           products: data || [],
//           pagination: {
//             current_page: paginationData.current_page || 1,
//             last_page: paginationData.last_page || 1,
//             per_page: paginationData.per_page || 10,
//             total: paginationData.total || 0,
//             from: paginationData.from || 0,
//             to: paginationData.to || 0
//           },
//           filters,
//           loading: false
//         });
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch products');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch products';
//       set({ 
//         error: errorMessage, 
//         loading: false,
//         products: [],
//         pagination: {
//           current_page: 1,
//           last_page: 1,
//           per_page: 10,
//           total: 0,
//           from: 0,
//           to: 0
//         }
//       });
//       console.error('Error fetching products:', err);
//     }
//   },

//   searchProducts: async (searchTerm, page = 1) => {
//     const filters = { search: searchTerm };
//     await get().fetchProducts(page, filters);
//   },

//   changePage: async (page) => {
//     await get().fetchProducts(page);
//   },

//   changePerPage: async (perPage) => {
//     const filters = { per_page: perPage };
//     await get().fetchProducts(1, filters);
//   },

//   filterByStatus: async (status) => {
//     const filters = { status };
//     await get().fetchProducts(1, filters);
//   },

//   getProduct: async (id) => {
//     set({ loading: true, error: null });
    
//     try {
//       const response = await api.get(`/products/${id}`);
      
//       if (response.data.success) {
//         set({ 
//           product: response.data.data, 
//           loading: false 
//         });
//       } else {
//         throw new Error(response.data.message || 'Product not found');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to get product';
//       set({ 
//         error: errorMessage, 
//         loading: false,
//         product: null 
//       });
//       console.error('Error getting product:', err);
//       throw err;
//     }
//   },

//   createProduct: async (productData) => {
//     set({ loading: true, error: null });
    
//     try {
//       const response = await api.post('/products', productData);
      
//       if (response.data.success) {
//         set({ loading: false });
//         await get().fetchProducts(get().pagination.current_page);
//         return response.data;
//       } else {
//         throw new Error(response.data.message || 'Failed to create product');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to create product';
//       set({ 
//         error: errorMessage, 
//         loading: false 
//       });
//       console.error('Error creating product:', err);
//       throw err;
//     }
//   },

//   updateProduct: async (id, productData) => {
//     set({ loading: true, error: null });
    
//     try {
//       const response = await api.put(`/products/${id}`, productData);
      
//       if (response.data.success) {
//         set({ loading: false });
//         await get().fetchProducts(get().pagination.current_page);
//         if (get().product?.id === id) {
//           set({ product: response.data.data });
//         }
        
//         return response.data;
//       } else {
//         throw new Error(response.data.message || 'Failed to update product');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to update product';
//       set({ 
//         error: errorMessage, 
//         loading: false 
//       });
//       console.error('Error updating product:', err);
//       throw err;
//     }
//   },

//   deleteProduct: async (id) => {
//     set({ loading: true, error: null });
    
//     try {
//       const response = await api.delete(`/products/${id}`);
      
//       if (response.data.success) {
//         set({ loading: false });
//         const currentPage = get().pagination.current_page;
//         const currentProducts = get().products;
//         if (currentProducts.length === 1 && currentPage > 1) {
//           await get().fetchProducts(currentPage - 1);
//         } else {
//           await get().fetchProducts(currentPage);
//         }
        
//         return response.data;
//       } else {
//         throw new Error(response.data.message || 'Failed to delete product');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to delete product';
//       set({ 
//         error: errorMessage, 
//         loading: false 
//       });
//       console.error('Error deleting product:', err);
//       throw err;
//     }
//   },

//   bulkDeleteProducts: async (ids) => {
//     set({ loading: true, error: null });
    
//     try {
//       const response = await api.delete('/products/bulk', {
//         data: { ids }
//       });
      
//       if (response.data.success) {
//         set({ loading: false });

//         await get().fetchProducts(get().pagination.current_page);
        
//         return response.data;
//       } else {
//         throw new Error(response.data.message || 'Failed to delete products');
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'Failed to delete products';
//       set({ 
//         error: errorMessage, 
//         loading: false 
//       });
//       console.error('Error bulk deleting products:', err);
//       throw err;
//     }
//   },

//   reset: () => {
//     set({
//       products: [],
//       product: null,
//       loading: false,
//       error: null,
//       pagination: {
//         current_page: 1,
//         last_page: 1,
//         per_page: 10,
//         total: 0,
//         from: 0,
//         to: 0
//       },
//       filters: {
//         search: '',
//         status: 'all',
//         per_page: 10
//       }
//     });
//   },

//   getProductById: (id) => {
//     const products = get().products;
//     return products.find(product => product.id === parseInt(id));
//   },

//   isLoading: () => get().loading,
//   hasError: () => !!get().error,
//   getError: () => get().error,
//   getTotalProducts: () => get().pagination.total,
//   getCurrentPage: () => get().pagination.current_page,
//   getTotalPages: () => get().pagination.last_page,
//   getFilters: () => get().filters,
// }));