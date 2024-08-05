import axios from 'axios';

const API_URL = 'https://simple-api.gotrasoft.com/api';

export const getProvinces = () => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/provinces`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
//   return axios.get(`${API_URL}/provinces`);
};

export const getRegencies = (provinceId) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/regencies/${provinceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
//   return axios.get(`${API_URL}/regencies/${provinceId}`);
};

export const getDistricts = (regencyId) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/districts/${regencyId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
//   return axios.get(`${API_URL}/districts/${regencyId}`);
};

export const getVillages = (districtId) => {
    // tambahkan barer token
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/villages/${districtId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
//   return axios.get(`${API_URL}/villages/${districtId}`);
};