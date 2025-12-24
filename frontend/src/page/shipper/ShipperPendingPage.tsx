
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShipperOrder, OrderStatus } from '../../types/shipper';
import { getShipperOrdersApi, acceptOrderApi, ignoreOrderApi } from '../../api/shipperApi';
import { Bell, Store, MapPin, Receipt, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ShipperPendingPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ShipperOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Ignore Modal State
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false);
  const [selectedIgnoreId, setSelectedIgnoreId] = useState<string | null>(null);
  const [ignoreReason, setIgnoreReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');

  // Load pending orders
  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getShipperOrdersApi(OrderStatus.Pending);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAccept = async (id: string) => {
    if (processingId) return;
    setProcessingId(id);
    
    try {
      const success = await acceptOrderApi(id);
      if (success) {
        // Navigate to Home Page (Active Deliveries) after accepting
        navigate('/shipper/home');
      } else {
        alert("Không thể nhận đơn hàng này (có thể đã bị hủy hoặc người khác nhận).");
        setProcessingId(null);
        loadOrders(); // Refresh list
      }
    } catch (error) {
      console.error(error);
      setProcessingId(null);
    }
  };

  const handleOpenIgnoreModal = (id: string) => {
    setSelectedIgnoreId(id);
    setIgnoreReason('');
    setCustomReason('');
    setIgnoreModalOpen(true);
  };

  const handleCloseIgnoreModal = () => {
    setIgnoreModalOpen(false);
    setSelectedIgnoreId(null);
  };

  const handleConfirmIgnore = async () => {
    if (!selectedIgnoreId) return;
    if (processingId) return;

    // Basic validation
    if (!ignoreReason) return;
    if (ignoreReason === 'Khác' && !customReason.trim()) return;

    setProcessingId(selectedIgnoreId);
    try {
      // In a real app, you would send the reason to the API here
      // const finalReason = ignoreReason === 'Khác' ? customReason : ignoreReason;
      await ignoreOrderApi(selectedIgnoreId);
      setIgnoreModalOpen(false);
      loadOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
      setSelectedIgnoreId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EE501C]"></div></div>;
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Đơn hàng mới</h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">Danh sách các đơn hàng đang chờ shipper tiếp nhận</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EE501C]/20 bg-orange-50 shadow-sm">
            <Bell size={20} className="text-[#EE501C] animate-bounce" />
            <span className="text-sm font-bold text-[#EE501C]">{orders.length} Đơn mới</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Header: Store Info & Status */}
            <div className="p-7 flex justify-between items-start bg-gradient-to-b from-gray-50/50 to-white">
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
              <span className="px-3 py-1.5 rounded-lg bg-[#FFF9C4] text-[#F9A825] text-[10px] font-black uppercase tracking-wider">
                ĐANG CHUẨN BỊ
              </span>
            </div>

            <div className="px-7">
              <div className="border-t border-dashed border-gray-200"></div>
            </div>

            {/* Address Section */}
            <div className="p-7 flex flex-col gap-6 relative">
              {/* Connecting line */}
              <div className="absolute left-[47px] top-[55px] bottom-[55px] w-px border-l-2 border-dashed border-gray-200"></div>
              
              <div className="flex gap-5 items-start relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <Store size={20} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">LẤY HÀNG TẠI</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{order.storeAddress}</p>
                </div>
              </div>

              <div className="flex gap-5 items-start relative z-10">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-[#EE501C]">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">GIAO ĐẾN</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{order.deliveryAddress}</p>
                </div>
              </div>
            </div>

            <div className="px-7">
              <div className="border-t border-dashed border-gray-200"></div>
            </div>

            {/* Order Items */}
            <div className="p-7 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <Receipt size={18} className="text-gray-400" />
                <h4 className="text-sm font-bold text-gray-800">Chi tiết đơn hàng</h4>
              </div>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm">
                    <p className="text-gray-900 font-medium flex gap-2">
                      <span className="text-gray-500 font-bold bg-gray-50 px-2 rounded-md">{item.quantity}x</span>
                      {item.name}
                    </p>
                    <p className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-7 mt-auto">
              <div className="border-t border-gray-100"></div>
            </div>

            {/* Footer / Actions */}
            <div className="p-7 flex items-center justify-between gap-4 bg-gray-50/30">
              <div className="flex flex-col">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Thu nhập đơn</p>
                <p className="text-2xl font-black text-[#EE501C] leading-none">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleOpenIgnoreModal(order.id)}
                  disabled={!!processingId}
                  className="px-6 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Bỏ qua
                </button>
                <button 
                  onClick={() => handleAccept(order.id)}
                  disabled={!!processingId}
                  className="px-8 py-3.5 rounded-2xl bg-[#EE501C] text-white font-bold text-sm shadow-xl shadow-orange-200 hover:bg-[#d44719] hover:shadow-orange-300 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-80 disabled:cursor-wait"
                >
                  {processingId === order.id ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                  <span>Chấp nhận</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center text-gray-400 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Bell size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Đang tìm đơn hàng...</h3>
            <p className="text-sm">Hệ thống sẽ tự động thông báo khi có đơn hàng mới gần bạn.</p>
          </div>
        )}
      </div>

      {/* Ignore Reason Modal */}
      <Modal isOpen={ignoreModalOpen} onClose={handleCloseIgnoreModal} maxWidth="md">
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#EE501C] border border-orange-100">
                    <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-black text-gray-900">Lý do bỏ qua đơn hàng</h3>
            </div>

            {/* Warning */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                <p className="text-sm text-orange-800 leading-relaxed font-medium">
                    Việc bỏ qua đơn hàng quá nhiều có thể ảnh hưởng đến hiệu suất làm việc và đánh giá của bạn.
                </p>
            </div>

            <p className="text-sm font-bold text-gray-700 mb-4">Vui lòng chọn lý do hoặc nhập lý do khác:</p>

            {/* Options */}
            <div className="space-y-3 mb-4">
                {['Khoảng cách quá xa', 'Đang bận việc cá nhân', 'Sự cố phương tiện'].map((reason) => (
                    <label key={reason} className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all select-none">
                        <div className="relative flex items-center">
                          <input 
                              type="radio" 
                              name="ignoreReason" 
                              value={reason} 
                              checked={ignoreReason === reason}
                              onChange={(e) => setIgnoreReason(e.target.value)}
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:border-[#EE501C] checked:bg-[#EE501C]"
                          />
                          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                            <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{reason}</span>
                    </label>
                ))}
                
                <label className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all select-none">
                    <div className="relative flex items-center">
                      <input 
                          type="radio" 
                          name="ignoreReason" 
                          value="Khác" 
                          checked={ignoreReason === 'Khác'}
                          onChange={(e) => setIgnoreReason(e.target.value)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:border-[#EE501C] checked:bg-[#EE501C]"
                      />
                      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Khác</span>
                </label>
            </div>

            {/* Textarea */}
            {ignoreReason === 'Khác' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <textarea 
                      className="w-full border border-gray-200 bg-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#EE501C] transition-all resize-none mb-6 font-medium text-gray-900 placeholder:text-gray-400"
                      placeholder="Nhập lý do cụ thể..."
                      rows={3}
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      autoFocus
                  />
                </div>
            )}

            {/* Footer */}
            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                <button 
                    onClick={handleCloseIgnoreModal}
                    className="flex-1 py-3.5 rounded-full border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm"
                >
                    Hủy
                </button>
                <button 
                    onClick={handleConfirmIgnore}
                    disabled={!ignoreReason || (ignoreReason === 'Khác' && !customReason.trim()) || !!processingId}
                    className="flex-1 py-3.5 rounded-full bg-[#EE501C] text-white font-bold hover:bg-[#d44719] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200 text-sm"
                >
                    {processingId === selectedIgnoreId ? 'Đang xử lý...' : 'Xác nhận bỏ qua'}
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
};
