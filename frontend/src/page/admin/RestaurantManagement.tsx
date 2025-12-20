import React, { useState, useEffect, useMemo } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  Search, Plus, Filter, Star, UtensilsCrossed, Lock, Unlock, Trash2
} from 'lucide-react';
import { getRestaurantsApi, deleteRestaurantApi, updateRestaurantStatusApi } from '../../api/restaurantApi';
import { paginate } from '../../utils';
import { RestaurantModals } from '../../components/admin/RestaurantModals';
import { Restaurant } from '../../types/common';
import { Pagination } from '../../components/common/Pagination';

export const RestaurantManagement: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'MENU' | 'DELETE' | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  const ITEMS_PER_PAGE = 7;

  // Load data from "Database"
  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getRestaurantsApi();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to load restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Handlers for Modals
  const openMenuModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveModal('MENU');
  };

  const openDeleteModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveModal('DELETE');
  };

  const closeModals = () => {
    setActiveModal(null);
    setSelectedRestaurant(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedRestaurant) {
      await deleteRestaurantApi(selectedRestaurant.id);
      await loadRestaurants();
      closeModals();
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await updateRestaurantStatusApi(id, newStatus);
    loadRestaurants();
  };

  // Filter Logic
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(res => {
      const name = res.name || '';
      const id = res.id || '';
      const status = res.status || '';

      const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter ? status.toLowerCase() === statusFilter.toLowerCase() : true;
      return matchSearch && matchStatus;
    });
  }, [restaurants, searchTerm, statusFilter]);

  // Pagination Logic
  const { data: paginatedData, pagination } = useMemo(() => {
    return paginate(filteredRestaurants, currentPage, ITEMS_PER_PAGE);
  }, [filteredRestaurants, currentPage]);

  const { totalItems, totalPages, startIndex, endIndex } = pagination;

  return (
    <AdminLayout title="Quản lý Nhà hàng">
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Danh sách đối tác</h2>
            <p className="text-sm text-gray-500 mt-1">Quản lý thông tin và trạng thái của tất cả nhà hàng trong hệ thống (Dữ liệu từ folder data).</p>
          </div>
          <button className="bg-[#EE501C] hover:bg-[#d64215] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Thêm nhà hàng mới
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-[#EE501C] focus:border-[#EE501C] transition-colors text-sm text-gray-900 placeholder-gray-400 outline-none"
              placeholder="Tìm kiếm theo tên nhà hàng, mã ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="py-2 px-3 pr-8 rounded-lg border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-[#EE501C] focus:border-[#EE501C] text-sm text-gray-500 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
            <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors flex items-center">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {loading ? (
             <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
          ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500">Restaurant ID</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Tên nhà hàng</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Địa chỉ</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Liên hệ</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-center">Đánh giá</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-right">Hoạt động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? paginatedData.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 text-gray-500 font-mono">{res.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0 ${res.colorClass || 'bg-gray-100 text-gray-600'}`}>
                          {res.initial || res.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{res.name}</p>
                          <p className="text-xs text-gray-500">{res.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={res.address}>
                      {res.address}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-medium">{res.phone}</span>
                        <span className="text-xs text-gray-500">{res.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-600 font-medium text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {res.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {res.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Đang hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                          Tạm ngưng
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openMenuModal(res)}
                          className="w-8 h-8 rounded hover:bg-gray-100 text-gray-400 hover:text-[#EE501C] transition-colors flex items-center justify-center" 
                          title="Hiển thị menu quán"
                        >
                          <UtensilsCrossed className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(res.id, res.status)}
                          className="w-8 h-8 rounded hover:bg-gray-100 text-gray-400 hover:text-yellow-500 transition-colors flex items-center justify-center" 
                          title={res.status === 'Active' ? "Tạm ngừng" : "Kích hoạt"}
                        >
                          {res.status === 'Active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => openDeleteModal(res)}
                          className="w-8 h-8 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center" 
                          title="Xoá nhà hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">Không tìm thấy nhà hàng nào phù hợp.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            label="nhà hàng"
          />
          </>
          )}
        </div>
      </div>

      {/* Render Modals */}
      <RestaurantModals 
        modalType={activeModal} 
        restaurant={selectedRestaurant} 
        onClose={closeModals} 
        onConfirmDelete={handleConfirmDelete} 
      />
    </AdminLayout>
  );
};