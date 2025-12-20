import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart, ChevronRight, Heart, Lock } from 'lucide-react';
import { FoodItem, Voucher } from '../../types/common';

// --- MOCK DATA FOR DEMO ---
const MOCK_RESTAURANT = {
  id: 'res-1',
  name: 'Quán Ngon Nhà Làm',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100&auto=format&fit=crop',
  rating: 4.8,
  reviewsCount: 256,
};

const MOCK_FOOD_DETAIL: FoodItem = {
  id: '1',
  name: 'Bún Bò Huế Đặc Biệt',
  price: 55000,
  originalPrice: 65000,
  imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=1200&auto=format&fit=crop',
  rating: 4.8,
  description: 'Hương vị đậm đà chuẩn gốc Huế với nước dùng hầm xương 24h, thịt bò tái mềm, chả cua dai ngon và rau sống tươi sạch.',
  category: 'noodles'
};

const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Freeship 15k', type: 'FREESHIP', condition: 'Đơn từ 100k', code: 'FS15', discountValue: 15000, minOrderValue: 100000 },
  { id: 'v2', title: 'Giảm 10%', type: 'DISCOUNT', condition: 'Tối đa 50k', code: 'SALE10', discountValue: 5500, minOrderValue: 0 },
  { id: 'v3', title: 'Giảm 20k', type: 'DISCOUNT', condition: 'Đơn từ 200k', code: 'SALE20', discountValue: 20000, minOrderValue: 200000 },
];

const RELATED_FOODS = [
  { id: '101', name: 'Gỏi Cuốn Tôm Thịt', price: 15000, imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400&auto=format&fit=crop', rating: 4.9 },
  { id: '102', name: 'Bánh Mì Thập Cẩm', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop', rating: 4.5 },
  { id: '103', name: 'Cà Phê Sữa Đá', price: 18000, imageUrl: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop', rating: 4.8 },
  { id: '104', name: 'Bánh Flan Caramel', price: 12000, imageUrl: 'https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?q=80&w=400&auto=format&fit=crop', rating: 5.0 },
];

export const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // In real app, fetch data by ID
  const [quantity, setQuantity] = useState(1);
  
  // Use mock data
  const food = MOCK_FOOD_DETAIL;
  const restaurant = MOCK_RESTAURANT;
  
  const totalPrice = food.price * quantity;

  const handleOrderNow = () => {
    // Navigate to checkout with state
    navigate('/checkout', { state: { food, quantity } });
  };

  const handleApplyVoucher = (voucher: Voucher) => {
    // Navigate to checkout with food, quantity AND selected voucher
    navigate('/checkout', { state: { food, quantity, voucher } });
  };

  const handleViewReviews = () => {
    navigate(`/product/${food.id}/reviews`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12 animate-in fade-in duration-500 bg-white pb-24">
      {/* Breadcrumb */}
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 select-none">
        <button 
          onClick={() => navigate('/')}
          className="hover:text-[#EE501C] transition-colors cursor-pointer"
        >
          Trang chủ
        </button> 
        <ChevronRight className="w-3 h-3 shrink-0" />
        <button 
          className="hover:text-[#EE501C] transition-colors cursor-pointer"
        >
          Món nước
        </button> 
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-gray-800 font-semibold truncate max-w-[150px] md:max-w-none">{food.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="space-y-4">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] md:h-[500px]">
             <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right: Info */}
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

          {/* Restaurant Info */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-5">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#EE501C] font-bold text-xl shadow-sm overflow-hidden shrink-0 border-2 border-orange-50">
               <span className="text-xl">Q</span>
             </div>
             <div className="flex-1">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-gray-800">{restaurant.name}</h3>
                 <span className="text-[10px] text-green-500 font-bold border border-green-200 bg-white px-2 py-0.5 rounded">Đang mở cửa</span>
               </div>
               <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1 mt-1">
                 <MapPin className="w-3 h-3" /> {restaurant.address}
               </div>
               <button 
                onClick={handleViewReviews}
                className="flex items-center gap-1 text-[11px] text-[#EE501C] font-bold hover:underline"
               >
                 <Star className="w-3 h-3 fill-[#EE501C]" /> {restaurant.rating} <span className="text-gray-400 font-medium">({restaurant.reviewsCount} đánh giá)</span>
               </button>
             </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Mô tả</h4>
            <p className="text-sm text-gray-500 leading-relaxed italic">{food.description}</p>
          </div>

          {/* Quantity & Time */}
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

          {/* Action Button */}
          <button 
            onClick={handleOrderNow}
            className="w-full bg-[#EE501C] text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-orange-100 flex items-center justify-center gap-3 transform active:scale-95 transition-all hover:bg-[#d44719]"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Đặt ngay • {totalPrice.toLocaleString()}đ</span>
          </button>
        </div>
      </div>

      {/* Reviews Summary */}
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
          onClick={handleViewReviews}
          className="bg-orange-50 text-[#EE501C] font-bold px-10 py-4 rounded-2xl hover:bg-[#EE501C] hover:text-white transition-all flex items-center gap-2"
        >
          Xem chi tiết nhận xét <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Vouchers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-800 font-bold">
             <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
               <div className="w-2.5 h-2.5 bg-[#EE501C] rounded-sm"></div>
             </div>
             Voucher khả dụng
          </div>
          <button 
            className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline"
          >
            Xem tất cả <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {MOCK_VOUCHERS.map((v) => {
            const isEligible = totalPrice >= v.minOrderValue;
            const missingAmount = v.minOrderValue - totalPrice;

            return (
              <div key={v.id} className={`min-w-[280px] md:min-w-[320px] bg-white border rounded-3xl p-4 flex gap-4 items-center shadow-sm relative group transition-all cursor-pointer ${isEligible ? 'border-gray-100 hover:border-orange-200' : 'border-gray-100 opacity-70 bg-gray-50'}`}>
                 <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white ${v.type === 'FREESHIP' ? 'bg-[#EE501C]' : 'bg-orange-300'} shadow-md ${!isEligible && 'grayscale'}`}>
                   {v.type === 'FREESHIP' ? '🚢' : '%'}
                 </div>
                 <div className="flex-1">
                   <h4 className="text-sm font-bold text-gray-800">{v.title}</h4>
                   <p className="text-[10px] text-gray-400 mb-2">{v.condition}</p>
                   <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEligible) handleApplyVoucher(v);
                      }}
                      disabled={!isEligible}
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded transition-colors flex items-center gap-1 ${isEligible ? 'text-[#EE501C] hover:bg-orange-50' : 'text-gray-400 bg-gray-100 cursor-not-allowed'}`}
                   >
                     {isEligible ? 'Áp dụng' : (
                       <span className="flex items-center gap-1">
                         <Lock className="w-3 h-3" /> Thiếu {(missingAmount / 1000).toFixed(0)}k
                       </span>
                     )}
                   </button>
                 </div>
                 {isEligible && (
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     <ChevronRight className="w-4 h-4 text-[#EE501C]" />
                   </div>
                 )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Foods */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Món ngon khác của quán</h2>
          <button className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline">Xem tất cả <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {RELATED_FOODS.map((f) => (
            <div 
              key={f.id} 
              onClick={() => navigate(`/product/${f.id}`)}
              className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
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