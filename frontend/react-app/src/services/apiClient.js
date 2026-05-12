import axios from 'axios';

// Base API URL - automatically uses the backend
const API_BASE_URL = '/api';
const AUTH_TOKEN_KEY = 'authToken';

export const tokenStorage = {
  get: () => localStorage.getItem(AUTH_TOKEN_KEY),
  set: (token) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(AUTH_TOKEN_KEY)
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const currentPath = window.location.pathname;

    if (isUnauthorized) {
      tokenStorage.clear();

      if (currentPath !== '/auth') {
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
