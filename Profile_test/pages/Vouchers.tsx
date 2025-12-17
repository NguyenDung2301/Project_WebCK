import React, { useState } from 'react';
import { MOCK_VOUCHERS } from '../constants';
import { Truck, Percent, CheckCircle, AlertCircle } from 'lucide-react';
import { Voucher, VoucherType } from '../types';

const Vouchers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'usable' | 'expired'>('usable');
  const [promoCode, setPromoCode] = useState('');
  
  // Use state for vouchers to allow adding new ones
  const [vouchers, setVouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  
  // State for feedback messages
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleRedeem = () => {
    // 1. Validate Input
    if (!promoCode.trim()) {
        setFeedback({ type: 'error', message: 'Vui lòng nhập mã voucher' });
        return;
    }

    // 2. Check for duplicate (simple check)
    if (vouchers.some(v => v.code === promoCode.trim())) {
        setFeedback({ type: 'error', message: 'Mã voucher này đã có trong ví của bạn' });
        return;
    }

    // 3. Simulate API/Redemption Logic
    // In a real app, this would be an API call. Here we mock a successful addition.
    const newVoucher: Voucher = {
        id: Date.now().toString(),
        code: promoCode.trim(),
        title: `Voucher ${promoCode.trim().toUpperCase()}`,
        description: 'Mã giảm giá đặc biệt dành cho bạn',
        expiryDate: '31/12/2024',
        value: '-10%',
        type: VoucherType.DISCOUNT,
        isExpired: false
    };

    setVouchers([newVoucher, ...vouchers]);
    setFeedback({ type: 'success', message: `Áp dụng mã ${promoCode} thành công!` });
    setPromoCode('');
    setActiveTab('usable'); // Switch to usable tab to show the new item
    
    // Clear feedback after 3 seconds
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredVouchers = vouchers.filter(v => 
    activeTab === 'usable' ? !v.isExpired : v.isExpired
  );

  const usableCount = vouchers.filter(v => !v.isExpired).length;
  const expiredCount = vouchers.filter(v => v.isExpired).length;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800">Ví vouchers</h2>

      {/* Input Section */}
      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-3">
            <input 
            type="text" 
            placeholder="Nhập mã voucher" 
            className="flex-1 border-b border-gray-200 focus:border-primary-500 outline-none px-2 py-2 bg-transparent text-gray-700 placeholder-gray-400"
            value={promoCode}
            onChange={(e) => {
                setPromoCode(e.target.value);
                if (feedback) setFeedback(null); // Clear error when typing
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
            />
            <button 
                onClick={handleRedeem}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
            Lưu
            </button>
        </div>

        {/* Feedback Message */}
        {feedback && (
            <div className={`text-sm px-4 flex items-center gap-2 ${feedback.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {feedback.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span className="font-medium">{feedback.message}</span>
            </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`pb-3 px-4 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'usable' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('usable')}
        >
          Có thể dùng
          {usableCount >= 1 && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'usable' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                {usableCount}
            </span>
          )}
          {activeTab === 'usable' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></div>}
        </button>
        <button 
          className={`pb-3 px-4 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'expired' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('expired')}
        >
          Đã hết hạn
          {expiredCount >= 1 && (
             <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'expired' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                {expiredCount}
             </span>
          )}
          {activeTab === 'expired' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-full"></div>}
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredVouchers.map(voucher => (
          <div key={voucher.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row min-h-[120px]">
            {/* Left Decorator/Icon */}
            <div className={`w-full sm:w-32 flex flex-col items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-dashed relative ${
                voucher.isExpired 
                    ? 'bg-gray-100 text-gray-400 border-gray-300' 
                    : 'bg-primary-50 text-primary-500 border-primary-200'
            }`}>
               {/* Semi-circles for ticket effect */}
               <div className="hidden sm:block absolute -top-2 -right-2 w-4 h-4 bg-slate-50 rounded-full"></div>
               <div className="hidden sm:block absolute -bottom-2 -right-2 w-4 h-4 bg-slate-50 rounded-full"></div>

              {voucher.type === 'SHIPPING' ? <Truck size={32} /> : <Percent size={32} />}
              <span className="font-bold text-lg mt-2">{voucher.value}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-1">{voucher.type === 'SHIPPING' ? 'FREESHIP' : 'GIẢM GIÁ'}</span>
            </div>

            {/* Content */}
            <div className={`flex-1 p-4 flex flex-col justify-between ${voucher.isExpired ? 'opacity-60 grayscale' : ''}`}>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-1">{voucher.title}</h4>
                <p className="text-gray-500 text-sm mb-2">{voucher.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">HSD: {voucher.expiryDate}</span>
                    {voucher.value === '50%' && !voucher.isExpired && <span className="bg-primary-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">HOT</span>}
                </div>
                {!voucher.isExpired && (
                    <button className="text-primary-500 font-semibold text-sm hover:underline">
                        Dùng ngay
                    </button>
                )}
                 {voucher.isExpired && (
                    <span className="text-gray-400 font-medium text-sm">
                        Đã hết hạn
                    </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredVouchers.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                Không có voucher nào trong mục này.
            </div>
        )}
      </div>
    </div>
  );
};

export default Vouchers;