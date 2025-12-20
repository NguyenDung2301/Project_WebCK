
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-primary transition-all flex flex-col justify-between group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 ${iconBg} rounded-lg ${iconColor} transition-transform group-hover:scale-110`}>
          <span className="material-icons-round">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
