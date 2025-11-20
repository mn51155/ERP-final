// src/app/api/axiosInstance.ts

import axios from 'axios';
import  store  from '../store/index'; // مسیر رو با توجه به پروژه‌ت تنظیم کن
import { logout } from '../features/auth/authSlice'; // اکشن لاگ‌اوت
import { isTokenExpired } from '../utils/authUtils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});



// بررسی قبل از ارسال هر درخواست
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }

    if (token && isTokenExpired(token)) {
      store.dispatch(logout());
      window.location.href='/login'; // می‌فرستیم لاگین


        // ساختن یک AbortController برای لغو درخواست
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();

     throw new Error('توکن منقضی شده، درخواست لغو شد.');//پرتاب خطا
      
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// بررسی پاسخ‌ها
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href='/login'; // می‌فرستیم لاگین// توکن مشکل داره یا حذف شده → بفرست لاگین
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;