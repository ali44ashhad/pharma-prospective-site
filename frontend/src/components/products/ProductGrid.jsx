// import React from 'react';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ products }) => {
//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-gray-400 text-6xl mb-4">📭</div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Available</h3>
//         <p className="text-gray-600">Check back later for new products.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;

import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="text-cyan-300 text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Products Available</h3>
        <p className="text-cyan-200">Check back later for new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
