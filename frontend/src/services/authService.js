import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/api/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/api/users/profile');
    return response.data.data;
  }
};