
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const PDFViewer = ({ pdfUrl, fileName, onClose }) => {
  if (!pdfUrl) {
    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
        <div className="bg-white/5 rounded-2xl p-6 max-w-md w-full border border-white/10 text-center">
          <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
          <p className="text-cyan-200 mb-4">PDF URL not available</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 z-50  flex items-center justify-center p-4">
      <div className="bg-white/5 rounded-2xl  max-w-6xl w-full h-[85vh] flex flex-col border border-white/10 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">PDF</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">{fileName}</h4>
              <p className="text-sm text-cyan-200">Secure Document</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/6 hover:bg-white/8 rounded-2xl text-cyan-200"
          >
            <FaTimes className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden bg-white/3">
          <iframe
            src={pdfUrl}
            title={fileName}
            width="100%"
            height="100%"
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
