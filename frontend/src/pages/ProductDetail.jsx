// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import CountryList from '../components/products/CountryList';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { productService } from '../services/productService';
// import { formatProductName } from '../utils/helpers';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProductDetails();
//   }, [productId]);

//   const fetchProductDetails = async () => {
//     try {
//       setLoading(true);
//       const [countriesData, productsData] = await Promise.all([
//         productService.getProductCountries(productId),
//         productService.getAllProducts()
//       ]);
      
//       const currentProduct = productsData.find(p => p._id === productId);
//       setProduct(currentProduct);
//       setCountries(countriesData);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       navigate('/products');
//     } finally {
//       setLoading(false);
//     }
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

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" text="Loading product details..." />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-gray-400 text-6xl mb-4">❓</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
//           <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
//           <button 
//             onClick={() => navigate('/products')}
//             className="btn btn-primary"
//           >
//             Back to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button 
//             onClick={() => navigate('/products')}
//             className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span>Back to Products</span>
//           </button>

//           <div className="card p-8">
//             <div className="flex items-start space-x-6">
//               <div className="text-5xl">{getProductIcon(product.name)}</div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                   {formatProductName(product.name)}
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-4">
//                   {product.description}
//                 </p>
//                 <div className="flex items-center space-x-4 text-sm text-gray-500">
//                   <span>Available in {countries.length} countries</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Countries Section */}
//         <div className="card p-8">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Countries</h2>
//             <p className="text-gray-600">
//               Select a country to view available documents and request access
//             </p>
//           </div>

//           {countries.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-6xl mb-4">🌍</div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Countries Available</h3>
//               <p className="text-gray-600">This product is not available in any countries yet.</p>
//             </div>
//           ) : (
//             <CountryList countries={countries} productId={productId} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountryList from '../components/products/CountryList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productService } from '../services/productService';
import { formatProductName } from '../utils/helpers';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const [countriesData, productsData] = await Promise.all([
        productService.getProductCountries(productId),
        productService.getAllProducts()
      ]);
      
      const currentProduct = productsData.find(p => p._id === productId);
      setProduct(currentProduct);
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching product details:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <LoadingSpinner size="lg" text="Loading product details..." />
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center rounded-2xl p-10 bg-white/5 backdrop-blur-md border border-white/10">
          <div className="text-cyan-300 text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-cyan-200 mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:brightness-105 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center space-x-2 text-cyan-200 hover:text-white mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Products</span>
          </button>

          <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-md border border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-4xl shadow-sm">
                {getProductIcon(product.name)}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  {formatProductName(product.name)}
                </h1>
                <p className="text-cyan-200 text-lg mb-4">
                  {product.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-cyan-200">
                  <span>Available in <strong className="text-white">{countries.length}</strong> countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countries Section */}
        <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-md border border-white/10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Available Countries</h2>
            <p className="text-cyan-200">
              Select a country to view available documents and request access
            </p>
          </div>

          {countries.length === 0 ? (
            <div className="text-center py-12 rounded-lg bg-white/6">
              <div className="text-cyan-200 text-6xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-white mb-2">No Countries Available</h3>
              <p className="text-cyan-200">This product is not available in any countries yet.</p>
            </div>
          ) : (
            <CountryList countries={countries} productId={productId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
