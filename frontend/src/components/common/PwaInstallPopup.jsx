import React, { useEffect, useState } from "react";

const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timerId;

    const beforeInstallHandler = (e) => {
      // Browser ka default mini bar mat dikhne do
      e.preventDefault();
      // Event ko store kar lo
      setDeferredPrompt(e);

      // 10 second baad popup dikhana
      timerId = setTimeout(() => {
        setShowPopup(true);
      }, 10000); // 10000 ms = 10 seconds
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    // Already installed hai to popup kabhi mat dikhao
    const appInstalledHandler = () => {
      setShowPopup(false);
      setDeferredPrompt(null);
      if (timerId) clearTimeout(timerId);
    };

    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      window.removeEventListener("appinstalled", appInstalledHandler);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // safety
      setShowPopup(false);
      return;
    }

    // Browser ka install prompt show karo
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log("User install choice:", outcome); // 'accepted' ya 'dismissed'

    // Ek baar use ho gaya to clean up
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  // Agar installable nahi hai ya event nahi mila, kuch mat dikhayo
  if (!showPopup) return null;

  // Simple popup UI
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "16px 20px",
          borderRadius: "8px",
          maxWidth: "320px",
          width: "90%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Download the app</h3>
        <p style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px" }}>
          Fast access ke liye abhi install karein aur home screen se open karein.
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Not now
          </button>
          <button
            onClick={handleInstallClick}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Download the app now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPopup;
