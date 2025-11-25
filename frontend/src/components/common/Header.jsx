 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Beaker, User, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/6 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_8px_30px_-12px_rgba(42,174,230,0.25)]"
            >
              <Beaker className="w-5 h-5 text-white" />
            </motion.div>

            <div className="leading-tight">
              <h1 className="text-lg font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                ProductAccess
              </h1>
              <p className="text-xs text-gray-300">Secure Research Portal</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-3">
            <Link
              to="/products"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all text-cyan-200 hover:text-white hover:bg-white/5"
            >
              <span className="font-medium">Products</span>
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all text-cyan-200 hover:text-white hover:bg-white/5"
                  >
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all text-cyan-200 hover:text-white hover:bg-white/5"
                  >
                    <span className="font-medium">Dashboard</span>
                  </Link>
                )}

                <div className="flex items-center space-x-3 ml-4">
                  <div className="hidden sm:flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white truncate max-w-[160px]">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/25 transition"
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-cyan-200 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/admin/login"
                  className="px-3 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-[0_8px_30px_-12px_rgba(42,174,230,0.25)] transition-transform hover:scale-[1.02]"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="p-2 rounded-md text-cyan-200 hover:bg-white/5 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <nav className="space-y-2">
              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-cyan-200 hover:text-white hover:bg-white/5 transition"
              >
                Products
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-cyan-200 hover:text-white hover:bg-white/5 transition"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-cyan-200 hover:text-white hover:bg-white/5 transition"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="px-4">
                    <div className="flex items-center space-x-3 text-cyan-100 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user?.name}</div>
                        <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl bg-white/6 text-white hover:bg-white/10 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-cyan-200 hover:text-white hover:bg-white/5 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-center"
                  >
                    Admin Login
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
