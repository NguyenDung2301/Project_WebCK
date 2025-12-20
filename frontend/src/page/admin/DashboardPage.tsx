import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Download, DollarSign, TrendingUp, Users, Store, 
  Check, X, Bike
} from 'lucide-react';
import { getDashboardStatsApi } from '../../api/dashboardApi';
import { formatNumber, formatCurrency } from '../../utils';

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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getDashboardStatsApi();
        setData(stats);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Tổng quan hoạt động">
         <div className="flex items-center justify-center h-[80vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE501C]"></div>
         </div>
      </AdminLayout>
    );
  }

  if (!data) return null;

  const { revenue, status, activities, topItems, topRestaurants, summary } = data;

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
            title="Tổng doanh thu" 
            value={formatCurrency(summary?.totalRevenue || 0)} 
            icon={DollarSign} 
            iconBg="bg-red-50" 
            iconColor="text-[#EE501C]" 
            subValue="+12.5%"
          />
          <StatCard 
            title="Doanh thu hôm nay" 
            value={formatCurrency(summary?.todayRevenue || 0)} 
            icon={TrendingUp} 
            iconBg="bg-green-50" 
            iconColor="text-emerald-500" 
            subValue="+5%"
          />
          <StatCard 
            title="Tổng người dùng" 
            value={formatNumber(summary?.totalUsers || 0)} 
            icon={Users} 
            iconBg="bg-blue-50" 
            iconColor="text-blue-500" 
            subValue="Active"
          />
          <StatCard 
            title="Tổng số nhà hàng" 
            value={formatNumber(summary?.totalRestaurants || 0)} 
            icon={Store} 
            iconBg="bg-orange-50" 
            iconColor="text-amber-500" 
            subValue="Đối tác"
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
                <BarChart data={revenue}>
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
                    formatter={(value: any) => [`${value} Tr ₫`, 'Doanh thu']}
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
                    data={status}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {status.map((entry: any, index: number) => (
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
              {status.map((item: any) => (
                <div key={item.name} className="flex items-center text-xs font-bold text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                  {item.name}: {item.value}
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
              {activities.map((act: any) => (
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
              {topItems.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                  <img alt={item.name} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100 group-hover:scale-105 transition-transform" src={item.image} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#EE501C] transition-colors">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">#{item.id}</p>
                  </div>
                  <span className="text-xs font-bold text-[#EE501C] bg-orange-50 px-2 py-1 rounded-lg">{item.sales} sold</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Restaurants */}
          <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top doanh thu</h3>
            <div className="space-y-6">
              {topRestaurants.map((res: any) => (
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
                      {formatCurrency(res.revenue)}
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