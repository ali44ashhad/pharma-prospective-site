import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-xl w-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)]">
        
        <div className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-lg text-cyan-200 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:brightness-105 transition"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
