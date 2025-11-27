// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// 👇 ADD THIS LINE
import { registerSW } from 'virtual:pwa-register';

// 👇 Register service worker (PWA)
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, refresh to update.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
