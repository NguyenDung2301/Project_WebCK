import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 1, name: 'Rice', img: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Broken rice', img: 'https://res.cloudinary.com/duihxp9f2/image/upload/v1764383746/com_ga13dp.jpg' },
  { id: 3, name: 'Salad', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'Chicken', img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Noodles', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Drinks', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=300&auto=format&fit=crop' },
  { id: 7, name: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop' },
  { id: 8, name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop' },
  { id: 9, name: 'Sushi', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300&auto=format&fit=crop' },
  { id: 10, name: 'Dessert', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=300&auto=format&fit=crop' },
];

const CategorySection: React.FC = () => {
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

export default CategorySection;