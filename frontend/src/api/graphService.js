/**
 * Graph Aggregate Services
 */

import apiClient from './apiClient';

export const graphService = {
  getStats: () => apiClient.get('/stats'),
  search: (query) => apiClient.get(`/search?q=${encodeURIComponent(query)}`),
  getVisualization: () => apiClient.get('/visualization'),
};
