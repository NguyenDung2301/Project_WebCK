
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import OrderManagement from './views/OrderManagement';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // Sync dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <OrderManagement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-500 opacity-50">
            <span className="material-icons-round text-6xl mb-4">construction</span>
            <h2 className="text-xl font-bold uppercase tracking-widest">Tính năng đang phát triển</h2>
            <p>Vui lòng quay lại sau!</p>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch(currentView) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Quản lý Đơn hàng';
      case 'users': return 'Quản lý Người dùng';
      case 'restaurants': return 'Quản lý Nhà hàng';
      case 'settings': return 'Cài đặt Hệ thống';
    }
  };

  const getCurrentFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile (via positioning) */}
      <div className={`fixed lg:static inset-y-0 left-0 transform transition-transform duration-300 z-40 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentView={currentView} setView={(v) => { setCurrentView(v); setIsSidebarOpen(false); }} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-6 md:px-8 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
            >
              <span className="material-icons-round">menu</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{getTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
              Hôm nay: <span className="font-semibold text-primary">{getCurrentFormattedDate()}</span>
            </div>
            <button 
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Chế độ tối"
            >
              <span className="material-icons-round dark:hidden">dark_mode</span>
              <span className="material-icons-round hidden dark:block">light_mode</span>
            </button>
          </div>
        </header>

        {/* Increased pb-2 to pb-5 (20px) to give more space at the bottom as requested */}
        <div className="flex-1 overflow-y-auto pt-6 px-6 pb-5 md:pt-8 md:px-8 md:pb-5 bg-background-light dark:bg-background-dark">
          <div className="w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
