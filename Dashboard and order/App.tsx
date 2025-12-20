
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import OrderManagement from './views/OrderManagement';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    <div className="flex h-screen overflow-hidden bg-background-light">
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
        <header className="h-16 flex items-center justify-between px-6 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 lg:hidden transition-colors"
            >
              <span className="material-icons-round">menu</span>
            </button>
            <h1 className={`text-xl md:text-2xl font-bold tracking-tight ${currentView === 'dashboard' || currentView === 'orders' ? 'text-primary' : 'text-slate-800'}`}>
              {getTitle()}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-[15px] text-slate-500 font-medium">
              Hôm nay: <span className="text-primary font-bold ml-1">{getCurrentFormattedDate()}</span>
            </div>
            
            {/* Chỉ hiển thị gạch đứng nếu không phải Dashboard hoặc Orders */}
            {currentView !== 'dashboard' && currentView !== 'orders' && (
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            )}

            <div className="flex items-center">
               {currentView === 'dashboard' ? (
                 <span className="material-icons-round text-slate-500 text-[26px] cursor-default select-none transform rotate-[-15deg]">dark_mode</span>
               ) : currentView === 'orders' ? (
                 null
               ) : (
                 <span className="material-icons-round text-gray-400 text-xl">notifications</span>
               )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pt-6 px-6 pb-5 md:pt-8 md:px-8 md:pb-5 bg-background-light">
          <div className="w-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
