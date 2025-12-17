import React from 'react';
import { Home, FileText, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                <Menu size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">FoodDelivery</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="flex flex-col items-center text-gray-500 hover:text-primary-500 transition-colors gap-1">
            <Home size={20} />
            <span className="text-xs font-medium">TRANG CHỦ</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-500 hover:text-primary-500 transition-colors gap-1">
            <FileText size={20} />
            <span className="text-xs font-medium">ĐƠN HÀNG</span>
          </a>
          <a href="#" className="flex flex-col items-center text-primary-500 gap-1">
            <User size={20} />
            <span className="text-xs font-medium">TÔI</span>
          </a>
        </nav>
        
        <button className="md:hidden text-gray-500">
            <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;