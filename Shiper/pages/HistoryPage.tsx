
import React, { useState, useEffect, useRef } from 'react';
import { Order, OrderStatus } from '../types';

interface HistoryPageProps {
  orders: Order[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({ orders }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedStatus, setSelectedStatus] = useState<'All' | OrderStatus.Completed | OrderStatus.Cancelled>('All');
  
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Lấy ngày hiện tại và ngày hôm qua
  const today = new Date();
  const formattedToday = `${today.getDate().toString().padStart(2, '0')} Tháng ${(today.getMonth() + 1).toString().padStart(2, '0')}, ${today.getFullYear()}`;
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(today.getDate() - 1);
  const formattedYesterday = `${yesterdayDate.getDate().toString().padStart(2, '0')} Tháng ${(yesterdayDate.getMonth() + 1).toString().padStart(2, '0')}, ${yesterdayDate.getFullYear()}`;

  // Dữ liệu mẫu cho ngày hôm qua theo yêu cầu
  const MOCK_YESTERDAY_ORDERS: Order[] = [
    {
      id: '#OD-8815',
      storeName: 'Gà Rán Popeyes',
      storeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVuZnj_VNswSWiegSIIGoCDiK-jAr0jqrJ6UrZbkkDRzDL91daiXltMrkUs_d0R5HkfAvWJ2DDaKP9BQrLh2aOlyE8mcmjm1U2Cd5hre2TO4hFtIhoPHeSwtWrtjdHxw16p4uGJUX1J8tz3jJF-n0ba-SG_xePk7g07k4d0Bdgmobcf2hiVis4GNkGFSTLxZ-A9PF99P4041jHevilWp_ll0q-G4xD5p4xyBXly4YRNECfE8eWSFQcbv8MT4z5uIva_yDQk-66MDoT',
      storeAddress: '72 Lê Thánh Tôn, Quận 1, TP.HCM',
      deliveryAddress: '...',
      status: OrderStatus.Cancelled,
      paymentMethod: 'Cash',
      time: '19:40',
      totalAmount: 42000,
      items: []
    },
    {
      id: '#OD-8802',
      storeName: 'Trà Sữa Koi Thé',
      storeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBga-DWSdI4MG9l3vYqIW-1eJ-JsImP9I6YHkXvZZ51gj0OBy35iwncZV1ADjfKgrKNAh7pkQHgat5xB95l0PbVQX449D2Su7blUH6q6NoCyeAEkkIZfTlFTMEk-6OwGg5QKd9t6i0tmHbK1nOhWKOziGziTVL44H1ijnS5k7UH8541nEtCvPd1pnTncvM9Evb9VoFxwL3Y51ndIzGVsFZvrkXLW8Ta9reCkgshaty5ZxHwzmR-ALV4QojZllZQ5syUeLau18-XswK9',
      storeAddress: '10 Nguyễn Thị Minh Khai, Quận 1',
      deliveryAddress: '...',
      status: OrderStatus.Completed,
      paymentMethod: 'Cash',
      time: '10:15',
      totalAmount: 55000,
      items: []
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) setIsMonthOpen(false);
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setIsStatusOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOrderList = (list: Order[]) => {
    return list.filter(order => {
      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
      return matchesStatus;
    });
  };

  const filteredTodayOrders = filterOrderList(orders);
  const filteredYesterdayOrders = filterOrderList(MOCK_YESTERDAY_ORDERS);

  const totalEarnings = [...filteredTodayOrders, ...filteredYesterdayOrders].reduce((acc, curr) => 
    acc + (curr.status === OrderStatus.Completed ? curr.totalAmount : 0), 0
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const statuses = [
    { label: 'Tất cả', value: 'All' },
    { label: 'Hoàn thành', value: OrderStatus.Completed },
    { label: 'Đã hủy', value: OrderStatus.Cancelled },
  ];

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 rounded-[2.5rem] p-4 flex items-center gap-5 shadow-sm hover:shadow-md transition-all group">
      <div 
        className={`w-20 h-20 rounded-[1.5rem] bg-cover bg-center shrink-0 shadow-sm border border-gray-100 ${order.status === OrderStatus.Cancelled ? 'grayscale opacity-70' : ''}`} 
        style={{ backgroundImage: `url("${order.storeImage}")` }}
      />
      
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h4 className="text-base font-bold text-text-main dark:text-white truncate">{order.storeName}</h4>
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter ${
            order.status === OrderStatus.Completed 
              ? 'bg-[#e8fbf1] text-[#1db954] dark:bg-green-500/10' 
              : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
          }`}>
            {order.status === OrderStatus.Completed ? 'HOÀN THÀNH' : 'ĐÃ HỦY'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-400">
          <span className="material-symbols-outlined text-[18px] text-[#9a5f4c]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <p className="text-sm font-medium truncate opacity-80">{order.storeAddress}</p>
        </div>
        
        <p className="text-[11px] text-[#9a5f4c] font-medium opacity-70">
          Mã đơn: {order.id} • {order.status === OrderStatus.Completed ? 'Giao lúc' : 'Hủy lúc'} {order.time}
        </p>
      </div>
      
      <div className="w-[1px] h-12 bg-[#f0e4e0] dark:bg-gray-800 mx-4 hidden md:block"></div>
      
      <div className="text-right flex flex-col items-end pr-4 min-w-[120px]">
        <p className={`text-2xl font-black leading-tight ${order.status === OrderStatus.Cancelled ? 'text-gray-400' : 'text-primary'}`}>
          {order.totalAmount.toLocaleString('vi-VN')}đ
        </p>
        <p className="text-[11px] text-[#9a5f4c] font-medium mt-0.5">
          {order.status === OrderStatus.Cancelled ? 'Khách hủy' : (order.paymentMethod === 'Cash' ? 'Tiền mặt' : 'Ví điện tử')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full overflow-y-auto p-4 lg:p-8 flex flex-col gap-8 animate-page-entry">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-main dark:text-white">Lịch sử hoạt động</h2>
          <p className="text-text-secondary dark:text-gray-400 text-sm mt-1 font-medium">Xem lại danh sách các đơn hàng đã hoàn thành</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="relative" ref={monthRef}>
            <button 
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f0e4e0] dark:border-gray-800 bg-white dark:bg-surface-dark hover:bg-gray-50 transition-all shadow-sm text-sm font-bold text-text-main dark:text-white min-w-[140px] justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#9a5f4c]">calendar_today</span>
                Tháng {selectedMonth}
              </div>
              <span className={`material-symbols-outlined text-[18px] text-text-secondary transition-transform ${isMonthOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isMonthOpen && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto py-2">
                {months.map(m => (
                  <button 
                    key={m}
                    onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }}
                    className={`w-full text-left px-5 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium ${selectedMonth === m ? 'text-primary' : 'text-text-main dark:text-gray-200'}`}
                  >
                    Tháng {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Selector */}
          <div className="relative" ref={statusRef}>
            <button 
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f0e4e0] dark:border-gray-800 bg-white dark:bg-surface-dark hover:bg-gray-50 transition-all shadow-sm text-sm font-bold text-text-main dark:text-white min-w-[180px] justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#9a5f4c]">filter_list</span>
                Trạng thái: {statuses.find(s => s.value === selectedStatus)?.label}
              </div>
              <span className={`material-symbols-outlined text-[18px] text-text-secondary transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isStatusOpen && (
              <div className="absolute top-full mt-2 right-0 w-full bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 rounded-2xl shadow-xl z-50 py-2">
                {statuses.map(s => (
                  <button 
                    key={s.value}
                    onClick={() => { setSelectedStatus(s.value as any); setIsStatusOpen(false); }}
                    className={`w-full text-left px-5 py-2 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium ${selectedStatus === s.value ? 'text-primary' : 'text-text-main dark:text-gray-200'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-[2rem] bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 shadow-sm flex flex-col gap-1">
          <p className="text-[11px] text-[#9a5f4c] font-bold uppercase tracking-tight">Tổng đơn tháng này</p>
          <p className="text-3xl font-black text-text-main dark:text-white">{filteredTodayOrders.length + filteredYesterdayOrders.length}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 shadow-sm flex flex-col gap-1">
          <p className="text-[11px] text-[#9a5f4c] font-bold uppercase tracking-tight">Thu nhập ước tính</p>
          <p className="text-3xl font-black text-primary">{totalEarnings.toLocaleString('vi-VN')}đ</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 shadow-sm flex flex-col gap-1">
          <p className="text-[11px] text-[#9a5f4c] font-bold uppercase tracking-tight">Tổng thời gian chạy</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-black text-text-main dark:text-white">152 giờ</p>
            <span className="material-symbols-outlined text-green-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white dark:bg-surface-dark border border-[#f0e4e0] dark:border-gray-800 shadow-sm flex flex-col gap-1">
          <p className="text-[11px] text-[#9a5f4c] font-bold uppercase tracking-tight">Tổng quãng đường</p>
          <p className="text-3xl font-black text-text-main dark:text-white">450km</p>
        </div>
      </div>

      {/* Date Groups and List */}
      <div className="flex flex-col gap-10 pb-12">
        {/* Today Group */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-text-main dark:text-white whitespace-nowrap">Hôm nay</h3>
            <div className="h-[1px] flex-1 bg-[#f0e4e0] dark:bg-gray-800"></div>
            <span className="text-xs text-[#9a5f4c] font-bold uppercase tracking-wider">{formattedToday}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredTodayOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {filteredTodayOrders.length === 0 && (
              <div className="py-4 text-center text-text-secondary opacity-50 italic text-sm">Không có đơn hàng nào hôm nay</div>
            )}
          </div>
        </div>

        {/* Yesterday Group */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-text-main dark:text-white whitespace-nowrap">Hôm qua</h3>
            <div className="h-[1px] flex-1 bg-[#f0e4e0] dark:bg-gray-800"></div>
            <span className="text-xs text-[#9a5f4c] font-bold uppercase tracking-wider">{formattedYesterday}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredYesterdayOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {filteredYesterdayOrders.length === 0 && (
              <div className="py-4 text-center text-text-secondary opacity-50 italic text-sm">Không có đơn hàng nào hôm qua</div>
            )}
          </div>
        </div>

        {(filteredTodayOrders.length === 0 && filteredYesterdayOrders.length === 0) && (
          <div className="py-20 text-center text-text-secondary dark:text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">history_toggle_off</span>
            </div>
            <p className="font-medium">Không tìm thấy đơn hàng nào phù hợp với bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
