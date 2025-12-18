
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Clock, Coffee, Info, Check, ImageOff, MapPin } from 'lucide-react';
import { Header } from '../components/common/Header';
import { cn } from '../utils/cn';
import { orderService, OrderUI } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';

interface MyOrdersPageProps {
  onHome: () => void;
  onProfile: () => void;
  onSearch: (query: string) => void;
  onOrders?: () => void;
}

type OrderTab = 'all' | 'pending' | 'delivering' | 'delivered' | 'rating';

export const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ onHome, onProfile, onSearch, onOrders }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<OrderTab>('all');
  const [orders, setOrders] = useState<OrderUI[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const loadOrders = useCallback(() => {
    if (user?._id) {
      const data = orderService.getOrdersByUserId(user._id);
      setOrders([...data]); 
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: `Đang đặt(${orders.filter(o => o.status === 'Đang chuẩn bị').length})` },
    { id: 'delivering', label: 'Đang giao' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'rating', label: 'Đánh giá' },
  ];

  const handleCancelOrder = (e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này không?')) {
      orderService.deleteOrder(orderId);
      loadOrders();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleImageError = (orderId: string) => {
    setImageErrors(prev => ({ ...prev, [orderId]: true }));
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return o.status === 'Đang chuẩn bị';
    if (activeTab === 'delivered') return o.status === 'Đã giao';
    return false;
  });

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-24">
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onProfile={onProfile}
        onOrders={onOrders || (() => setActiveTab('all'))}
        showSearch={true}
      />

      {showToast && (
        <div className="fixed top-24 right-8 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full duration-300 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <p className="text-sm font-bold uppercase tracking-tight">Đã huỷ đơn hàng thành công!</p>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-400 mb-8">
           <button onClick={onHome} className="hover:text-primary-600 transition-colors">Trang chủ</button>
           <ChevronRight size={14} />
           <span className="text-gray-900 font-bold">Lịch sử đặt món</span>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Đơn hàng của tôi</h1>
        <p className="text-gray-400 font-medium mb-12">Chào {user?.name}, theo dõi hành trình món ăn của bạn</p>

        <div className="flex items-center gap-8 border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as OrderTab)}
              className={cn(
                "pb-5 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-all relative",
                activeTab === tab.id ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-50 hover:shadow-2xl transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Image Container */}
                  <div className="w-full md:w-48 h-48 rounded-[32px] overflow-hidden bg-gray-50 border-4 border-white shadow-md shrink-0 relative">
                    {imageErrors[order.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                        <ImageOff size={40} />
                        <span className="text-[10px] font-black uppercase">Ảnh lỗi</span>
                      </div>
                    ) : (
                      <img 
                        src={order.img} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        alt={order.itemName}
                        onError={() => handleImageError(order.id)}
                      />
                    )}
                  </div>

                  {/* Info Container */}
                  <div className="flex-1 min-w-0 py-2">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        {/* ITEM NAME IS NOW PRIMARY TITLE */}
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-colors mb-2 truncate tracking-tight leading-tight">
                          {order.itemName}
                        </h3>
                        
                        {/* STORE NAME IS NOW SECONDARY INFO */}
                        <div className="flex items-center gap-2 mb-4">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                              {order.storeName}
                           </span>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                           <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-primary-500" />
                              <span>{order.orderTime}</span>
                           </div>
                        </div>
                      </div>

                      <div className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-sm transition-all",
                        order.status === 'Đã giao' ? "bg-green-50 border-green-100 text-green-600" : "bg-orange-50 border-orange-100 text-orange-600"
                      )}>
                        <span className={cn("w-2 h-2 rounded-full", order.status === 'Đã giao' ? "bg-green-500" : "bg-orange-500 animate-pulse")} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-8 border-t border-dashed border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Tổng thanh toán</span>
                        <span className="text-2xl font-black text-primary-600 tracking-tight">{order.price.toLocaleString()}đ</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {order.status === 'Đang chuẩn bị' && (
                          <button 
                            onClick={(e) => handleCancelOrder(e, order.id)}
                            className="px-8 py-3 bg-white text-red-500 border-2 border-red-50 hover:bg-red-50 hover:border-red-100 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm"
                          >
                            Hủy đơn
                          </button>
                        )}
                        <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                          <Info size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-gray-100">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Coffee size={40} className="text-gray-200" />
               </div>
               <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm mb-8">Danh sách đang trống</p>
               <button onClick={onHome} className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary-100 hover:bg-primary-700 transition-all">Đặt món ngay</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
