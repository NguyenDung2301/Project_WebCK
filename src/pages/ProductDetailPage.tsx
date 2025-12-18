
import React, { useState, useMemo } from 'react';
import { Heart, ChevronRight, Minus, Plus, ShoppingCart, Clock, CheckCircle2, MapPin, Star, Ticket, ChevronLeft } from 'lucide-react';
import { Header } from '../components/common/Header';
import { allFoodItems } from '../data/foodData';
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
  // Added onOrders prop to satisfy App.tsx type requirements and pass to Header
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

  const product = useMemo(() => {
    return allFoodItems.find(p => p.id === productId) || allFoodItems[0];
  }, [productId]);

  const mockReviews: Review[] = [
    {
      _id: 'rev-01',
      userId: 'u-1',
      userName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Nước lèo rất đậm đà, thịt bò mềm và nhiều. Đóng gói cẩn thận, nước lèo để riêng nóng hổi. Sẽ ủng hộ dài dài!',
      createdAt: '2023-10-20T18:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80'
      ]
    },
    {
      _id: 'rev-02',
      userId: 'u-2',
      userName: 'Trần Thị H.',
      rating: 4,
      comment: 'Giao hàng nhanh, đồ ăn ngon nhưng hơi cay so với mình. Sẽ nhắc quán bớt cay lần sau.',
      createdAt: '2023-10-19T12:15:00Z'
    },
    {
      _id: 'rev-03',
      userId: 'u-3',
      userName: 'Lê Minh',
      rating: 5,
      comment: 'Món tủ của gia đình mình mỗi dịp cuối tuần. Chất lượng không đổi suốt bao năm qua.',
      createdAt: '2023-10-15T19:45:00Z'
    }
  ];

  const relatedProducts = useMemo(() => {
    return allFoodItems
      .filter(p => p.id !== productId && (p.store.name === product.store.name || p.category === product.category))
      .slice(0, 4);
  }, [productId, product.store.name, product.category]);

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
            <div className="flex gap-4">
               {[product.img, product.img, product.img].map((img, i) => (
                 <div key={i} className={cn("w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all", i === 0 ? "border-primary-500 scale-105" : "border-gray-100 hover:border-gray-300")}>
                    <img src={img} className="w-full h-full object-cover opacity-80" alt="" />
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-5xl font-black text-gray-900 mb-2 leading-tight tracking-tight">{product.name}</h1>
            <div className="flex items-center justify-between mb-8">
              <span className="text-4xl font-black text-primary-600 tracking-tight">{(product.price).toLocaleString()}đ</span>
              <div className="flex items-center gap-2 text-[10px] font-black text-green-600 bg-green-50 px-4 py-2 rounded-full uppercase tracking-widest">
                <CheckCircle2 size={14} /> Còn hàng
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
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md">Đang mở cửa</span>
                 </div>
                 <p className="text-[11px] text-gray-400 font-bold flex items-center gap-1 mb-2"><MapPin size={12} className="text-primary-400"/> {product.store.address}</p>
                 <div className="flex items-center gap-1.5 text-xs font-black">
                   <div className="flex items-center gap-0.5 text-yellow-500">
                     <Star size={14} fill="currentColor" />
                     <span>{product.rating}</span>
                   </div>
                   <span className="text-gray-300 font-normal group-hover:text-primary-400 transition-colors">({product.reviewCount || '256'} đánh giá)</span>
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
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors">
                   <Minus size={20} />
                 </button>
                 <span className="w-12 text-center font-black text-xl text-gray-900">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors">
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
              className="w-full mt-8 py-5 bg-primary-600 text-white font-black rounded-full hover:bg-primary-700 shadow-2xl shadow-primary-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 text-lg"
            >
              <ShoppingCart size={22} strokeWidth={3} />
              Đặt hàng - {(product.price * quantity).toLocaleString()}đ
            </button>
          </div>
        </div>

        {/* Voucher Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Ticket className="text-primary-600" size={24} />
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Voucher khả dụng</h3>
            </div>
            <button 
              onClick={onSeeAllVouchers}
              className="text-[11px] font-black text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              Xem tất cả <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vouchers.map((v) => (
              <div 
                key={v.id} 
                className={cn(
                  "bg-white rounded-3xl p-5 border-2 flex items-center gap-5 transition-all duration-300 relative overflow-hidden group",
                  selectedVoucher === v.id ? "border-primary-500 shadow-xl shadow-primary-50" : "border-gray-50 hover:border-primary-100 shadow-sm"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                  v.type === 'freeship' ? "bg-blue-50 text-blue-500" : v.type === 'discount' ? "bg-orange-50 text-orange-500" : "bg-primary-50 text-primary-600"
                )}>
                  {v.type === 'freeship' ? <Clock size={28} /> : v.type === 'discount' ? <span className="font-black text-xl">%</span> : <Star size={28} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 text-sm leading-tight mb-1 truncate">{v.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider">{v.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">HSD: {v.expiry}</span>
                    <button 
                      onClick={() => setSelectedVoucher(v.id)}
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest transition-colors px-3 py-1.5 rounded-lg",
                        selectedVoucher === v.id ? "bg-primary-600 text-white" : "text-primary-600 hover:bg-primary-50"
                      )}
                    >
                      {selectedVoucher === v.id ? "Đã chọn" : "Áp dụng"}
                    </button>
                  </div>
                </div>
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#FCFBF9] rounded-full -translate-y-1/2 border-r border-gray-100"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#FCFBF9] rounded-full -translate-y-1/2 border-l border-gray-100"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Other products from same store */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Món ngon khác của quán</h3>
            <button className="text-[11px] font-black text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-1">
              Xem tất cả <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div 
                key={item.id}
                onClick={() => onProductClick(item.id)}
                className="bg-white rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-700 group cursor-pointer border border-transparent hover:border-gray-50"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                   {item.promo && (
                     <div className="absolute top-4 left-4 bg-primary-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg">
                       {item.promo}
                     </div>
                   )}
                </div>
                <div className="p-6">
                   <h4 className="font-black text-gray-900 group-hover:text-primary-600 transition-colors mb-2 leading-tight tracking-tight line-clamp-1">{item.name}</h4>
                   <div className="flex items-center gap-1 text-[11px] font-black text-primary-500 mb-4">
                     <Star size={12} fill="currentColor" /> {item.rating} <span className="text-gray-300 font-bold ml-1">(50+)</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-gray-900">{(item.price).toLocaleString()}đ</span>
                     <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                       <Plus size={16} strokeWidth={3} />
                     </div>
                   </div>
                </div>
              </div>
            ))}
            {relatedProducts.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-400 font-bold italic border-2 border-dashed border-gray-100 rounded-[40px]">
                Đang cập nhật thêm các món ngon khác...
              </div>
            )}
          </div>
        </section>

        {/* Reviews Modal */}
        <ReviewsModal 
          isOpen={isReviewsOpen}
          onClose={() => setIsReviewsOpen(false)}
          rating={product.rating}
          reviewCount={product.reviewCount}
          reviews={mockReviews}
        />
      </main>
    </div>
  );
};
