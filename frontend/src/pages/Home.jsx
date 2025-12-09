
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useAuth } from '../contexts/AuthContext';
// import LoadingSpinner from '../components/common/LoadingSpinner'; 
// import { Molecule3D } from '../components/common/Molecule3D';


// const Home = () => {
//   const { isAuthenticated, user } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // short LoadingSpinner so hero animations & 3D feel smooth; adjust ms if you want
//     const t = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(t);
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen relative text-white">
//       {/* 3D Background Canvas (subtle, non-interactive) */}
//       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
//         <Canvas 
//           camera={{ position: [0, 0, 8] }}
//           gl={{ 
//             preserveDrawingBuffer: true,
//             antialias: true,
//             powerPreference: 'high-performance'
//           }}
//           onCreated={({ gl }) => {
//             gl.domElement.addEventListener('webglcontextlost', (e) => {
//               e.preventDefault();
//               console.log('WebGL context lost, attempting recovery...');
//             });
//             gl.domElement.addEventListener('webglcontextrestored', () => {
//               console.log('WebGL context restored');
//             });
//           }}
//         >
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} intensity={1} />
//           <Molecule3D />
//           <OrbitControls enableZoom={false} enablePan={false} autoRotate />
//         </Canvas>
//       </div>

//       {/* Hero Section */}
//       <section className=" ">
//         <div className="max-w-7xl mx-auto px-4 py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//               <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//                 Secure Product Access
//               </span>
//               <span className="block text-cyan-200 text-2xl md:text-3xl mt-2 font-semibold">
//                 Management System
//               </span>
//             </h1>

//             <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Access your reports, analysis, and insights securely.
//               Request, manage, and view your documents with ease.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {!isAuthenticated ? (
//                 <>
//                   <Link to="/login" className="inline-block">
//                     <button
//                       className="px-8 py-3 rounded-2xl font-semibold bg-white text-slate-900 shadow-2xl shadow-cyan-500/20 transform-gpu hover:-translate-y-1 transition-transform"
//                       type="button"
//                     >
//                       User Login
//                     </button>
//                   </Link>

//                   <Link to="/admin/login" className="inline-block">
//                     <button
//                       className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 transform-gpu hover:scale-[1.02] transition-transform"
//                       type="button"
//                     >
//                       Admin Login
//                     </button>
//                   </Link>
//                 </>
//               ) : (
//                 <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="inline-block">
//                   <button
//                     className="px-8 py-3 rounded-2xl font-semibold bg-white text-slate-900 shadow-2xl shadow-cyan-500/20 transform-gpu hover:-translate-y-1 transition-transform"
//                     type="button"
//                   >
//                     {user?.role === 'admin' ? 'Go to Admin Panel' : 'Go to Dashboard'}
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products / Features Section */}
//       <section className="py-20 bg-transparent relative z-10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Products</h2>
//             <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
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
//               <div
//                 key={index}
//                 className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_10px_30px_-14px_rgba(42,174,230,0.2)]">
//                   <span className="text-3xl">{product.icon}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
//                 <p className="text-cyan-200 text-sm">{product.desc}</p>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link to="/products">
//               <button
//                 className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 transform-gpu hover:scale-[1.02] transition-transform"
//                 type="button"
//               >
//                 View All Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-gray-900/20 relative z-10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { step: '1', title: 'Browse Products', desc: 'Explore available reports and analysis by country' },
//               { step: '2', title: 'Request Access', desc: 'Submit access request with your purpose' },
//               { step: '3', title: 'Get Approved', desc: 'Receive credentials after admin approval' }
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
//                 <p className="text-cyan-200">{item.desc}</p>
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
import { Molecule3D } from '../components/common/Molecule3D';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);

    // Detect touch device (mobile/tablet)
    if (typeof window !== 'undefined') {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    }

    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen relative text-white">

      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8] }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            powerPreference: 'high-performance'
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.log('WebGL context lost, attempting recovery...');
            });
            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
            });
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Molecule3D />

          {/* Enable rotation only on desktop, disabled on mobile to prevent scroll interference */}
          {!isTouch && (
            <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          )}
        </Canvas>
      </div>

      {/* Hero Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 py-20">
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
                    >
                      User Login
                    </button>
                  </Link>

                  <Link to="/admin/login" className="inline-block">
                    <button
                      className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 transform-gpu hover:scale-[1.02] transition-transform"
                    >
                      Admin Login
                    </button>
                  </Link>
                </>
              ) : (
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="inline-block">
                  <button
                    className="px-8 py-3 rounded-2xl font-semibold bg-white text-slate-900 shadow-2xl shadow-cyan-500/20 transform-gpu hover:-translate-y-1 transition-transform"
                  >
                    {user?.role === 'admin' ? 'Go to Admin Panel' : 'Go to Dashboard'}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4">
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
              <button className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25 hover:scale-[1.02] transition-transform">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
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
