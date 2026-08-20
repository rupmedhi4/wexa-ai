/**
 * Skill API Services
 */

import apiClient from './apiClient';

export const skillService = {
  getAll: () => apiClient.get('/skills'),
};
