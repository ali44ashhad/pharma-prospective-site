
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PDFViewer = ({ pdfUrl, fileName, onClose }) => {
  // Disable right-click and keyboard shortcuts
  useEffect(() => {
    const preventActions = (e) => {
      // Disable right-click
      if (e.type === 'contextmenu') {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+S, Ctrl+P, Ctrl+C, Print Screen
      if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }
      
      // Disable Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', preventActions);
    document.addEventListener('keydown', preventActions);

    return () => {
      document.removeEventListener('contextmenu', preventActions);
      document.removeEventListener('keydown', preventActions);
    };
  }, []);

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
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div className="bg-white/5 rounded-2xl max-w-6xl w-full h-[85vh] flex flex-col border border-white/10 shadow-lg relative">
        {/* Watermark Overlay - Multiple positioned watermarks */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
          {/* Center watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] opacity-10 select-none">
            <div className="text-6xl font-bold text-cyan-400 whitespace-nowrap">
              PHARMA PROSPECTIVE
            </div>
          </div>
          
          {/* Top-left watermark */}
          <div className="absolute top-[20%] left-[15%] rotate-[-45deg] opacity-8 select-none">
            <div className="text-4xl font-bold text-cyan-400 whitespace-nowrap">
              PHARMA PROSPECTIVE
            </div>
          </div>
          
          {/* Bottom-right watermark */}
          <div className="absolute bottom-[20%] right-[15%] rotate-[-45deg] opacity-8 select-none">
            <div className="text-4xl font-bold text-cyan-400 whitespace-nowrap">
              PHARMA PROSPECTIVE
            </div>
          </div>
          
          {/* Top-right watermark */}
          <div className="absolute top-[30%] right-[10%] rotate-[-45deg] opacity-6 select-none">
            <div className="text-3xl font-bold text-cyan-300 whitespace-nowrap">
              PHARMA PROSPECTIVE
            </div>
          </div>
          
          {/* Bottom-left watermark */}
          <div className="absolute bottom-[30%] left-[10%] rotate-[-45deg] opacity-6 select-none">
            <div className="text-3xl font-bold text-cyan-300 whitespace-nowrap">
              PHARMA PROSPECTIVE
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-600 to-blue-700 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold text-sm">PDF</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">{fileName}</h4>
              <p className="text-sm text-cyan-100">Secure Document - Protected</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-2xl text-white transition"
          >
            <FaTimes className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* PDF Content with protection */}
        <div className="flex-1 overflow-hidden bg-white/3 relative">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={fileName}
            width="100%"
            height="100%"
            className="border-0"
            style={{ 
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Bottom protection notice */}
        <div className="px-6 py-2 border-t border-white/8 bg-white/5 relative z-20">
          <p className="text-xs text-cyan-200 text-center">
            🔒 This document is protected. Downloading, printing, and copying are disabled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
