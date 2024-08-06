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


export const createPost = async (title, content, category_id, image_cover) => {
    try {
        // tambahkan barer token
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token tidak ditemukan');
        }

        console.log('Mengirim data ke API:', { title, content, category_id, image_cover });

        const response = await axios.post(`${API_URL}/post`, { title, content, category_id, image_cover }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });

        console.log('Respons dari API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error saat membuat post:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updatePost = (id, title, content, category_id, image_cover) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/post/${id}`, { title, content, category_id, image_cover }, {
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


// Fungsi untuk mengambil gambar post dari API contoh url https://simple-api.gotrasoft.com/storage/post/gung-titile-Yfy.png
export const storageimage = async () => {
    try {
        const response = await axios.get(`${API_URL}/storage/post`);
        return response.data;
    } catch (error) {
        console.error('Error saat mengambil gambar:', error.response ? error.response.data : error.message);
        throw error;
}
};

// API STORAGE IMAGE
export const IMAGE_STORAGE = 'https://simple-api.gotrasoft.com/storage/post/';