
import React from 'react';
import { User, Status } from '../../types';
import { Search, Edit2, Trash2, Lock, Unlock } from 'lucide-react';

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
  totalUsers, 
  onView, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  
  const renderStatusBadge = (status: Status) => {
    const styles = {
      Active: 'bg-green-100 text-green-700 border border-green-200',
      Inactive: 'bg-gray-100 text-gray-700 border border-gray-200',
      Banned: 'bg-red-100 text-red-700 border border-red-200',
    };
    const labels = {
      Active: 'Đang hoạt động',
      Inactive: 'Không hoạt động',
      Banned: 'Bị khóa',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Họ và tên</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày đăng ký</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.id}</td>
                  <td 
                    className="px-6 py-4 whitespace-nowrap cursor-pointer group"
                    onClick={() => onView(user)}
                  >
                      <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs mr-3 border border-primary-200 group-hover:border-primary-400 transition-colors">
                              {user.name.charAt(0)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{user.name}</div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium capitalize
                          ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'Driver' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {user.role}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                          onClick={() => onEdit(user)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="Chỉnh sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                          onClick={() => onToggleStatus(user)}
                          className={`transition-colors ${user.status === 'Banned' ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-primary-600'}`}
                          title={user.status === 'Banned' ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                      >
                        {user.status === 'Banned' ? <Unlock size={18} /> : <Lock size={18} />}
                      </button>
                      <button 
                          onClick={() => onDelete(user)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
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
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                   <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                          <Search size={24} className="text-gray-400"/>
                      </div>
                      <p className="text-lg font-medium text-gray-900">Không tìm thấy kết quả</p>
                      <p className="text-sm mt-1">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Mockup */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{users.length}</span> of <span className="font-medium">{totalUsers}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                &larr;
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};