
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus, Order } from '../types';

const ITEMS_PER_PAGE = 7;

const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả trạng thái');
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc toàn bộ danh sách dựa trên tìm kiếm và filter
  const allFilteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Tất cả trạng thái' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Tính toán số trang
  const totalPages = Math.ceil(allFilteredOrders.length / ITEMS_PER_PAGE) || 1;

  // Cắt danh sách theo trang hiện tại
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allFilteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allFilteredOrders, currentPage]);

  // Reset về trang 1 khi lọc hoặc tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const getStatusClasses = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800';
      case OrderStatus.PREPARING: return 'bg-amber-100 text-amber-800';
      case OrderStatus.DELIVERING: return 'bg-blue-100 text-blue-800';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Tính toán hiển thị "X đến Y của Z"
  const startItem = allFilteredOrders.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, allFilteredOrders.length);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <p className="text-sm text-gray-500">Theo dõi, cập nhật và xử lý tất cả các đơn đặt hàng từ hệ thống.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-round text-gray-400 text-lg">search</span>
          </span>
          <input 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-gray-900 transition-colors" 
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
            className="block w-full sm:w-48 pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white text-gray-900 cursor-pointer"
          >
            <option>Tất cả trạng thái</option>
            {Object.values(OrderStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Mã đơn hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Nhà hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Tổng tiền</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" scope="col">Thời gian</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold mr-3">
                        {order.avatar}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.restaurant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{order.total.toLocaleString()}₫</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.timestamp}</td>
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
        
        <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Hiển thị <span className="font-bold text-gray-900">{startItem}</span> đến <span className="font-bold text-gray-900">{endItem}</span> của <span className="font-bold text-gray-900">{allFilteredOrders.length}</span> đơn hàng
          </div>
          
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-2.5 py-2 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-icons-round text-lg none">chevron_left</span>
            </button>
            <div className="px-6 py-2 text-sm text-gray-700 font-medium bg-white min-w-[120px] text-center">
              Trang {currentPage} / {totalPages}
            </div>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2.5 py-2 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-icons-round text-lg none">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
