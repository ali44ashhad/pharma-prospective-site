import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDate, formatTimeAgo } from '../../utils/formatters';
import { FaCheck, FaTimes, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const requestsData = await adminService.getPendingRequests();
      setRequests(requestsData);
    } catch (error) {
      toast.error('Failed to load pending requests');
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId, requestData) => {
    setProcessing(requestId);
    try {
      const userData = {
        email: requestData.user_email,
        name: requestData.user_name,
        contact_number: requestData.contact_number,
        product_file_id: requestData.product_file_id
      };

      const result = await adminService.createUser(userData);
      
      if (result.temp_password) {
        toast.success(
          <div>
            <p>User created successfully!</p>
            <p className="text-sm">Temporary password: <strong>{result.temp_password}</strong></p>
            <p className="text-xs">Send this to the user manually.</p>
          </div>,
          { autoClose: 10000 }
        );
      } else {
        toast.success('Access granted to existing user');
      }

      // Refresh the list
      await fetchPendingRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId) => {
    setProcessing(requestId);
    try {
      await adminService.rejectRequest(requestId);
      toast.success('Request rejected');
      await fetchPendingRequests();
    } catch (error) {
      toast.error('Failed to reject request');
    } finally {
      setProcessing(null);
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
    <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Pending Access Requests</h2>
        <p className="text-cyan-200">
          Review and manage user access requests
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-cyan-200 text-6xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-white mb-2">No Pending Requests</h3>
          <p className="text-cyan-200">All requests have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="rounded-lg p-6 bg-white/3 border border-white/6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {request.product_file_id?.product_id?.name} - {request.product_file_id?.country_id?.name}
                      </h3>
                      <p className="text-cyan-200 text-sm">
                        Requested by {request.user_name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-cyan-200">
                      <FaClock className="w-3 h-3" />
                      <span>{formatTimeAgo(request.createdAt)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <FaEnvelope className="w-4 h-4 text-cyan-200" />
                      <span className="text-cyan-200">{request.user_email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FaPhone className="w-4 h-4 text-cyan-200" />
                      <span className="text-cyan-200">{request.contact_number}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white text-sm mb-2">Purpose:</h4>
                    <p className="text-cyan-100 text-sm">{request.purpose}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:w-48">
                  <button
                    onClick={() => handleApprove(request._id, request)}
                    disabled={processing === request._id}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-medium hover:brightness-105 transition"
                  >
                    {processing === request._id ? (
                      <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    ) : (
                      <FaCheck className="w-4 h-4" />
                    )}
                    <span>Approve</span>
                  </button>
                  
                  <button
                    onClick={() => handleReject(request._id)}
                    disabled={processing === request._id}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                  >
                    {processing === request._id ? (
                      <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    ) : (
                      <FaTimes className="w-4 h-4" />
                    )}
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
