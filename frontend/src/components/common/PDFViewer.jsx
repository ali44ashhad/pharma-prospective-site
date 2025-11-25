
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PDFViewer = ({ pdfUrl, fileName, onClose }) => {
  // Disable right-click, keyboard shortcuts, and screenshot attempts
  useEffect(() => {
    const preventActions = (e) => {
      // Disable right-click
      if (e.type === 'contextmenu') {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+S (Save), Ctrl+P (Print), Ctrl+C (Copy)
      if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Disable Cmd+S, Cmd+P, Cmd+C on Mac
      if (e.metaKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }
      
      // Disable PrintScreen, Shift+PrintScreen, Alt+PrintScreen
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        navigator.clipboard.writeText('');
        return false;
      }

      // Disable Windows+Shift+S (Windows Screenshot Tool)
      if (e.shiftKey && e.key === 'S' && e.metaKey) {
        e.preventDefault();
        return false;
      }

      // Disable F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
      }
    };

    // Blur document when user tries to take screenshot
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away - potential screenshot attempt
        console.warn('Document visibility changed - screenshot attempt detected');
      }
    };

    // Prevent text selection
    const preventSelection = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', preventActions);
    document.addEventListener('keydown', preventActions);
    document.addEventListener('keyup', preventActions);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('selectstart', preventSelection);
    document.addEventListener('copy', preventSelection);

    // Disable drag
    document.addEventListener('dragstart', preventSelection);

    return () => {
      document.removeEventListener('contextmenu', preventActions);
      document.removeEventListener('keydown', preventActions);
      document.removeEventListener('keyup', preventActions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('selectstart', preventSelection);
      document.removeEventListener('copy', preventSelection);
      document.removeEventListener('dragstart', preventSelection);
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
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl sm:rounded-2xl w-full h-full sm:max-w-7xl sm:h-[90vh] flex flex-col sm:flex-row border border-cyan-500/20 shadow-2xl overflow-hidden">
        
        {/* Sidebar */}
        <div className="hidden sm:flex sm:flex-col w-64 bg-gradient-to-b from-cyan-700 to-blue-800 border-r border-cyan-500/20">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-cyan-500/20">
            <h3 className="text-white font-bold text-lg mb-1">Document Info</h3>
            <p className="text-cyan-100 text-xs">Protected PDF Viewer</p>
          </div>

          {/* File Details */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <label className="text-cyan-200 text-xs font-semibold uppercase tracking-wide mb-1 block">
                File Name
              </label>
              <p className="text-white text-sm break-words">{fileName}</p>
            </div>

            <div>
              <label className="text-cyan-200 text-xs font-semibold uppercase tracking-wide mb-1 block">
                Status
              </label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Protected & Secure</span>
              </div>
            </div>

            <div>
              <label className="text-cyan-200 text-xs font-semibold uppercase tracking-wide mb-1 block">
                Watermark
              </label>
              <p className="text-white text-sm">PHARMA PROSPECTIVE</p>
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <label className="text-cyan-200 text-xs font-semibold uppercase tracking-wide mb-2 block">
                Security Features
              </label>
              <ul className="space-y-2 text-xs text-cyan-100">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Download Disabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Print Disabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Copy Disabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Watermarked
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-cyan-500/20">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Close Viewer
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] opacity-10 select-none" style={{ userSelect: 'none' }}>
              <div className="text-4xl sm:text-6xl font-bold text-cyan-400 whitespace-nowrap select-none" style={{ userSelect: 'none' }}>
                PHARMA PROSPECTIVE
              </div>
            </div>
            
            <div className="absolute top-[20%] left-[35%] rotate-[-45deg] opacity-8 select-none hidden sm:block" style={{ userSelect: 'none' }}>
              <div className="text-4xl font-bold text-cyan-400 whitespace-nowrap select-none" style={{ userSelect: 'none' }}>
                PHARMA PROSPECTIVE
              </div>
            </div>
            
            <div className="absolute bottom-[20%] right-[15%] rotate-[-45deg] opacity-8 select-none hidden sm:block" style={{ userSelect: 'none' }}>
              <div className="text-4xl font-bold text-cyan-400 whitespace-nowrap select-none" style={{ userSelect: 'none' }}>
                PHARMA PROSPECTIVE
              </div>
            </div>
            
            <div className="absolute top-[30%] right-[10%] rotate-[-45deg] opacity-6 select-none hidden md:block" style={{ userSelect: 'none' }}>
              <div className="text-3xl font-bold text-cyan-300 whitespace-nowrap select-none" style={{ userSelect: 'none' }}>
                PHARMA PROSPECTIVE
              </div>
            </div>
            
            <div className="absolute bottom-[30%] left-[35%] rotate-[-45deg] opacity-6 select-none hidden md:block" style={{ userSelect: 'none' }}>
              <div className="text-3xl font-bold text-cyan-300 whitespace-nowrap select-none" style={{ userSelect: 'none' }}>
                PHARMA PROSPECTIVE
              </div>
            </div>
          </div>

          {/* Header - Mobile & Desktop */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-600 to-blue-700 relative z-20 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-xs sm:text-sm">PDF</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white text-sm sm:text-base truncate">{fileName}</h4>
                <p className="text-xs text-cyan-100 hidden sm:block">Secure Document - Protected</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-2xl text-white transition text-sm"
            >
              <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* PDF Content */}
          <div className="flex-1 overflow-hidden bg-white/3 relative min-h-0" style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}>
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              title={fileName}
              width="100%"
              height="100%"
              className="border-0"
              style={{ 
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                MozUserSelect: 'none'
              }}
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onSelectStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Bottom Notice */}
          <div className="px-3 sm:px-6 py-2 border-t border-cyan-500/20 bg-gradient-to-r from-cyan-600 to-blue-700 relative z-20 flex-shrink-0">
            <p className="text-[10px] sm:text-xs text-cyan-100 text-center">
              🔒 This document is protected. Downloading, printing, and copying are disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
