
import React, { useState, useMemo } from 'react';
import { Heart, ChevronRight, Minus, Plus, ShoppingCart, Clock, CheckCircle2, MapPin, Star, Ticket, ChevronLeft, X } from 'lucide-react';
import { Header } from '../components/common/Header';
import { foodApi } from '../api/foodApi';
import { reviewService } from '../services/reviewService';
import { Voucher, Review } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';
import { ReviewsModal } from '../components/common/ReviewsModal';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onHome: () => void;
  onProductClick: (id: string) => void;
  onSearch: (query: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onProfile: () => void;
  onOrders?: () => void;
  onSeeAllVouchers: () => void;
  onOrder: (id: string, quantity: number) => void;
  searchQuery?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  productId, 
  onBack, 
  onHome, 
  onProductClick, 
  onSearch,
  onLogin,
  onRegister,
  onProfile,
  onOrders,
  onSeeAllVouchers,
  onOrder,
  searchQuery = ''
}) => {
  const { isAuthenticated, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Lấy dữ liệu món ăn từ DB thực tế
  const allFoodsFromDb = useMemo(() => foodApi.getAll(), [productId]);

  const product = useMemo(() => {
    return allFoodsFromDb.find(p => p.id === productId) || allFoodsFromDb[0];
  }, [productId, allFoodsFromDb]);

  // Lấy dữ liệu đánh giá thực tế từ DB
  const reviews = useMemo(() => {
    return reviewService.getReviewsByFoodId(productId);
  }, [productId]);

  const relatedProducts = useMemo(() => {
    return allFoodsFromDb
      .filter(p => p.isAvailable && p.id !== productId && (p.store.name === product.store.name || p.category === product.category))
      .slice(0, 4);
  }, [productId, product, allFoodsFromDb]);

  const vouchers: Voucher[] = [
    { id: 'v1', title: 'Giảm 15k phí ship', description: 'Đơn tối thiểu 100k', expiry: '31/12', type: 'freeship' },
    { id: 'v2', title: 'Giảm 10% tối đa 50k', description: 'Cho đơn từ 200k', expiry: 'Trong ngày', type: 'discount' },
    { id: 'v3', title: 'Giảm 20k trực tiếp', description: 'Áp dụng cho đơn đầu tiên', expiry: 'Sắp hết hạn', type: 'newuser' },
  ];

  const breadcrumbMiddleLabel = (searchQuery || product.category).toUpperCase();

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-24">
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onLogin={onLogin}
        onRegister={onRegister}
        onProfile={onProfile}
        onOrders={onOrders}
        showSearch={true}
        initialSearchValue={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-[11px] font-black text-[#A8ADB7] uppercase tracking-widest mb-10">
           <button className="hover:text-primary-600 transition-colors" onClick={onHome}>TRANG CHỦ</button>
           <ChevronRight size={14} />
           <button 
             className="hover:text-primary-600 transition-colors" 
             onClick={() => onSearch(searchQuery || product.category)}
           >
             {breadcrumbMiddleLabel}
           </button>
           <ChevronRight size={14} />
           <span className="text-[#1E293B] font-black">{product.name.toUpperCase()}</span>
        </div>

        {/* Main Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden shadow-2xl">
               <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
               {product.promo && (
                 <div className="absolute top-6 left-6 bg-primary-600 text-white text-[10px] font-black px-5 py-2 rounded-full shadow-lg uppercase tracking-widest">
                   {product.promo}
                 </div>
               )}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-5xl font-black text-gray-900 mb-2 leading-tight tracking-tight">{product.name}</h1>
            <div className="flex items-center justify-between mb-8">
              <span className="text-4xl font-black text-primary-600 tracking-tight">{(product.price).toLocaleString()}đ</span>
              <div className={cn(
                "flex items-center gap-2 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest",
                product.isAvailable ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              )}>
                {product.isAvailable ? <CheckCircle2 size={14} /> : <X size={14} />} 
                {product.isAvailable ? 'Còn hàng' : 'Nhà hàng tạm nghỉ'}
              </div>
            </div>

            {/* Store Card with Rating Trigger */}
            <div 
              onClick={() => setIsReviewsOpen(true)}
              className="bg-white rounded-[32px] p-6 border border-gray-100 flex items-center gap-5 mb-10 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-primary-100"
            >
               <div className="w-16 h-16 rounded-2xl overflow-hidden bg-primary-50 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                  {product.store.logo ? (
                    <img src={product.store.logo} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="text-primary-600 font-black text-xl">{product.store.name.charAt(0)}</div>
                  )}
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black text-gray-900 leading-tight truncate pr-4 text-lg group-hover:text-primary-600 transition-colors">{product.store.name}</h4>
                 </div>
                 <p className="text-[11px] text-gray-400 font-bold flex items-center gap-1 mb-2"><MapPin size={12} className="text-primary-400"/> {product.store.address}</p>
                 <div className="flex items-center gap-1.5 text-xs font-black">
                   <div className="flex items-center gap-0.5 text-yellow-500">
                     <Star size={14} fill="currentColor" />
                     <span>{product.rating}</span>
                   </div>
                   <span className="text-gray-300 font-normal group-hover:text-primary-400 transition-colors">({reviews.length} đánh giá thực tế)</span>
                   <ChevronRight size={14} className="text-gray-200 group-hover:text-primary-500 transition-all group-hover:translate-x-1" />
                 </div>
               </div>
            </div>

            <div className="space-y-4 mb-10">
              <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Mô tả</h5>
              <p className="text-gray-500 leading-relaxed font-medium">{product.description}</p>
            </div>

            <div className="mt-auto flex items-center justify-between bg-white/50 border border-gray-100 rounded-[40px] p-4">
               <div className="flex items-center bg-white border border-gray-100 rounded-full p-1.5 shadow-sm">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors" disabled={!product.isAvailable}>
                   <Minus size={20} />
                 </button>
                 <span className="w-12 text-center font-black text-xl text-gray-900">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors" disabled={!product.isAvailable}>
                   <Plus size={20} />
                 </button>
               </div>
               
               <div className="flex flex-col items-end gap-1 px-4">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Thời gian giao hàng</span>
                  <div className="flex items-center gap-2 text-sm font-black text-gray-900 italic">
                    <Clock size={16} className="text-primary-500" /> {product.deliveryTime}
                  </div>
               </div>
            </div>

            <button 
              onClick={() => onOrder(product.id, quantity)}
              disabled={!product.isAvailable}
              className={cn(
                "w-full mt-8 py-5 text-white font-black rounded-full shadow-2xl transition-all transform flex items-center justify-center gap-4 text-lg",
                product.isAvailable 
                ? "bg-primary-600 hover:bg-primary-700 shadow-primary-200 active:scale-[0.98]" 
                : "bg-gray-400 cursor-not-allowed shadow-none"
              )}
            >
              <ShoppingCart size={22} strokeWidth={3} />
              {product.isAvailable ? `Đặt hàng - ${(product.price * quantity).toLocaleString()}đ` : 'Tạm dừng nhận đơn'}
            </button>
          </div>
        </div>

        <ReviewsModal 
          isOpen={isReviewsOpen}
          onClose={() => setIsReviewsOpen(false)}
          rating={product.rating || '0'}
          reviews={reviews}
        />
      </main>
    </div>
  );
};
