import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import AccessRequestForm from './AccessRequestForm';
import PDFViewer from '../common/PDFViewer';
import { FaLock, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CountryList = ({ countries, productId }) => {
  const { isAuthenticated, user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role !== 'admin') {
      fetchUserPermissions();
    }
  }, [isAuthenticated, user]);

  const fetchUserPermissions = async () => {
    try {
      const permissions = await userService.getUserPermissions();
      setUserPermissions(permissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const hasAccess = (productFileId) => {
    return userPermissions.some(
      (permission) => permission.product_file_id?._id === productFileId
    );
  };

  const handleCountryClick = async (country) => {
    setLoading(true);
    try {
      const fileData = await productService.getProductFile(country.product_file_id);
      setProductFile(fileData);
      
      // Check if user has access
      if (isAuthenticated && user?.role !== 'admin' && hasAccess(country.product_file_id)) {
        // User has access - open PDF directly
        const pdfData = await userService.getSecurePdfUrl(country.product_file_id);
        setSelectedPdf({ ...pdfData, fileName: fileData.file_name });
      } else {
        // No access - show locked preview
        setSelectedCountry(country);
      }
    } catch (error) {
      console.error('Error fetching product file:', error);
      toast.error('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = () => {
    setSelectedCountry(null);
    setShowRequestForm(true);
  };

  const handleRequestSuccess = () => {
    setShowRequestForm(false);
    setProductFile(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <button
            key={country._id}
            onClick={() => handleCountryClick(country)}
            type="button"
            className="w-full text-left rounded-2xl p-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_20px_40px_-20px_rgba(2,6,23,0.7),0_10px_30px_-12px_rgba(42,174,230,0.06)] transform-gpu transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label={`Open preview for ${country.name}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-2xl shadow-sm">
                  {country.flag || '🏳️'}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{country.name}</h3>
                  <p className="text-cyan-200 text-sm">{country.code}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-cyan-200">
                <FaLock className="w-5 h-5" />
                <span className="sr-only">Locked</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-cyan-200">
              <div className="flex items-center gap-2">
                <FaEye className="w-4 h-4 opacity-90" />
                <span>Preview</span>
              </div>
              <div className="text-xs bg-white/6 px-2 py-1 rounded-full">Click to request</div>
            </div>
          </button>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {selectedCountry && productFile && !showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => { setSelectedCountry(null); setProductFile(null); }}
            aria-hidden
          />

          <div className="relative z-10 max-w-2xl w-full rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Document Preview</h2>
              <button
                onClick={() => { setSelectedCountry(null); setProductFile(null); }}
                className="text-cyan-200 hover:text-white text-2xl leading-none"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>

            {/* Locked visual */}
            <div className="text-center py-8 bg-white/6 rounded-lg mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-4 shadow-sm">
                <FaLock className="text-blue-600 text-4xl" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Document Locked</h3>
              <p className="text-cyan-200 mb-1">
                {productFile.product_id?.name} — {productFile.country_id?.name}
              </p>
              <p className="text-sm text-cyan-300">{productFile.file_name}</p>
            </div>

            {/* Info */}
            <div className="bg-gradient-to-r from-cyan-50/8 to-blue-50/6 border border-cyan-200/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-cyan-100 text-center">
                📋 Request access to view this document. Admin will review and grant permission.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  setProductFile(null);
                }}
                className="flex-1 px-6 py-3 bg-white/6 text-white rounded-lg font-semibold hover:bg-white/8 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleRequestAccess}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:brightness-105 transition shadow-md"
              >
                🔓 Request Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Request Form Modal */}
      {showRequestForm && productFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => { setShowRequestForm(false); setProductFile(null); }}
            aria-hidden
          />

          <div className="relative z-10 max-w-lg w-full rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Request Document Access</h2>
              <button
                onClick={() => {
                  setShowRequestForm(false);
                  setProductFile(null);
                }}
                className="text-cyan-200 hover:text-white text-2xl leading-none"
                aria-label="Close request form"
              >
                ×
              </button>
            </div>

            <AccessRequestForm
              productFile={productFile}
              onClose={() => {
                setShowRequestForm(false);
                setProductFile(null);
              }}
              onSuccess={handleRequestSuccess}
            />
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 border-t-4 border-cyan-400 rounded-full animate-spin" />
        </div>
      )}

      {/* PDF Viewer */}
      {selectedPdf && (
        <PDFViewer
          pdfUrl={selectedPdf.secure_url}
          fileName={selectedPdf.fileName}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </>
  );
};

export default CountryList;

