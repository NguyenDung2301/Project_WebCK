import React from 'react';
import { LayoutDashboard, Users, Store, ShoppingBag, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAdminInfo } from '../../services/authService';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const adminInfo = getAdminInfo();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on current path
  const currentPath = location.pathname;
  
  const menuItems = [
    { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', path: '/admin/users', label: 'Quản lý Người dùng', icon: <Users size={20} /> },
    { id: 'restaurants', path: '/admin/restaurants', label: 'Quản lý Nhà hàng', icon: <Store size={20} /> },
    { id: 'orders', path: '/admin/orders', label: 'Quản lý Đơn hàng', icon: <ShoppingBag size={20} /> },
  ];

  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-20 hidden md:flex shadow-sm">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-[#EE501C] rounded-lg flex items-center justify-center text-white font-bold mr-3">
          FD
        </div>
        <span className="text-xl font-bold text-[#EE501C]">FoodDelivery</span>
      </div>

      {/* Admin Profile Small */}
      <div className="p-6 pb-2">
        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#EE501C] font-bold text-sm">
            {adminInfo.email ? adminInfo.email.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{adminInfo.name || 'Admin'}</p>
            <p className="text-xs text-gray-500 truncate">{adminInfo.email || 'admin@food.com'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <div className="px-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Danh mục chính</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-[#EE501C] text-white shadow-md shadow-orange-200'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`mr-3 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};