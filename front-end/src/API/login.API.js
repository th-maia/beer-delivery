import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const register = async () => {

};
