
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/common/Button';
import { 
  Search, Plus, ShoppingBag, Package, Clock, CheckCircle, ChevronRight, 
  Trash2, Check, DollarSign, Users as UsersIcon, Store, Star, Menu as MenuIcon, 
  Lock, ArrowUpRight, BarChart3, TrendingUp, MoreHorizontal, Utensils, Unlock
} from 'lucide-react';
import { useUserManagement } from '../hooks/useUserManagement';
import { UserTable } from '../components/admin/UserTable';
import { AdminModals } from '../components/admin/AdminModals';
import { AdminLayout } from '../layouts/AdminLayout';
import { orderService, OrderUI } from '../services/orderService';
import { userService } from '../services/userService';
import { restaurantService } from '../services/restaurantService';
import { foodApi } from '../api/foodApi';
import { Badge } from '../components/common/Badge';
import { cn } from '../utils/cn';

interface AdminPageProps {
  onHome?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onHome }) => {
  const {
    activeTab,
    setActiveTab,
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    modal,
    openModal,
    closeModal,
    handleDeleteUser,
    handleToggleStatus,
    handleSaveUser
  } = useUserManagement();

  const [allOrders, setAllOrders] = useState<OrderUI[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const refreshData = () => {
    setAllOrders(orderService.getAllOrders());
    setRestaurants(restaurantService.getRestaurants());
  };

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Hệ thống: Bạn có chắc chắn muốn xoá đơn hàng này vĩnh viễn?')) {
      const updated = orderService.deleteOrder(id);
      setAllOrders([...updated]);
      showNotification('Đã xóa đơn hàng khỏi hệ thống');
    }
  };

  const handleToggleResStatus = (id: string) => {
    const updated = restaurantService.toggleStatus(id);
    setRestaurants(updated);
    showNotification('Đã cập nhật trạng thái nhà hàng và thực đơn');
  };

  const handleDeleteRes = (id: string) => {
    if (window.confirm('CẢNH BÁO: Xóa nhà hàng sẽ xóa VĨNH VIỄN tất cả món ăn liên quan. Tiếp tục?')) {
      const updated = restaurantService.deleteRestaurant(id);
      setRestaurants(updated);
      showNotification('Đã xóa nhà hàng và các món ăn liên quan');
    }
  };

  // --- DASHBOARD COMPONENTS ---
  const DashboardView = () => {
    const totalRevenue = useMemo(() => allOrders.reduce((sum, o) => sum + o.price, 0), [allOrders]);
    
    const todayRevenue = useMemo(() => {
      const today = new Date().toDateString();
      return allOrders
        .filter(o => new Date(o.createdAt).toDateString() === today)
        .reduce((sum, o) => sum + o.price, 0);
    }, [allOrders]);

    const activeUsersCount = useMemo(() => {
      const uniqueUsers = new Set(allOrders.map(o => o.userId));
      return uniqueUsers.size;
    }, [allOrders]);

    // Thống kê đơn hàng theo sản phẩm
    const productSales = useMemo(() => {
      const counts: Record<string, number> = {};
      allOrders.forEach(order => {
        counts[order.itemName] = (counts[order.itemName] || 0) + 1;
      });
      return counts;
    }, [allOrders]);

    // Thống kê đơn hàng theo nhà hàng
    const restaurantSales = useMemo(() => {
      const counts: Record<string, number> = {};
      allOrders.forEach(order => {
        counts[order.storeName] = (counts[order.storeName] || 0) + 1;
      });
      return counts;
    }, [allOrders]);

    // Lấy top sản phẩm thực tế từ đơn hàng
    const topFoods = useMemo(() => {
      const allFoods = foodApi.getAll();
      return [...allFoods]
        .sort((a, b) => (productSales[b.name] || 0) - (productSales[a.name] || 0))
        .slice(0, 4);
    }, [productSales]);

    // Lấy top nhà hàng thực tế từ đơn hàng
    const topRestaurants = useMemo(() => {
      return [...restaurants]
        .sort((a, b) => (restaurantSales[b.name] || 0) - (restaurantSales[a.name] || 0))
        .slice(0, 4);
    }, [restaurants, restaurantSales]);

    const stats = [
      { label: 'Tổng doanh thu hệ thống', value: `${totalRevenue.toLocaleString()} ₫`, trend: '+12.5%', icon: <DollarSign />, color: 'text-red-600', bg: 'bg-red-50' },
      { label: 'Doanh thu hôm nay', value: `${todayRevenue.toLocaleString()} ₫`, trend: todayRevenue > 0 ? '+100%' : '0%', icon: <TrendingUp />, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Khách hàng đã đặt món', value: activeUsersCount.toString(), trend: '+5.4%', icon: <UsersIcon />, color: 'text-purple-600', bg: 'bg-purple-50' },
      { label: 'Tổng số nhà hàng', value: restaurants.length.toString(), trend: 'Ổn định', icon: <Store />, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    // Simulate monthly chart data based on orders
    const monthlyData = useMemo(() => {
      const months = Array(12).fill(0);
      allOrders.forEach(o => {
        const month = new Date(o.createdAt).getMonth();
        months[month] += o.price / 1000000; // In millions
      });
      return months;
    }, [allOrders]);

    const maxRevenue = Math.max(...monthlyData, 1);

    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-primary-500 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Biểu đồ doanh thu tháng (triệu ₫)</h3>
              <select className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-none bg-gray-50 rounded-xl px-4 py-2">
                <option>Năm nay</option>
              </select>
            </div>
            <div className="flex items-end justify-between h-64 gap-2">
              {monthlyData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div 
                    className="w-full bg-primary-500 rounded-t-xl transition-all duration-1000 group-hover:bg-primary-600 group-hover:shadow-lg group-hover:shadow-primary-100"
                    style={{ height: `${(val / maxRevenue) * 100}%` }}
                  ></div>
                  <span className="text-[10px] font-black text-gray-300">T{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-gray-900 tracking-tight mb-10">Trạng thái đơn hàng</h3>
            <div className="relative flex-1 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-[16px] border-gray-50 flex items-center justify-center relative">
                <div className="text-center">
                   <p className="text-3xl font-black text-gray-900">{allOrders.length}</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng đơn</p>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
               {[
                 { label: 'Hoàn thành', color: 'bg-green-500', count: allOrders.filter(o => o.status === 'Đã giao').length },
                 { label: 'Chuẩn bị', color: 'bg-orange-500', count: allOrders.filter(o => o.status === 'Đang chuẩn bị').length },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight truncate">{item.label}</span>
                    <span className="text-[10px] font-black text-gray-900 ml-auto">{item.count}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Hoạt động gần đây</h3>
             <div className="space-y-6">
                {allOrders.slice(0, 4).map((o, i) => (
                  <div key={i} className="flex gap-4 group">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 bg-blue-100 text-blue-600">
                        {o.storeName.charAt(0)}
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                           <span className="text-primary-600">#{o.id.slice(-6)}</span> {o.itemName} tại <span className="text-gray-400">{o.storeName}</span>
                        </p>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1 block">{o.orderTime}</span>
                     </div>
                  </div>
                ))}
                {allOrders.length === 0 && <p className="text-center text-gray-400 text-xs italic">Chưa có hoạt động nào</p>}
             </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Sản phẩm bán chạy</h3>
              <div className="space-y-6">
                 {topFoods.map((food, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border-2 border-white shadow-sm shrink-0">
                         <img src={food.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-black text-gray-900 truncate group-hover:text-primary-600 transition-colors">{food.name}</p>
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">{food.category}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-black text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
                           {productSales[food.name] || 0} đơn
                         </span>
                      </div>
                   </div>
                 ))}
                 {topFoods.length === 0 && <p className="text-center text-gray-400 text-xs italic py-10">Chưa có dữ liệu bán hàng</p>}
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Top nhà hàng hoạt động</h3>
              <div className="space-y-6">
                 {topRestaurants.map((res, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-primary-600 font-black text-lg border-2 border-white shadow-sm shrink-0">
                         {res.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-black text-gray-900 truncate group-hover:text-primary-600 transition-colors">{res.name}</p>
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">
                           {res.status === 'Active' ? 'Hoạt động' : 'Tạm nghỉ'}
                         </p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-gray-900">{restaurantSales[res.name] || 0} đơn</p>
                         <p className="text-[10px] font-bold text-gray-400">{res.rating} ★</p>
                      </div>
                   </div>
                 ))}
                 {topRestaurants.length === 0 && <p className="text-center text-gray-400 text-xs italic py-10">Chưa có dữ liệu nhà hàng</p>}
              </div>
           </div>
        </div>
      </div>
    );
  };

  // --- RESTAURANTS MANAGEMENT VIEW ---
  const RestaurantsView = () => {
    const [resSearch, setResSearch] = useState('');
    
    const filteredRestaurants = useMemo(() => {
      return restaurants.filter(r => 
        r.name.toLowerCase().includes(resSearch.toLowerCase()) || 
        r._id.toLowerCase().includes(resSearch.toLowerCase())
      );
    }, [resSearch]);

    return (
      <div className="animate-in fade-in duration-500 space-y-8">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-300 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Tìm theo tên nhà hàng, mã ID..."
              className="block w-full pl-12 pr-6 py-3 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/20 text-sm font-semibold transition-all"
              value={resSearch}
              onChange={(e) => setResSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
             <Button icon={<Plus size={18} strokeWidth={3} />} className="whitespace-nowrap px-8 py-3.5 shadow-xl shadow-primary-200 font-black text-[11px] uppercase tracking-widest">
                Thêm nhà hàng
             </Button>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-50">
                 <thead className="bg-gray-50/30">
                    <tr>
                       <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">ID</th>
                       <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nhà hàng</th>
                       <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Địa chỉ</th>
                       <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Liên hệ</th>
                       <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Trạng thái</th>
                       <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Thao tác</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {filteredRestaurants.map((res, i) => (
                      <tr key={res._id} className="hover:bg-gray-50/30 transition-colors group">
                         <td className="px-8 py-6 whitespace-nowrap text-xs font-mono text-gray-400">#RES-{res._id.slice(-3)}</td>
                         <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-primary-600 font-black border-2 border-white shadow-sm shrink-0">
                                  {res.name.charAt(0)}
                               </div>
                               <div>
                                  <p className="text-sm font-black text-gray-900 group-hover:text-primary-600 transition-colors">{res.name}</p>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{res.rating} ★ Rating</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-xs font-bold text-gray-500 max-w-[200px] truncate">{res.address}</td>
                         <td className="px-8 py-6 whitespace-nowrap">
                            <p className="text-xs font-black text-gray-900 mb-0.5">{res.phone}</p>
                            <p className="text-[10px] font-bold text-gray-400 italic">contact@{res._id.slice(-3)}.com</p>
                         </td>
                         <td className="px-8 py-6 whitespace-nowrap">
                            <Badge variant={res.status === 'Active' ? 'success' : 'danger'} className="px-3 py-1 uppercase text-[9px] font-black tracking-widest">
                               {res.status === 'Active' ? 'Đang hoạt động' : 'Bị khóa'}
                            </Badge>
                         </td>
                         <td className="px-8 py-6 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1">
                               <button 
                                 onClick={() => handleToggleResStatus(res._id)}
                                 className={cn(
                                   "p-2.5 transition-all rounded-xl",
                                   res.status === 'Active' ? "text-gray-300 hover:text-red-500 hover:bg-red-50" : "text-gray-300 hover:text-green-500 hover:bg-green-50"
                                 )} 
                                 title={res.status === 'Active' ? "Khóa nhà hàng" : "Mở khóa nhà hàng"}
                               >
                                  {res.status === 'Active' ? <Lock size={18}/> : <Unlock size={18}/>}
                               </button>
                               <button 
                                 onClick={() => handleDeleteRes(res._id)}
                                 className="p-2.5 text-gray-300 hover:text-red-600 transition-all hover:bg-red-50 rounded-xl" 
                                 title="Xóa vĩnh viễn"
                               >
                                  <Trash2 size={18}/>
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      
      case 'restaurants':
        return <RestaurantsView />;

      case 'users':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-[32px] shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="relative flex-1 max-w-lg group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-300 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm theo tên, email hoặc SĐT..."
                  className="block w-full pl-12 pr-6 py-3 border border-gray-100 rounded-2xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/20 text-sm font-semibold transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4">
                  <select 
                      className="pl-5 pr-10 py-3 text-sm border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500/20 rounded-2xl border bg-gray-50/50 text-gray-600 font-bold cursor-pointer appearance-none shadow-sm min-w-[180px]"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                  >
                      <option value="All">Tất cả vai trò</option>
                      <option value="Customer">Khách hàng</option>
                      <option value="Driver">Tài xế</option>
                      <option value="Restaurant">Nhà hàng/Đối tác</option>
                      <option value="Admin">Admin</option>
                  </select>
                  <Button 
                      onClick={() => openModal('ADD')} 
                      icon={<Plus size={18} strokeWidth={3} />}
                      className="whitespace-nowrap px-8 py-3.5 shadow-xl shadow-primary-200 font-black text-[11px] uppercase tracking-widest"
                  >
                      Thêm người dùng
                  </Button>
              </div>
            </div>

            <UserTable 
              users={filteredUsers}
              totalUsers={users.length}
              onView={(user) => openModal('VIEW', user)}
              onEdit={(user) => openModal('EDIT', user)}
              onDelete={(user) => openModal('DELETE', user)}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        );

      case 'orders':
        return (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Tổng đơn hàng', count: allOrders.length, icon: <ShoppingBag className="text-gray-400" />, color: 'bg-gray-50' },
                  { label: 'Chờ xác nhận', count: allOrders.filter(o => o.status === 'Đang chuẩn bị').length, icon: <Clock className="text-orange-500" />, color: 'bg-orange-50' },
                  { label: 'Hoàn thành', count: allOrders.filter(o => o.status === 'Đã giao').length, icon: <CheckCircle className="text-green-500" />, color: 'bg-green-50' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
                     <div>
                        <div className="text-2xl font-black text-gray-900 mb-1">{stat.count}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                     </div>
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                        {stat.icon}
                     </div>
                  </div>
                ))}
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">Danh sách đơn hàng toàn hệ thống</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-50">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Mã đơn</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Người đặt</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cửa hàng</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tổng tiền</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Trạng thái</th>
                           <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hành động</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {allOrders.length > 0 ? allOrders.map((order) => {
                          const orderUser = userService.getUsers().find(u => u._id === order.userId);
                          return (
                            <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                               <td className="px-8 py-5 whitespace-nowrap text-xs font-mono text-gray-400">#{order.id.slice(-6)}</td>
                               <td className="px-8 py-5 whitespace-nowrap">
                                  <div className="text-sm font-bold text-gray-900">{orderUser?.name || 'Ẩn danh'}</div>
                                  <div className="text-[10px] text-gray-400">{order.userId}</div>
                               </td>
                               <td className="px-8 py-5 whitespace-nowrap font-bold text-sm">{order.storeName}</td>
                               <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-primary-600">{order.price.toLocaleString()}đ</td>
                               <td className="px-8 py-5 whitespace-nowrap">
                                  <Badge variant={order.status === 'Đã giao' ? 'success' : 'warning'} className="uppercase text-[9px] font-black tracking-widest px-3 py-1">
                                     {order.status}
                                  </Badge>
                               </td>
                               <td className="px-8 py-5 whitespace-nowrap text-right">
                                  <button 
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    title="Xoá vĩnh viễn"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                               </td>
                            </tr>
                          )
                        }) : (
                          <tr>
                             <td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-black uppercase tracking-widest">
                                Trống
                             </td>
                          </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Tổng quan hoạt động';
      case 'users': return 'Quản lý Người dùng';
      case 'restaurants': return 'Quản lý Nhà hàng';
      case 'orders': return 'Quản lý Đơn hàng';
      default: return 'Admin Dashboard';
    }
  }

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={getPageTitle()} 
      onHome={onHome}
    >
      {showToast && (
        <div className="fixed top-24 right-8 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full duration-300 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <p className="text-sm font-bold uppercase tracking-tight">{toastMessage}</p>
        </div>
      )}

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-gray-500 font-medium mb-1">Chào mừng quay trở lại, Admin!</p>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Hệ thống quản trị trung tâm</h2>
        </div>
        {activeTab === 'dashboard' && (
           <Button icon={<BarChart3 size={16} />} variant="secondary" className="text-xs uppercase tracking-widest font-black">Xuất báo cáo</Button>
        )}
      </div>

      {renderContent()}

      <AdminModals 
        modal={modal}
        onClose={closeModal}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      />
    </AdminLayout>
  );
};
