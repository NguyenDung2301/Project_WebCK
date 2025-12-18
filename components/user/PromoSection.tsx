import React, { useRef } from 'react';
import { Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const promotions = [
  { id: 1, name: 'Popeyes - Nhà Chung', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462283/Screenshot_2025-11-30_072347_zzyj7x.png', deal: 'Mua 1 tặng 1' },
  { id: 2, name: "McDonald's - Hồ Gươm", img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462710/Screenshot_2025-11-30_072620_ak9ylz.png', deal: 'Giảm 50% đơn đầu' },
  { id: 3, name: 'Cheese Coffee - Lê Đại Hành', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462711/Screenshot_2025-11-30_072802_awjybq.png', deal: 'Đồng giá 29k' },
  { id: 4, name: 'KFC - Vạn Phúc', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462793/Screenshot_2025-11-29_092812_fgyur2.png', deal: 'Tặng Pepsi tươi' },
  { id: 5, name: 'Bakery - Lý Thái Tổ', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462711/Screenshot_2025-11-30_072835_srq2ga.png', deal: 'Hoàn tiền 15%' },
  { id: 6, name: 'Burger King - Cầu Giấy', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462711/Screenshot_2025-11-30_072850_owrzpt.png', deal: 'Combo trưa 39k' },
  { id: 7, name: 'Highlands Coffee - Tây Hồ', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_072914_omsuvg.png', deal: 'Freeship đơn 0đ' },
  { id: 8, name: 'Pizza Hut - Kim Mã', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462713/Screenshot_2025-11-30_072927_meztye.png', deal: 'Giảm 35k đơn 150k' },
  { id: 9, name: 'The Coffee House - Hai Bà Trưng', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_072942_aah5pc.png', deal: 'Tặng bánh ngọt' },
  { id: 10, name: 'Jollibee - Phạm Ngọc Thạch', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_073059_amopcl.png', deal: 'Mỳ Ý sốt bò 25k' },
  { id: 11, name: 'Starbucks - Bà Triệu', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462794/Screenshot_2025-11-29_093114_pqnet4.png', deal: 'Upsize miễn phí' },
  { id: 12, name: 'Domino\'s Pizza - Giảng Võ', img: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462716/Screenshot_2025-11-30_073114_iewzdj.png', deal: 'Giảm 70% pizza thứ 2' },
];

export const PromoSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="px-4 md:px-10 py-10 max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
            FoodDelivery Promotion in <span className="text-primary">Hanoi</span>
        </h2>
        
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
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promotions.map((promo) => (
          <div 
            key={promo.id} 
            className="flex-shrink-0 w-[240px] md:w-[280px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer border border-gray-100"
          >
            {/* Promo Image */}
            <div className="relative h-40 w-full overflow-hidden">
                <img 
                    src={promo.img} 
                    alt={promo.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-accent text-gray-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <Tag size={10} /> PROMO
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {promo.name}
              </h3>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                 <span>FoodDelivery</span>
                 <span className="text-primary font-bold">{promo.deal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
