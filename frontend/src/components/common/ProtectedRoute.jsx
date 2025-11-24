import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // if (loading) {
  //   return <LoadingSpinner />;
  // }
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;