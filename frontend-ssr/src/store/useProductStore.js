import {create} from 'zustand';
import {productApi} from '@/lib/api';

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,

    fetchProducts: async () => {
        try {
            set({loading: true, error: null});
            const response = await productApi.getAll();
            const products = response.data?.data || response.data || [];
            set({products, loading: false});
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
        }
    },

    createProduct: async (formData) => {
        try {
            set({loading: true});
            const {data} = await productApi.create(formData);
            set((state) => ({
                products: [...state.products, data],
                loading: false
            }));
            return data;
        } catch (error) {
            set({loading: false, error: error.message});
            throw error;
        }
    },

     updateProduct: async (id, formData) => {
        try {
            set({ loading: true });
            const response = await productApi.update(id, formData);
            const updatedProduct = response.data?.data || response.data;
            set(state => ({
                products: state.products.map(p =>
                    p.id === id ? updatedProduct : p
                ),
                loading: false
            }));
            return updatedProduct;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            set({loading: true, error: null});
            await productApi.delete(id);
            set(state => ({
                products: state.products.filter(product => product.id !== id),
                loading: false
            }));
        } catch (error) {
            set({
                error: error.message || 'Error al eliminar producto',
                loading: false
            });
            throw error;
        }
    },

    setSelectedProduct: (product) => set({selectedProduct: product}),

    clearError: () => set({error: null}),

    reset: () => set({
        products: [],
        loading: false,
        error: null,
        selectedProduct: null
    })
}));