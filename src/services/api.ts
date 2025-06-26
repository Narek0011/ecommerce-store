import axios from 'axios';

const api = axios.create({
  baseURL: 'http://o-complex.com:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getReviews = async () => {
  const response = await api.get('/reviews');
  return response.data;
};

export const getProducts = async (page: number, pageSize: number = 20) => {
  const response = await api.get(`/products?page=${page}&page_size=${pageSize}`);
  return response.data;
};

export const submitOrder = async (phone: string, cart: Array<{id: number, quantity: number}>) => {
  const response = await api.post('/order', { phone, cart });
  return response.data;
};

export default api;