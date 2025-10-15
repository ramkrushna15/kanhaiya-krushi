import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = (params) => api.get('/products/get-products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);

// Services
export const getServices = () => api.get('/services');
export const getServiceById = (id) => api.get(`/services/${id}`);

// Contact
export const submitContact = (data) => api.post('/contact', data);

export default api;