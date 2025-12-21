
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, CheckCircle2, XCircle, RotateCcw, FileText, Clock, Utensils, X, Bike, Navigation, AlertTriangle, Phone, Mail, Copy, User, Check, Star, Store } from 'lucide-react';
import { Order } from '../../types/common';
import { getAllOrdersApi } from '../../api/orderApi';
import { submitReviewApi } from '../../api/reviewApi';
import { Modal } from '../../components/common/Modal';
import { useAuthContext } from '../../contexts/AuthContext';

// Mock Shipper Data for the modal
const MOCK_SHIPPER_INFO = {
  name: 'Nguyễn Văn An',
  id: '839210',
  phone: '0909 123 456',
  email: 'nguyenvanan@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
};

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  // Load orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Pass current user ID, default to 'usr-1' if not logged in (mock mode)
        const userId = user?.id || 'usr-1';
        const data = await getAllOrdersApi(userId);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // Filters logic
  const allOrders = orders.filter(o => o.status === 'CANCELLED' || o.isReviewed);
  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const deliveringOrders = orders.filter(o => o.status === 'DELIVERING');
  const completedOrders = orders.filter(o => o.status === 'COMPLETED' && !o.needsReview && !o.isReviewed);
  const reviewOrders = orders.filter(o => o.needsReview && !o.isReviewed);

  const TABS = [
    { id: 'all', label: `Tất cả${allOrders.length > 0 ? ` (${allOrders.length})` : ''}` },
    { id: 'pending', label: `Đang đặt${pendingOrders.length > 0 ? ` (${pendingOrders.length})` : ''}` },
    { id: 'delivering', label: `Đang giao${deliveringOrders.length > 0 ? ` (${deliveringOrders.length})` : ''}` },
    { id: 'delivered', label: `Đã giao${completedOrders.length > 0 ? ` (${completedOrders.length})` : ''}` },
    { id: 'review', label: `Cần đánh giá${reviewOrders.length > 0 ? ` (${reviewOrders.length})` : ''}` },
  ];

  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case 'pending': return pendingOrders;
      case 'delivering': return deliveringOrders;
      case 'delivered': return completedOrders;
      case 'review': return reviewOrders;
      case 'all': 
      default: 
        return orders; 
    }
  }, [activeTab, orders, pendingOrders, deliveringOrders, completedOrders, reviewOrders]);

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelModalOpen(true);
  };

  const handleContactClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setContactModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedOrderId) {
        setOrders(prev => prev.map(o => o.id === selectedOrderId ? { ...o, status: 'CANCELLED' } : o));
        setCancelModalOpen(false);
        setSelectedOrderId(null);
    }
  };

  const handleConfirmReceived = (orderId: string) => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'COMPLETED', needsReview: true } : o));
  };

  // --- REVIEW HANDLERS ---
  const handleOpenReviewModal = (order: Order) => {
    setSelectedOrderForReview(order);
    setReviewRating(5);
    setReviewComment('');
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedOrderForReview) return;

    try {
      // 1. Submit review to API
      await submitReviewApi({
        foodId: selectedOrderForReview.foodId,
        userId: user?.id || 'usr-1', // Mock current user
        userName: user?.name || 'Nguyễn Văn A',
        rating: reviewRating,
        comment: reviewComment
      });

      // 2. Update local state
      setOrders(prev => prev.map(o => 
        o.id === selectedOrderForReview.id 
          ? { ...o, isReviewed: true, needsReview: false } 
          : o
      ));

      // 3. Close modal
      setReviewModalOpen(false);
      setSelectedOrderForReview(null);
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 5: return 'Rất hài lòng';
      case 4: return 'Hài lòng';
      case 3: return 'Bình thường';
      case 2: return 'Không hài lòng';
      case 1: return 'Rất tệ';
      default: return '';
    }
  };

  const getSelectedOrderName = () => {
    const order = orders.find(o => o.id === selectedOrderId);
    return order ? order.restaurantName : 'cửa hàng này';
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleViewDetail = (foodId: string) => {
    navigate(`/product/${foodId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE501C]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-500 bg-white min-h-screen">
      <nav className="text-xs font-medium text-gray-400 flex items-center gap-2 mb-6 select-none">
        <button onClick={() => navigate('/')} className="hover:text-[#EE501C] transition-colors">Trang chủ</button>
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
                  onClick={() => handleViewDetail(order.foodId)}
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
                        onClick={() => handleViewDetail(order.foodId)}
                        className="text-lg font-bold text-gray-900 cursor-pointer hover:text-[#EE501C] transition-colors flex items-center gap-2"
                      >
                        <Store className="w-4 h-4 text-gray-400" />
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
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Đặt lúc {order.orderTime}</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                        <p className="text-sm text-gray-800 font-medium leading-relaxed">
                            {order.description}
                        </p>
                    </div>
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
                            onClick={() => handleViewDetail(order.foodId)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                          >
                            Đặt lại
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
                            onClick={() => handleCancelClick(order.id)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-6 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" /> Huỷ đơn
                          </button>
                          <button 
                            onClick={() => handleViewDetail(order.foodId)}
                            className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                          >
                            Chi tiết
                          </button>
                        </>
                      ) : order.status === 'DELIVERING' ? (
                        <>
                          <button 
                            onClick={() => handleViewDetail(order.foodId)}
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
                            onClick={() => handleViewDetail(order.foodId)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                          >
                            Đặt lại
                          </button>
                          {order.needsReview ? (
                            <button 
                              onClick={() => handleOpenReviewModal(order)}
                              className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                            >
                              Đánh giá
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleConfirmReceived(order.id)}
                              className="flex-1 md:flex-none bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transition-all text-sm flex items-center justify-center"
                            >
                              Đã nhận hàng
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleViewDetail(order.foodId)}
                            className="flex-1 md:flex-none border border-gray-100 text-gray-500 font-bold py-2.5 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" /> Chi tiết
                          </button>
                          <button 
                            onClick={() => handleViewDetail(order.foodId)}
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
                  <button 
                    onClick={() => handleContactClick(order.id)}
                    className="text-xs font-bold text-[#EE501C] hover:underline transition-all"
                  >
                    Liên hệ
                  </button>
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

      {/* REVIEW MODAL */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Đánh giá sản phẩm"
        maxWidth="lg"
      >
        {selectedOrderForReview && (
          <div className="flex flex-col gap-6">
            {/* Product Info */}
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src={selectedOrderForReview.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">{selectedOrderForReview.restaurantName}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{selectedOrderForReview.description}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center justify-center py-4 gap-3 border-y border-dashed border-gray-100">
              <p className="text-sm font-medium text-gray-600">Vui lòng đánh giá chất lượng món ăn</p>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewRating(star)}
                    className="focus:outline-none transition-transform active:scale-95"
                  >
                    <Star 
                      size={32}
                      className={`transition-all ${
                        star <= (hoverRating || reviewRating) 
                          ? 'text-[#EE501C] fill-[#EE501C] scale-110 drop-shadow-sm' 
                          : 'text-gray-200'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <span className="text-[#EE501C] font-bold text-sm h-5">
                {getRatingLabel(hoverRating || reviewRating)}
              </span>
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-2 block">Nhận xét của bạn</label>
              <textarea 
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Hãy chia sẻ nhận xét cho món ăn này nhé! (Tối thiểu 10 ký tự)"
                className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#EE501C] focus:ring-4 focus:ring-orange-50 outline-none transition-all text-sm resize-none placeholder:text-gray-400"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-all text-sm"
              >
                Trở lại
              </button>
              <button 
                onClick={handleSubmitReview}
                disabled={reviewComment.length < 5}
                className="flex-1 py-3.5 rounded-xl bg-[#EE501C] text-white font-bold shadow-lg shadow-orange-200 hover:bg-[#d44719] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* CANCEL ORDER MODAL */}
      <Modal 
        isOpen={cancelModalOpen} 
        onClose={() => setCancelModalOpen(false)} 
        maxWidth="md"
        hideCloseButton={false} 
      >
        <div className="flex flex-col items-center text-center p-2">
           <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-5 border border-red-100">
              <AlertTriangle size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận hủy đơn</h3>
           <p className="text-sm text-gray-500 mb-6 px-4">
             Bạn có chắc muốn hủy đơn tại <strong className="text-gray-900">{getSelectedOrderName()}</strong> không?
           </p>
           <div className="w-full bg-[#FFF5F5] border border-red-100 rounded-2xl p-4 mb-8">
             <p className="text-xs text-red-500 font-medium leading-relaxed">
               Lưu ý: Hủy đơn hàng nhiều lần có thể ảnh hưởng đến điểm tín nhiệm của bạn.
             </p>
           </div>
           <div className="flex w-full gap-4">
             <button 
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 py-3.5 rounded-full border border-red-200 text-red-500 font-bold hover:bg-red-50 transition-all text-sm" 
             >
                Không hủy
             </button>
             <button 
                onClick={handleConfirmCancel}
                className="flex-1 py-3.5 rounded-full bg-[#EE501C] text-white font-bold hover:bg-[#d44719] shadow-lg shadow-orange-100 transition-all text-sm" 
             >
                Xác nhận hủy
             </button>
           </div>
        </div>
      </Modal>

      {/* CONTACT SHIPPER MODAL */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        maxWidth="md"
        hideCloseButton={true}
      >
        <div className="flex flex-col -m-6 bg-white relative rounded-2xl overflow-hidden">
          {/* Orange Header */}
          <div className="bg-[#EE501C] h-32 px-6 pt-6 relative">
             {/* Decorative circle top right */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
             
             <div className="relative z-10 flex justify-between items-start">
                <div className="text-white">
                   <div className="flex items-center gap-2 mb-1">
                      <User size={20} className="fill-white" />
                      <h3 className="font-bold text-lg">Liên hệ Shipper</h3>
                   </div>
                   <p className="text-white/90 text-xs font-medium">Tài xế đang giao đơn hàng của bạn</p>
                </div>
                <button 
                  onClick={() => setContactModalOpen(false)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
             </div>
          </div>

          {/* Body Content */}
          <div className="px-6 pb-8 pt-14 relative">
             {/* Floating Avatar */}
             <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                   <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                      <img src={MOCK_SHIPPER_INFO.avatar} alt="Shipper" className="w-full h-full object-cover" />
                   </div>
                   {/* Verified Badge */}
                   <div className="absolute bottom-0 right-0 bg-[#00C853] text-white p-1 rounded-full border-[3px] border-white flex items-center justify-center">
                      <Check size={12} strokeWidth={4} />
                   </div>
                </div>
             </div>

             {/* Name & ID */}
             <div className="text-center mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{MOCK_SHIPPER_INFO.name}</h4>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full">
                   Mã tài xế: {MOCK_SHIPPER_INFO.id}
                </span>
             </div>

             {/* Contact Cards */}
             <div className="space-y-4 mb-8">
                {/* Phone */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center shadow-sm">
                   <div className="w-12 h-12 rounded-2xl bg-[#FFF5F1] flex items-center justify-center text-[#EE501C] mr-4 shrink-0">
                      <Phone size={24} />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">SỐ ĐIỆN THOẠI</p>
                      <p className="text-base font-bold text-gray-900">{MOCK_SHIPPER_INFO.phone}</p>
                   </div>
                   <button 
                      onClick={() => handleCopy(MOCK_SHIPPER_INFO.phone)}
                      className="text-gray-400 hover:text-[#EE501C] p-2"
                   >
                      <Copy size={20} />
                   </button>
                </div>

                {/* Email */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center shadow-sm">
                   <div className="w-12 h-12 rounded-2xl bg-[#FFF5F1] flex items-center justify-center text-[#EE501C] mr-4 shrink-0">
                      <Mail size={24} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">EMAIL</p>
                      <p className="text-base font-bold text-gray-900 truncate">{MOCK_SHIPPER_INFO.email}</p>
                   </div>
                   <button 
                      onClick={() => handleCopy(MOCK_SHIPPER_INFO.email)}
                      className="text-gray-400 hover:text-[#EE501C] p-2"
                   >
                      <Copy size={20} />
                   </button>
                </div>
             </div>

             {/* Actions */}
             <div className="flex gap-4">
                <button 
                   onClick={() => setContactModalOpen(false)}
                   className="flex-1 py-4 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                   Hủy
                </button>
                <button 
                   onClick={() => window.location.href = `tel:${MOCK_SHIPPER_INFO.phone.replace(/\s/g, '')}`}
                   className="flex-1 py-4 rounded-2xl bg-[#EE501C] text-white font-bold shadow-lg shadow-orange-200 hover:bg-[#d44719] transition-all flex items-center justify-center gap-2"
                >
                   <Phone size={20} className="fill-white" /> Gọi ngay
                </button>
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
