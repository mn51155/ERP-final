

import axios from 'axios';
import  store  from '@/store/index'; 
import { logout } from '@/features/auth/authSlice';
import { isTokenExpired } from '@/utils/authUtils';

const axiosInstance = axios.create({
  baseURL: 'https://erp-final-3.onrender.com/',
});




axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }

    if (token && isTokenExpired(token)) {
      store.dispatch(logout());
      window.location.href='/login'; 

        
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();

     throw new Error('Token has expired');
      
    }

    return config;
  },
  (error) => Promise.reject(error)
);




axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href='/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;