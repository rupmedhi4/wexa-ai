/**
 * Developer API Services
 */

import apiClient from './apiClient';

export const developerService = {
  getAll: () => apiClient.get('/developers'),
  getById: (id) => apiClient.get(`/developers/${id}`),
  create: (data) => apiClient.post('/developers', data),
  getSimilar: (id) => apiClient.get(`/developers/${id}/similar`),
  getRecommendations: (id) => apiClient.get(`/developers/${id}/recommendations`),
  getConnectionPath: (id1, id2) => apiClient.get(`/path/${id1}/${id2}`),
};
