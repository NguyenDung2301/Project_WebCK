import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { ShoppingBag, Clock, CheckCircle2, Trash2 } from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const orders = [
    { id: '#979639', customer: 'Ẩn danh', email: 'user-admin-01', restaurant: 'Pizza & Pasta 4P\'s', amount: '170,000đ', status: 'PENDING' },
    { id: '#863137', customer: 'Ẩn danh', email: 'user-admin-01', restaurant: 'Pizza & Pasta 4P\'s', amount: '900,000đ', status: 'PENDING' },
    { id: '#504246', customer: 'phong toongs', email: 'USR-1766058421950', restaurant: 'Cơm Tấm & Bánh Mì Việt', amount: '50,000đ', status: 'PENDING' },
    { id: '#357219', customer: 'phong tong', email: 'USR-1766058244956', restaurant: 'Cơm Tấm & Bánh Mì Việt', amount: '85,000đ', status: 'PENDING' },
  ];

  return (
    <AdminLayout title="Quản lý Đơn hàng">
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Hệ thống quản trị trung tâm</h2>
            <p className="text-gray-600">Chào mừng quay trở lại, Admin!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                 <div className="text-4xl font-black text-gray-900 mb-2">4</div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng đơn hàng</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                 <ShoppingBag size={24} />
              </div>
           </div>
           <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                 <div className="text-4xl font-black text-gray-900 mb-2">4</div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chờ xác nhận</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#EE501C]">
                 <Clock size={24} />
              </div>
           </div>
           <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                 <div className="text-4xl font-black text-gray-900 mb-2">0</div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hoàn thành</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                 <CheckCircle2 size={24} />
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 min-h-[500px]">
           <h3 className="text-lg font-bold text-gray-800 mb-8">Danh sách đơn hàng toàn hệ thống</h3>
           
           <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                   <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Mã đơn</th>
                   <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Người đặt</th>
                   <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Cửa hàng</th>
                   <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng tiền</th>
                   <th className="px-4 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Trạng thái</th>
                   <th className="px-4 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {orders.map((order) => (
                   <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-6 text-sm font-bold text-gray-400">{order.id}</td>
                      <td className="px-4 py-6">
                         <div className="font-bold text-gray-900 text-sm">{order.customer}</div>
                         <div className="text-[10px] font-medium text-gray-400">{order.email}</div>
                      </td>
                      <td className="px-4 py-6 text-sm font-bold text-gray-900">{order.restaurant}</td>
                      <td className="px-4 py-6 text-sm font-black text-[#EE501C]">{order.amount}</td>
                      <td className="px-4 py-6 text-center">
                         <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-yellow-200 uppercase tracking-wide">
                            Đang chuẩn bị
                         </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                         <button className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </AdminLayout>
  );
};