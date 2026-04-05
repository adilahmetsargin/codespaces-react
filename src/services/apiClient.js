import axios from 'axios';

/**
 * Centralized Axios instance for all API calls
 * This allows easy configuration and modification of API behavior
 * To replace mock APIs with real endpoints, simply update the baseURL here
 */
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with real API URL later
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token (when implemented)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
