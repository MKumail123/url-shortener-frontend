import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:44320/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Check if error.response exists before accessing status
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const response = await axios.post(`${API_URL}/user/refresh`);
          
          if (response.data.Success) {
            localStorage.setItem('accessToken', response.data.Data.AccessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.Data.AccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
export default api;