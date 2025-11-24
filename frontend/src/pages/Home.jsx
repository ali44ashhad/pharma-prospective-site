// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Home = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Secure Product Access
//               <span className="block text-primary-200">Management System</span>
//             </h1>
//             <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
//               Access your reports, analysis, and insights securely. 
//               Request, manage, and view your documents with ease.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {!isAuthenticated ? (
//                 <>
//                   <Link to="/login" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
//                     User Login
//                   </Link>
//                   <Link to="/admin/login" className="btn bg-primary-500 text-white hover:bg-primary-400 px-8 py-3 text-lg">
//                     Admin Login
//                   </Link>
//                 </>
//               ) : (
//                 <Link to="/dashboard" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
//                   Go to Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our Products
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Comprehensive reports and analysis for informed decision making
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             {[
//               { icon: '📊', name: 'Reports', desc: 'Detailed analytical reports' },
//               { icon: '🔍', name: 'Analysis', desc: 'In-depth market analysis' },
//               { icon: '🧪', name: 'Testing', desc: 'Quality testing results' },
//               { icon: '💰', name: 'Price Benchmark', desc: 'Competitive pricing data' },
//               { icon: '💡', name: 'Insights', desc: 'Market trends and insights' }
//             ].map((product, index) => (
//               <div key={index} className="text-center p-6">
//                 <div className="text-4xl mb-4">{product.icon}</div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
//                 <p className="text-gray-600 text-sm">{product.desc}</p>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link to="/products" className="btn btn-primary px-8 py-3 text-lg">
//               View All Products
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { step: '1', title: 'Browse Products', desc: 'Explore available reports and analysis by country' },
//               { step: '2', title: 'Request Access', desc: 'Submit access request with your purpose' },
//               { step: '3', title: 'Get Approved', desc: 'Receive credentials after admin approval' }
//             ].map((item, index) => (
//               <div key={index} className="text-center p-8 card">
//                 <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
// import Molecule3D from '../components/common/Molecule3D';  
import { Molecule3D } from '../components/common/Molecule3D';


const Home = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // short LoadingSpinner so hero animations & 3D feel smooth; adjust ms if you want
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen relative text-white">
      {/* 3D Background Canvas (subtle, non-interactive) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Molecule3D />
          {/* If you have FloatingParticles component, uncomment below and import it */}
          {/* <FloatingParticles count={30} /> */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Secure Product Access
              </span>
              <span className="block text-cyan-200 text-2xl md:text-3xl mt-2 font-semibold">
                Management System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access your reports, analysis, and insights securely.
              Request, manage, and view your documents with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="inline-block">
                    <button
                      className="px-8 py-3 rounded-2xl font-semibold bg-white text-slate-900 shadow-2xl shadow-cyan-500/20 transform-gpu hover:-translate-y-1 transition-transform"
                      type="button"
                    >
                      User Login
                    </button>
                  </Link>

                  <Link to="/admin/login" className="inline-block">
                    <button
                      className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 transform-gpu hover:scale-[1.02] transition-transform"
                      type="button"
                    >
                      Admin Login
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="inline-block">
                  <button
                    className="px-8 py-3 rounded-2xl font-semibold bg-white text-slate-900 shadow-2xl shadow-cyan-500/20 transform-gpu hover:-translate-y-1 transition-transform"
                    type="button"
                  >
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products / Features Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Products</h2>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              Comprehensive reports and analysis for informed decision making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: '📊', name: 'Reports', desc: 'Detailed analytical reports' },
              { icon: '🔍', name: 'Analysis', desc: 'In-depth market analysis' },
              { icon: '🧪', name: 'Testing', desc: 'Quality testing results' },
              { icon: '💰', name: 'Price Benchmark', desc: 'Competitive pricing data' },
              { icon: '💡', name: 'Insights', desc: 'Market trends and insights' }
            ].map((product, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_10px_30px_-14px_rgba(42,174,230,0.2)]">
                  <span className="text-3xl">{product.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-cyan-200 text-sm">{product.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <button
                className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 transform-gpu hover:scale-[1.02] transition-transform"
                type="button"
              >
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Browse Products', desc: 'Explore available reports and analysis by country' },
              { step: '2', title: 'Request Access', desc: 'Submit access request with your purpose' },
              { step: '3', title: 'Get Approved', desc: 'Receive credentials after admin approval' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-cyan-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
