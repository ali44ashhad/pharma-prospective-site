// import React, { useState, useEffect } from 'react';
// import { adminService } from '../../services';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { FaFilePdf, FaTrash, FaEye, FaCalendar } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const UploadedDocuments = () => {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUploadedDocuments();
//   }, []);

//   const fetchUploadedDocuments = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getAllProductFiles();
//       setDocuments(data);
//     } catch (error) {
//       toast.error('Failed to load documents');
//       console.error('Error fetching documents:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (documentId) => {
//     if (!window.confirm('Are you sure you want to delete this document?')) {
//       return;
//     }

//     try {
//       await adminService.deleteProductFile(documentId);
//       toast.success('Document deleted successfully');
//       fetchUploadedDocuments();
//     } catch (error) {
//       toast.error('Failed to delete document');
//     }
//   };

//   const handleView = (url) => {
//     window.open(url, '_blank');
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <LoadingSpinner size="lg" text="Loading documents..." />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Uploaded Documents</h2>
//           <p className="text-gray-600 mt-1">
//             Manage all uploaded product files ({documents.length} total)
//           </p>
//         </div>
//       </div>

//       {/* Documents Grid */}
//       {documents.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
//           <FaFilePdf className="mx-auto text-6xl text-gray-400 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents</h3>
//           <p className="text-gray-600">No documents have been uploaded yet.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {documents.map((doc) => (
//             <div key={doc._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
//               {/* Header */}
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                   <FaFilePdf className="text-red-600 text-xl" />
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   doc.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
//                 }`}>
//                   {doc.is_active ? 'Active' : 'Inactive'}
//                 </span>
//               </div>

//               {/* File Info */}
//               <h3 className="font-semibold text-gray-900 mb-2 truncate" title={doc.file_name}>
//                 {doc.file_name}
//               </h3>

//               {/* Product & Country */}
//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <span className="font-medium mr-2">Product:</span>
//                   <span className="truncate">{doc.product_id?.name || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <span className="font-medium mr-2">Country:</span>
//                   <span className="truncate">
//                     {doc.country_id?.flag || '🏳️'} {doc.country_id?.name || 'N/A'}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <FaCalendar className="mr-2" />
//                   <span>{formatDate(doc.createdAt)}</span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2 pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => handleView(doc.cloudinary_url)}
//                   className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//                 >
//                   <FaEye />
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleDelete(doc._id)}
//                   className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
//                 >
//                   <FaTrash />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadedDocuments;

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaFilePdf, FaTrash, FaEye, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UploadedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUploadedDocuments();
  }, []);

  const fetchUploadedDocuments = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllProductFiles();
      setDocuments(data);
    } catch (error) {
      toast.error('Failed to load documents');
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await adminService.deleteProductFile(documentId);
      toast.success('Document deleted successfully');
      fetchUploadedDocuments();
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const handleView = (url) => {
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center py-12">
  //       <LoadingSpinner size="lg" text="Loading documents..." />
  //     </div>
  //   );
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Uploaded Documents</h2>
          <p className="text-cyan-200 mt-1">
            Manage all uploaded product files ({documents.length} total)
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      {documents.length === 0 ? (
        <div className="text-center py-12 bg-white/3 rounded-lg border border-white/8">
          <FaFilePdf className="mx-auto text-6xl text-cyan-300 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Documents</h3>
          <p className="text-cyan-200">No documents have been uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-white/3 rounded-lg border border-white/8 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaFilePdf className="text-red-600 text-xl" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {doc.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* File Info */}
              <h3 className="font-semibold text-white mb-2 truncate" title={doc.file_name}>
                {doc.file_name}
              </h3>

              {/* Product & Country */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-cyan-200">
                  <span className="font-medium mr-2">Product:</span>
                  <span className="truncate">{doc.product_id?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-cyan-200">
                  <span className="font-medium mr-2">Country:</span>
                  <span className="truncate">
                    {doc.country_id?.flag || '🏳️'} {doc.country_id?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-cyan-200">
                  <FaCalendar className="mr-2" />
                  <span>{formatDate(doc.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-white/8">
                <button
                  onClick={() => handleView(doc.cloudinary_url)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50/10 text-cyan-300 rounded-lg hover:bg-blue-100/10 transition-colors text-sm font-medium"
                >
                  <FaEye />
                  View
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50/10 text-red-400 rounded-lg hover:bg-red-100/10 transition-colors text-sm font-medium"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedDocuments;
