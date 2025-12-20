import React, { useMemo } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Download, DollarSign, TrendingUp, Users, Store, 
  Check, X, Bike
} from 'lucide-react';

// --- MOCK DATA FOR CHARTS ---
const REVENUE_DATA = [
  { name: 'T1', value: 1.2 }, { name: 'T2', value: 1.5 }, { name: 'T3', value: 1.8 },
  { name: 'T4', value: 1.4 }, { name: 'T5', value: 2.1 }, { name: 'T6', value: 1.9 },
  { name: 'T7', value: 2.3 }, { name: 'T8', value: 1.7 }, { name: 'T9', value: 2.5 },
  { name: 'T10', value: 2.8 }, { name: 'T11', value: 2.4 }, { name: 'T12', value: 3.0 },
];

const STATUS_DATA = [
  { name: 'Hoàn thành', value: 540, color: '#10B981' }, // Green
  { name: 'Đang giao', value: 120, color: '#3B82F6' },  // Blue
  { name: 'Đang chuẩn bị', value: 80, color: '#F59E0B' }, // Amber
  { name: 'Đã hủy', value: 45, color: '#EF4444' },      // Red
];

const ACTIVITIES = [
  { id: 1, user: 'Nguyễn Văn A', action: 'đã đặt đơn hàng', target: '#ORD-001', time: '2 phút trước', type: 'order' },
  { id: 2, user: 'Shipper Tuấn', action: 'đã giao thành công', target: '#ORD-992', time: '15 phút trước', type: 'delivery' },
  { id: 3, user: 'Lê Thị B', action: 'đã hủy đơn hàng', target: '#ORD-003', time: '1 giờ trước', type: 'cancellation' },
  { id: 4, user: 'Admin', action: 'đã duyệt nhà hàng', target: 'KFC Láng Hạ', time: '3 giờ trước', type: 'system' },
];

const TOP_ITEMS = [
  { id: 'F01', name: 'Gà Rán Giòn Cay', sales: '1,204', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=100&auto=format&fit=crop' },
  { id: 'F02', name: 'Trà Sữa Trân Châu', sales: '985', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=100&auto=format&fit=crop' },
  { id: 'F03', name: 'Cơm Tấm Sườn', sales: '856', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=100&auto=format&fit=crop' },
];

const TOP_RESTAURANTS = [
  { id: 'R01', name: 'KFC Vietnam', revenue: 450000000, logoInitial: 'K', color: 'bg-red-50 text-red-600' },
  { id: 'R02', name: 'Highlands Coffee', revenue: 320000000, logoInitial: 'H', color: 'bg-red-50 text-red-700' },
  { id: 'R03', name: 'Phúc Long', revenue: 280000000, logoInitial: 'P', color: 'bg-green-50 text-green-800' },
];

// Helper Component for Stat Card
const StatCard = ({ title, value, icon: Icon, iconBg, iconColor, subValue }: any) => (
  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow h-full">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon size={24} />
      </div>
      {subValue && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${subValue.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {subValue}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-2xl font-black text-gray-900">{value}</div>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  return (
    <AdminLayout title="Tổng quan hoạt động">
      <div className="space-y-8 animate-in fade-in duration-500 pb-10">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Theo dõi các chỉ số quan trọng trong hệ thống.</p>
          </div>
          <button className="bg-[#EE501C] hover:bg-[#d43f0f] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-md shadow-orange-100 transition-all hover:-translate-y-0.5">
            <Download size={18} className="mr-2" />
            Xuất báo cáo
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Tổng doanh thu tháng" 
            value="1.8 tỷ ₫" 
            icon={DollarSign} 
            iconBg="bg-red-50" 
            iconColor="text-[#EE501C]" 
            subValue="+12.5%"
          />
          <StatCard 
            title="Doanh thu hôm nay" 
            value="45.2tr ₫" 
            icon={TrendingUp} 
            iconBg="bg-green-50" 
            iconColor="text-emerald-500" 
            subValue="+5%"
          />
          <StatCard 
            title="Người dùng active" 
            value="8,540" 
            icon={Users} 
            iconBg="bg-blue-50" 
            iconColor="text-blue-500" 
            subValue="+120"
          />
          <StatCard 
            title="Tổng số nhà hàng" 
            value="482" 
            icon={Store} 
            iconBg="bg-orange-50" 
            iconColor="text-amber-500" 
            subValue="Ổn định"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Biểu đồ doanh thu tháng</h3>
              <select className="bg-gray-50 border-none text-xs text-gray-500 font-bold rounded-lg py-1.5 px-3 focus:ring-1 focus:ring-[#EE501C] outline-none cursor-pointer">
                <option>Năm nay</option>
                <option>Năm ngoái</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(238, 80, 28, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: '1px solid #E5E7EB', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#FFFFFF',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any) => [`${value} tỷ ₫`, 'Doanh thu']}
                  />
                  <Bar dataKey="value" fill="#EE501C" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Trạng thái đơn hàng</h3>
            <div className="h-60 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATUS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {STATUS_DATA.map((status) => (
                <div key={status.name} className="flex items-center text-xs font-bold text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: status.color }}></span>
                  {status.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Lists Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activities */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Hoạt động gần đây</h3>
            <div className="space-y-6">
              {ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 
                    ${act.type === 'order' ? 'bg-blue-100 text-blue-600' : 
                      act.type === 'delivery' ? 'bg-green-100 text-green-600' :
                      act.type === 'cancellation' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'}`}>
                    {act.type === 'delivery' ? <Check size={14} strokeWidth={3} /> : 
                     act.type === 'cancellation' ? <X size={14} strokeWidth={3} /> :
                     act.type === 'order' ? <Users size={14} strokeWidth={3} /> :
                     <Store size={14} strokeWidth={3} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {act.user} <span className="font-normal text-gray-500">{act.action}</span> <span className="font-bold text-[#EE501C]">{act.target}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Items */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top món bán chạy</h3>
            <div className="space-y-5">
              {TOP_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                  <img alt={item.name} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100 group-hover:scale-105 transition-transform" src={item.image} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#EE501C] transition-colors">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">#{item.id}</p>
                  </div>
                  <span className="text-xs font-bold text-[#EE501C] bg-orange-50 px-2 py-1 rounded-lg">{item.sales}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Restaurants */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top doanh thu</h3>
            <div className="space-y-6">
              {TOP_RESTAURANTS.map((res) => (
                <div key={res.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-sm shrink-0 transition-transform group-hover:rotate-6 ${res.color}`}>
                    {res.logoInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#EE501C] transition-colors">{res.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">#{res.id}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-gray-900 leading-none">
                      {(res.revenue / 1000000000).toFixed(1)} tỷ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};