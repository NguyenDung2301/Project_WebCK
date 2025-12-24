import React from 'react';
import { Button } from '../../components/common/Button';
import { Search, Plus } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { UserTable } from '../../components/admin/UserTable';
import { AdminModals } from '../../components/admin/AdminModals';
import { AdminLayout } from '../../layouts/AdminLayout';

export const UsersManagement: React.FC = () => {
  // Use custom hook to handle business logic
  const {
    users,
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
    handleSaveUser,
    loading,
    error,
  } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE501C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Quản lý Người dùng">
        {/* Content Body */}
        <div className="space-y-6 animate-in fade-in duration-500">
          
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Hệ thống quản trị trung tâm</h2>
              <p className="text-gray-600">Xem, chỉnh sửa và quản lý tài khoản users và shippers</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Action Bar (Search & Filter) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm người dùng theo tên, email, hoặc số điện thoại..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE501C] focus:border-[#EE501C] sm:text-sm transition-shadow shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
                <select 
                    className="block w-full pl-3 pr-8 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-[#EE501C] focus:border-[#EE501C] sm:text-sm rounded-lg border bg-white text-gray-900 shadow-sm"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="All">Tất cả vai trò</option>
                    <option value="User">User</option>
                    <option value="Shipper">Shipper</option>
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
        </div>

        {/* Admin Modals Component (Handles Add, Edit, View, Delete) */}
        <AdminModals 
          modal={modal}
          onClose={closeModal}
          onSave={handleSaveUser}
          onDelete={handleDeleteUser}
          existingUsers={users.map(u => ({ id: u.id, email: u.email, phone: u.phone }))}
        />
    </AdminLayout>
  );
};
