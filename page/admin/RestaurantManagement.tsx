import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Search, Plus, Lock, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const RestaurantManagement: React.FC = () => {
  const restaurants = [
    { id: '#RES-001', name: 'Cơm Tấm & Bánh Mì Việt', address: '123 Nguyễn Trãi, Quận 1', contact: '0901234567', email: 'contact@001.com', status: 'Active', initial: 'C' },
    { id: '#RES-002', name: 'Phở Thìn Lò Đúc', address: '13 Lò Đúc, Hai Bà Trưng', contact: '0907654321', email: 'contact@002.com', status: 'Active', initial: 'P' },
    { id: '#RES-003', name: 'Pizza & Pasta 4P\'s', address: '8/15 Lê Thánh Tôn, Quận 1', contact: '0909998887', email: 'contact@003.com', status: 'Active', initial: 'P' },
  ];

  return (
    <AdminLayout title="Quản lý Nhà hàng">
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Hệ thống quản trị trung tâm</h2>
            <p className="text-gray-600">Chào mừng quay trở lại, Admin!</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-lg ml-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="text"
                placeholder="Tìm theo tên nhà hàng, mã ID..."
                className="block w-full pl-10 pr-3 py-3 border-none bg-transparent focus:ring-0 placeholder-gray-400 text-sm font-medium"
              />
           </div>
           <Button 
             className="rounded-xl shadow-lg shadow-orange-100 px-6 py-3"
             icon={<Plus size={18} />}
           >
             THÊM NHÀ HÀNG
           </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                   <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                   <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Nhà hàng</th>
                   <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Địa chỉ</th>
                   <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Liên hệ</th>
                   <th className="px-6 py-5 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Trạng thái</th>
                   <th className="px-6 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {restaurants.map((res) => (
                   <tr key={res.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-6 text-sm font-bold text-gray-400">{res.id}</td>
                      <td className="px-6 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EE501C] flex items-center justify-center font-black">
                               {res.initial}
                            </div>
                            <div>
                               <div className="font-bold text-gray-900 text-sm">{res.name}</div>
                               <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                  4.8 <span className="text-yellow-400">★</span> RATING
                               </div>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-bold text-gray-500 max-w-[200px] truncate">{res.address}</td>
                      <td className="px-6 py-6">
                         <div className="font-bold text-gray-900 text-sm">{res.contact}</div>
                         <div className="text-[10px] font-medium text-gray-400 italic">{res.email}</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                         <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-200 uppercase tracking-wide">
                            Đang hoạt động
                         </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                         <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-300 hover:text-gray-500 transition-colors"><Lock size={18} /></button>
                            <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
           <div className="p-8 text-center" />
        </div>
      </div>
    </AdminLayout>
  );
};