
import React from 'react';
import { Check } from 'lucide-react';
import { BackgroundElements } from '../components/common/BackgroundElements';

interface OrderSuccessPageProps {
  onHome: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onHome, onViewOrders }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans px-4 relative overflow-hidden">
      <BackgroundElements />

      <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-500">
        {/* Top Header Section */}
        <div className="bg-gradient-to-br from-primary-500 to-orange-600 px-8 py-16 text-center relative">
          {/* Hexagonal Pattern Overlay (simulated with opacity) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>
          
          <div className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto shadow-xl border border-white/30">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-inner scale-in-center animate-in">
              <Check size={36} strokeWidth={4} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Đặt hàng thành công!</h2>
          <p className="text-gray-400 font-medium leading-relaxed mb-10 px-4">
            Cảm ơn bạn đã tin tưởng. Tài xế sẽ sớm liên hệ với bạn để xác nhận đơn hàng.
          </p>

          <div className="space-y-4">
            <button 
              onClick={onViewOrders}
              className="w-full h-16 bg-primary-600 text-white font-black rounded-full hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all active:scale-95 text-base tracking-tight"
            >
              Xem đơn hàng
            </button>
            <button 
              onClick={onHome}
              className="w-full h-16 bg-white text-gray-900 font-black rounded-full border-2 border-gray-100 hover:bg-gray-50 transition-all text-base tracking-tight"
            >
              Trở về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
