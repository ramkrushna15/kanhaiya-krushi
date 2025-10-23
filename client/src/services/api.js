import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://kanhaiyakrushi.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getProducts = (params) => api.get('/products/get-products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getServices = () => api.get('/services/get-services');
export const getServiceById = (id) => api.get(`/services/${id}`);
export const submitContact = (data) => api.post('/contact', data);

export default api;