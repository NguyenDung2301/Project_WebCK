import React, { useState } from 'react';
import { PaymentMethodType } from '../types';
import { Wallet, Banknote } from 'lucide-react';

const Payment: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(PaymentMethodType.APP_WALLET);

  return (
    <div className="flex flex-col gap-6 h-full relative">
      <h2 className="text-xl font-bold text-gray-800">Phương thức thanh toán</h2>

      <div className="space-y-4">
        {/* Method 1: Online/App */}
        <label 
          className={`relative flex items-start gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedMethod === PaymentMethodType.APP_WALLET 
              ? 'border-primary-500 bg-white shadow-sm' 
              : 'border-transparent bg-white shadow-sm hover:border-gray-200'
          }`}
        >
          <input 
            type="radio" 
            name="payment_method" 
            className="hidden"
            checked={selectedMethod === PaymentMethodType.APP_WALLET}
            onChange={() => setSelectedMethod(PaymentMethodType.APP_WALLET)}
          />
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
            <Wallet size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">Thanh toán trực tiếp qua ứng dụng</h3>
            <p className="text-gray-500 text-sm mt-1 mb-3">Người dùng nạp tiền vào trang web và sử dụng số dư này để thanh toán các đơn hàng.</p>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">Momo</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">ZaloPay</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">Visa/Mastercard</span>
            </div>
          </div>
        </label>

        {/* Method 2: COD */}
        <label 
          className={`relative flex items-start gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedMethod === PaymentMethodType.COD 
              ? 'border-primary-500 bg-white shadow-sm' 
              : 'border-transparent bg-white shadow-sm hover:border-gray-200'
          }`}
        >
          <input 
             type="radio" 
             name="payment_method" 
             className="hidden"
             checked={selectedMethod === PaymentMethodType.COD}
             onChange={() => setSelectedMethod(PaymentMethodType.COD)}
          />
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
            <Banknote size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Thanh toán khi nhận hàng (COD)</h3>
            <p className="text-gray-500 text-sm mt-1">Thanh toán bằng tiền mặt trực tiếp cho tài xế khi bạn nhận được món ăn của mình.</p>
          </div>
        </label>
      </div>

      <div className="mt-8 flex justify-end">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-500/30 transition-all transform active:scale-95">
              Lưu thay đổi
          </button>
      </div>
    </div>
  );
};

export default Payment;