import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import logo from '@/assets/images/logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-[80px] w-full items-center justify-center bg-white px-4 shadow-sm md:px-10">
      <div className="flex w-full max-w-[1280px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo từ file SVG */}
          <img src={logo} alt="FoodDelivery Logo" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight text-[#EE501C] md:text-2xl">
            FoodDelivery
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/login"
            className="hidden rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md border border-[#EE501C] bg-[#EE501C] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#d43f0f]"
          >
            Sign up
          </Link>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-[#EE501C]"
          >
            <Globe size={16} />
            <span>VIE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
