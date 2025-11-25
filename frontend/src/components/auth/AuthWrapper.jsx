import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 

const AuthWrapper = ({ children, requireAuth = false, adminOnly = false }) => {
  const { isAuthenticated, user, loading, checkAuthStatus } = useAuth();

  useEffect(() => {
    if (loading) {
      checkAuthStatus();
    }
  }, [loading, checkAuthStatus]);

 
  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
          <span className="ml-3 text-cyan-200">Loading...</span>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (adminOnly && (!isAuthenticated || user?.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthWrapper;