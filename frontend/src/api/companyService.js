/**
 * Company API Services
 */

import apiClient from './apiClient';

export const companyService = {
  getAll: () => apiClient.get('/companies'),
};
