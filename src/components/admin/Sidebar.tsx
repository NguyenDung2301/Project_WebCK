
import React from 'react';
import { LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { Logo } from '../common/Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onHome?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onHome, isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Quản lý Người dùng', icon: <Users size={20} /> },
    { id: 'orders', label: 'Quản lý Đơn hàng', icon: <ShoppingBag size={20} /> },
    { id: 'reports', label: 'Báo cáo', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand - Updated to use synchronized Logo component */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <Logo onClick={onHome} className="scale-90 origin-left" />
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          <p className="px-4 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Danh mục chính</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768 && onClose) onClose();
              }}
              className={`w-full flex items-center px-4 py-4 text-sm font-bold rounded-2xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 translate-x-1'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={cn(
                "mr-3 transition-colors",
                activeTab === item.id ? "text-white" : "text-gray-400 group-hover:text-primary-500"
              )}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Log Out */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-4 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
};
