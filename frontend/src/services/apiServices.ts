import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_API_URL;

const apiClinet = axios.create({
    baseURL: BASE_URL,
});

// Export axios.isAxiosError
export const isAxiosError = axios.isAxiosError;

export default apiClinet;