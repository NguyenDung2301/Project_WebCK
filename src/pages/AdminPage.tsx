
import React, { useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { Search, Plus, ShoppingBag, Package, Clock, CheckCircle, ChevronRight, Trash2, Check } from 'lucide-react';
import { useUserManagement } from '../hooks/useUserManagement';
import { UserTable } from '../components/admin/UserTable';
import { AdminModals } from '../components/admin/AdminModals';
import { AdminLayout } from '../layouts/AdminLayout';
import { orderService, OrderUI } from '../services/orderService';
// Added missing import for userService
import { userService } from '../services/userService';
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const refreshOrders = () => {
    // Admin lấy TOÀN BỘ đơn hàng không phân biệt User
    setAllOrders(orderService.getAllOrders());
  };

  useEffect(() => {
    refreshOrders();
  }, [activeTab]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Hệ thống: Bạn có chắc chắn muốn xoá đơn hàng này vĩnh viễn khỏi cơ sở dữ liệu?')) {
      const updated = orderService.deleteOrder(id);
      setAllOrders([...updated]);
      showNotification('Đã xóa đơn hàng khỏi hệ thống');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
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
                  { label: 'Đang giao', count: 0, icon: <Package className="text-blue-500" />, color: 'bg-blue-50' },
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
                          // Fixed missing userService by adding import above
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

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={activeTab === 'users' ? "Quản lý Người dùng" : "Quản lý Đơn hàng"} 
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

      <div className="mb-10">
        <p className="text-gray-500 font-medium mb-1">Chào mừng quay trở lại, Admin!</p>
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Hệ thống quản trị trung tâm</h2>
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
