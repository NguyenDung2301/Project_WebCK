
import React, { KeyboardEvent } from 'react';
import { Home, ClipboardList, User, Search, ChevronLeft } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  onLogoClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
  onBack: () => void;
  currentScreen: Screen;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (term: string) => void;
  onSearchFocus: () => void;
  showBackButton: boolean;
}

const BurgerIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4 11C4 7.13401 7.13401 4 11 4H13C16.866 4 20 7.13401 20 11H4Z" 
      fill="currentColor"
    />
    <rect x="4" y="13" width="16" height="2" rx="1" fill="currentColor" />
    <path 
      d="M4 17H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V17Z" 
      fill="currentColor"
    />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ 
  onLogoClick,
  onOrdersClick,
  onProfileClick,
  onBack,
  currentScreen, 
  searchValue, 
  onSearchChange, 
  onSearchSubmit,
  onSearchFocus,
  showBackButton
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearchSubmit(searchValue);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Quay lại"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          <div 
            onClick={onLogoClick}
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="w-10 h-10 bg-[#EE501C] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform">
              <BurgerIcon className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">FoodDelivery</span>
          </div>
        </div>

        {(currentScreen === 'RESULTS' || currentScreen === 'ORDERS' || currentScreen === 'PROFILE') && (
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm món ăn, quán ăn..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={onSearchFocus}
                className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-100 focus:bg-white outline-none text-sm transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EE501C] w-4 h-4" />
            </div>
          </div>
        )}

        <nav className="flex items-center gap-6 md:gap-8 shrink-0">
          <button onClick={onLogoClick} className="flex flex-col items-center gap-1 group">
            <Home className={`w-5 h-5 transition-all ${currentScreen === 'HOME' ? 'text-[#EE501C] scale-110' : 'text-gray-400 group-hover:text-[#EE501C]'}`} />
            <span className={`text-[10px] font-medium transition-colors ${currentScreen === 'HOME' ? 'text-[#EE501C]' : 'text-gray-700'}`}>TRANG CHỦ</span>
          </button>
          <button onClick={handleOrdersClick} className="flex flex-col items-center gap-1 group">
            <ClipboardList className={`w-5 h-5 transition-all ${currentScreen === 'ORDERS' ? 'text-[#EE501C] scale-110' : 'text-gray-400 group-hover:text-[#EE501C]'}`} />
            <span className={`text-[10px] font-medium transition-colors ${currentScreen === 'ORDERS' ? 'text-[#EE501C]' : 'text-gray-700'}`}>ĐƠN HÀNG</span>
          </button>
          <button onClick={onProfileClick} className="flex flex-col items-center gap-1 group">
            <User className={`w-5 h-5 transition-all ${currentScreen === 'PROFILE' ? 'text-[#EE501C] scale-110' : 'text-gray-400 group-hover:text-[#EE501C]'}`} />
            <span className={`text-[10px] font-medium transition-colors ${currentScreen === 'PROFILE' ? 'text-[#EE501C]' : 'text-gray-700'}`}>TÔI</span>
          </button>
        </nav>
      </div>
    </header>
  );

  function handleOrdersClick() {
    onOrdersClick();
  }
};

export default Header;
