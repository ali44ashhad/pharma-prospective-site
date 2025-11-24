// import React, { useState } from 'react';
// import PendingRequests from '../components/admin/PendingRequests';
// import UserManagement from '../components/admin/UserManagement';
// import ProductFileUpload from '../components/admin/ProductFileUpload';
// import UploadedDocuments from '../components/admin/UploadedDocuments';
// import AdminSidebar from '../components/admin/AdminSidebar';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('requests');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'requests':
//         return <PendingRequests />;
//       case 'users':
//         return <UserManagement />;
//       case 'upload':
//         return <ProductFileUpload />;
//       case 'documents':
//         return <UploadedDocuments />;
//       default:
//         return <PendingRequests />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-64">
//             <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import PendingRequests from '../components/admin/PendingRequests';
import UserManagement from '../components/admin/UserManagement';
import ProductFileUpload from '../components/admin/ProductFileUpload';
import UploadedDocuments from '../components/admin/UploadedDocuments';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');

  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return <PendingRequests />;
      case 'users':
        return <UserManagement />;
      case 'upload':
        return <ProductFileUpload />;
      case 'documents':
        return <UploadedDocuments />;
      default:
        return <PendingRequests />;
    }
  };

  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
