import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Ticket, CreditCard, ChevronRight, CheckCircle2, Lock, Eye, EyeOff, Check, Wallet, Search, Plus, Heart } from 'lucide-react';
import { FoodItem, UserProfile, Voucher } from '../../types/common';

// --- MOCK DATA ---
const MOCK_USER: UserProfile = {
  name: 'Nguyễn Văn Khách',
  email: 'khach@example.com',
  phone: '(+84) 901 234 567',
  address: '123 Đường ABC, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh.',
  balance: 500000,
  password: 'password123'
};

const DEFAULT_FOOD: FoodItem = {
  id: '1',
  name: 'Bún Bò Huế Đặc Biệt',
  price: 55000,
  imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=200&auto=format&fit=crop',
  rating: 4.8,
  description: '',
  category: 'noodles'
};

const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Giảm 15k phí vận chuyển', code: 'FREESHIP', discountValue: 15000, minOrderValue: 100000, type: 'FREESHIP', condition: 'Đơn tối thiểu 100k' },
  { id: 'v2', title: 'Giảm 10k cho đơn hàng', code: 'GIAM10K', discountValue: 10000, minOrderValue: 50000, type: 'DISCOUNT', condition: 'Đơn tối thiểu 50k' },
];

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { food: FoodItem, quantity: number, voucher?: Voucher } | undefined;
  
  // Use passed data or fall back to mock
  const food = state?.food || DEFAULT_FOOD;
  const quantity = state?.quantity || 2;
  const userProfile = MOCK_USER;

  // Calculate subtotal immediately for validation
  const subtotal = food.price * quantity;

  // Validate passed voucher against subtotal
  const initialVoucher = state?.voucher && subtotal >= state.voucher.minOrderValue ? state.voucher : null;

  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cash'>('wallet');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(initialVoucher || (subtotal >= MOCK_VOUCHERS[0].minOrderValue ? MOCK_VOUCHERS[0] : null));
  
  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Password Logic
  const [password, setPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const deliveryFee = 15000;
  const discount = selectedVoucher ? selectedVoucher.discountValue : 0;
  
  // Ensure total doesn't go below 0
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleConfirmClick = () => {
    if (paymentMethod === 'cash') {
      setShowSuccessModal(true);
    } else {
      if (userProfile.balance < total) {
          alert('Số dư không đủ');
          return;
      }
      setShowPasswordModal(true);
    }
  };

  const handlePasswordConfirm = () => {
    // Simple mock validation
    if (password.length > 0) { 
      // In real app, verify against API
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      setTimeout(() => setShowSuccessModal(true), 300);
    } else {
      setPasswordError('Vui lòng nhập mật khẩu.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500 relative bg-white pb-24">
      {/* Breadcrumb */}
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 mb-8 select-none">
        <button onClick={() => navigate('/')} className="hover:text-[#EE501C] transition-colors">Trang chủ</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => navigate(-1)} className="hover:text-[#EE501C] transition-colors">Món yêu thích</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-semibold">Chi tiết thanh toán</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-800 mb-8">Xác nhận thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#EE501C] font-bold">
                <MapPin className="w-5 h-5" /> Địa chỉ nhận hàng
              </div>
              <button className="text-xs font-bold text-[#EE501C] hover:underline">Thay đổi</button>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-gray-800">{userProfile.name} <span className="text-gray-400 font-medium ml-2">• {userProfile.phone}</span></p>
              <p className="text-sm text-gray-500">{userProfile.address}</p>
            </div>
          </div>

          {/* Cart Item */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[#EE501C] font-bold">
                <Ticket className="w-5 h-5" /> Món đã chọn
              </div>
              <button className="text-xs font-bold flex items-center gap-1.5 text-gray-500 hover:text-[#EE501C] hover:bg-orange-50 px-3 py-1.5 rounded-full transition-all">
                <Plus className="w-3.5 h-3.5" /> Thêm món
              </button>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{food.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-2">Quán Ngon Nhà Làm</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-[#EE501C]">{food.price.toLocaleString()}đ</span>
                  <span className="text-sm font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">x{quantity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-[#EE501C] font-bold mb-6">
              <CreditCard className="w-5 h-5" /> Phương thức thanh toán
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Wallet Option */}
              <button 
                onClick={() => setPaymentMethod('wallet')}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'wallet' ? 'border-[#EE501C] bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
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

              {/* Cash Option */}
              <button 
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-[#EE501C] bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
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

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#EE501C] font-bold">
                <Ticket className="w-5 h-5" /> Ưu đãi & Voucher
              </div>
            </div>
            
            <div className="relative mb-6">
              <input type="text" placeholder="Nhập mã ưu đãi..." className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EE501C] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Áp dụng</button>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gợi ý cho bạn</p>
              {MOCK_VOUCHERS.map(v => {
                 const isEligible = subtotal >= v.minOrderValue;
                 return (
                  <div 
                    key={v.id} 
                    onClick={() => isEligible && setSelectedVoucher(v)}
                    className={`p-4 rounded-2xl border transition-all relative ${
                      isEligible ? 'cursor-pointer hover:border-orange-100' : 'cursor-not-allowed opacity-60 bg-gray-50'
                    } ${selectedVoucher?.id === v.id ? 'border-orange-200 bg-orange-50/50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${v.type === 'FREESHIP' ? 'bg-[#EE501C]' : 'bg-orange-300'}`}>
                        {v.type === 'FREESHIP' ? '🚢' : '%'}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800">{v.title}</p>
                        <p className="text-[10px] text-gray-400">{v.condition}</p>
                        {!isEligible && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">Chưa đủ điều kiện</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVoucher?.id === v.id ? 'border-[#EE501C]' : 'border-gray-200'}`}>
                          {selectedVoucher?.id === v.id && <div className="w-2.5 h-2.5 rounded-full bg-[#EE501C]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                 );
              })}
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
                <div className="flex justify-between text-sm animate-in fade-in slide-in-from-right-4">
                  <span className="text-[#EE501C] font-bold">Voucher: {selectedVoucher.code}</span>
                  <span className="font-bold text-[#EE501C]">-{discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-2 border-t border-gray-50 mt-2">
                <span className="font-bold text-gray-800">Tổng thanh toán</span>
                <span className="text-3xl font-black text-[#EE501C]">{total.toLocaleString()}đ</span>
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

      {/* --- MODALS --- */}

      {/* PASSWORD MODAL */}
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
                    <input 
                      type={showPasswordText ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => { setPassword(e.target.value); if(passwordError) setPasswordError(''); }} 
                      placeholder="••••••••" 
                      className={`w-full bg-white border ${passwordError ? 'border-red-400 ring-4 ring-red-50' : 'border-orange-100 ring-4 ring-orange-50'} rounded-full py-4 px-6 text-sm focus:outline-none transition-all text-center text-lg tracking-widest font-bold text-gray-700`} 
                      autoFocus
                    />
                    <button onClick={() => setShowPasswordText(!showPasswordText)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EE501C] transition-colors">
                      {showPasswordText ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-[10px] font-bold text-red-500 ml-1 mt-1">{passwordError}</p>}
                </div>
                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); }} 
                    className="flex-1 bg-white border border-gray-100 text-gray-500 font-bold py-4 rounded-full hover:bg-gray-50 transition-all text-sm"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={handlePasswordConfirm} 
                    className="flex-1 bg-[#EE501C] text-white font-black py-4 rounded-full shadow-xl shadow-orange-100 hover:bg-[#d44719] transition-all text-sm"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-[#EE501C] py-12 px-6 flex items-center justify-center">
               <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white shadow-inner animate-pulse">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#EE501C] shadow-lg"><Check className="w-8 h-8 stroke-[4]" /></div>
               </div>
            </div>
            <div className="px-8 pb-10 pt-8 text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-3">Đặt hàng thành công!</h2>
              <p className="text-sm text-gray-400 leading-relaxed font-medium mb-10 px-2">Cảm ơn bạn đã tin tưởng. Tài xế sẽ sớm liên hệ với bạn để xác nhận đơn hàng.</p>
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/orders')} 
                  className="w-full bg-[#EE501C] text-white font-black py-4 rounded-full shadow-[0_15px_30px_rgba(238,80,28,0.25)] hover:bg-[#d44719] transition-all transform active:scale-95 text-sm"
                >
                  Xem đơn hàng
                </button>
                <button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-white border border-gray-100 text-gray-500 font-bold py-4 rounded-full hover:bg-gray-50 transition-all transform active:scale-95 text-sm shadow-sm"
                >
                  Trở về trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};