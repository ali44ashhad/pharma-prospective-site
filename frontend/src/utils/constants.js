// API Base URL - automatically uses environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pharma-prospective-site.vercel.app';

export const PRODUCT_TYPES = {
  REPORT: 'report',
  ANALYSIS: 'analysis',
  TESTING: 'testing',
  PRICE_BENCHMARK: 'price_benchmark',
  INSIGHTS: 'insights'
};

export const COUNTRIES = {
  IN: { name: 'India', code: 'IN', flag: '🇮🇳' },
  UAE: { name: 'United Arab Emirates', code: 'UAE', flag: '🇦🇪' },
  US: { name: 'United States', code: 'US', flag: '🇺🇸' },
  UK: { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
  SG: { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  AU: { name: 'Australia', code: 'AU', flag: '🇦🇺' }
};

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  AUTH: '/api/auth',
  USERS: '/api/users',
  ADMIN: '/api/admin',
  ACCESS_REQUESTS: '/api/access-requests',
  PRODUCT_FILES: '/api/product-files'
};

export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};