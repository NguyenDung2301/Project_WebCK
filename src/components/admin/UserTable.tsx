
import React, { useState, useMemo } from 'react';
import { User, Status } from '../../types';
import { Search, Edit2, Trash2, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge, BadgeVariant } from '../common/Badge';

interface UserTableProps {
  users: User[];
  totalUsers: number;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  totalUsers: initialTotalUsers, 
  onView, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Tăng itemsPerPage để hiển thị nhiều hơn, lấp đầy trang theo yêu cầu
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Fixed: handle optional status property from User interface
  const getStatusBadge = (status?: Status) => {
    const safeStatus = status || 'Active';
    const variants: Record<Status, BadgeVariant> = {
      Active: 'success',
      Inactive: 'neutral',
      Banned: 'danger',
    };
    const labels: Record<Status, string> = {
      Active: 'Đang hoạt động',
      Inactive: 'Không hoạt động',
      Banned: 'Bị khóa',
    };
    return <Badge variant={variants[safeStatus]} className="font-bold">{labels[safeStatus]}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    let variant: BadgeVariant = 'neutral';
    if (role === 'Admin' || role === 'admin') variant = 'purple';
    if (role === 'Driver' || role === 'driver') variant = 'blue';
    return <Badge variant={variant} className="capitalize font-bold">{role}</Badge>;
  }

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/30">
            <tr>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">User ID</th>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Họ và tên</th>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email</th>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role</th>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ngày đăng ký</th>
              <th scope="col" className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Trạng thái</th>
              <th scope="col" className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                // Fixed: Property 'id' does not exist on type 'User', using '_id'
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-400 font-medium font-mono">{user._id}</td>
                  <td 
                    className="px-8 py-5 whitespace-nowrap cursor-pointer group"
                    onClick={() => onView(user)}
                  >
                      <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs mr-4 border border-white shadow-sm group-hover:scale-110 transition-transform">
                              {user.name.charAt(0)}
                          </div>
                          <div className="text-sm font-black text-gray-900 group-hover:text-primary-600 transition-colors">{user.name}</div>
                      </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{user.email}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                  </td>
                  {/* Fixed: Property 'joinDate' does not exist on type 'User', using 'createdAt' instead */}
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-400 font-medium">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    {/* Fixed: Pass user.status which is now recognized due to interface update */}
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                          onClick={() => onEdit(user)}
                          className="p-2.5 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
                          title="Chỉnh sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                          onClick={() => onToggleStatus(user)}
                          // Fixed: Logic for status check with fallback for optional field
                          className={`p-2.5 rounded-full transition-all ${(user.status || 'Active') === 'Banned' ? 'text-red-500 hover:bg-red-50' : 'text-gray-300 hover:text-primary-500 hover:bg-orange-50'}`}
                          title={(user.status || 'Active') === 'Banned' ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                      >
                        {(user.status || 'Active') === 'Banned' ? <Unlock size={18} /> : <Lock size={18} />}
                      </button>
                      <button 
                          onClick={() => onDelete(user)}
                          className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-8 py-20 text-center text-gray-500">
                   <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 p-6 rounded-full mb-4">
                          <Search size={32} className="text-gray-200"/>
                      </div>
                      <p className="text-lg font-black text-gray-900">Không tìm thấy kết quả</p>
                      <p className="text-sm text-gray-400 mt-2">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modern Pagination Section - Only visible if more than 1 page */}
      {totalPages > 1 && (
        <div className="bg-gray-50/30 px-8 py-5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Hiển thị {Math.min(paginatedUsers.length, itemsPerPage)} trên {users.length} người dùng
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                 {getPageNumbers().map((page, index) => (
                   <React.Fragment key={index}>
                     {page === '...' ? (
                       <span className="text-gray-300 px-1 font-black">...</span>
                     ) : (
                       <button 
                         onClick={() => handlePageChange(page as number)}
                         className={`h-10 w-10 flex items-center justify-center rounded-full font-black text-xs transition-all ${
                           currentPage === page 
                             ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' 
                             : 'bg-white text-gray-400 hover:text-primary-600 border border-gray-100'
                         }`}
                       >
                         {page}
                       </button>
                     )}
                   </React.Fragment>
                 ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 hover:text-primary-600 hover:border-primary-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
        </div>
      )}
    </div>
  );
};
