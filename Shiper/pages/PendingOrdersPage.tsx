
import React from 'react';
import { Order, OrderStatus } from '../types';

interface PendingOrdersPageProps {
  orders: Order[];
  onAccept: (id: string) => void;
  onIgnore: (id: string) => void;
}

const PendingOrdersPage: React.FC<PendingOrdersPageProps> = ({ orders, onAccept, onIgnore }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 animate-page-entry">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-text-main dark:text-white">Đơn hàng mới</h2>
          <p className="text-text-secondary dark:text-gray-400 text-sm">Danh sách các đơn hàng đang chờ shipper tiếp nhận</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-primary animate-bounce">notifications</span>
            <span className="text-sm font-bold text-primary">{orders.length} Đơn sẵn sàng</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10 max-w-7xl mx-auto w-full">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-[#3e2b25] rounded-[2.5rem] shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Header: Store Info & Status */}
            <div className="p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full bg-cover bg-center shrink-0 border-2 border-white shadow-md" 
                  style={{ backgroundImage: `url("${order.storeImage}")` }}
                />
                <div>
                  <h3 className="font-bold text-lg text-text-main dark:text-white leading-tight">{order.storeName}</h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400">Mã đơn: {order.id}</p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-[#fff9eb] dark:bg-yellow-500/10 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
                ĐANG CHUẨN BỊ
              </span>
            </div>

            <div className="px-6">
              <div className="border-t border-dashed border-gray-200 dark:border-gray-800"></div>
            </div>

            {/* Address Section */}
            <div className="p-6 flex flex-col gap-6 relative">
              {/* Connecting line */}
              <div className="absolute left-[39px] top-[50px] bottom-[50px] w-0 border-l border-dashed border-gray-300 dark:border-gray-700"></div>
              
              <div className="flex gap-4 items-start relative z-10">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">store</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">LẤY HÀNG TẠI</p>
                  <p className="text-sm font-bold text-text-main dark:text-gray-200 line-clamp-2">{order.storeAddress}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-600 text-[18px]">location_on</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">GIAO ĐẾN</p>
                  <p className="text-sm font-bold text-text-main dark:text-gray-200 line-clamp-2">{order.deliveryAddress}</p>
                </div>
              </div>
            </div>

            <div className="px-6">
              <div className="border-t border-dashed border-gray-200 dark:border-gray-800"></div>
            </div>

            {/* Order Items */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">receipt_long</span>
                <h4 className="text-sm font-bold text-text-main dark:text-white">Chi tiết đơn hàng</h4>
              </div>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm">
                    <p className="text-text-main dark:text-gray-300 font-medium flex gap-1">
                      <span className="text-text-secondary">{item.quantity}x</span>
                      {item.name}
                    </p>
                    <p className="font-bold text-text-main dark:text-white">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 mt-auto">
              <div className="border-t border-gray-100 dark:border-gray-800"></div>
            </div>

            {/* Footer / Actions */}
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Tổng thu nhập</p>
                <p className="text-2xl font-black text-primary leading-tight">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onIgnore(order.id)}
                  className="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-text-main dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                >
                  Bỏ qua
                </button>
                <button 
                  onClick={() => onAccept(order.id)}
                  className="px-8 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-[#d64010] transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Chấp nhận</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center text-text-secondary animate-page-entry">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-gray-400">hourglass_empty</span>
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Đang tìm đơn hàng...</h3>
            <p className="text-sm">Hệ thống sẽ tự động thông báo khi có đơn hàng mới gần bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrdersPage;
