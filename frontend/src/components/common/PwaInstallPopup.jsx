import React, { useEffect, useState } from "react";

const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("PwaInstallPopup mounted");

    let timerId;

    const beforeInstallHandler = (e) => {
      console.log("beforeinstallprompt fired", e);
      e.preventDefault();
      setDeferredPrompt(e);

      timerId = setTimeout(() => {
        console.log("Showing popup after 10s");
        setShowPopup(true);
      }, 10000);
    };

    const appInstalledHandler = () => {
      console.log("appinstalled event fired");
      setShowPopup(false);
      setDeferredPrompt(null);
      if (timerId) clearTimeout(timerId);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      window.removeEventListener("appinstalled", appInstalledHandler);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("No deferredPrompt, cannot show install");
      setShowPopup(false);
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log("User install choice:", outcome);

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const handleClose = () => {
    console.log("User closed popup");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Download the App
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Fast access ke liye abhi install karein aur home screen se open karein.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            Not now
          </button>
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Install Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPopup;
