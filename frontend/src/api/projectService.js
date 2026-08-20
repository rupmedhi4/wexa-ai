/**
 * Project API Services
 */

import apiClient from './apiClient';

export const projectService = {
  getAll: () => apiClient.get('/projects'),
};
