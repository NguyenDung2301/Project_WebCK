import React, { useState } from 'react';
import { ChevronRight, Star, Clock, MapPin, Plus, Minus, CheckCircle, Ticket } from 'lucide-react';
import { SAMPLE_DISH, VOUCHERS, PROMO_RESTAURANTS } from '../constants';
import { useParams, Link } from 'react-router-dom';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/search" className="hover:text-orange-500">Món nước</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-medium">Bún Bò Huế</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Images */}
          <div className="lg:w-1/2 p-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative group">
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Giảm 20%</span>
              <img 
                src={SAMPLE_DISH.image} 
                alt={SAMPLE_DISH.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
               {[1, 2, 3].map((_, idx) => (
                 <div key={idx} className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 ${idx === 0 ? 'border-orange-500' : 'border-transparent'}`}>
                   <img src={SAMPLE_DISH.image} className="w-full h-full object-cover" alt="thumb" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:w-1/2 p-6 lg:pl-0">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{SAMPLE_DISH.name}</h1>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
               <span className="text-3xl font-bold text-orange-600">{formatPrice(SAMPLE_DISH.price)}</span>
               {SAMPLE_DISH.originalPrice && (
                 <span className="text-lg text-gray-400 line-through">{formatPrice(SAMPLE_DISH.originalPrice)}</span>
               )}
               <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">Còn hàng</span>
            </div>

            {/* Restaurant Card Mini */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-start gap-4">
               <div className="w-12 h-12 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                 Q
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-800">Quán Ngon Nhà Làm</h3>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Đang mở cửa</span>
                 </div>
                 <div className="flex items-center text-gray-500 text-xs mb-1">
                    <MapPin className="w-3 h-3 mr-1" /> 123 Đường ABC, Quận 1, TP.HCM
                 </div>
                 <div className="flex items-center text-xs">
                    <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" /> 
                    <span className="font-medium text-gray-800 mr-1">4.8</span> 
                    <span className="text-gray-400">(256 đánh giá)</span>
                 </div>
               </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-sm text-gray-900 mb-2">Mô tả</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {SAMPLE_DISH.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
               <div className="flex items-center bg-gray-100 rounded-full p-1">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-orange-500 disabled:opacity-50">
                   <Minus className="w-4 h-4" />
                 </button>
                 <span className="w-12 text-center font-medium text-gray-800">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-orange-500">
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
               <div className="flex items-center text-gray-500 text-xs gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                  <Clock className="w-3 h-3 text-orange-500" />
                  <span>THỜI GIAN GIAO HÀNG</span>
                  <span className="font-bold text-gray-800">15 – 20 phút</span>
               </div>
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-full shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
               <span className="w-5 h-5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" /><path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg></span>
               Đặt hàng - {formatPrice(SAMPLE_DISH.price * quantity)}
            </button>
          </div>
        </div>
      </div>

      {/* Vouchers */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-lg flex items-center gap-2">
             <Ticket className="w-5 h-5 text-orange-500" />
             Voucher khả dụng
           </h3>
           <a href="#" className="text-orange-500 text-xs font-bold flex items-center hover:underline">
             Xem tất cả <ChevronRight className="w-3 h-3" />
           </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {VOUCHERS.map(voucher => (
             <div key={voucher.id} className="bg-white border border-gray-100 rounded-lg p-4 flex gap-4 items-center shadow-sm hover:border-orange-200 transition-colors">
               <div className="bg-orange-50 w-12 h-12 rounded flex items-center justify-center flex-shrink-0 text-orange-600 font-bold text-xs flex-col text-center">
                 <span className="leading-none">{voucher.code}</span>
               </div>
               <div className="flex-1 min-w-0">
                 <h4 className="font-bold text-gray-800 text-sm truncate">{voucher.description}</h4>
                 <p className="text-xs text-gray-500 truncate">{voucher.minOrder}</p>
                 <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded mt-1 inline-block">{voucher.expiry}</span>
               </div>
               <button className="text-orange-500 text-xs font-bold whitespace-nowrap hover:text-orange-600">Áp dụng</button>
             </div>
           ))}
        </div>
      </div>

      {/* Related Items */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-lg">Món ngon khác của quán</h3>
           <a href="#" className="text-orange-500 text-xs font-bold flex items-center hover:underline">
             Xem tất cả <ChevronRight className="w-3 h-3" />
           </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {PROMO_RESTAURANTS.map((item, idx) => (
             <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group cursor-pointer">
                <div className="h-40 overflow-hidden relative">
                   <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} />
                </div>
                <div className="p-3">
                   <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">{item.name}</h4>
                   <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{item.rating} (50+)</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold text-sm">15.000đ</span>
                      <button className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};