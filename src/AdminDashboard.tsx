
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Button } from './components/Button';
import { Search, Plus } from 'lucide-react';
import { useUserManagement } from './hooks/useUserManagement';
import { UserTable } from './components/admin/UserTable';
import { AdminModals } from './components/admin/AdminModals';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // Use custom hook to handle business logic
  const {
    activeTab,
    setActiveTab,
    users, // used for length counts
    filteredUsers,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    modal,
    openModal,
    closeModal,
    handleDeleteUser,
    handleToggleStatus,
    handleSaveUser
  } = useUserManagement();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      {/* Main Content Layout */}
      <div className="md:ml-64 transition-all duration-300">
        
        {/* Top Navigation / Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Người dùng</h1>
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center text-sm text-gray-500">
                <span className="mr-2">Hôm nay:</span>
                <span className="font-medium text-primary-600">{new Date().toLocaleDateString('vi-VN')}</span>
             </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 max-w-7xl mx-auto">
          <p className="text-gray-500 mb-6">Xem, chỉnh sửa và quản lý tài khoản khách hàng và tài xế.</p>

          {/* Action Bar (Search & Filter) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm người dùng theo tên, email, hoặc số điện thoại..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
                <select 
                    className="block w-full pl-3 pr-8 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg border bg-white text-gray-900 shadow-sm"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="All">Tất cả vai trò</option>
                    <option value="User">Khách hàng</option>
                    <option value="Driver">Tài xế</option>
                    <option value="Admin">Admin</option>
                </select>
                <Button 
                    onClick={() => openModal('ADD')} 
                    icon={<Plus size={18} />}
                    className="whitespace-nowrap shadow-orange-200 shadow-md"
                >
                    Thêm người dùng
                </Button>
            </div>
          </div>

          {/* User Table Component */}
          <UserTable 
            users={filteredUsers}
            totalUsers={users.length}
            onView={(user) => openModal('VIEW', user)}
            onEdit={(user) => openModal('EDIT', user)}
            onDelete={(user) => openModal('DELETE', user)}
            onToggleStatus={handleToggleStatus}
          />

        </main>
      </div>

      {/* Admin Modals Component (Handles Add, Edit, View, Delete) */}
      <AdminModals 
        modal={modal}
        onClose={closeModal}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      />
      
    </div>
  );
};