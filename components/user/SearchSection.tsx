import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchSection: React.FC = () => {
  const navigate = useNavigate();

  const handleFocus = () => {
    navigate('/search');
  };

  return (
    <section className="px-4 md:px-10">
      <div className="max-w-3xl mx-auto relative group">
        <input
          type="text"
          placeholder="Tìm món ăn, quán ăn..."
          onFocus={handleFocus}
          readOnly
          className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 px-14 shadow-lg shadow-orange-100/30 focus:ring-4 focus:ring-orange-50 transition-all outline-none text-base placeholder:text-gray-400 cursor-pointer"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#EE501C] w-6 h-6" />
        <button 
          onClick={handleFocus}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#EE501C] text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-[#d44719] transition-colors hidden sm:block shadow-md shadow-orange-200"
        >
          Tìm kiếm
        </button>
      </div>
    </section>
  );
};