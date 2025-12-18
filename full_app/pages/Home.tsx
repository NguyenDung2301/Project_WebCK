
import React, { useState, useEffect } from 'react';
import { CATEGORIES, MOCK_PROMOTIONS } from '../constants';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface HomeProps {
  onCategoryClick: (cat: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchFocus: () => void;
  onPromoClick: (foodId: string) => void;
}

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200&h=450",
  "https://tse4.mm.bing.net/th/id/OIP.1KInqq4pCyVXjpxI9N-_KwHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200&h=450"
];

const Home: React.FC<HomeProps> = ({ onCategoryClick, searchValue, onSearchChange, onSearchFocus, onPromoClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length);

  return (
    <div className="space-y-8 pb-12">
      {/* Banner Carousel */}
      <section className="mt-4 px-[20px] w-full">
        <div className="relative group w-full h-48 md:h-[400px] rounded-[2rem] overflow-hidden shadow-xl shadow-orange-100/20">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {BANNER_IMAGES.map((img, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                <img 
                  src={img} 
                  alt={`Banner ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                  <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight">Món ngon <br/> giao tận cửa</h1>
                  <p className="text-sm md:text-lg opacity-90 max-w-md hidden sm:block">Khám phá hàng ngàn món ăn hấp dẫn từ các nhà hàng uy tín nhất.</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNER_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-[20px]">
        <div className="max-w-3xl mx-auto relative group">
          <input
            type="text"
            placeholder="Tìm món ăn, quán ăn..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onSearchFocus}
            className="w-full bg-white border border-gray-100 rounded-[1.5rem] py-5 px-14 shadow-lg shadow-orange-100/30 focus:ring-4 focus:ring-orange-50 transition-all outline-none text-base placeholder:text-gray-400"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#EE501C] w-6 h-6" />
          <button 
            onClick={onSearchFocus}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#EE501C] text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-[#d44719] transition-colors hidden sm:block"
          >
            Tìm kiếm
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Categories Section - Scrollable "Droll" effect */}
        <section className="px-[20px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">There's something for everyone!</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors hidden md:flex"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors hidden md:flex"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide pb-4 -mx-2 px-2">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => onCategoryClick(cat.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group min-w-[90px] md:min-w-[110px] lg:min-w-[140px]"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[2.5rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-2xl group-hover:scale-105 group-hover:border-[#EE501C] transition-all duration-300">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="text-[10px] md:text-xs font-black text-gray-700 group-hover:text-[#EE501C] transition-colors text-center uppercase tracking-widest">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Promotions Section */}
        <section className="px-[20px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              FoodDelivery Promotion in <span className="text-[#EE501C]">Hanoi</span>
            </h2>
            <div className="flex gap-2">
              <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
              <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PROMOTIONS.map((promo) => (
              <div 
                key={promo.id} 
                onClick={() => onPromoClick(promo.foodId)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative h-44">
                  <img src={promo.image} alt={promo.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-yellow-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <span className="text-xs">🏷️</span> PROMO
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 truncate mb-1">{promo.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-tight">{promo.vendor}</span>
                    <span className="text-xs font-bold text-[#EE501C]">{promo.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
