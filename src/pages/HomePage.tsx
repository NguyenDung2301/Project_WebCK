
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, MapPin, X, Clock, Home, User, Sparkles, TrendingUp, ArrowLeft, Heart, ChevronDown, Star, ChevronRight, ChevronLeft, FileText, LogOut, History, Trash2 } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Header } from '../components/common/Header';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { foodApi } from '../api/foodApi';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';
import { FoodItemUI } from '../types';

interface HomePageProps {
  onLogin: () => void;
  onRegister: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onProductClick: (id: string) => void;
  onProfile: () => void;
  onOrders: () => void;
  onAdmin?: () => void;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
}

const categories = [
  { name: 'Cơm', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bún/Phở', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80' },
  { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { name: 'Burger', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80' },
  { name: 'Đồ uống', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tráng miệng', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80' },
];

const hanoiStores = [
  { id: 'st-01', name: 'Phở Thìn Lò Đúc', address: '13 Lò Đúc, Hai Bà Trưng', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=500&q=80', rating: 4.9, deliveryTime: '20-30p', promo: 'Giảm 15k' },
  { id: 'st-02', name: 'Bún Chả Hương Liên', address: '24 Lê Văn Hưu, Hai Bà Trưng', img: 'https://images.unsplash.com/photo-1562607374-074243e11516?auto=format&fit=crop&w=500&q=80', rating: 4.8, deliveryTime: '25-35p', promo: 'Freeship' },
  { id: 'st-03', name: 'Bánh Mì Dân Tổ', address: 'Trần Nhật Duật, Hoàn Kiếm', img: 'https://images.unsplash.com/photo-1600454021970-351feb4a5034?auto=format&fit=crop&w=500&q=80', rating: 4.5, deliveryTime: '15-20p', promo: 'Mua 1 tặng 1' },
  { id: 'st-04', name: 'Cafe Giảng', address: '39 Nguyễn Hữu Huân', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=500&q=80', rating: 4.7, deliveryTime: '10-15p', promo: 'Deal 0đ' },
  { id: 'st-05', name: 'Bún Đậu Mắm Tôm', address: 'Hàng Khay, Hoàn Kiếm', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80', rating: 4.6, deliveryTime: '20-25p', promo: 'Giảm 10%' },
  { id: 'st-06', name: 'Xôi Yến Nguyễn Hữu Huân', address: '35B Nguyễn Hữu Huân', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', rating: 4.4, deliveryTime: '15-20p', promo: 'Giảm 5k' }
];

export const HomePage: React.FC<HomePageProps> = ({ 
  onLogin, 
  onRegister, 
  onPrivacy, 
  onTerms, 
  onProductClick,
  onProfile,
  onOrders,
  onAdmin,
  isSearching,
  setIsSearching,
  searchValue,
  setSearchValue
}) => {
  const { user } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [searchHistory, setSearchHistory] = useState<string[]>(['Cơm tấm sườn', 'Trà sữa full topping', 'Phở bò', 'Bún chả']);
  
  // Lấy dữ liệu thực tế từ API (LocalStorage) và lọc những món đang sẵn sàng
  const availableFoods = useMemo(() => {
    return foodApi.getAll().filter(item => item.isAvailable);
  }, [isSearching]); // Re-calc khi chuyển đổi chế độ tìm kiếm để cập nhật dữ liệu mới nhất

  const scrollRef = useRef<HTMLDivElement>(null);
  const heroImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (isSearching || isAnimating) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSearching, isAnimating]);

  const filteredResults = useMemo(() => {
    if (!searchValue.trim()) return [];
    return availableFoods.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, availableFoods]);

  const popularItems = useMemo(() => {
    return [...availableFoods].sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0')).slice(0, 4);
  }, [availableFoods]);

  const handleSearchTrigger = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSearching(true);
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleHistoryClick = (term: string) => {
    setSearchValue(term);
  };

  const removeHistoryItem = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter(item => item !== term));
  };

  const resetSearch = () => {
    setIsSearching(false);
    setSearchValue('');
  };

  const handleLogoClick = () => {
    if (user?.role === 'admin' && onAdmin) {
      onAdmin();
    } else {
      resetSearch();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col relative overflow-x-hidden">
      <BackgroundElements />

      <Header 
        onHome={handleLogoClick}
        onSearch={(q) => { setSearchValue(q); setIsSearching(true); }}
        onLogin={onLogin}
        onRegister={onRegister}
        onProfile={onProfile}
        onOrders={onOrders}
        initialSearchValue={searchValue}
        showSearch={isSearching}
        autoFocusSearch={isSearching}
      />

      <main className="flex-1 relative">
        {!isSearching ? (
          <div className={cn(
            "transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)",
            isAnimating ? "opacity-0 scale-105 blur-2xl" : "opacity-100 scale-100 blur-0"
          )}>
            {/* Banner Section with Ken Burns Effect */}
            <section className="relative h-[700px] overflow-hidden flex items-center justify-center">
              {heroImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "absolute inset-0 transition-all duration-[2000ms] ease-in-out",
                    currentIndex === idx ? 'opacity-100 scale-105' : 'opacity-0 scale-110'
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Slide" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
              ))}
              
              <div className={cn(
                "relative z-10 w-full max-w-5xl px-6 text-center transition-all duration-700 delay-100",
                isAnimating ? "opacity-0 -translate-y-20 scale-95" : "opacity-100 translate-y-0 scale-100"
              )}>
                 <div className="mb-14">
                   <h2 className="text-7xl md:text-9xl font-black text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
                     Ngon <span className="text-primary-500 italic">đến</span> lạ.
                   </h2>
                   <p className="text-lg md:text-2xl text-gray-200 font-bold uppercase tracking-[0.5em] opacity-80">Món quà từ tâm hồn ẩm thực</p>
                 </div>

                 {/* HERO SEARCH BAR - The "Jumper" */}
                 <div 
                  className={cn(
                    "relative group max-w-3xl mx-auto cursor-pointer transition-all duration-[600ms] cubic-bezier(0.34, 1.56, 0.64, 1)",
                    isAnimating ? "-translate-y-[400px] opacity-0 scale-75 blur-sm" : "translate-y-0 opacity-100 scale-100"
                  )} 
                  onClick={handleSearchTrigger}
                >
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-primary-500 group-hover:scale-125 transition-transform duration-500">
                      <Search size={32} strokeWidth={3} />
                    </div>
                    <div className="w-full bg-white/95 backdrop-blur-2xl rounded-full py-7 pl-24 pr-12 text-gray-400 text-xl font-bold shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group-hover:bg-white group-hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.25)] transition-all duration-500">
                      Tìm món ngon, địa điểm...
                    </div>
                 </div>
              </div>
            </section>

            {/* Categories Section with Staggered Fade In */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-primary-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Thực đơn đa dạng</span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tight">Khám phá theo danh mục</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12">
                {categories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className="group cursor-pointer text-center animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                    style={{ animationDelay: `${idx * 100}ms`, animationDuration: '800ms' }}
                    onClick={() => { setSearchValue(cat.name); setIsSearching(true); }}
                  >
                    <div className="aspect-[3/4] rounded-[48px] overflow-hidden mb-6 border-4 border-white group-hover:border-primary-100 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-100/30 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) bg-gray-50 p-1.5 relative">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-[38px] group-hover:scale-110 transition-transform duration-1000 ease-out" />
                      <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors duration-500"></div>
                    </div>
                    <p className="font-black text-gray-800 group-hover:text-primary-600 transition-colors text-xl tracking-tight">{cat.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Hanoi Stores Section with Smooth Scroll Reveal */}
            <section className="py-32 bg-[#FAFAFA]/80 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                 <div className="flex items-end justify-between mb-20">
                    <div>
                      <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em] mb-4 block">Ẩm thực Thủ Đô</span>
                      <h2 className="text-5xl font-black text-gray-900 tracking-tight">Top Cửa Hàng Hà Nội</h2>
                    </div>
                    <div className="flex items-center gap-4">
                          <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-500 shadow-xl transition-all duration-300"><ChevronLeft size={24} strokeWidth={3} /></button>
                          <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-500 shadow-xl transition-all duration-300"><ChevronRight size={24} strokeWidth={3} /></button>
                    </div>
                 </div>

                 <div ref={scrollRef} className="flex overflow-x-auto gap-10 snap-x scrollbar-hide no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {hanoiStores.map((store, idx) => (
                      <div 
                        key={store.id} 
                        className="min-w-[320px] w-[320px] snap-start group cursor-pointer animate-in fade-in slide-in-from-right-12 fill-mode-both"
                        style={{ animationDelay: `${idx * 150}ms`, animationDuration: '1000ms' }}
                      >
                         <div className="relative aspect-square rounded-[54px] overflow-hidden mb-8 border-8 border-white shadow-2xl group-hover:shadow-primary-100/50 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)">
                            <img src={store.img} className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-[1500ms] ease-out" alt={store.name} />
                            {store.promo && <div className="absolute top-6 left-6 bg-primary-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">{store.promo}</div>}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                         </div>
                         <div className="px-4">
                            <div className="flex items-center justify-between mb-3">
                               <h4 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-colors truncate pr-4 leading-tight">{store.name}</h4>
                               <div className="flex items-center gap-1.5 text-primary-500 font-black text-lg shrink-0"><Star size={18} fill="currentColor" /> {store.rating}</div>
                            </div>
                            <p className="text-xs text-gray-400 font-bold flex items-center gap-2 mb-4 uppercase tracking-widest"><MapPin size={14} /> {store.address.toUpperCase()}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </section>
          </div>
        ) : (
          /* --- SEARCH MODE - SMOOTH SLIDE UP --- */
          <div className="animate-in slide-in-from-bottom-16 fade-in duration-1000 cubic-bezier(0.23, 1, 0.32, 1) bg-white min-h-[calc(100vh-80px)]">
            <div className="max-w-5xl mx-auto px-6 py-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1.5">Kết quả tìm kiếm</p>
                  <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
                    {searchValue ? `“${searchValue}”` : "Khám phá ẩm thực"}
                  </h1>
                </div>
                {searchValue && (
                  <p className="text-sm font-bold text-gray-400 italic">Tìm thấy <span className="text-primary-600 font-black">{filteredResults.length}</span> món ăn</p>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {['Tất cả', 'Giá', 'Đánh giá', 'Thời gian giao', 'Ưu đãi'].map((filter, idx) => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-black transition-all duration-500 border animate-in fade-in slide-in-from-left-4 fill-mode-both",
                      activeFilter === filter 
                      ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-primary-200 hover:text-primary-600'
                    )}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {filter}
                    {filter !== 'Tất cả' && <ChevronDown size={14} />}
                  </button>
                ))}
              </div>

              {!searchValue.trim() ? (
                <div className="space-y-16">
                  {/* Search History */}
                  {searchHistory.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <History size={18} className="text-primary-500" />
                           <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Lịch sử tìm kiếm</h3>
                        </div>
                        <button 
                          onClick={() => setSearchHistory([])}
                          className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <Trash2 size={12} /> Xóa lịch sử
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {searchHistory.map((term, i) => (
                          <div 
                            key={i}
                            onClick={() => handleHistoryClick(term)}
                            className="group flex items-center gap-3 pl-5 pr-3 py-2.5 bg-gray-50 hover:bg-white border border-transparent hover:border-primary-100 rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg"
                          >
                            <span className="text-sm font-bold text-gray-600 group-hover:text-primary-600">{term}</span>
                            <button 
                              onClick={(e) => removeHistoryItem(e, term)}
                              className="p-1 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Popular Items */}
                  <section className="animate-in fade-in slide-in-from-bottom-8 duration-800 delay-150 fill-mode-both">
                    <div className="flex items-center gap-3 mb-8">
                       <Sparkles size={20} className="text-primary-500" />
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Món ngon bạn có thể thích</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {popularItems.map((item, idx) => (
                        <div 
                          key={item.id}
                          onClick={() => onProductClick(item.id)}
                          className="flex items-center gap-6 p-5 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group cursor-pointer"
                        >
                          <div className="w-24 h-24 rounded-[24px] overflow-hidden shrink-0 border-2 border-white shadow-sm">
                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2000ms] ease-out" alt={item.name} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors truncate mb-0.5">{item.name}</h4>
                            <div className="flex items-center gap-3 mt-1.5 mb-2.5">
                               <div className="flex items-center gap-1 text-[12px] font-black text-primary-500">
                                 <Star size={12} fill="currentColor" /> {item.rating}
                               </div>
                               <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full">{item.category}</span>
                            </div>
                            <span className="text-lg font-black text-gray-900">{item.price.toLocaleString()}đ</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-sm">
                            <ChevronRight size={20} strokeWidth={3} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : (
                /* --- SEARCH RESULTS LIST --- */
                <div className="grid grid-cols-1 gap-8 pb-20">
                  {filteredResults.length > 0 ? filteredResults.map((item, idx) => (
                    <div 
                      key={item.id}
                      onClick={() => onProductClick(item.id)}
                      className="bg-white rounded-[40px] p-8 flex flex-col lg:flex-row gap-8 hover:shadow-2xl transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) group cursor-pointer border border-transparent hover:border-primary-100/30 animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="relative w-full lg:w-[320px] h-52 shrink-0 overflow-hidden rounded-[32px] shadow-md border-2 border-white">
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] cubic-bezier(0.2, 0, 0.2, 1)" alt={item.name} />
                        {item.promo && <div className="absolute top-5 left-5 bg-primary-600 text-white text-[9px] font-black px-4 py-2 rounded-full shadow-lg tracking-widest">{item.promo}</div>}
                      </div>
                      <div className="flex-1 flex flex-col justify-center py-2">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-all duration-500 leading-tight tracking-tight">{item.name}</h3>
                          <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"><Heart size={22} /></button>
                        </div>
                        <p className="text-sm text-gray-400 font-medium mb-6 line-clamp-1 leading-relaxed max-w-xl">{item.description}</p>
                        <div className="flex items-center gap-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
                          <span className="flex items-center gap-1.5 text-primary-500 text-base">★ {item.rating}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span className="flex items-center gap-1.5"><Clock size={14}/> {item.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-auto">
                          <span className="text-2xl font-black text-gray-900 tracking-tight">{item.price.toLocaleString()}đ</span>
                          <button className="px-10 py-3 bg-primary-600 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all duration-500">Đặt ngay</button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-24 bg-gray-50/50 rounded-[48px] border-4 border-dashed border-gray-100 animate-in zoom-in-95 duration-700">
                       <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                         <Search size={32} className="text-gray-200" />
                       </div>
                       <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-lg">
                         Không có kết quả cho "{searchValue}"
                       </p>
                       <button onClick={() => setSearchValue('')} className="mt-6 text-primary-600 font-black uppercase text-xs tracking-widest hover:underline">Thử từ khóa khác</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#080808] text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-28">
              <div className="md:col-span-2">
                <Logo variant="light" className="mb-12 inline-flex scale-125 origin-left" />
                <p className="text-gray-500 font-bold text-sm leading-relaxed max-w-sm uppercase tracking-[0.3em] opacity-60">Mang hương vị thượng hạng từ những đầu bếp hàng đầu đến tận bàn ăn của bạn.</p>
              </div>
              <div className="grid grid-cols-2 gap-10 md:col-span-2">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.5em] text-primary-500">Khám phá</h4>
                  <ul className="space-y-4 text-sm font-bold text-gray-400">
                    <li className="hover:text-white transition-colors cursor-pointer">Thực đơn</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Khuyến mãi</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Cửa hàng gần bạn</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.5em] text-primary-500">Hỗ trợ</h4>
                  <ul className="space-y-4 text-sm font-bold text-gray-400">
                    <li className="hover:text-white transition-colors cursor-pointer">Trung tâm trợ giúp</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Liên hệ</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Phản hồi</li>
                  </ul>
                </div>
              </div>
           </div>
           <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">
              <p>© 2025 FoodDelivery Global. All Rights Reserved.</p>
              <div className="flex gap-16">
                <button onClick={onPrivacy} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={onTerms} className="hover:text-white transition-colors">Terms of Use</button>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};
