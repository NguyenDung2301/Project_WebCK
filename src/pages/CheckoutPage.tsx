
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, MapPin, Utensils, CreditCard, Ticket, CheckCircle2, ChevronLeft, Search, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { Header } from '../components/common/Header';
import { allFoodItems } from '../data/foodData';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

interface CheckoutPageProps {
  productId: string;
  quantity: number;
  initialVoucherId?: string | null;
  onBack: () => void;
  onHome: () => void;
  onSearch: (query: string) => void;
  onSeeAllVouchers: () => void;
  onChangeAddress?: () => void;
  onProfile: () => void;
  onOrders?: () => void;
  onConfirmPayment: (orderData: any, paymentMethod: 'foodpay' | 'cash') => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  productId, 
  quantity, 
  initialVoucherId,
  onBack, 
  onHome, 
  onSearch,
  onSeeAllVouchers,
  onChangeAddress,
  onProfile,
  onOrders,
  onConfirmPayment
}) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'foodpay' | 'cash'>('foodpay');
  const [voucherCode, setVoucherCode] = useState('');
  
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(initialVoucherId || 'v-1');

  useEffect(() => {
    if (initialVoucherId) {
      setSelectedVoucherId(initialVoucherId);
    }
  }, [initialVoucherId]);

  const product = useMemo(() => {
    return allFoodItems.find(p => p.id === productId) || allFoodItems[0];
  }, [productId]);

  // Kiểm tra thông tin người dùng
  const isProfileIncomplete = useMemo(() => {
    return !user?.phone?.trim() || !user?.address?.trim();
  }, [user]);

  const mockVouchers = [
    { id: 'vw-1', type: 'FREESHIP', title: 'Ví: Miễn phí vận chuyển', desc: 'Đơn hàng tối thiểu 50k', expiry: '30/11/2023', available: true, discountValue: 15000 },
    { id: 'vw-2', type: 'GIAM50%', title: 'Ví: Giảm 50% Bạn Mới', desc: 'Giảm tối đa 40k cho đơn đầu tiên', expiry: '15/12/2023', available: true, discountValue: 40000 },
    { id: 'vw-3', type: 'FIXED', title: 'Ví: Giảm 20K Món Yêu Thích', desc: 'Áp dụng chọn lọc', expiry: '31/12/2023', available: true, discountValue: 20000 },
    { id: 'v-1', type: 'FREESHIP', title: 'Giảm 15k phí vận chuyển', desc: 'Đơn tối thiểu 100k', expiry: '31/12/2023', available: true, discountValue: 15000 },
    { id: 'v-2', type: 'GIAM10K', title: 'Giảm 10k cho đơn hàng', desc: 'Đơn tối thiểu 50k', expiry: '30/11/2023', available: true, discountValue: 10000 },
    { id: 'v-3', type: 'GIAM20%', title: 'Giảm 20% tối đa 100k', desc: 'Chưa đạt mức tối thiểu 500k', expiry: '31/12/2023', available: false, reason: 'Mua thêm 360k để sử dụng', discountValue: 0 }
  ];

  const subtotal = product.price * quantity;
  const deliveryFee = 15000;
  
  const selectedVoucher = mockVouchers.find(v => v.id === selectedVoucherId);
  const voucherDiscount = selectedVoucher ? selectedVoucher.discountValue : 0;
  
  const total = subtotal + deliveryFee - voucherDiscount;

  const handleConfirm = () => {
    if (isProfileIncomplete) {
      if (onChangeAddress) onChangeAddress();
      return;
    }
    
    if (!user?._id) return;
    
    const orderData = {
      userId: user._id,
      storeName: product.store.name,
      status: 'Đang chuẩn bị',
      itemName: product.name,
      price: total,
      img: product.img
    };
    // Truyền cả dữ liệu đơn hàng và phương thức thanh toán
    onConfirmPayment(orderData, paymentMethod);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-24">
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onProfile={onProfile}
        onOrders={onOrders}
        showSearch={true}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-700">
        <div className="flex items-center gap-3 text-[11px] font-black text-[#A8ADB7] uppercase tracking-widest mb-10">
           <button className="hover:text-primary-600 transition-colors" onClick={onHome}>TRANG CHỦ</button>
           <ChevronRight size={14} />
           <button className="hover:text-primary-600 transition-colors" onClick={onBack}>TRANG TRƯỚC</button>
           <ChevronRight size={14} />
           <span className="text-[#1E293B] font-black tracking-tight">THANH TOÁN</span>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Xác nhận đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className={cn(
              "bg-white rounded-[32px] p-8 border shadow-sm transition-all",
              isProfileIncomplete ? "border-red-100 bg-red-50/20" : "border-gray-100"
            )}>
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className={isProfileIncomplete ? "text-red-500" : "text-primary-500"} />
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Địa chỉ nhận hàng</h3>
                  </div>
                  <button 
                    onClick={onChangeAddress}
                    className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline"
                  >
                    Thay đổi
                  </button>
               </div>
               <div className="pl-9">
                  {isProfileIncomplete ? (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4 text-red-600 animate-pulse">
                       <AlertCircle size={20} className="shrink-0" />
                       <div className="text-sm font-bold">
                          Thiếu thông tin liên lạc (SĐT hoặc Địa chỉ). Vui lòng cập nhật để tiếp tục.
                       </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                         <span className="font-black text-gray-900 text-lg">{user?.name}</span>
                         <span className="text-gray-300">|</span>
                         <span className="font-bold text-gray-600">{user?.phone}</span>
                      </div>
                      <p className="text-gray-400 font-medium leading-relaxed">
                        {user?.address}
                      </p>
                    </>
                  )}
               </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-8">
                  <Utensils size={24} className="text-primary-500" />
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Chi tiết món ăn</h3>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                     <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <h4 className="text-lg font-black text-gray-900 mb-1">{product.name}</h4>
                           <p className="text-xs text-gray-400 font-bold italic mb-3">Đơn hàng tiêu chuẩn</p>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full">{product.store.name}</span>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-black text-gray-900 mb-1">{(product.price).toLocaleString()}đ</p>
                           <p className="text-sm font-black text-gray-300">x {quantity}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-8">
                  <CreditCard size={24} className="text-primary-500" />
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Phương thức thanh toán</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('foodpay')} className={cn("flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all group relative", paymentMethod === 'foodpay' ? "border-primary-500 bg-primary-50/10" : "border-gray-50 hover:border-primary-100")}>
                     <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === 'foodpay' ? "border-primary-500" : "border-gray-200")}>
                        {paymentMethod === 'foodpay' && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary-600"><Ticket size={24} /></div>
                     <div className="text-left">
                        <p className="text-sm font-black text-gray-900 leading-tight mb-0.5">Ví FoodPay</p>
                        <p className="text-[11px] font-bold text-gray-400">Số dư: 500.000đ</p>
                     </div>
                  </button>
                  <button onClick={() => setPaymentMethod('cash')} className={cn("flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all group relative", paymentMethod === 'cash' ? "border-primary-500 bg-primary-50/10" : "border-gray-50 hover:border-primary-100")}>
                     <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === 'cash' ? "border-primary-500" : "border-gray-200")}>
                        {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-2xl font-black">$</div>
                     <div className="text-left">
                        <p className="text-sm font-black text-gray-900 leading-tight mb-0.5">Tiền mặt</p>
                        <p className="text-[11px] font-bold text-gray-400">Khi nhận hàng</p>
                     </div>
                  </button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <Ticket size={24} className="text-primary-500" />
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Ưu đãi của bạn</h3>
               </div>
               <div className="flex gap-2 mb-8">
                  <input type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} placeholder="Nhập mã giảm giá" className="flex-1 h-12 px-5 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder-gray-300 focus:ring-2 focus:ring-primary-100 transition-all" />
                  <button className="px-6 h-12 bg-primary-600 text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-primary-700 transition-colors">Áp dụng</button>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between"><h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Danh sách khả dụng</h4></div>
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
                     {mockVouchers.filter(v => v.available).map((v) => (
                       <div key={v.id} onClick={() => setSelectedVoucherId(v.id)} className={cn("p-4 rounded-3xl border-2 flex items-center gap-4 cursor-pointer transition-all", selectedVoucherId === v.id ? "border-primary-500 bg-primary-50/10 shadow-md" : "border-gray-50 hover:border-primary-100")}>
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", selectedVoucherId === v.id ? "border-primary-500" : "border-gray-200")}>
                             {selectedVoucherId === v.id && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="bg-primary-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">{v.type}</span>
                                <h5 className="text-[13px] font-black text-gray-900">{v.title}</h5>
                             </div>
                             <p className="text-[10px] font-bold text-gray-400">{v.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  <button onClick={onSeeAllVouchers} className="w-full pt-4 text-xs font-black text-primary-600 uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-x-1 transition-transform">Quay lại ví Voucher <ChevronRight size={14} /></button>
               </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 to-orange-400"></div>
               <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Tổng cộng chi phí</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm"><span className="font-bold text-gray-400 uppercase tracking-widest">Tạm tính</span><span className="font-black text-gray-900">{(subtotal).toLocaleString()}đ</span></div>
                  <div className="flex justify-between text-sm"><span className="font-bold text-gray-400 uppercase tracking-widest">Phí giao hàng</span><span className="font-black text-gray-900">{(deliveryFee).toLocaleString()}đ</span></div>
                  <div className="flex justify-between text-sm"><span className="font-bold text-green-500 flex items-center gap-2 uppercase tracking-widest"><Ticket size={16} /> Voucher giảm giá</span><span className="font-black text-green-600">-{voucherDiscount.toLocaleString()}đ</span></div>
               </div>
               <div className="pt-8 border-t border-dashed border-gray-100 flex items-end justify-between mb-10">
                  <span className="text-lg font-black text-gray-900 uppercase tracking-widest leading-none">Thành tiền</span>
                  <div className="text-right">
                     <span className="text-4xl font-black text-primary-600 leading-none">{(total).toLocaleString()}đ</span>
                     <p className="text-[10px] font-bold text-gray-300 mt-2 uppercase tracking-widest">(Đã bao gồm VAT)</p>
                  </div>
               </div>
               
               <button 
                onClick={handleConfirm}
                className={cn(
                  "w-full py-5 font-black rounded-3xl transition-all transform flex items-center justify-center gap-3 text-lg tracking-tight shadow-2xl",
                  isProfileIncomplete 
                  ? "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 shadow-none border-2 border-dashed border-gray-200" 
                  : "bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200 active:scale-[0.98]"
                )}
               >
                {isProfileIncomplete ? (
                  <>
                    Cập nhật hồ sơ <ArrowRight size={20} />
                  </>
                ) : (
                  "Xác nhận thanh toán"
                )}
               </button>
               
               <p className="mt-6 text-[10px] text-gray-400 font-bold leading-relaxed text-center px-4">
                 {isProfileIncomplete 
                   ? "Bạn cần bổ sung SĐT và Địa chỉ nhận hàng để tiếp tục đặt món."
                   : 'Bằng việc nhấn "Xác nhận thanh toán", bạn đồng ý với các Điều khoản dịch vụ.'}
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
