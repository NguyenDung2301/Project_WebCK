import React, { useState, useEffect, useMemo } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Search, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';
import { getAllOrdersApi, deleteOrderApi } from '../../api/orderApi';
import { paginate } from '../../utils';

const ITEMS_PER_PAGE = 7;

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [currentPage, setCurrentPage] = useState(1);

  // Load Data
  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrdersApi();
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

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Tất cả trạng thái' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Pagination Logic
  const { data: paginatedOrders, pagination } = useMemo(() => {
    return paginate(filteredOrders, currentPage, ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const { totalItems, totalPages, startIndex, endIndex, hasNextPage, hasPrevPage } = pagination;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleDelete = async (id: string) => {
    if (confirm('Xóa đơn hàng này?')) {
      await deleteOrderApi(id);
      loadOrders();
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700 border border-green-200';
      case 'PENDING': return 'bg-amber-100 text-amber-700 border border-amber-200'; // Preparing
      case 'DELIVERING': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Hoàn thành';
      case 'PENDING': return 'Đang chuẩn bị';
      case 'DELIVERING': return 'Đang giao';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <AdminLayout title="Quản lý Đơn hàng">
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div>
          <p className="text-sm text-gray-500">Theo dõi, cập nhật và xử lý tất cả các đơn đặt hàng từ hệ thống.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EE501C] focus:border-[#EE501C] sm:text-sm text-gray-900 transition-colors" 
              placeholder="Tìm đơn hàng theo mã, khách hàng..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full sm:w-48 pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-[#EE501C] focus:border-[#EE501C] sm:text-sm rounded-lg bg-white text-gray-900 cursor-pointer"
            >
              <option value="Tất cả trạng thái">Tất cả trạng thái</option>
              <option value="PENDING">Đang chuẩn bị</option>
              <option value="DELIVERING">Đang giao</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Đang tải dữ liệu...</div>
          ) : (
          <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Mã đơn hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Khách hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Nhà hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Tổng tiền</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Trạng thái</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-500 font-mono">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-orange-100 text-[#EE501C] flex items-center justify-center text-xs font-bold mr-3 border border-orange-200">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                           <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                           <div className="text-[10px] text-gray-400">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{order.restaurant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-[#EE501C]">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full uppercase tracking-wide ${getStatusClasses(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <div className="flex items-center justify-end gap-3">
                          <button className="text-gray-400 hover:text-[#EE501C] transition-colors" title="Xem chi tiết">
                             <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Xóa đơn hàng"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                      Không tìm thấy đơn hàng nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Hiển thị <span className="font-bold text-gray-900">{totalItems > 0 ? startIndex : 0}</span> đến <span className="font-bold text-gray-900">{endIndex}</span> của <span className="font-bold text-gray-900">{totalItems}</span> đơn hàng
            </div>
            
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
              <button 
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={!hasPrevPage}
                className="px-2.5 py-2 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="px-6 py-2 text-sm text-gray-700 font-medium bg-white min-w-[120px] text-center">
                Trang {currentPage} / {totalPages || 1}
              </div>
              <button 
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={!hasNextPage}
                className="px-2.5 py-2 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};