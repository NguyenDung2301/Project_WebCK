
import React from 'react';
import { Page, ShipperProfile } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  profile: ShipperProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, profile }) => {
  const navItems = [
    { id: Page.Home, label: 'Trang chủ', icon: 'home' },
    { id: Page.History, label: 'Lịch sử', icon: 'history' },
    { id: Page.Pending, label: 'Đơn hàng cần xử lý', icon: 'list_alt' },
    { id: Page.Profile, label: 'Tôi', icon: 'person' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-surface-light dark:bg-surface-dark border-r border-[#e7d5cf] dark:border-[#3e2b25] flex flex-col justify-between shrink-0 transition-all duration-300 z-20">
      <div className="flex flex-col h-full p-4 gap-8">
        <div className="flex items-center gap-3 pb-4 border-b border-[#f3eae7] dark:border-[#3e2b25]">
          <div 
            className="shrink-0 size-12 rounded-full bg-center bg-no-repeat bg-cover border-2 border-primary" 
            style={{ backgroundImage: `url("${profile.avatar}")` }}
          />
          <div className="hidden lg:flex flex-col overflow-hidden">
            <h1 className="text-text-main dark:text-white text-base font-bold leading-normal truncate">{profile.name}</h1>
            <p className="text-text-secondary dark:text-gray-400 text-xs font-normal leading-normal truncate">{profile.email}</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-full transition-colors group w-full text-left ${
                currentPage === item.id 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 font-bold' 
                  : 'hover:bg-[#f3eae7] dark:hover:bg-[#3e2b25] text-text-main dark:text-gray-300 font-medium'
              }`}
            >
              <span 
                className={`material-symbols-outlined text-[24px]`}
                style={{ fontVariationSettings: currentPage === item.id ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <p className="hidden lg:block text-sm leading-normal">{item.label}</p>
            </button>
          ))}
        </nav>

        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-surface-light border border-[#e7d5cf] dark:border-[#3e2b25] hover:bg-gray-100 dark:bg-surface-dark dark:hover:bg-[#3e2b25] text-text-main dark:text-white text-sm font-bold leading-normal shadow-sm transition-all active:scale-95">
          <span className="truncate hidden lg:block mr-2">Đăng xuất</span>
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
