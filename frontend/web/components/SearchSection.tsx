import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchSection: React.FC = () => {
  return (
    <section className="px-4 md:px-10 py-8 flex justify-center bg-white">
      <div className="relative w-full max-w-[500px]">
        {/* Filter Icon (Start) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-primary transition-colors border-r border-gray-300 pr-3">
            <SlidersHorizontal size={20} />
        </div>

        {/* Input Field */}
        <input 
          type="text" 
          placeholder="Tìm kiếm đồ ăn, quán ăn..." 
          className="w-full py-3.5 pl-[60px] pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-700 placeholder-gray-400"
        />

        {/* Search Icon (End) */}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-[#d43f0f] transition-colors shadow-sm">
            <Search size={18} />
        </button>
      </div>
    </section>
  );
};

export default SearchSection;