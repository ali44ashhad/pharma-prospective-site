import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { productService } from '../../services';

const AccessRequestForm = ({ productFile, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contact_number: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = productFile?.product_id;
  const country = productFile?.country_id;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.name || !formData.contact_number || !formData.purpose) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await productService.requestAccess({
        user_email: formData.email,
        user_name: formData.name,
        contact_number: formData.contact_number,
        purpose: formData.purpose,
        product_file_id: productFile._id
      });

      toast.success('Access request submitted successfully! Admin will review your request.');
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit request';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/5 p-4 border border-white/8 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-cyan-200">Requesting access to</div>
            <div className="text-lg font-semibold text-white">
              {product?.name || productFile?.file_name}
            </div>
            <div className="text-sm text-cyan-300">{country?.name}</div>
          </div>
          <div className="text-sm text-cyan-200">{productFile?.file_name}</div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50/80 border border-red-200 rounded-md text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-cyan-200 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 bg-white/5 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="your.email@example.com"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-cyan-200 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 bg-white/5 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="John Doe"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="contact_number" className="block text-sm font-medium text-cyan-200 mb-1">
            Contact Number *
          </label>
          <input
            type="tel"
            id="contact_number"
            name="contact_number"
            autoComplete="tel"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full rounded-lg px-3 py-2 bg-white/5 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="+1234567890"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-cyan-200 mb-1">
            Purpose of Access *
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg px-3 py-2 bg-white/5 text-white placeholder:text-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Please describe why you need access to this product..."
            disabled={loading}
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-2xl bg-white/6 text-white hover:bg-white/8 transition disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_8px_30px_-12px_rgba(42,174,230,0.3)] hover:brightness-105 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccessRequestForm;
