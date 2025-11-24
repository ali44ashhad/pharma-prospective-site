import api from './api';

export const userService = {
  async getUserPermissions() {
    const response = await api.get('/api/users/permissions');
    return response.data.data;
  },

  async getSecurePdfUrl(productFileId) {
    const response = await api.get(`/api/product-files/secure-url/${productFileId}`);
    return response.data.data;
  }
};