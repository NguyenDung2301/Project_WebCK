
import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '', variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-3 font-bold text-2xl cursor-pointer hover:opacity-80 transition-opacity ${textColor} ${className}`}
    >
      <div className="w-10 h-10 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 15C3 15 3 11 12 11C21 11 21 15 21 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 15C3 17.2091 4.79086 19 7 19H17C19.2091 19 21 17.2091 21 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 13H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 13V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 13V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 7C7.58172 7 4 9.23858 4 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 12C20 9.23858 16.4183 7 12 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <span className="tracking-tight">FoodDelivery</span>
    </div>
  );
};
