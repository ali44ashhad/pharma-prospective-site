 
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { validatePassword } from '../../utils/validators';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { changePassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const result = await changePassword(formData.currentPassword, formData.newPassword);
      
      if (result.success) {
        toast.success('Password changed successfully!');
        onSuccess?.();
      } else {
        setErrors({ general: result.message || 'Failed to change password' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred while changing password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Change Password</h3>
        <p className="text-cyan-200 mt-1">Create a new secure password</p>
      </div>

      {errors.general && (
        <div className="p-3 bg-red-50/80 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-cyan-200 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10 ${errors.currentPassword ? 'border-red-500' : 'border-white/10'}`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('current')}
              aria-label="Toggle current password visibility"
            >
              {showPasswords.current ? (
                <FaEyeSlash className="w-4 h-4 text-cyan-200" />
              ) : (
                <FaEye className="w-4 h-4 text-cyan-200" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-cyan-200 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10 ${errors.newPassword ? 'border-red-500' : 'border-white/10'}`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('new')}
              aria-label="Toggle new password visibility"
            >
              {showPasswords.new ? (
                <FaEyeSlash className="w-4 h-4 text-cyan-200" />
              ) : (
                <FaEye className="w-4 h-4 text-cyan-200" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-200 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'}`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('confirm')}
              aria-label="Toggle confirm password visibility"
            >
              {showPasswords.confirm ? (
                <FaEyeSlash className="w-4 h-4 text-cyan-200" />
              ) : (
                <FaEye className="w-4 h-4 text-cyan-200" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-2xl bg-white/6 text-white hover:bg-white/8 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_8px_30px_-12px_rgba(42,174,230,0.3)] hover:brightness-105 transition"
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
