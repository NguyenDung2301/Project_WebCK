import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/common/Button';
import { Search, Plus } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { UserTable } from '@/components/admin/UserTable';
import { AdminModals } from '@/components/admin/AdminModals';
import { logout } from '@/services/authService';
import { formatDateVN } from '@/utils';

export const UsersManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // Use custom hook to handle business logic
  const {
    activeTab,
    setActiveTab,
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      {/* Main Content Layout */}
      <div className="md:ml-64 transition-all duration-300">
        
        {/* Top Navigation / Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#EE501C]">Quản lý Người dùng</h1>
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center text-sm text-gray-500">
                <span className="mr-2">Hôm nay:</span>
                <span className="font-medium text-[#EE501C]">{formatDateVN(new Date())}</span>
             </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span>{error}</span>
                  <button 
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      if (token) {
                        try {
                          const parts = token.split('.');
                          if (parts.length === 3) {
                            const payload = JSON.parse(atob(parts[1]));
                            const hasRole = 'role' in payload;
                            const isAdmin = payload.role === 'admin';
                            const exp = payload.exp ? new Date(payload.exp * 1000) : null;
                            const isExpired = exp ? exp < new Date() : false;
                            
                            console.log('📋 Token Info:');
                            console.log('  - Has role field:', hasRole);
                            console.log('  - Role value:', payload.role || 'undefined');
                            console.log('  - Is admin:', isAdmin);
                            console.log('  - Expires at:', exp || 'N/A');
                            console.log('  - Is expired:', isExpired);
                            console.log('  - User ID:', payload.user_id);
                            console.log('  - Email:', payload.email);
                            
                            if (!hasRole || !isAdmin) {
                              alert('⚠️ Token không có role admin. Vui lòng đăng xuất và đăng nhập lại!\n\nXem Console (F12) để biết thêm chi tiết.');
                            } else if (isExpired) {
                              alert('⚠️ Token đã hết hạn. Vui lòng đăng nhập lại!\n\nXem Console (F12) để biết thêm chi tiết.');
                            } else {
                              alert('✅ Token hợp lệ và có quyền admin!\n\nNếu vẫn lỗi, kiểm tra Console (F12) để xem chi tiết.');
                            }
                          }
                        } catch (e) {
                          console.error('Error checking token:', e);
                          alert('❌ Lỗi khi kiểm tra token. Xem Console (F12) để biết thêm chi tiết.');
                        }
                      }
                    }}
                    className="ml-4 text-sm underline hover:no-underline"
                  >
                    Kiểm tra Token (Xem Console F12)
                  </button>
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="ml-4 text-sm underline hover:no-underline"
                >
                  Tải lại trang
                </button>
              </div>
            </div>
          )}
          
          <p className="text-gray-500 mb-6">Xem, chỉnh sửa và quản lý tài khoản users và shippers</p>

          {/* Action Bar (Search & Filter) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
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

        </main>
      </div>

      {/* Admin Modals Component (Handles Add, Edit, View, Delete) */}
      <AdminModals 
        modal={modal}
        onClose={closeModal}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
        existingUsers={users.map(u => ({ id: u.id, email: u.email, phone: u.phone }))}
      />
      
    </div>
  );
};
