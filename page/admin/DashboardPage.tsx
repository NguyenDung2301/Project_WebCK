import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { TrendingUp, Users, ShoppingBag, Store, ChevronRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  // MOCK STATS
  const stats = [
    { label: 'TỔNG DOANH THU HỆ THỐNG', value: '1,205,000 ₫', change: '+12.5%', isUp: true, icon: '$', color: 'text-[#EE501C] bg-orange-50' },
    { label: 'DOANH THU HÔM NAY', value: '0 ₫', change: '0%', isUp: true, icon: <TrendingUp size={20} />, color: 'text-green-600 bg-green-50' },
    { label: 'KHÁCH HÀNG ĐÃ ĐẶT MÓN', value: '3', change: '+5.4%', isUp: true, icon: <Users size={20} />, color: 'text-purple-600 bg-purple-50' },
    { label: 'TỔNG SỐ NHÀ HÀNG', value: '3', change: 'Ổn định', isUp: true, icon: <Store size={20} />, color: 'text-orange-600 bg-orange-50' },
  ];

  const topRestaurants = [
    { id: 1, name: 'Cơm Tấm & Bánh Mì Việt', orders: '2 đơn', rating: 4.8 },
    { id: 2, name: 'Pizza & Pasta 4P\'s', orders: '2 đơn', rating: 4.7 },
    { id: 3, name: 'Phở Thìn Lò Đúc', orders: '0 đơn', rating: 4.9 },
  ];

  const topFoods = [
    { name: 'Cơm Tấm Sườn Bì ...', restaurant: 'Cơm & Bánh Mì', orders: 1, img: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'Pizza Hải Sản #5', restaurant: 'PIZZA', orders: 1, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'Pizza Hải Sản #11', restaurant: 'PIZZA', orders: 1, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'Bánh mì thịt nướng ...', restaurant: 'Cơm & Bánh Mì', orders: 1, img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=100&h=100&auto=format&fit=crop' },
  ];

  return (
    <AdminLayout title="Tổng quan hoạt động">
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Welcome Section */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Hệ thống quản trị trung tâm</h2>
            <p className="text-gray-600">Chào mừng quay trở lại, Admin!</p>
          </div>
          <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
            <TrendingUp size={16} /> Xuất báo cáo
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                 <div className={`w-24 h-24 rounded-full ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center font-bold text-xl mb-4 shadow-sm`}>
                {stat.icon}
              </div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</h3>
              <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section (Mock) */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-800">Biểu đồ doanh thu tháng (triệu ₫)</h3>
              <select className="bg-gray-50 border-none text-xs font-bold text-gray-500 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer hover:bg-gray-100">
                <option>NĂM NAY</option>
              </select>
            </div>
            <div className="h-[300px] flex items-end justify-between gap-4 px-2">
              {[20, 35, 45, 30, 55, 40, 35, 25, 45, 60, 50, 40].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-orange-50 rounded-t-xl relative group-hover:bg-[#EE501C] transition-colors duration-300" 
                    style={{ height: `${h}%` }}
                  >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       {h * 10}.000 ₫
                     </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">T{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart (Mock) */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Trạng thái đơn hàng</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="w-48 h-48 rounded-full border-[16px] border-gray-50 flex items-center justify-center relative">
                <div className="absolute inset-0 border-[16px] border-l-green-400 border-t-green-400 border-r-transparent border-b-transparent rounded-full rotate-45"></div>
                 <div className="text-center">
                    <div className="text-4xl font-black text-gray-800">4</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Tổng đơn</div>
                 </div>
              </div>
              <div className="flex items-center gap-6 mt-8">
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> HOÀN THÀNH
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-[#EE501C]"></span> CHUẨN BỊ
                 </div>
                 <div className="text-xs font-black text-gray-900 ml-auto">4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Hoạt động gần đây</h3>
            <div className="space-y-6">
              {[
                { user: 'Pizza Hải Sản #11', action: 'Pizza & Pasta 4P\'s', time: '19:29:39 • 18 TH12, 2025', id: '#979639', type: 'order' },
                { user: 'Pizza Hải Sản #5', action: 'Pizza & Pasta 4P\'s', time: '19:27:43 • 18 TH12, 2025', id: '#863137', type: 'order' },
                { user: 'Cơm Tấm Sườn Bì Chả', action: 'Cơm Tấm & Bánh Mì Việt', time: '18:48:24 • 18 TH12, 2025', id: '#504246', type: 'order' },
                { user: 'Bánh mì thịt nướng #13', action: 'Cơm Tấm & Bánh Mì Việt', time: '18:45:57 • 18 TH12, 2025', id: '#357219', type: 'order' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold ${i % 2 === 0 ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-[#EE501C]'}`}>
                    {act.type === 'order' ? 'P' : 'C'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-gray-800">
                        <span className="text-[#EE501C]">{act.id}</span> {act.user}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-gray-500">{act.action}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Top Foods */}
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Sản phẩm bán chạy</h3>
                <div className="space-y-5">
                   {topFoods.map((food, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <img src={food.img} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                           <h4 className="text-xs font-bold text-gray-900 truncate">{food.name}</h4>
                           <p className="text-[10px] text-gray-400 uppercase">{food.restaurant}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-orange-50 text-[#EE501C] px-2 py-1 rounded-lg shrink-0">{food.orders} đơn</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Top Restaurants */}
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Top nhà hàng hoạt động</h3>
                <div className="space-y-6">
                   {topRestaurants.map((res, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#EE501C] font-black text-lg">
                           {res.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-bold text-gray-900 truncate">{res.name}</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Hoạt động</p>
                        </div>
                        <div className="text-right">
                           <div className="text-xs font-bold text-gray-900">{res.orders}</div>
                           <div className="text-[10px] font-bold text-gray-400 flex items-center justify-end gap-0.5">
                              {res.rating} <span className="text-yellow-400">★</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};