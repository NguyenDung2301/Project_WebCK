
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShipperOrder, OrderStatus } from '../../types/shipper';
import { getShipperOrdersApi, completeOrderApi, getShipperStatsApi } from '../../api/shipperApi';
import { Wallet, Check, Truck, Store, MapPin, FileText, Phone, CheckCircle2, Loader2, ClipboardCheck, Timer, User, Mail, X } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ShipperHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ShipperOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [stats, setStats] = useState({ todayIncome: 0, completedCount: 0, activeHours: '0h 00p' });

  // Call Customer Modal State
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedOrderForCall, setSelectedOrderForCall] = useState<ShipperOrder | null>(null);

  // Load active orders and stats
  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, statsData] = await Promise.all([
        getShipperOrdersApi(OrderStatus.Delivering),
        getShipperStatsApi()
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleComplete = async (id: string) => {
    if (processingId) return;
    
    setProcessingId(id);
    try {
      const success = await completeOrderApi(id);
      if (success) {
        navigate('/shipper/history');
      } else {
        alert('Không tìm thấy đơn hàng hoặc có lỗi xảy ra.');
        setProcessingId(null);
      }
    } catch (error) {
      console.error(error);
      setProcessingId(null);
    }
  };

  const handleOpenCallModal = (order: ShipperOrder) => {
    setSelectedOrderForCall(order);
    setCallModalOpen(true);
  };

  const handleConfirmCall = () => {
    const phoneNumber = selectedOrderForCall?.customer?.phone?.replace(/\s/g, '') || '0901234567';
    window.location.href = `tel:${phoneNumber}`;
    setCallModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EE501C]"></div></div>;
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Income */}
        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-full bg-[#FFF5F1] flex items-center justify-center text-[#EE501C] shrink-0">
            <Wallet size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] text-[#8E5B4B] font-bold uppercase tracking-widest mb-1">THU NHẬP HÔM NAY</p>
            <h3 className="text-2xl font-black text-gray-900">{stats.todayIncome.toLocaleString('vi-VN')}đ</h3>
          </div>
        </div>
        
        {/* Card 2: Completed Orders */}
        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-full bg-[#FFF5F1] flex items-center justify-center text-[#EE501C] shrink-0">
            <ClipboardCheck size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] text-[#8E5B4B] font-bold uppercase tracking-widest mb-1">SỐ ĐƠN HOÀN THÀNH HÔM NAY</p>
            <h3 className="text-3xl font-black text-[#0f172a]">{stats.completedCount} Đơn</h3>
          </div>
        </div>

        {/* Card 3: Active Hours */}
        <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-full bg-[#FFF5F1] flex items-center justify-center text-[#EE501C] shrink-0">
            <Timer size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] text-[#8E5B4B] font-bold uppercase tracking-widest mb-1">GIỜ HOẠT ĐỘNG HÔM NAY</p>
            <h3 className="text-2xl font-black text-gray-900">{stats.activeHours}</h3>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Đơn hàng đang giao</h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">Danh sách các đơn hàng đã nhận và đang trên đường giao</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-100 bg-green-50 shadow-sm">
          <Truck size={20} className="text-green-600" />
          <span className="text-sm font-bold text-green-700">{orders.length} Đơn đang giao</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex flex-col lg:flex-row relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            
            {/* Left side: Information */}
            <div className="flex-1 p-8 flex flex-col gap-8">
              {/* Header inside card */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-5">
                  <div 
                    className="w-16 h-16 rounded-2xl bg-cover bg-center shrink-0 border border-gray-100 shadow-sm" 
                    style={{ backgroundImage: `url("${order.storeImage}")` }}
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">{order.storeName}</h3>
                    <p className="text-sm text-gray-400 font-medium">Mã đơn: <span className="font-mono text-gray-600">{order.id}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                  <Truck size={14} /> ĐANG GIAO
                </div>
              </div>

              {/* Address Section Box */}
              <div className="bg-gray-50 rounded-[1.5rem] p-6 relative border border-gray-100/50">
                {/* Dashed Line */}
                <div className="absolute left-[39px] top-[45px] bottom-[45px] w-px border-l-2 border-dashed border-gray-300"></div>
                
                <div className="flex gap-5 items-start relative z-10 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                    <Store size={20} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">LẤY HÀNG TẠI</p>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{order.storeAddress}</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 text-[#EE501C] shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">GIAO ĐẾN</p>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <FileText size={18} className="text-gray-400" />
                  <h4 className="text-sm font-bold text-gray-800">Chi tiết đơn hàng</h4>
                </div>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <p className="text-gray-800 font-medium flex gap-2">
                        <span className="text-gray-500 font-bold bg-gray-100 px-2 rounded-md">{item.quantity}x</span>
                        {item.name}
                      </p>
                      <p className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Actions & Payment */}
            <div className="lg:w-[360px] bg-white lg:border-l border-gray-100 flex flex-col">
              <div className="flex-1 p-8 flex flex-col items-center justify-center gap-6">
                <div className="text-center w-full">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Tổng thu tiền</p>
                    <p className="text-4xl font-black text-[#EE501C] leading-none mb-4">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold ${
                        order.paymentMethod === 'Cash' 
                        ? 'bg-gray-50 border-gray-200 text-gray-600' 
                        : 'bg-green-50 border-green-200 text-green-700'
                    }`}>
                        {order.paymentMethod === 'Cash' ? '💵 Tiền mặt khi giao hàng' : '💳 Đã thanh toán Online'}
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <button 
                      onClick={() => handleOpenCallModal(order)}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-[0.98]"
                    >
                      <Phone size={20} />
                      Gọi Khách
                    </button>
                    <button 
                    onClick={() => handleComplete(order.id)}
                    disabled={!!processingId}
                    className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#1db954] text-white font-bold text-sm shadow-xl shadow-green-200 hover:bg-[#159c46] hover:shadow-green-300 transition-all active:scale-[0.98] ${
                      processingId === order.id ? 'opacity-80 cursor-wait' : ''
                    }`}
                    >
                    {processingId === order.id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={20} className="stroke-[3]" />
                    )}
                    Đã giao
                    </button>
                </div>
              </div>
            </div>

          </div>
        ))}
        {orders.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-300">
              <Check size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tuyệt vời!</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Bạn đã xử lý hết các đơn hàng hiện có. Hãy sang tab "Đơn hàng mới" để nhận thêm nhé!</p>
          </div>
        )}
      </div>

      {/* Customer Info Modal */}
      <Modal isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} maxWidth="md" hideCloseButton={true}>
        <div className="flex flex-col -m-6 bg-white relative">
            {/* Header */}
            <div className="bg-[#EE501C] px-6 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Thông tin khách hàng</h3>
                <button 
                  onClick={() => setCallModalOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
            </div>

            {/* Body */}
            <div className="p-6">
                {/* Profile Section (Horizontal) */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#EE501C] border-[3px] border-[#EE501C]/10 shadow-sm shrink-0 overflow-hidden">
                        {selectedOrderForCall?.customer?.avatar ? (
                            <img 
                                src={selectedOrderForCall.customer.avatar} 
                                alt={selectedOrderForCall.customer.name} 
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User size={32} strokeWidth={2.5} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-xl text-gray-900 leading-tight">
                            {selectedOrderForCall?.customer?.name || 'Khách hàng'}
                        </h4>
                        {selectedOrderForCall?.customer?.rank && (
                            <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide mt-1 w-fit">
                                {selectedOrderForCall.customer.rank}
                            </span>
                        )}
                    </div>
                </div>

                {/* Details Fields */}
                <div className="space-y-3">
                    <div className="flex items-center gap-4 px-4 py-3.5 border border-gray-200 rounded-[1.5rem] bg-white hover:border-gray-300 transition-colors">
                        <Phone size={20} className="text-[#EE501C] shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">SỐ ĐIỆN THOẠI</p>
                            <p className="text-sm font-bold text-gray-900">{selectedOrderForCall?.customer?.phone || '09xx xxx xxx'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 px-4 py-3.5 border border-gray-200 rounded-[1.5rem] bg-white hover:border-gray-300 transition-colors">
                        <Mail size={20} className="text-[#EE501C] shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">EMAIL</p>
                            <p className="text-sm font-bold text-gray-900 truncate">{selectedOrderForCall?.customer?.email || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 px-4 py-3.5 border border-gray-200 rounded-[1.5rem] bg-white hover:border-gray-300 transition-colors">
                        <MapPin size={20} className="text-[#EE501C] shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">ĐỊA CHỈ GIAO HÀNG</p>
                            <p className="text-sm font-bold text-gray-900 leading-snug">
                                {selectedOrderForCall?.deliveryAddress}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={() => setCallModalOpen(false)}
                        className="flex-1 py-3.5 rounded-full border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm"
                    >
                        Hủy
                    </button>
                    <button 
                        onClick={handleConfirmCall}
                        className="flex-1 py-3.5 rounded-full bg-[#EE501C] text-white font-bold shadow-lg shadow-orange-200 hover:bg-[#d44719] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <Phone size={18} className="fill-white" /> Gọi ngay
                    </button>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};
