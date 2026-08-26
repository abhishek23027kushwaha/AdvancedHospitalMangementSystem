import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:8000/api'
    : 'https://hospital-management-system-mern-9r6v.onrender.com/api');

// Central axios instance - automatically attaches the correct token
const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Request interceptor: attach Bearer token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const isDoctorRoute = config.url?.startsWith('/doctor') || config.url?.startsWith('doctor');
  const doctorToken = localStorage.getItem('doctorToken');
  const userToken = localStorage.getItem('token');
  const token = isDoctorRoute ? (doctorToken || userToken) : (userToken || doctorToken);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
