import React from 'react';
import { UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center h-fit border border-gray-100">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-50">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <h2 className="text-lg font-bold text-gray-800 mb-1">{user.name}</h2>
      <p className="text-sm text-gray-500 mb-6">{user.email}</p>
      
      {/* Decorative dots to match design if needed, or simply clean space */}
    </div>
  );
};

export default Sidebar;