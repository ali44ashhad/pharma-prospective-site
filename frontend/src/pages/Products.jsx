// import React, { useState, useEffect } from 'react';
// import ProductGrid from '../components/products/ProductGrid';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { productService } from '../services/productService';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const productsData = await productService.getAllProducts();
//       setProducts(productsData);
//     } catch (error) {
//       setError('Failed to load products. Please try again later.');
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" text="Loading products..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">❌</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button 
//             onClick={fetchProducts}
//             className="btn btn-primary"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Choose from our range of specialized reports and analysis. 
//             Each product offers comprehensive insights for different countries and markets.
//           </p>
//         </div>
        
//         {/* Products Grid */}
//         <ProductGrid products={products} />
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productService } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  /* Loading state */
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
  //       <LoadingSpinner size="lg" text="Loading products..." />
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
          <span className="ml-3 text-cyan-200">Loading...</span>
        </div>
      </div>
    );
  }

  /* Error state */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="text-center rounded-2xl p-10 bg-white/5 backdrop-blur-md border border-white/10">
          <div className="text-red-400 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-cyan-200 mb-6">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:brightness-105 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* Main layout */
  return (
    <div className="min-h-screen   py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-cyan-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Choose from our range of specialized reports & analysis.  
            Each product includes deep insights for different countries & markets.
          </p>
        </div>
        
        {/* Products Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Products;
