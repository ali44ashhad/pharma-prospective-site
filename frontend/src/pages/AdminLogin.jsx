// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const AdminLogin = () => {
//   const [adminSecret, setAdminSecret] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { adminLogin } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await adminLogin(adminSecret);
      
//       if (result.success) {
//         toast.success('Admin login successful!');
//         navigate('/admin');
//       } else {
//         toast.error(result.message || 'Invalid admin secret');
//       }
//     } catch (error) {
//       toast.error('An error occurred during admin login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">A</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Admin Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Enter admin secret key to access the admin panel
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="card py-8 px-4 sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="adminSecret" className="form-label">
//                 Admin Secret Key
//               </label>
//               <input
//                 id="adminSecret"
//                 name="adminSecret"
//                 type="password"
//                 required
//                 value={adminSecret}
//                 onChange={(e) => setAdminSecret(e.target.value)}
//                 className="form-input"
//                 placeholder="Enter admin secret key"
//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn bg-red-600 text-white hover:bg-red-700 py-3"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Admin Login'
//                 )}
//               </button>
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 <a href="/login" className="text-primary-600 hover:text-primary-500">
//                   ← Back to User Login
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [adminSecret, setAdminSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await adminLogin(adminSecret);

      if (result.success) {
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        toast.error(result.message || 'Invalid admin secret');
      }
    } catch (error) {
      toast.error('An error occurred during admin login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/40">
          <span className="text-white font-bold text-2xl">A</span>
        </div>

        <h2 className="mt-6 text-3xl font-extrabold text-white drop-shadow-md">
          Admin Login
        </h2>

        <p className="mt-2 text-sm text-cyan-300">
          Enter your secret admin key to continue
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

        <div className="rounded-2xl p-8 sm:p-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40">

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Secret Key */}
            <div>
              <label htmlFor="adminSecret" className="text-sm font-medium text-cyan-200 mb-1 block">
                Admin Secret Key
              </label>

              <input
                id="adminSecret"
                name="adminSecret"
                type="password"
                required
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Enter admin secret key"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-700/40 hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Admin Login'
                )}
              </button>
            </div>

            {/* Back Link */}
            <div className="text-center">
              <p className="text-sm text-cyan-200">
                <a
                  href="/login"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110"
                >
                  ← Back to User Login
                </a>
              </p>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
