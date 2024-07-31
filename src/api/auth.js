import axios from 'axios';

const API_URL = 'http://simple-api.gotrasoft.com/api';

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = (name, email, password, password_confirmation) => {
  return axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
};

export const logout = () => {
  // tambahkan barer token
  const token = localStorage.getItem('token');
  return axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
};