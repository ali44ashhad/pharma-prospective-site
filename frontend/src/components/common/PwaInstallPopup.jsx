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
        <h3 style={{ marginTop: 0, marginBottom: "8px", color: "#000" }}>
          Download the app
        </h3>
        <p
          style={{
            marginTop: 0,
            marginBottom: "16px",
            fontSize: "14px",
            color: "#111",
          }}
        >
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
