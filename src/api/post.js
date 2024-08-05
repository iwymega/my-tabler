import axios from 'axios';

const API_URL = 'https://simple-api.gotrasoft.com/api';

export const getPosts = () => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/post`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // return axios.get(`${API_URL}/post`);
};

export const getPost = (id) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/post/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // return axios.get(`${API_URL}/post/${id}`);
};

export const createPost = (title, content, category_id) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/post`, { title, content, category_id }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // return axios.post(`${API_URL}/post`, { title, content, category_id });
};

export const updatePost = (id, title, content, category_id) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/post/${id}`, { title, content, category_id }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // return axios.put(`${API_URL}/post/${id}`, { title, content, category_id });
};

export const deletePost = (id) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/post/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // return axios.delete(`${API_URL}/post/${id}`);
};