// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await login(formData.email, formData.password);
      
//       if (result.success) {
//         toast.success('Login successful!');
//         navigate('/dashboard');
//       } else {
//         toast.error(result.message || 'Login failed');
//       }
//     } catch (error) {
//       toast.error('An error occurred during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">P</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{' '}
//           <Link to="/products" className="font-medium text-primary-600 hover:text-primary-500">
//             browse products without an account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="card py-8 px-4 sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn btn-primary py-3"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <span className="text-gray-500">
//                   Contact admin for access
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center  py-12 sm:px-6 lg:px-8">
      
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-600/30">
          <span className="text-white font-bold text-2xl">P</span>
        </div>

        <h2 className="mt-6 text-3xl font-extrabold text-white drop-shadow-md">
          Sign in to your account
        </h2>

        <p className="mt-2 text-sm text-cyan-300">
          Or{' '}
          <Link
            to="/products"
            className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110"
          >
            browse products without an account
          </Link>
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl p-8 sm:p-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/40">

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-cyan-200 mb-1 block">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-cyan-200 mb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-700/40 hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-cyan-200">
                Don't have an account?{" "}
                <span className="text-cyan-300">Contact admin for access</span>
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
