// import React from 'react';
// import { 
//   FaTachometerAlt, 
//   FaUsers, 
//   FaFileUpload, 
//   FaClipboardList,
//   FaSignOutAlt,
//   FaFilePdf
// } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const AdminSidebar = ({ activeTab, onTabChange }) => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: 'requests', label: 'Pending Requests', icon: FaClipboardList },
//     { id: 'users', label: 'User Management', icon: FaUsers },
//     { id: 'upload', label: 'Upload Files', icon: FaFileUpload },
//     { id: 'documents', label: 'Uploaded Documents', icon: FaFilePdf },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <div className="card p-6">
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
//         <p className="text-gray-600 text-sm mt-1">Manage system access</p>
//       </div>

//       <nav className="space-y-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeTab === item.id;
          
//           return (
//             <button
//               key={item.id}
//               onClick={() => onTabChange(item.id)}
//               className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
//                 isActive
//                   ? 'bg-primary-50 text-primary-700 border border-primary-200'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           <FaSignOutAlt className="w-5 h-5" />
//           <span className="font-medium">Sign Out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import React from 'react';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaFileUpload, 
  FaClipboardList,
  FaSignOutAlt,
  FaFilePdf
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeTab, onTabChange }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'requests', label: 'Pending Requests', icon: FaClipboardList },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'upload', label: 'Upload Files', icon: FaFileUpload },
    { id: 'documents', label: 'Uploaded Documents', icon: FaFilePdf },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-cyan-200 text-sm mt-1">Manage system access</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-700/30 to-blue-700/20 text-white border border-cyan-600/20 shadow-[0_8px_24px_-12px_rgba(42,174,230,0.12)]'
                  : 'text-cyan-100 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-300' : 'text-cyan-200'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-white/6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 text-red-500 hover:bg-red-50/10 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-medium text-white/90">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
