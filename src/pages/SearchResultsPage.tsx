
import React, { useState, useMemo } from 'react';
import { Search, Heart, ChevronDown, X } from 'lucide-react';
import { Header } from '../components/common/Header';
import { allFoodItems } from '../data/foodData';
import { useAuth } from '../contexts/AuthContext';

interface SearchResultsPageProps {
  query: string;
  onProductClick: (id: string) => void;
  onBack: () => void;
  onHome: () => void;
  onSearch: (query: string) => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ 
  query, 
  onProductClick, 
  onBack, 
  onHome, 
  onSearch,
  onLogin,
  onRegister
}) => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filteredResults = useMemo(() => {
    return allFoodItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filters = ['Tất cả', 'Giá', 'Đánh giá', 'Thời gian giao', 'Ưu đãi'];

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-20">
      {/* Global Header with Search Bar visible */}
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onLogin={onLogin}
        onRegister={onRegister}
        initialSearchValue={query}
        showSearch={true}
        autoFocusSearch={true}
      />

      <main className="max-w-5xl mx-auto px-6 pt-8">
        <div className="mb-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Kết quả tìm kiếm</p>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl font-black text-gray-900 leading-tight">"{query}"</h1>
            <p className="text-sm font-bold text-gray-400 italic">Tìm thấy <span className="text-primary-600 font-black">{filteredResults.length}</span> món ăn</p>
          </div>
        </div>

        {/* Filters - Thắt chặt khoảng cách và làm nhỏ nút */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-black transition-all border ${
                activeFilter === filter 
                ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
              }`}
            >
              {filter}
              {filter !== 'Tất cả' && <ChevronDown size={14} />}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredResults.length > 0 ? filteredResults.map((item) => (
            <div 
              key={item.id}
              onClick={() => onProductClick(item.id)}
              className="bg-white rounded-[32px] p-6 flex flex-col md:flex-row gap-8 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all group cursor-pointer border border-transparent hover:border-primary-50/50"
            >
              <div className="relative w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-[24px] shadow-sm">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={item.name} />
                {item.promo && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg">
                    {item.promo}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col py-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">{item.name}</h3>
                  <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 font-medium mb-4 line-clamp-1 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-auto">
                  <span className="flex items-center gap-1.5 text-primary-500">★ {item.rating}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{item.distance}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{item.deliveryTime}</span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-black text-gray-900">{item.price.toLocaleString()}đ</span>
                  <button className="px-8 py-2.5 bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all transform group-hover:-translate-y-0.5">
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white/40 rounded-[32px] border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search size={24} className="text-gray-200" />
               </div>
               <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm">Không tìm thấy món ăn nào</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
