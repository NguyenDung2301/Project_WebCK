import React from 'react';
import { LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, LogOut } from 'lucide-react';
import { SidebarProps } from '@/types/admin';
import { getAdminInfo } from '@/services/authService';

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const adminInfo = getAdminInfo();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Quản lý Người dùng', icon: <Users size={20} /> },
    { id: 'orders', label: 'Quản lý Đơn hàng', icon: <ShoppingBag size={20} /> },
    { id: 'reports', label: 'Báo cáo', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10 hidden md:flex shadow-sm">
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
            {adminInfo.email.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{adminInfo.name}</p>
            <p className="text-xs text-gray-500 truncate">{adminInfo.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-red-50 text-[#EE501C] shadow-sm ring-1 ring-red-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-[#EE501C]' : 'text-gray-400 group-hover:text-gray-500'} mr-3`}>
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
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

