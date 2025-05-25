import axios from 'axios';

const api = axios.create({
    baseURL: 'https://plant-shopping-website-backend.onrender.com/',
    withCredentials: true,
});

export default api;
