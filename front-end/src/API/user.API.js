import API from './index';

export const login = async ({ email, password }) => {
  try {
    const response = await API.post('/login', { email, password });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await API.post('/register', {
      name, email, password, role: 'consumer', // passando role 'padrao' por enquanto
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
