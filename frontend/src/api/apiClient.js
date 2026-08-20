/**
 * Axios API Client Configuration
 * Base URL and response interceptor for unified error handling.
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      isDatabaseUnreachable: error.response?.status === 503,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;
