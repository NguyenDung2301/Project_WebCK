/**
 * Admin Layout
 * Layout cho các trang admin (có Sidebar)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/admin/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
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

export default AdminLayout;
