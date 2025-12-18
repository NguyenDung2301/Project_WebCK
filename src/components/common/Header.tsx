
import React, { useState, useEffect, useRef } from 'react';
import { Search, Home, FileText, User, X, LogOut, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

interface HeaderProps {
  onHome: () => void;
  onSearch: (query: string) => void;
  onLogin?: () => void;
  onRegister?: () => void;
  onProfile?: () => void;
  onOrders?: () => void;
  initialSearchValue?: string;
  isOverlay?: boolean;
  showSearch?: boolean;
  autoFocusSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onHome, 
  onSearch, 
  onLogin, 
  onRegister,
  onProfile,
  onOrders,
  initialSearchValue = '',
  isOverlay = false,
  showSearch = false,
  autoFocusSearch = false
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(initialSearchValue);
  }, [initialSearchValue]);

  useEffect(() => {
    if (autoFocusSearch && showSearch && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoFocusSearch, showSearch]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleClear = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <header className={`${isOverlay ? 'bg-transparent' : 'bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm'} px-6 py-4 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        <div className="shrink-0 transition-transform hover:scale-105">
          <Logo onClick={onHome} className="scale-90 md:scale-100" />
        </div>
        
        <div className="flex-1 max-w-2xl mx-2 md:mx-4 relative h-12 md:h-14">
          {showSearch && (
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both"
              style={{ animationDelay: '200ms' }}
            >
              <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-primary-500 group-focus-within:scale-110 transition-all duration-300">
                <Search size={22} strokeWidth={3} />
              </div>
              <input 
                ref={inputRef}
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm món ngon, địa điểm..."
                className="w-full bg-[#f5eeeb] border-none rounded-full py-3 md:py-4 pl-12 md:pl-16 pr-10 md:pr-14 focus:bg-white focus:ring-4 focus:ring-primary-100/30 text-gray-800 placeholder-gray-400 text-sm md:text-base font-semibold transition-all shadow-sm"
              />
              {searchValue && (
                <button 
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200/50 text-gray-400 rounded-full transition-all"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              )}
            </form>
          )}
        </div>

        <nav className="flex items-center gap-4 md:gap-10">
          {isAuthenticated ? (
            <>
              <button onClick={onHome} className="flex flex-col items-center gap-1 group transition-all hover:-translate-y-0.5">
                 <Home size={22} className="text-gray-900 group-hover:text-primary-600 transition-colors" />
                 <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 group-hover:text-primary-600">TRANG CHỦ</span>
              </button>
              <button 
                onClick={onOrders}
                className="flex flex-col items-center gap-1 group transition-all hover:-translate-y-0.5"
              >
                <FileText size={22} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-hover:text-primary-600">ĐƠN HÀNG</span>
              </button>
              <div className="relative group/user">
                <button 
                  onClick={onProfile}
                  className="flex flex-col items-center gap-1 group transition-all hover:-translate-y-0.5"
                >
                   <User size={22} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                   <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-hover:text-primary-600">TÔI</span>
                </button>
                <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all z-[60]">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[180px]">
                    <button 
                      onClick={onProfile}
                      className="w-full text-left px-4 py-3 border-b border-gray-50 mb-1 hover:bg-gray-50 rounded-t-xl transition-colors"
                    >
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">XIN CHÀO,</p>
                      <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
                    </button>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2">
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <button onClick={onLogin} className="text-sm font-black text-gray-600 hover:text-primary-600 transition-colors uppercase tracking-widest">Đăng nhập</button>
              <Button onClick={onRegister} className="px-8 py-3 shadow-lg shadow-primary-200 font-black text-xs uppercase tracking-widest">Đăng ký</Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
