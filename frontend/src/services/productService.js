import api from './api';

export const productService = {
  async getAllProducts() {
    const response = await api.get('/api/products');
    return response.data.data;
  },

  async getAllCountries() {
    const response = await api.get('/api/countries');
    return response.data.data;
  },

  async getProductCountries(productId) {
    const response = await api.get(`/api/products/${productId}/countries`);
    return response.data.data;
  },

  async getProductFile(productFileId) {
    const response = await api.get(`/api/products/files/${productFileId}`);
    return response.data.data;
  },

  async requestAccess(requestData) {
    const response = await api.post('/api/access-requests', requestData);
    return response.data;
  }
};