
import React, { useState } from 'react';
import { ChevronRight, Ticket, Truck, Percent, Store, User as UserIcon } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

interface VoucherWalletPageProps {
  onBack: () => void;
  onHome: () => void;
  onSearch: (query: string) => void;
  onProfile: () => void;
  // Added onOrders prop to satisfy App.tsx type requirements and pass to Header
  onOrders?: () => void;
  onUseVoucher?: (voucherId: string) => void;
}

export const VoucherWalletPage: React.FC<VoucherWalletPageProps> = ({ onBack, onHome, onSearch, onProfile, onOrders, onUseVoucher }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'expired'>('available');
  const [voucherCode, setVoucherCode] = useState('');

  const vouchers = [
    { 
      id: 'vw-1', 
      title: 'Miễn phí vận chuyển', 
      description: 'Đơn hàng tối thiểu 50.000đ', 
      expiry: '30/11/2023', 
      type: 'freeship', 
      value: '-15K',
      isHot: false 
    },
    { 
      id: 'vw-2', 
      title: 'Giảm 50% Bạn Mới', 
      description: 'Giảm tối đa 40k cho đơn đầu tiên', 
      expiry: '15/12/2023', 
      type: 'percentage', 
      value: '50%',
      isHot: true 
    },
    { 
      id: 'vw-3', 
      title: 'Giảm 20K Món Yêu Thích', 
      description: 'Áp dụng cho danh sách cửa hàng chọn lọc', 
      expiry: '31/12/2023', 
      type: 'fixed', 
      value: '-20K',
      isHot: false 
    }
  ];

  const totalVouchers = vouchers.length;

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-24">
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onProfile={onProfile}
        onOrders={onOrders}
        showSearch={true}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-[11px] font-black text-[#A8ADB7] uppercase tracking-widest mb-12">
           <button className="hover:text-primary-600 transition-colors" onClick={onHome}>TRANG CHỦ</button>
           <ChevronRight size={14} />
           <button className="hover:text-primary-600 transition-colors" onClick={onBack}>HỒ SƠ NGƯỜI DÙNG</button>
           <ChevronRight size={14} />
           <span className="text-[#1E293B] font-black tracking-tight">VÍ VOUCHERS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 sticky top-28">
             <div className="bg-white rounded-[48px] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-gray-50 to-gray-100 p-1 mb-8">
                   <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          className="w-full h-full object-cover" 
                          alt={user.name} 
                        />
                      ) : (
                        <UserIcon size={80} className="text-gray-300" strokeWidth={1.5} />
                      )}
                   </div>
                   <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{user?.name || 'Nguyễn Văn A'}</h2>
                <p className="text-sm font-bold text-gray-400 mb-6">{user?.email || 'nguyenvana@example.com'}</p>
                <div className="w-full h-px bg-gray-50 mb-8"></div>
                <div className="w-full">
                   <div className="text-center">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Vouchers của bạn</span>
                      <span className="text-3xl font-black text-primary-600">{totalVouchers}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Voucher List */}
          <div className="lg:col-span-8">
             <div className="flex flex-col gap-10">
                {/* Search/Enter Code */}
                <div>
                   <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Ví vouchers</h1>
                   <div className="bg-white rounded-[32px] p-3 pl-8 shadow-sm border border-gray-100 flex items-center group focus-within:ring-4 focus-within:ring-primary-50 focus-within:border-primary-100 transition-all">
                      <Ticket size={24} className="text-primary-500 mr-4" />
                      <input 
                        type="text" 
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Nhập mã voucher" 
                        className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-300 font-bold focus:ring-0"
                      />
                      <button className="px-10 py-4 bg-primary-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-100 transition-all active:scale-95">
                        Lưu
                      </button>
                   </div>
                </div>

                {/* Tabs */}
                <div>
                   <div className="flex items-center gap-12 border-b border-gray-100 mb-8">
                      <button 
                        onClick={() => setActiveTab('available')}
                        className={cn(
                          "pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2",
                          activeTab === 'available' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
                        )}
                      >
                         Có thể dùng
                         <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                         {activeTab === 'available' && (
                           <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full animate-in slide-in-from-left-full"></div>
                         )}
                      </button>
                      <button 
                        onClick={() => setActiveTab('expired')}
                        className={cn(
                          "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                          activeTab === 'expired' ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
                        )}
                      >
                         Đã hết hạn
                         {activeTab === 'expired' && (
                           <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full animate-in slide-in-from-left-full"></div>
                         )}
                      </button>
                   </div>

                   {/* List of Vouchers */}
                   <div className="space-y-6">
                      {vouchers.map((v) => (
                        <div 
                          key={v.id} 
                          className="bg-white rounded-[32px] overflow-hidden flex shadow-sm border border-gray-50 hover:shadow-xl hover:border-primary-100/50 transition-all group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                        >
                           {/* Left side: Icon */}
                           <div className={cn(
                             "w-44 flex flex-col items-center justify-center border-r border-dashed border-gray-100 p-8",
                             v.type === 'freeship' ? "bg-blue-50/30" : v.type === 'percentage' ? "bg-orange-50/30" : "bg-primary-50/30"
                           )}>
                              <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                v.type === 'freeship' ? "bg-blue-50 text-blue-500" : v.type === 'percentage' ? "bg-orange-50 text-orange-500" : "bg-primary-50 text-primary-600"
                              )}>
                                 {v.type === 'freeship' && <Truck size={28} strokeWidth={2.5} />}
                                 {v.type === 'percentage' && <Percent size={28} strokeWidth={2.5} />}
                                 {v.type === 'fixed' && <Store size={28} strokeWidth={2.5} />}
                              </div>
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em]",
                                v.type === 'freeship' ? "text-blue-400" : v.type === 'percentage' ? "text-orange-400" : "text-primary-400"
                              )}>
                                {v.type === 'freeship' ? 'FREESHIP' : v.type === 'percentage' ? 'GIẢM ' + v.value : 'GIẢM ' + v.value.replace('-', '')}
                              </span>
                           </div>

                           {/* Right side: Info */}
                           <div className="flex-1 p-8 flex flex-col justify-center">
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="text-2xl font-black text-gray-900 leading-tight pr-12">{v.title}</h4>
                                 <span className="text-2xl font-black text-gray-900 italic tracking-tight">{v.value}</span>
                              </div>
                              <p className="text-sm font-bold text-gray-400 mb-6">{v.description}</p>
                              <div className="mt-auto flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">HSD: {v.expiry}</span>
                                    {v.isHot && (
                                      <span className="px-2.5 py-1 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md animate-pulse">HOT</span>
                                    )}
                                 </div>
                                 <button 
                                    onClick={() => onUseVoucher?.(v.id)}
                                    className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] hover:text-primary-700 transition-colors flex items-center gap-1 group/btn"
                                 >
                                    Dùng ngay
                                    <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                 </button>
                              </div>
                           </div>

                           {/* Ticket cutout notches */}
                           <div className="absolute top-1/2 left-[176px] w-6 h-6 bg-[#FCFBF9] rounded-full -translate-y-1/2 -translate-x-1/2 border border-gray-50 group-hover:border-primary-100/50 transition-colors"></div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};
