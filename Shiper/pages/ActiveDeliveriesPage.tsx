
import React from 'react';
import { Order } from '../types';

interface ActiveDeliveriesPageProps {
  orders: Order[];
  onComplete: (id: string) => void;
}

const ActiveDeliveriesPage: React.FC<ActiveDeliveriesPageProps> = ({ orders, onComplete }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 animate-page-entry">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <div className="bg-surface-light dark:bg-surface-dark border border-[#e7d5cf] dark:border-[#3e2b25] p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">payments</span>
          </div>
          <div>
            <p className="text-[10px] text-text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Thu nhập hôm nay</p>
            <h3 className="text-xl lg:text-2xl font-bold text-text-main dark:text-white">850.000đ</h3>
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark border border-[#e7d5cf] dark:border-[#3e2b25] p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
          </div>
          <div>
            <p className="text-[10px] text-text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Đã hoàn thành</p>
            <h3 className="text-xl lg:text-2xl font-bold text-text-main dark:text-white">12 Đơn</h3>
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark border border-[#e7d5cf] dark:border-[#3e2b25] p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">timer</span>
          </div>
          <div>
            <p className="text-[10px] text-text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mb-0.5">Giờ hoạt động</p>
            <h3 className="text-xl lg:text-2xl font-bold text-text-main dark:text-white">5h 30p</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-text-main dark:text-white">Đơn hàng đang giao</h2>
          <p className="text-text-secondary dark:text-gray-400 text-sm">Danh sách các đơn hàng đã nhận và đang trên đường giao</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#f0e4e0] dark:border-[#3e2b25] bg-surface-light dark:bg-surface-dark shadow-sm">
          <span className="material-symbols-outlined text-green-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
          <span className="text-sm font-bold text-green-600">{orders.length} Đơn đang giao</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-10">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-[#3e2b25] rounded-[2.5rem] shadow-sm flex flex-col lg:flex-row relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            
            {/* Left side: Information */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col gap-6">
              {/* Header inside card */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full bg-cover bg-center shrink-0 border-2 border-white shadow-md" 
                    style={{ backgroundImage: `url("${order.storeImage}")` }}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-text-main dark:text-white leading-tight">{order.storeName}</h3>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Mã đơn: {order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e8f0fe] dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  ĐANG GIAO
                </div>
              </div>

              {/* Address Section Box */}
              <div className="bg-gray-50/50 dark:bg-white/[0.02] p-6 rounded-3xl relative border border-gray-100 dark:border-gray-800">
                <div className="absolute left-[39px] top-[45px] bottom-[45px] w-0 border-l border-dashed border-gray-300 dark:border-gray-700"></div>
                
                <div className="flex gap-4 items-start relative z-10 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-blue-600 text-[18px]">store</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">LẤY HÀNG TẠI</p>
                    <p className="text-sm font-bold text-text-main dark:text-gray-200">{order.storeAddress}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-orange-600 text-[18px]">location_on</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">GIAO ĐẾN</p>
                    <p className="text-sm font-bold text-text-main dark:text-gray-200">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-text-secondary text-[20px]">receipt_long</span>
                  <h4 className="text-sm font-bold text-text-main dark:text-white">Chi tiết đơn hàng</h4>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <p className="text-text-main dark:text-gray-300 font-medium flex gap-1">
                        <span className="text-text-secondary">{item.quantity}x</span>
                        {item.name}
                      </p>
                      <p className="font-bold text-text-main dark:text-white">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Actions & Payment */}
            <div className="lg:w-80 p-8 flex flex-col items-center justify-center gap-6 bg-white dark:bg-[#1a0f0b]/30 lg:border-l border-gray-100 dark:border-gray-800">
              <div className="text-center">
                <p className="text-xs text-text-secondary font-medium mb-1">Tổng thu tiền</p>
                <p className="text-4xl font-black text-primary leading-tight">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[10px] font-medium text-text-secondary border border-gray-200/50">
                  Tiền mặt khi giao hàng
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 max-w-[240px]">
                <a 
                  href="tel:0901234567"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-gray-200 dark:border-gray-700 text-text-main dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  Gọi Khách
                </a>
                <button 
                  onClick={() => onComplete(order.id)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1db954] text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:bg-[#1aa34a] transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  Đã giao
                </button>
              </div>
            </div>

          </div>
        ))}
        {orders.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center text-text-secondary dark:text-gray-400 animate-page-entry">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-5xl">task_alt</span>
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Tuyệt vời!</h3>
            <p className="max-w-xs mx-auto">Bạn đã xử lý hết các đơn hàng hiện có. Hãy sang tab "Đơn hàng mới" để nhận thêm nhé!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveriesPage;
