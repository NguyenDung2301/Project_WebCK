import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop",
    alt: "Delicious Banquet"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop",
    alt: "Fresh Ingredients"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1920&auto=format&fit=crop",
    alt: "Fast Delivery"
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev === slides.length - 1 ? 0 : prev + 1);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[320px] md:h-[450px] lg:h-[500px] group overflow-hidden">
      {/* Images */}
      <div 
        className="w-full h-full bg-center bg-cover duration-700 ease-in-out transition-all"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        {/* Dark overlay for better text contrast if we had text */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-primary w-6' : 'bg-white/70 hover:bg-white'
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};
