import React from 'react';
import { Search, Home, FileText, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-800 tracking-tight">FoodDelivery</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full bg-orange-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-200 transition-shadow text-sm"
              placeholder="Tìm món ăn, quán ăn..."
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <NavItem icon={<Home className="w-5 h-5" />} label="Trang chủ" />
          <NavItem icon={<FileText className="w-5 h-5" />} label="Đơn hàng" active />
          <NavItem icon={<User className="w-5 h-5" />} label="Tôi" />
        </nav>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <div className={`flex flex-col items-center cursor-pointer group ${active ? 'text-orange-500' : 'text-gray-500 hover:text-gray-900'}`}>
      <div className={`mb-1 transition-transform group-hover:scale-110 ${active ? 'text-orange-500' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </div>
  );
};