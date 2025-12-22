
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart, ChevronRight, Heart, Lock } from 'lucide-react';
import { FoodItem, Voucher, Review, Restaurant } from '../../types/common';
import { getFoodByIdApi, getFoodsApi } from '../../api/productApi';
import { getVouchersApi } from '../../api/voucherApi';
import { getReviewsByFoodIdApi } from '../../api/reviewApi';
import { getRestaurantByIdApi } from '../../api/restaurantApi';
import { useAuthContext } from '../../contexts/AuthContext';
import { LoginRequestModal } from '../../components/common/LoginRequestModal';

export const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuthContext();
  
  const [quantity, setQuantity] = useState(1);
  const [food, setFood] = useState<FoodItem | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [relatedFoods, setRelatedFoods] = useState<FoodItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          // 1. Fetch current food
          const foodData = await getFoodByIdApi(id);
          setFood(foodData || null);

          // 2. Fetch vouchers
          const voucherData = await getVouchersApi();
          setVouchers(voucherData);

          // 3. Fetch Reviews for this food
          const reviewsData = await getReviewsByFoodIdApi(id);
          setReviews(reviewsData);

          // 4. Fetch Restaurant & Related Foods
          if (foodData && foodData.restaurantId) {
            const resData = await getRestaurantByIdApi(foodData.restaurantId);
            setRestaurant(resData || null);

            // Fetch related foods ONLY from the same restaurant
            const allFoods = await getFoodsApi();
            const related = allFoods
                .filter(f => f.restaurantId === foodData.restaurantId && f.id !== id)
                .slice(0, 4);
            setRelatedFoods(related);
          }
        }
      } catch (error) {
        console.error("Error fetching product detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!food) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy món ăn</div>;
  }

  // Calculate dynamic stats from ACTUAL reviews to ensure sync
  // Đồng bộ dữ liệu đánh giá: Tính toán trực tiếp từ mảng reviews
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0"; // Default or fallback if no reviews

  // Use fetched restaurant or fallback to a default structure if missing
  const displayRestaurant = restaurant || {
    id: 'unknown',
    name: 'Nhà hàng đối tác',
    address: 'Đang cập nhật địa chỉ',
    imageUrl: '',
    rating: 4.5, // Fallback (won't be used for display if we use calculated)
    reviewsCount: 100, // Fallback
    initial: 'R',
    status: 'Active'
  };

  const totalPrice = food.price * quantity;

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout', { state: { food, quantity } });
  };

  const handleApplyVoucher = (voucher: Voucher) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout', { state: { food, quantity, voucher } });
  };

  const handleViewReviews = () => {
    navigate(`/product/${food.id}/reviews`);
  };

  const handleViewAllVouchers = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    // Navigate to profile page and switch to VOUCHERS tab
    navigate('/profile', { state: { view: 'VOUCHERS' } });
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
          Món ăn
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
               {displayRestaurant.initial || displayRestaurant.name.charAt(0)}
             </div>
             <div className="flex-1">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-gray-800">{displayRestaurant.name}</h3>
                 {displayRestaurant.status === 'Active' ? (
                    <span className="text-[10px] text-green-500 font-bold border border-green-200 bg-white px-2 py-0.5 rounded">Đang mở cửa</span>
                 ) : (
                    <span className="text-[10px] text-red-500 font-bold border border-red-200 bg-white px-2 py-0.5 rounded">Đóng cửa</span>
                 )}
               </div>
               <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1 mt-1">
                 <MapPin className="w-3 h-3" /> {displayRestaurant.address}
               </div>
               {/* Updated Rating Section: Clickable and uses real calculated data */}
               <div 
                 onClick={handleViewReviews}
                 className="flex items-center gap-1 text-[11px] text-[#EE501C] font-bold cursor-pointer hover:underline"
               >
                 <Star className="w-3 h-3 fill-[#EE501C]" /> {averageRating} <span className="text-gray-400 font-medium">({totalReviews} đánh giá)</span>
               </div>
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
               <span className="text-sm font-bold text-gray-800">{food.deliveryTime || '15 - 20 phút'}</span>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleOrderNow}
            disabled={displayRestaurant.status !== 'Active'}
            className={`w-full text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-orange-100 flex items-center justify-center gap-3 transform active:scale-95 transition-all ${displayRestaurant.status === 'Active' ? 'bg-[#EE501C] hover:bg-[#d44719]' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span>{displayRestaurant.status === 'Active' ? `Đặt ngay • ${totalPrice.toLocaleString()}đ` : 'Nhà hàng đang đóng cửa'}</span>
          </button>
        </div>
      </div>

      {/* Reviews Summary - Make Clickable */}
      <section 
        onClick={handleViewReviews}
        className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer hover:shadow-md transition-shadow group"
      >
        <div className="flex items-center gap-6">
          {/* Synchronized Average Rating */}
          <div className="text-5xl font-black text-gray-900 group-hover:text-[#EE501C] transition-colors">{averageRating}</div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            {/* Synchronized Total Reviews */}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-600">Dựa trên {totalReviews} lượt đánh giá</div>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleViewReviews(); }}
          className="bg-orange-50 text-[#EE501C] font-bold px-10 py-4 rounded-2xl group-hover:bg-[#EE501C] group-hover:text-white transition-all flex items-center gap-2"
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
            onClick={handleViewAllVouchers}
            className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline"
          >
            Xem tất cả <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {vouchers.map((v) => {
            const isEligible = totalPrice >= v.minOrderValue;
            const missingAmount = v.minOrderValue - totalPrice;

            return (
              <div key={v.id} className={`min-w-[280px] md:min-w-[320px] bg-white border rounded-3xl p-4 flex gap-4 items-center shadow-sm relative group transition-all cursor-pointer ${isEligible ? 'border-gray-100 hover:border-orange-200' : 'border-gray-100 opacity-70 bg-gray-50'}`}>
                 <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white ${v.type === 'FreeShip' ? 'bg-[#EE501C]' : 'bg-orange-300'} shadow-md ${!isEligible && 'grayscale'}`}>
                   {v.type === 'FreeShip' ? '🚢' : '%'}
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

      {/* Related Foods (From Same Restaurant) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Món ngon khác của quán</h2>
          <button className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline">Xem tất cả <ChevronRight className="w-3 h-3" /></button>
        </div>
        
        {relatedFoods.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedFoods.map((f) => (
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
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
             <p className="text-gray-400 text-sm">Quán này chưa có món ăn khác.</p>
          </div>
        )}
      </section>

      {/* Login Request Modal */}
      <LoginRequestModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};
