import axios from 'axios';

const api = axios.create({
    baseUrl : import.meta.env.VITE_API_URL,
    timeout : import.meta.env.VITE_API_TIMEOUT,
});


export default api;
