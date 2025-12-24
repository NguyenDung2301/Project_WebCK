
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShipperOrder, OrderStatus } from '../../types/shipper';
import { getShipperOrdersApi } from '../../api/shipperApi';
import { Calendar, ChevronDown, Filter, Clock, MapPin, History } from 'lucide-react';

export const ShipperHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<ShipperOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedStatus, setSelectedStatus] = useState<'All' | OrderStatus.Completed | OrderStatus.Cancelled>('All');
  
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Fetch History Orders
  useEffect(() => {
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getShipperOrdersApi('HISTORY');
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) setIsMonthOpen(false);
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setIsStatusOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter orders based on status
  const filteredOrders = useMemo(() => {
      return orders.filter(order => {
          const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
          return matchesStatus;
      });
  }, [orders, selectedStatus]);

  // --- GROUPING LOGIC START ---
  const groupedOrders = useMemo(() => {
    const groups: { [key: string]: { label: string; displayDate: string; orders: ShipperOrder[]; timestamp: number } } = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDate = (d1: Date, d2: Date) => 
      d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

    // Helper to format date like "24 Tháng 05, 2024"
    const formatDateLabel = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day} Tháng ${month}, ${year}`;
    };

    filteredOrders.forEach(order => {
      // Parse time string "HH:mm - DD/MM" -> Date Object
      let orderDate = new Date();
      try {
        if (order.time.includes('-')) {
           const datePart = order.time.split('-')[1].trim(); // "24/05"
           const [day, month] = datePart.split('/').map(Number);
           const currentYear = new Date().getFullYear();
           // Handle year boundary if needed, but assuming current year for simplicity
           orderDate = new Date(currentYear, month - 1, day);
        } else {
           orderDate = new Date(); 
        }
      } catch (e) {
        orderDate = new Date();
      }

      // Determine Group Label
      let groupKey = '';
      let label = '';
      let displayDate = '';

      if (isSameDate(orderDate, today)) {
        groupKey = 'today';
        label = 'Hôm nay';
        displayDate = formatDateLabel(orderDate);
      } else if (isSameDate(orderDate, yesterday)) {
        groupKey = 'yesterday';
        label = 'Hôm qua';
        displayDate = formatDateLabel(orderDate);
      } else {
        // Group by specific date
        groupKey = orderDate.toISOString().split('T')[0];
        // Empty label on left, date on right (consistent with screenshot and Today/Yesterday secondary date)
        label = ''; 
        displayDate = formatDateLabel(orderDate);
      }

      if (!groups[groupKey]) {
        groups[groupKey] = {
          label,
          displayDate,
          orders: [],
          timestamp: orderDate.getTime()
        };
      }
      groups[groupKey].orders.push(order);
    });

    // Convert object to array and sort by date descending
    return Object.values(groups).sort((a, b) => {
        if (a.label === 'Hôm nay') return -1;
        if (b.label === 'Hôm nay') return 1;
        if (a.label === 'Hôm qua') return -1;
        if (b.label === 'Hôm qua') return 1;
        return b.timestamp - a.timestamp;
    });
  }, [filteredOrders]);
  // --- GROUPING LOGIC END ---

  // Total Earnings from history
  const totalEarnings = orders.reduce((acc, curr) => 
    acc + (curr.status === OrderStatus.Completed ? curr.totalAmount : 0), 0
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const statuses = [
    { label: 'Tất cả', value: 'All' },
    { label: 'Hoàn thành', value: OrderStatus.Completed },
    { label: 'Đã hủy', value: OrderStatus.Cancelled },
  ];

  const OrderCard: React.FC<{ order: ShipperOrder }> = ({ order }) => (
    <div className="bg-white border border-[#f0e4e0] rounded-[2.5rem] p-5 flex items-center gap-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
      <div 
        className={`w-20 h-20 rounded-[1.5rem] bg-cover bg-center shrink-0 shadow-sm border border-gray-100 ${order.status === OrderStatus.Cancelled ? 'grayscale opacity-70' : ''}`} 
        style={{ backgroundImage: `url("${order.storeImage}")` }}
      />
      
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h4 className="text-base font-bold text-gray-900 truncate">{order.storeName}</h4>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
            order.status === OrderStatus.Completed 
              ? 'bg-[#e8fbf1] text-[#1db954]' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            {order.status === OrderStatus.Completed ? 'HOÀN THÀNH' : 'ĐÃ HỦY'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500">
          <MapPin size={16} className="text-[#EE501C]" />
          <p className="text-sm font-medium truncate opacity-90">{order.storeAddress}</p>
        </div>
        
        <p className="text-[11px] text-gray-400 font-medium">
          Mã đơn: <span className="font-mono text-gray-600">{order.id}</span> • {order.status === OrderStatus.Completed ? 'Giao lúc' : 'Hủy lúc'} {order.time.split('-')[0]}
        </p>
      </div>
      
      <div className="w-px h-12 bg-gray-100 mx-2 hidden md:block"></div>
      
      <div className="text-right flex flex-col items-end pr-2 min-w-[100px]">
        <p className={`text-2xl font-black leading-tight ${order.status === OrderStatus.Cancelled ? 'text-gray-400' : 'text-[#EE501C]'}`}>
          {order.totalAmount.toLocaleString('vi-VN')}đ
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-1">
          {order.status === OrderStatus.Cancelled ? 'Khách hủy' : (order.paymentMethod === 'Cash' ? 'Tiền mặt' : 'Ví điện tử')}
        </p>
      </div>
    </div>
  );

  if (loading) {
      return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EE501C]"></div></div>;
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Lịch sử hoạt động</h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">Xem lại danh sách các đơn hàng đã hoàn thành</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="relative" ref={monthRef}>
            <button 
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm text-sm font-bold text-gray-700 min-w-[150px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#EE501C]" />
                Tháng {selectedMonth}
              </div>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMonthOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMonthOpen && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto py-2">
                {months.map(m => (
                  <button 
                    key={m}
                    onClick={() => { setSelectedMonth(m); setIsMonthOpen(false); }}
                    className={`w-full text-left px-5 py-2 hover:bg-gray-50 text-sm font-medium ${selectedMonth === m ? 'text-[#EE501C] bg-orange-50' : 'text-gray-900'}`}
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm text-sm font-bold text-gray-700 min-w-[200px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#EE501C]" />
                Trạng thái: {statuses.find(s => s.value === selectedStatus)?.label}
              </div>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
            </button>
            {isStatusOpen && (
              <div className="absolute top-full mt-2 right-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2">
                {statuses.map(s => (
                  <button 
                    key={s.value}
                    onClick={() => { setSelectedStatus(s.value as any); setIsStatusOpen(false); }}
                    className={`w-full text-left px-5 py-2 hover:bg-gray-50 text-sm font-medium ${selectedStatus === s.value ? 'text-[#EE501C] bg-orange-50' : 'text-gray-900'}`}
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
        <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-all">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Tổng đơn tháng này</p>
          <p className="text-3xl font-black text-gray-900">{orders.length}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-all">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Thu nhập ước tính</p>
          <p className="text-3xl font-black text-[#EE501C]">{totalEarnings.toLocaleString('vi-VN')}đ</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-all">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Tổng thời gian chạy</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-black text-gray-900">152 giờ</p>
            <Clock size={20} className="text-green-500 fill-green-100" />
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-all">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Tổng quãng đường</p>
          <p className="text-3xl font-black text-gray-900">450km</p>
        </div>
      </div>

      {/* Date Groups and List */}
      <div className="flex flex-col gap-10">
        {groupedOrders.length > 0 ? (
          groupedOrders.map((group) => (
            <div key={group.label + group.displayDate} className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                {group.label && (
                  <h3 className="text-lg font-bold text-gray-900 whitespace-nowrap min-w-[80px]">{group.label}</h3>
                )}
                <div className="h-px flex-1 bg-gray-200"></div>
                {group.displayDate && (
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{group.displayDate}</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {group.orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-400">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <History size={40} className="text-gray-300" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Không tìm thấy dữ liệu</p>
            <p className="text-sm">Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}
      </div>
    </div>
  );
};
