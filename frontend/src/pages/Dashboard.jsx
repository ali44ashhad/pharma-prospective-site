
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import PDFViewer from '../components/common/PDFViewer';
import ChangePassword from '../components/auth/ChangePassword';
import { formatDate, formatProductName } from '../utils/helpers';
import { FaFilePdf, FaEye, FaCalendar, FaKey } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const fetchUserPermissions = async () => {
    try {
      const permissionsData = await userService.getUserPermissions();
      setPermissions(permissionsData);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPdf = async (productFileId, fileName) => {
    try {
      const pdfData = await userService.getSecurePdfUrl(productFileId);
      setSelectedPdf({ ...pdfData, fileName });
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  
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

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-cyan-200">
              Here are all the documents you have access to
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChangePassword(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-[0_8px_30px_-12px_rgba(42,174,230,0.3)] hover:brightness-105 transition"
            >
              <FaKey className="w-4 h-4" />
              Change Password
            </button>

            <button
              onClick={() => { logout(); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/6 text-white hover:bg-white/8 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permissions.length === 0 ? (
            <div className="col-span-full">
              <div className="rounded-2xl bg-white/5 p-12 backdrop-blur-md border border-white/8 text-center">
                <div className="text-cyan-200 text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">No Documents Available</h3>
                <p className="text-cyan-200 mb-6">
                  You haven't been granted access to any documents yet.
                </p>
                <button
                  onClick={() => (window.location.href = '/products')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-sm hover:scale-[1.02] transition-transform"
                >
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            permissions.map((permission) => (
              <div 
                key={permission._id} 
                className="rounded-2xl bg-white/5 p-5 backdrop-blur-md border border-white/8 hover:bg-white/8 transition-all"
              >
                {/* Header with icon and badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FaFilePdf className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-base md:text-lg truncate">
                        {formatProductName(permission.product_file_id?.product_id?.name)}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="hidden sm:inline">Active</span>
                      <span className="sm:hidden">✓</span>
                    </div>
                  </div>
                </div>

                {/* Country and Date Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-cyan-200">
                    <span className="text-lg" role="img" aria-label="country">🌍</span>
                    <span className="font-medium">{permission.product_file_id?.country_id?.name}</span>
                    <span className="text-cyan-300/50">•</span>
                    <span className="text-xs text-cyan-300/70">{permission.product_file_id?.country_id?.code}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-cyan-300/70">
                    <FaCalendar className="w-3 h-3" />
                    <span>Granted on {formatDate(permission.granted_at)}</span>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={() => handleViewPdf(
                    permission.product_file_id?._id,
                    permission.product_file_id?.file_name
                  )}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_8px_30px_-12px_rgba(42,174,230,0.4)] hover:brightness-110 hover:shadow-[0_8px_30px_-8px_rgba(42,174,230,0.5)] transition-all"
                >
                  <FaEye className="w-4 h-4" />
                  <span>View Document</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* PDF Viewer Modal */}
        {selectedPdf && (
          <PDFViewer
            pdfUrl={selectedPdf.secure_url}
            fileName={selectedPdf.fileName}
            onClose={() => setSelectedPdf(null)}
          />
        )}

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl max-w-md w-full p-6 border border-white/8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Change Password</h2>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="text-cyan-200 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <ChangePassword onSuccess={() => setShowChangePassword(false)} onCancel={() => setShowChangePassword(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
