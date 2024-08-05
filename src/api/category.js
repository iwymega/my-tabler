import axios from 'axios';

const API_URL = 'https://simple-api.gotrasoft.com/api';

export const getCategories = () => {
  // tambahkan barer token
  const token = localStorage.getItem('token'); 
  return axios.get(`${API_URL}/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategory = (id) => {
  return axios.get(`${API_URL}/category/${id}`);
};

export const createCategory = (name) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/category`, { name }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // return axios.post(`${API_URL}/category`, { name });
};

// export const createCategory = async (name) => {
//   const response = await fetch('/api/categories', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create category');
//   }

//   return response.json();
// };

export const updateCategory = (id, name) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/category/${id}`, { name }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // return axios.put(`${API_URL}/category/${id}`, { name });
};

export const deleteCategory = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // return axios.delete(`${API_URL}/category/${id}`);
};