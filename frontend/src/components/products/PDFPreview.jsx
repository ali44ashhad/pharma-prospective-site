import React from 'react';
import { FaLock, FaDownload, FaExpand } from 'react-icons/fa';

const PDFPreview = ({ 
  fileName, 
  fileSize, 
  isLocked = true, 
  onRequestAccess, 
  onView 
}) => {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-sm">PDF</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{fileName}</h4>
            <p className="text-sm text-gray-600">{fileSize}</p>
          </div>
        </div>
        
        {isLocked ? (
          <div className="flex items-center space-x-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
            <FaLock className="w-3 h-3" />
            <span>Locked</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
            <span>Unlocked</span>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm text-gray-600 font-medium">PDF Document</p>
            </div>
          </div>
          
          {isLocked && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <FaLock className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Content Locked</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        {isLocked ? (
          <button
            onClick={onRequestAccess}
            className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
          >
            <FaLock className="w-4 h-4" />
            <span>Request Access</span>
          </button>
        ) : (
          <>
            <button
              onClick={onView}
              className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
            >
              <FaExpand className="w-4 h-4" />
              <span>View</span>
            </button>
            <button
              disabled
              className="flex-1 btn btn-secondary flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
              title="Download disabled for security"
            >
              <FaDownload className="w-4 h-4" />
              <span>Download</span>
            </button>
          </>
        )}
      </div>

      {isLocked && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm text-center">
            Request access to view this document. Admin approval required.
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;