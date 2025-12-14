/**
 * Admin Layout
 * Layout cho các trang admin (có Sidebar)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/admin/Sidebar';
import { logout } from '@/services/authService';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      {/* Main Content Layout */}
      <div className="md:ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

