import axios from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pharma-prospective-site.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Enable cookies/credentials
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add user token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add admin token for admin routes OR if admin_token exists in localStorage
    const url = config.url || '';
    const adminToken = localStorage.getItem('admin_token');
    
    // Check if this is an admin request (either URL has /admin or admin_token exists)
    if (adminToken && (url.includes('/admin') || url.includes('/access-requests'))) {
      config.headers['admin-token'] = adminToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Don't redirect if already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden (admin access)
    if (error.response?.status === 403) {
      const url = error.config?.url || '';
      if (url.includes('/admin')) {
        localStorage.removeItem('admin_token');
        if (!window.location.pathname.includes('/admin-login')) {
          window.location.href = '/admin-login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
