// import React, { useState, useEffect } from 'react';
// import { adminService } from '../../services/adminService';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { formatDate } from '../../utils/formatters';
// import { FaEnvelope, FaPhone, FaCalendar, FaKey } from 'react-icons/fa';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const usersData = await adminService.getAllUsers();
//       setUsers(usersData);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="card p-8">
//         <LoadingSpinner text="Loading users..." />
//       </div>
//     );
//   }

//   return (
//     <div className="card p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
//         <p className="text-gray-600">
//           Manage all system users and their access permissions
//         </p>
//       </div>

//       {users.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">👥</div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
//           <p className="text-gray-600">No users have been created yet.</p>
//         </div>
//       ) : (
//         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
//           <table className="min-w-full divide-y divide-gray-300">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   User
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
//                         <span className="text-primary-600 text-sm font-medium">
//                           {user.name?.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {user.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900 flex items-center space-x-1">
//                       <FaPhone className="w-3 h-3 text-gray-400" />
//                       <span>{user.contact_number || 'Not provided'}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       {user.temp_password ? (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                           <FaKey className="w-3 h-3 mr-1" />
//                           Temp Password
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           Active
//                         </span>
//                       )}
//                       {user.is_active === false && (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                           Inactive
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex items-center space-x-1">
//                       <FaCalendar className="w-3 h-3 text-gray-400" />
//                       <span>{formatDate(user.createdAt)}</span>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { FaEnvelope, FaPhone, FaCalendar, FaKey, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await adminService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This will remove all their permissions and access requests.`)) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // if (loading) {
  //   return (
  //     <div className="rounded-2xl bg-white/5 p-8">
  //       <LoadingSpinner text="Loading users..." />
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
  return (
    <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <p className="text-cyan-200">
          Manage all system users and their access permissions
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-cyan-200 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-white mb-2">No Users Found</h3>
          <p className="text-cyan-200">No users have been created yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-white/6">
            <thead className="bg-white/3">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/3 divide-y divide-white/6">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-cyan-200/10 rounded-full flex items-center justify-center">
                        <span className="text-cyan-300 text-sm font-medium">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-cyan-200">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-cyan-200 flex items-center space-x-1">
                      <FaPhone className="w-3 h-3 text-cyan-200" />
                      <span>{user.contact_number || 'Not provided'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.temp_password ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <FaKey className="w-3 h-3 mr-1" />
                          Temp Password
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                      {user.is_active === false && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200">
                    <div className="flex items-center space-x-1">
                      <FaCalendar className="w-3 h-3 text-cyan-200" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition"
                      title="Delete user"
                    >
                      <FaTrash className="w-3 h-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
