
import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, XCircle, RotateCcw, FileText, Clock, Utensils, X, Bike, Navigation } from 'lucide-react';
import { Order } from '../types';

interface OrdersProps {
  onHomeClick: () => void;
  onReviewClick: (order: Order) => void;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onConfirmReceived: (orderId: string) => void;
  onViewFood: (order: Order) => void;
}

const Orders: React.FC<OrdersProps> = ({ 
  onHomeClick, 
  onReviewClick, 
  orders, 
  onCancelOrder, 
  onConfirmReceived, 
  onViewFood 
}) => {
  const [activeTab, setActiveTab] = useState('all');

  // Lọc tab theo yêu cầu mới:
  // 'all' (Tất cả): Chỉ có đơn đã hủy (CANCELLED) hoặc đơn đã đánh giá (isReviewed)
  const allOrders = orders.filter(o => o.status === 'CANCELLED' || o.isReviewed);
  
  // 'pending' (Đang đặt): Các đơn đang chờ xử lý
  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  
  // 'delivering' (Đang giao): Các đơn đang trên đường giao
  const deliveringOrders = orders.filter(o => o.status === 'DELIVERING');
  
  // 'delivered' (Đã giao): Đơn COMPLETED nhưng người dùng chưa ấn "Đã nhận hàng" (chưa có needsReview và chưa isReviewed)
  const completedOrders = orders.filter(o => o.status === 'COMPLETED' && !o.needsReview && !o.isReviewed);
  
  // 'review' (Cần đánh giá): Đơn đã ấn "Đã nhận hàng" (needsReview === true) và chưa đánh giá
  const reviewOrders = orders.filter(o => o.needsReview && !o.isReviewed);

  const TABS = [
    { id: 'all', label: `Tất cả${allOrders.length > 0 ? `(${allOrders.length})` : ''}` },
    { id: 'pending', label: `Đang đặt${pendingOrders.length > 0 ? `(${pendingOrders.length})` : ''}` },
    { id: 'delivering', label: `Đang giao${deliveringOrders.length > 0 ? `(${deliveringOrders.length})` : ''}` },
    { id: 'delivered', label: `Đã giao${completedOrders.length > 0 ? `(${completedOrders.length})` : ''}` },
    { id: 'review', label: `Cần đánh giá${reviewOrders.length > 0 ? `(${reviewOrders.length})` : ''}` },
  ];

  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case 'pending': return pendingOrders;
      case 'delivering': return deliveringOrders;
      case 'delivered': return completedOrders;
      case 'review': return reviewOrders;
      case 'all': 
      default: 
        return allOrders;
    }
  }, [activeTab, orders]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-500">
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 mb-6">
        <button onClick={onHomeClick} className="hover:text-[#EE501C] transition-colors">Trang chủ</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-800 font-semibold">Đơn hàng của tôi</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Đơn hàng của tôi</h1>
        <p className="text-sm text-gray-400">Quản lý và theo dõi trạng thái các đơn hàng của bạn</p>
      </div>

      <div className="border-b border-gray-100 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? 'text-[#EE501C]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE501C] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm flex flex-col hover:shadow-md transition-all"
            >
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div 
                  onClick={() => onViewFood(order)}
                  className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
                >
                  <img 
                    src={order.imageUrl} 
                    alt={order.restaurantName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 
                        onClick={() => onViewFood(order)}
                        className="text-lg font-bold text-gray-900 cursor-pointer hover:text-[#EE501C] transition-colors"
                      >
                        {order.restaurantName}
                      </h3>
                      
                      {order.isReviewed ? (
                        <div className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã đánh giá
                        </div>
                      ) : order.status === 'COMPLETED' ? (
                        <div className="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full border border-green-100 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Giao hàng thành công
                        </div>
                      ) : order.status === 'CANCELLED' ? (
                        <div className="bg-gray-50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-100 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Đã hủy
                        </div>
                      ) : order.status === 'PENDING' ? (
                        <div className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100 flex items-center gap-1">
                          <Utensils className="w-3 h-3" /> Đang đặt
                        </div>
                      ) : (
                        <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Đang giao hàng
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Đặt lúc {order.orderTime}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400 italic mb-4">{order.description}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tổng thanh toán</span>
                      <span className="text-xl font-black text-[#EE501C]">{order.totalAmount.toLocaleString()}đ</span>
                    </div>
                    
                    <div className="flex gap-3">
                      {order.isReviewed ? (
                        <>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                          >
                            Chi tiết
                          </button>
                          <button 
                            disabled
                            className="flex-1 md:flex-none bg-gray-100 text-gray-400 font-bold py-2.5 px-8 rounded-2xl transition-all text-sm flex items-center justify-center"
                          >
                            Đã đánh giá
                          </button>
                        </>
                      ) : order.status === 'PENDING' ? (
                        <>
                          <button 
                            onClick={() => onCancelOrder(order.id)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-6 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" /> Huỷ đơn
                          </button>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                          >
                            Chi tiết
                          </button>
                        </>
                      ) : order.status === 'DELIVERING' ? (
                        <>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                          >
                            Chi tiết
                          </button>
                          <button className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center gap-2">
                            <Navigation className="w-4 h-4 fill-white" /> Theo dõi
                          </button>
                        </>
                      ) : order.status === 'COMPLETED' ? (
                        <>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                          >
                            Chi tiết
                          </button>
                          {order.needsReview ? (
                            <button 
                              onClick={() => onReviewClick(order)}
                              className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                            >
                              Đánh giá
                            </button>
                          ) : (
                            <button 
                              onClick={() => onConfirmReceived(order.id)}
                              className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                            >
                              Đã nhận hàng
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" /> Chi tiết
                          </button>
                          <button 
                            onClick={() => onViewFood(order)}
                            className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <RotateCcw className="w-4 h-4" /> Đặt lại
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {order.status === 'DELIVERING' && (
                <div className="bg-gray-50/50 border-t border-dashed border-gray-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400">
                      <Bike className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">Dự kiến giao trong 10-15 phút</span>
                  </div>
                  <button className="text-xs font-bold text-[#EE501C] hover:underline transition-all">Liên hệ</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">Không có đơn hàng nào trong mục này.</p>
          </div>
        )}
      </div>

      {filteredOrders.length > 0 && (activeTab === 'all') && (
        <div className="mt-12 flex flex-col items-center gap-2">
          <button className="text-gray-400 text-sm font-bold flex items-center gap-2 hover:text-[#EE501C] transition-colors">
            Xem thêm đơn hàng cũ hơn <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
