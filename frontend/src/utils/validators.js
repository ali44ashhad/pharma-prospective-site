export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateName = (name) => {
  // At least 2 characters, only letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};

export const validatePurpose = (purpose) => {
  // At least 10 characters
  return purpose.length >= 10;
};

export const validateFile = (file, allowedTypes = ['application/pdf'], maxSize = 10 * 1024 * 1024) => {
  const errors = [];

  if (!allowedTypes.includes(file.type)) {
    errors.push('Only PDF files are allowed');
  }

  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateProductFileData = (data) => {
  const errors = {};

  if (!data.product_id) {
    errors.product_id = 'Product is required';
  }

  if (!data.country_id) {
    errors.country_id = 'Country is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};