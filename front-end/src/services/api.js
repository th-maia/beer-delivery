import axios from 'axios';

const isDev = false;

const api = axios.create({
  baseURL: isDev ? '/mocks' : 'http://localhost:3001',
});

export default api;
