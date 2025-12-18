
import React, { useState } from 'react';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart, ChevronRight, MessageSquare, X, Camera } from 'lucide-react';
import { FoodItem } from '../types';
import { MOCK_VOUCHERS, MOCK_FOODS, MOCK_RESTAURANTS, CATEGORIES } from '../constants';

interface FoodDetailProps {
  food: FoodItem;
  onHomeClick: () => void;
  onCategoryNavigate: (category: string) => void;
  onOrderNow: (food: FoodItem, quantity: number) => void;
  onViewReviews: () => void;
  onViewVouchers: () => void;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ food, onHomeClick, onCategoryNavigate, onOrderNow, onViewReviews, onViewVouchers }) => {
  const [quantity, setQuantity] = useState(1);
  const restaurant = MOCK_RESTAURANTS[0];

  const categoryName = CATEGORIES.find(c => c.id === food.category)?.name || 'Món ăn';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-in fade-in duration-500">
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 select-none">
        <button 
          onClick={onHomeClick}
          className="hover:text-[#EE501C] transition-colors cursor-pointer"
        >
          Trang chủ
        </button> 
        <ChevronRight className="w-3 h-3 shrink-0" />
        <button 
          onClick={() => onCategoryNavigate(food.category)}
          className="hover:text-[#EE501C] transition-colors cursor-pointer"
        >
          {categoryName}
        </button> 
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-gray-800 font-semibold truncate max-w-[150px] md:max-w-none">{food.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] md:h-[500px]">
             <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="py-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2 gap-4">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{food.name}</h1>
              <span className="text-[10px] md:text-xs bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full border border-green-100 flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Còn hàng
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-black text-[#EE501C]">{food.price.toLocaleString()}đ</div>
              {food.originalPrice && (
                <span className="text-lg text-gray-300 line-through font-bold">{food.originalPrice.toLocaleString()}đ</span>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-5">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#EE501C] font-bold text-xl shadow-sm overflow-hidden shrink-0 border-2 border-orange-50">
               <img src={restaurant.imageUrl} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-gray-800">{restaurant.name}</h3>
                 <span className="text-[10px] text-green-500 font-bold">Đang mở cửa</span>
               </div>
               <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1">
                 <MapPin className="w-3 h-3" /> {restaurant.address}
               </div>
               <button 
                onClick={onViewReviews}
                className="flex items-center gap-1 text-[11px] text-[#EE501C] font-bold hover:underline"
               >
                 <Star className="w-3 h-3 fill-[#EE501C]" /> {restaurant.rating} <span className="text-gray-400 font-medium">({restaurant.reviewsCount} đánh giá)</span>
               </button>
             </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">Mô tả</h4>
            <p className="text-sm text-gray-500 leading-relaxed italic">{food.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 border-y border-gray-100 py-6">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100 w-full sm:w-auto justify-between sm:justify-start">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:text-[#EE501C] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-500 hover:text-[#EE501C] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-2 text-[10px] text-orange-700 font-bold bg-orange-50 w-fit px-2 py-0.5 rounded-full">
                 <Clock className="w-3 h-3" /> THỜI GIAN GIAO HÀNG
               </div>
               <span className="text-sm font-bold text-gray-800">15 - 20 phút</span>
            </div>
          </div>

          <button 
            onClick={() => onOrderNow(food, quantity)}
            className="w-full bg-[#EE501C] text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-orange-100 flex items-center justify-center gap-3 transform active:scale-95 transition-all hover:bg-[#d44719]"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Đặt ngay</span>
          </button>
        </div>
      </div>

      <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="text-5xl font-black text-gray-900">4.8</div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dựa trên 256 lượt đánh giá</div>
          </div>
        </div>
        <button 
          onClick={onViewReviews}
          className="bg-orange-50 text-[#EE501C] font-bold px-10 py-4 rounded-2xl hover:bg-[#EE501C] hover:text-white transition-all flex items-center gap-2"
        >
          Xem chi tiết nhận xét <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-800 font-bold">
             <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
               <div className="w-2.5 h-2.5 bg-[#EE501C] rounded-sm"></div>
             </div>
             Voucher khả dụng
          </div>
          <button 
            onClick={onViewVouchers}
            className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline"
          >
            Xem tất cả <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {MOCK_VOUCHERS.map((v) => (
            <div key={v.id} className="min-w-[280px] md:min-w-[320px] bg-white border border-gray-100 rounded-3xl p-4 flex gap-4 items-center shadow-sm relative group hover:border-orange-200 transition-all cursor-pointer">
               <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white ${v.type === 'FREESHIP' ? 'bg-[#EE501C]' : v.type === 'DISCOUNT' ? 'bg-orange-300' : 'bg-red-100'} shadow-md`}>
                 {v.type === 'FREESHIP' ? '🚢' : v.type === 'DISCOUNT' ? '%' : '🧧'}
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold text-gray-800">{v.title}</h4>
                 <p className="text-[10px] text-gray-400 mb-2">{v.condition}</p>
                 <button className="text-[10px] font-bold text-[#EE501C] uppercase">Áp dụng</button>
               </div>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ChevronRight className="w-4 h-4 text-[#EE501C]" />
               </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Món ngon khác của quán</h2>
          <button className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline">Xem tất cả <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOCK_FOODS.slice(0, 4).map((f) => (
            <div key={f.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
              <div className="h-32 md:h-44 relative overflow-hidden">
                <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 md:p-4">
                <h4 className="font-bold text-gray-800 truncate mb-1 text-sm md:text-base">{f.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-[#EE501C] font-bold mb-2 md:mb-3">
                  <Star className="w-3 h-3 fill-[#EE501C]" /> {f.rating} <span className="text-gray-300 font-medium">(50+)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-black text-[#EE501C]">{f.price.toLocaleString()}đ</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-orange-50 flex items-center justify-center text-[#EE501C] group-hover:bg-[#EE501C] group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FoodDetail;
