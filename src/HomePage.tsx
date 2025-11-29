import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, Globe, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onLogin: () => void;
  onRegister: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLogin, onRegister, onPrivacy, onTerms }) => {
  const heroImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
  ];

  // Clone first and last images for infinite loop effect
  const extendedImages = [
    heroImages[heroImages.length - 1],
    ...heroImages,
    heroImages[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start at index 1 (the first real image)
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto slide logic
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]); // Reset timer on every slide change

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // The Magic of Infinite Loop: Handle Snap Logic when Transition Ends
  const handleTransitionEnd = () => {
    if (currentIndex === extendedImages.length - 1) {
      // If we are at the cloned first image (end of array), snap to real first image
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // If we are at the cloned last image (start of array), snap to real last image
      setIsTransitioning(false);
      setCurrentIndex(extendedImages.length - 2);
    }
  };

  const handleNext = () => {
    // If we are already at the cloned end and waiting for snap, do nothing to prevent glitch
    if (currentIndex >= extendedImages.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of the cloned first slide
  };

  // Calculate the "Visual" index for dots
  const getDisplayIndex = () => {
    if (currentIndex === 0) return heroImages.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  // Touch handlers for Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoSlide();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
    startAutoSlide();
  };

  const categories = [
    { name: 'Cơm', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cơm tấm', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Salad', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Gà rán', img: 'https://images.unsplash.com/photo-1626082927389-d31c6d178125?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Trà sữa', img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Bánh mì', img: 'https://images.unsplash.com/photo-1541533848490-bc9c79e4cf28?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  const promotions = [
    { name: 'Popeyes - Nhà Chung', tag: 'Promo' },
    { name: "McDonald's - Hồ Gươm", tag: 'Promo' },
    { name: 'Cheese Coffee - Lê Đại Hành', tag: 'Promo' },
    { name: 'KFC - Vạn Phúc', tag: 'Promo' },
    { name: 'Bakery - Lý Thái Tổ', tag: 'Promo' },
  ];

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Menu className="text-gray-700 cursor-pointer hover:text-primary-600 transition-colors" size={24} />
            <button onClick={() => window.scrollTo(0, 0)} className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
              FoodDelivery
            </button>
          </div>

          <nav className="hidden md:flex gap-8">
            {['Đồ ăn', 'Thực phẩm', 'Rượu bia', 'Siêu thị'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
                onClick={onLogin}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-transparent hover:bg-gray-100 rounded-full transition-all duration-200"
            >
                Đăng nhập
            </button>
            <button 
                onClick={onRegister}
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-full hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all duration-300"
            >
                Đăng ký
            </button>
            <div className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-900 ml-4 border-l border-gray-200 pl-4">
                <Globe size={16} />
                <span>VIE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section (Infinite Slide + Swipe) */}
      <section 
        className="relative mt-20 h-[400px] overflow-hidden group bg-gray-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
         <div 
            className={`flex w-full h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
         >
            {extendedImages.map((img, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover select-none" 
                      alt={`Food Slide ${index}`} 
                      draggable="false"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Caption (Visible on all slides) */}
                    <div className="absolute bottom-28 left-6 md:left-20 text-white max-w-xl z-20">
                         <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Món ngon mỗi ngày</h2>
                         <p className="text-lg md:text-xl drop-shadow-sm text-gray-100">Khám phá ẩm thực đa dạng ngay tại nhà.</p>
                    </div>
                </div>
            ))}
         </div>
         
         {/* Navigation Arrows */}
         <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-primary-600 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block z-30"
         >
            <ChevronLeft size={28} />
         </button>
         <button 
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-primary-600 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block z-30"
         >
            <ChevronRight size={28} />
         </button>

         {/* Dots Navigation */}
         <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {heroImages.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                        getDisplayIndex() === idx 
                        ? 'bg-primary-500 scale-125' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
         </div>
      </section>

      {/* Search Section */}
      <section className="py-10 px-6 bg-white relative -mt-8 z-20">
         <div className="max-w-7xl mx-auto">
             <div className="max-w-2xl mx-auto"> 
                 <div className="relative shadow-xl rounded-full">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm món ăn, nhà hàng..." 
                        className="w-full pl-8 pr-14 py-5 bg-white rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 placeholder-gray-400 text-lg"
                    />
                    <div className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary-700 transition-colors shadow-md">
                        <Search size={22} />
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 bg-gray-50/50">
         <div className="max-w-7xl mx-auto">
             <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh mục món ăn</h2>
             <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                 {categories.map((cat, idx) => (
                     <div key={idx} className="flex-shrink-0 w-36 text-center group cursor-pointer">
                         <div className="w-36 h-24 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all">
                             <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                         <p className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors">{cat.name}</p>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* Promotions */}
      <section className="py-12 px-6 bg-white flex-1">
         <div className="max-w-7xl mx-auto">
             <h2 className="text-2xl font-bold text-gray-800 mb-6">
                 Ưu đãi tại <span className="text-primary-600">Hà Nội</span>
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                 {promotions.map((promo, idx) => (
                     <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3 group">
                         <div className="flex items-start justify-between">
                            <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                {promo.tag}
                            </span>
                         </div>
                         <h3 className="font-medium text-gray-900 leading-snug group-hover:text-primary-600 transition-colors">{promo.name}</h3>
                         <div className="mt-auto pt-2 flex items-center text-xs text-gray-500 gap-1">
                            <MapPin size={12} />
                            <span>Cách đây 2km</span>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t-4 border-primary-600">
          <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">FoodDelivery</h3>
                  <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                  <div className="flex flex-col gap-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Về FoodDelivery</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Tuyển dụng</a>
                  </div>
                  <div className="flex flex-col gap-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Đăng ký quán ăn</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Đăng ký tài xế</a>
                  </div>
                  <div className="flex flex-col gap-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Trung tâm trợ giúp</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Câu hỏi thường gặp</a>
                  </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                  <p>
                    © 2025 FoodDelivery • 
                    <button onClick={onTerms} className="hover:text-primary-500 transition-colors mx-2">Điều khoản dịch vụ</button> • 
                    <button onClick={onPrivacy} className="hover:text-primary-500 transition-colors mx-2">Chính sách bảo mật</button>
                  </p>
              </div>
          </div>
      </footer>
    </div>
  );
};