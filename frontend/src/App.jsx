import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext'; // ADD THIS
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Team from './pages/Team';
import Cookies from './pages/Cookies';
import DataProtection from './pages/DataProtection';
import Help from './pages/Help';
import Status from './pages/Status';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <AppProvider> {/* ADD THIS */}
        <ScrollToTop/>
         <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white relative">
          <Header/>
          <main className="max-w-7xl mx-auto px-2 py-8"> 
   
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} /> 
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/team" element={<Team />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/data-protection" element={<DataProtection />} /> 
              <Route path="/help" element={<Help />} />  
              <Route path="/status" element={<Status />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected User Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </AppProvider> {/* ADD THIS */}
    </AuthProvider>
  );
}

export default App;