// src/lib/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://backend.test/api',
    headers: {
        'Accept': 'application/json'
    }
});

export const productApi = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    create: (formData) =>
        api.post('/products', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }),

    update: (id, formData) =>
        api.put(`/products/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }),
    delete: (id) => api.delete(`/products/${id}`)
};