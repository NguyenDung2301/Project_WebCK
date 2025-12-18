
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/admin/Sidebar';
import { getCurrentDateString } from '../utils/helpers';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { Menu } from 'lucide-react';
import { cn } from '../utils/cn';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  onHome?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  title,
  onHome
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative overflow-hidden">
      {/* Decorative Background */}
      <BackgroundElements />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onHome={onHome} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Main Content Layout */}
      <div className={cn(
        "transition-all duration-300 relative z-10",
        isSidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        
        {/* Top Navigation / Header */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors p-1 rounded-md hover:bg-gray-100/50"
              title={isSidebarOpen ? "Thu gọn menu" : "Mở menu"}
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center text-sm text-gray-500">
                <span className="mr-2">Hôm nay:</span>
                <span className="font-medium text-primary-600">{getCurrentDateString()}</span>
             </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
};
