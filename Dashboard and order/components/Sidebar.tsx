
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard' as ViewType, icon: 'dashboard', label: 'Dashboard' },
    { id: 'users' as ViewType, icon: 'people', label: 'Quản lý Người dùng' },
    { id: 'orders' as ViewType, icon: 'shopping_bag', label: 'Quản lý Đơn hàng' },
    { id: 'restaurants' as ViewType, icon: 'store', label: 'Quản lý nhà hàng' },
    { id: 'settings' as ViewType, icon: 'settings', label: 'Cài đặt' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full transition-colors duration-200 fixed lg:static z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3 cursor-default">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-icons-round text-xl">lunch_dining</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">FoodDelivery</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-200">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-primary font-bold">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin Pro</p>
            <p className="text-xs text-gray-500 truncate">admin@fooddelivery.com</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
              currentView === item.id 
                ? 'bg-primary/10 text-primary font-semibold' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
            }`}
          >
            <span className={`material-icons-round text-[20px] mr-3 ${currentView === item.id ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
          <span className="material-icons-round text-[20px] mr-3">logout</span>
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
