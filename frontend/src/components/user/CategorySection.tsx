import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 1, name: 'Rice', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764460831/Screenshot_2025-11-30_070009_s8hzez.png' },
  { id: 2, name: 'Broken rice', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462147/Screenshot_2025-11-30_072211_d5q9hq.png' },
  { id: 3, name: 'Salad', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070736_u2xuvc.png' },
  { id: 4, name: 'Chicken', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070813_ldmmy9.png' },
  { id: 5, name: 'Noodles', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070845_fcckkb.png' },
  { id: 6, name: 'Drinks', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070905_sde2iv.png' },
  { id: 7, name: 'Burger', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_070923_miqawt.png' },
  { id: 8, name: 'Pizza', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461747/Screenshot_2025-11-30_070938_y9i2od.png' },
  { id: 9, name: 'Sushi', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070951_rsrpt1.png' },
  { id: 10, name: 'Dessert', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_071007_euepva.png' },
];

export const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Adjust scroll distance
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="px-4 md:px-10 py-6 max-w-[1280px] mx-auto relative group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">There's something for everyone!</h2>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
           <button 
             onClick={() => scroll('left')}
             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
             onClick={() => scroll('right')}
             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0 flex flex-col items-center group/item cursor-pointer w-[120px] md:w-[150px]">
            <div className="overflow-hidden rounded-xl shadow-md mb-3 w-full aspect-square border border-gray-100">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300" 
              />
            </div>
            <p className="font-medium text-gray-700 group-hover/item:text-primary transition-colors text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
