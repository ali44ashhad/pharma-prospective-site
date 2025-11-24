// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/products/${product._id}`);
//   };

//   const getProductIcon = (productName) => {
//     const icons = {
//       report: '📊',
//       analysis: '🔍',
//       testing: '🧪',
//       price_benchmark: '💰',
//       insights: '💡'
//     };
//     return icons[productName] || '📁';
//   };

//   const formatProductName = (name) => {
//     return name.split('_').map(word => 
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');
//   };

//   return (
//     <div 
//       className="card p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
//       onClick={handleClick}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className="text-3xl">{getProductIcon(product.name)}</div>
//         <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
//       </div>
      
//       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//         {formatProductName(product.name)}
//       </h3>
      
//       <p className="text-gray-600 text-sm leading-relaxed mb-4">
//         {product.description}
//       </p>
      
//       <div className="flex items-center justify-between">
//         <span className="text-primary-600 text-sm font-medium">View Details</span>
//         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  const getProductIcon = (productName) => {
    const icons = {
      report: '📊',
      analysis: '🔍',
      testing: '🧪',
      price_benchmark: '💰',
      insights: '💡'
    };
    return icons[productName] || '📁';
  };

  const formatProductName = (name) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 cursor-pointer transition-transform transform-gpu hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(2,6,23,0.6),0_10px_30px_-12px_rgba(42,174,230,0.08)]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="mx-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-2xl shadow-sm">
          {getProductIcon(product.name)}
        </div>
        <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-sm" />
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
        {formatProductName(product.name)}
      </h3>

      <p className="text-cyan-200 text-sm leading-relaxed mb-4 line-clamp-3">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          View Details
        </span>

        <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default ProductCard;
