
import React, { useState } from 'react';
import { MapPin, ChevronRight, CreditCard, Wallet, Search, Ticket, Info, CheckCircle2, ChevronDown, Lock, Eye, EyeOff, X, Check } from 'lucide-react';
import { FoodItem, Voucher, UserProfile, Order } from '../types';
import { MOCK_VOUCHERS, MOCK_RESTAURANTS, CATEGORIES } from '../constants';

interface CheckoutProps {
  food: FoodItem;
  quantity: number;
  onHomeClick: () => void;
  onCategoryNavigate: (category: string) => void;
  onViewVouchers: () => void;
  onEditProfile: () => void;
  userProfile: UserProfile;
  onOrdersClick: () => void;
  onAddOrder: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ 
  food, 
  quantity, 
  onHomeClick, 
  onCategoryNavigate, 
  onViewVouchers, 
  onEditProfile, 
  userProfile,
  onOrdersClick,
  onAddOrder
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cash'>('wallet');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(MOCK_VOUCHERS[0]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const restaurant = MOCK_RESTAURANTS[0];
  const categoryName = CATEGORIES.find(c => c.id === food.category)?.name || 'Món nước';

  const subtotal = food.price * quantity;
  const deliveryFee = 15000;
  const discount = selectedVoucher ? (selectedVoucher.type === 'FREESHIP' ? 15000 : 25000) : 0;
  const total = subtotal + deliveryFee - discount;

  const handleVoucherSelect = (v: Voucher) => {
    if (!v.isExpired) {
      setSelectedVoucher(v);
    }
  };

  const handleConfirmClick = () => {
    if (paymentMethod === 'wallet' && userProfile.balance < total) return;
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = () => {
    if (password === (userProfile.password || '')) {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        foodId: food.id,
        restaurantName: restaurant.name,
        orderTime: `${new Date().getHours()}:${new Date().getMinutes()} • ${new Date().toLocaleDateString('vi-VN')}`,
        description: `${food.name} (x${quantity})`,
        totalAmount: total,
        status: 'PENDING',
        imageUrl: food.imageUrl
      };
      
      onAddOrder(newOrder);
      setShowPasswordModal(false);
      setShowSuccessModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500 relative">
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 mb-8">
        <button onClick={onHomeClick} className="hover:text-[#EE501C] transition-colors">Trang chủ</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onCategoryNavigate(food.category)} className="hover:text-[#EE501C] transition-colors">{categoryName}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-semibold">{food.name}</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-800 mb-8">Xác nhận thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#EE501C] font-bold">
                <MapPin className="w-5 h-5" /> Địa chỉ nhận hàng
              </div>
              <button onClick={onEditProfile} className="text-xs font-bold text-[#EE501C] hover:underline">Thay đổi</button>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-gray-800">{userProfile.name} <span className="text-gray-400 font-medium ml-2">• {userProfile.phone}</span></p>
              <p className="text-sm text-gray-500">{userProfile.address}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-[#EE501C] font-bold mb-6">
              <Ticket className="w-5 h-5" /> Món đã chọn
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{food.name}</h3>
                  <span className="text-xs font-bold text-gray-400">Tối đa 1</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{restaurant.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#EE501C]">{food.price.toLocaleString()}đ</span>
                  <span className="text-sm font-bold text-gray-800">x{quantity}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-[#EE501C] font-bold mb-6">
              <CreditCard className="w-5 h-5" /> Phương thức thanh toán
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('wallet')}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'wallet' ? 'border-[#EE501C] bg-orange-50' : 'border-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#EE501C]">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold text-gray-800">Ví điện tử</p>
                  <p className="text-[10px] text-gray-400">Số dư: <span className="text-[#EE501C] font-bold">{userProfile.balance.toLocaleString()}đ</span></p>
                </div>
                {paymentMethod === 'wallet' && <CheckCircle2 className="w-5 h-5 text-[#EE501C] ml-auto" />}
              </button>

              <button 
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-[#EE501C] bg-orange-50' : 'border-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold text-gray-800">Tiền mặt</p>
                  <p className="text-[10px] text-gray-400">Thanh toán khi nhận đồ</p>
                </div>
                {paymentMethod === 'cash' && <CheckCircle2 className="w-5 h-5 text-[#EE501C] ml-auto" />}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#EE501C] font-bold">
                <Ticket className="w-5 h-5" /> Voucher khả dụng
              </div>
              <button onClick={onViewVouchers} className="text-xs font-bold text-[#EE501C] flex items-center gap-1 hover:underline">Xem tất cả <ChevronRight className="w-3 h-3" /></button>
            </div>
            
            <div className="relative mb-6">
              <input type="text" placeholder="Nhập mã ưu đãi..." className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EE501C] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Áp dụng</button>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gợi ý cho bạn</p>
              {MOCK_VOUCHERS.map(v => (
                <div 
                  key={v.id} 
                  onClick={() => handleVoucherSelect(v)}
                  className={`p-4 rounded-2xl border transition-all relative ${v.isExpired ? 'opacity-50 cursor-not-allowed bg-gray-50 grayscale' : 'cursor-pointer'} ${selectedVoucher?.id === v.id && !v.isExpired ? 'border-orange-200 bg-orange-50/50' : 'border-gray-100 hover:border-orange-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${v.isExpired ? 'bg-gray-300' : (v.type === 'FREESHIP' ? 'bg-[#EE501C]' : 'bg-orange-300')}`}>
                      {v.type === 'FREESHIP' ? '🚢' : '%'}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${v.isExpired ? 'text-gray-500' : 'text-gray-800'}`}>{v.title}</p>
                      <p className="text-[10px] text-gray-400">{v.condition}</p>
                    </div>
                    <div className="text-right">
                       {v.isExpired ? <span className="text-[10px] font-bold text-red-400 uppercase">Hết hạn</span> : <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVoucher?.id === v.id ? 'border-[#EE501C]' : 'border-gray-200'}`}>{selectedVoucher?.id === v.id && <div className="w-2.5 h-2.5 rounded-full bg-[#EE501C]" />}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tạm tính ({quantity} món)</span>
                <span className="font-bold text-gray-800">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Phí giao hàng</span>
                <span className="font-bold text-gray-800">{deliveryFee.toLocaleString()}đ</span>
              </div>
              {selectedVoucher && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#EE501C] font-bold">Voucher giảm giá</span>
                  <span className="font-bold text-[#EE501C]">-{discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-2">
                <span className="font-bold text-gray-800">Tổng thanh toán</span>
                <span className="text-2xl font-black text-[#EE501C]">{total.toLocaleString()}đ</span>
              </div>
              <button 
                onClick={handleConfirmClick}
                disabled={paymentMethod === 'wallet' && userProfile.balance < total}
                className={`w-full text-white font-bold py-4 rounded-2xl shadow-xl transform active:scale-95 transition-all mt-4 ${paymentMethod === 'wallet' && userProfile.balance < total ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#EE501C] hover:bg-[#d44719] shadow-orange-100'}`}
              >
                {paymentMethod === 'wallet' && userProfile.balance < total ? 'Số dư không đủ' : 'Xác nhận thanh toán'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-[#EE501C] pt-10 pb-8 px-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-5 shadow-inner">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#EE501C]"><Lock className="w-6 h-6" /></div>
              </div>
              <h2 className="text-2xl font-black text-white mb-1">Nhập mật khẩu</h2>
              <p className="text-sm text-orange-100 font-medium">Để bảo mật, vui lòng xác nhận danh tính</p>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-900 ml-1">Mật khẩu tài khoản</label>
                  <div className="relative">
                    <input type={showPasswordText ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); if(passwordError) setPasswordError(''); }} placeholder="••••••••" className={`w-full bg-white border ${passwordError ? 'border-red-400 ring-4 ring-red-50' : 'border-orange-100 ring-4 ring-orange-50'} rounded-full py-4 px-6 text-sm focus:outline-none transition-all text-gray-800`} />
                    <button onClick={() => setShowPasswordText(!showPasswordText)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EE501C] transition-colors">{showPasswordText ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                  </div>
                  {passwordError && <p className="text-[10px] font-bold text-red-500 ml-1 mt-1">{passwordError}</p>}
                </div>
                <div className="flex gap-4 pt-2">
                  <button onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); }} className="flex-1 bg-white border border-gray-100 text-gray-500 font-bold py-4 rounded-full hover:bg-gray-50 transition-all text-sm">Hủy</button>
                  <button onClick={handlePasswordConfirm} className="flex-1 bg-[#EE501C] text-white font-black py-4 rounded-full shadow-xl shadow-orange-100 hover:bg-[#d44719] transition-all text-sm">Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-[#EE501C] py-12 px-6 flex items-center justify-center">
               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white shadow-inner">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#EE501C]"><Check className="w-8 h-8 stroke-[3]" /></div>
               </div>
            </div>
            <div className="px-8 pb-10 pt-8 text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-3">Đặt hàng thành công!</h2>
              <p className="text-sm text-gray-400 leading-relaxed font-medium mb-10 px-2">Cảm ơn bạn đã tin tưởng. Tài xế sẽ sớm liên hệ với bạn để xác nhận đơn hàng.</p>
              <div className="space-y-4">
                <button onClick={onOrdersClick} className="w-full bg-[#EE501C] text-white font-black py-4 rounded-full shadow-[0_15px_30px_rgba(238,80,28,0.25)] hover:bg-[#d44719] transition-all transform active:scale-95 text-sm">Xem đơn hàng</button>
                <button onClick={onHomeClick} className="w-full bg-white border border-gray-100 text-gray-500 font-bold py-4 rounded-full hover:bg-gray-50 transition-all transform active:scale-95 text-sm shadow-sm">Trở về trang chủ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
