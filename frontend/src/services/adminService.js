// import api from './api';

// export const adminService = {
//   async getPendingRequests() {
//     const response = await api.get('/api/admin/access-requests/pending');
//     return response.data.data;
//   },

//   async approveRequest(requestId, userData) {
//     const response = await api.put(`/api/admin/access-requests/${requestId}/approve`, userData);
//     return response.data;
//   },

//   async rejectRequest(requestId) {
//     const response = await api.put(`/api/admin/access-requests/${requestId}/reject`);
//     return response.data;
//   },

//   async createUser(userData) {
//     const response = await api.post('/api/admin/users', userData);
//     return response.data;
//   },

//   async getAllUsers() {
//     const response = await api.get('/api/admin/users');
//     return response.data.data;
//   },

//   async uploadProductFile(formData) {
//     const response = await api.post('/api/admin/product-files', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   },

//   async getAllProductFiles() {
//     const response = await api.get('/api/admin/product-files');
//     return response.data.data;
//   }
// };

import api from './api';

export const adminService = {
  // NOTE: access-requests routes are mounted on /api/access-requests on the server
  async getPendingRequests() {
    const response = await api.get('/api/access-requests/pending');
    return response.data.data;
  },

  async approveRequest(requestId, userData) {
    const response = await api.put(`/api/access-requests/${requestId}/approve`, userData);
    return response.data;
  },

  async rejectRequest(requestId) {
    const response = await api.put(`/api/access-requests/${requestId}/reject`);
    return response.data;
  },

  // admin-scoped user endpoints (keep if server exposes them under /api/admin)
  async createUser(userData) {
    const response = await api.post('/api/admin/users', userData);
    return response.data;
  },

  async getAllUsers() {
    const response = await api.get('/api/admin/users');
    return response.data.data;
  },

  async uploadProductFile(formData) {
    const response = await api.post('/api/admin/product-files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getAllProductFiles() {
    const response = await api.get('/api/admin/product-files');
    return response.data.data;
  },

  async deleteProductFile(fileId) {
    const response = await api.delete(`/api/admin/product-files/${fileId}`);
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  }
};
