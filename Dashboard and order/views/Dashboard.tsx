
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { 
  MOCK_STATS, 
  REVENUE_CHART_DATA, 
  STATUS_CHART_DATA, 
  MOCK_ACTIVITIES, 
  MOCK_TOP_ITEMS, 
  MOCK_TOP_RESTAURANTS 
} from '../constants';

const Dashboard: React.FC = () => {
  const getRestaurantStyles = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 text-red-600';
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tổng quan hoạt động</h2>
          <p className="text-sm text-gray-500 mt-1">Theo dõi các chỉ số quan trọng trong hệ thống.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
          <span className="material-icons-round text-lg mr-2">download</span>
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng doanh thu tháng" 
          value="1.8 tỷ ₫" 
          icon="payments" 
          iconBg="bg-red-50" 
          iconColor="text-primary" 
        />
        <StatCard 
          title="Doanh thu hôm nay" 
          value="45.2tr ₫" 
          icon="attach_money" 
          iconBg="bg-green-50" 
          iconColor="text-emerald-500" 
        />
        <StatCard 
          title="Người dùng active" 
          value="8,540" 
          icon="group" 
          iconBg="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <StatCard 
          title="Tổng số nhà hàng" 
          value="482" 
          icon="store" 
          iconBg="bg-orange-50" 
          iconColor="text-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Biểu đồ doanh thu tháng</h3>
            <select className="bg-gray-50 border-none text-xs text-gray-500 rounded-lg py-1.5 px-3 focus:ring-1 focus:ring-primary outline-none">
              <option>Năm nay</option>
              <option>Năm ngoái</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_CHART_DATA}>
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
                  labelStyle={{ color: '#000000', fontWeight: 'bold', marginBottom: '4px' }}
                  itemStyle={{ color: '#000000', padding: '0' }}
                  formatter={(value: any) => [`${value} tỷ ₫`, 'Doanh thu']}
                />
                <Bar dataKey="value" fill="#EE501C" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Trạng thái đơn hàng</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {STATUS_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #E5E7EB', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#FFFFFF',
                    color: '#000000'
                  }}
                  itemStyle={{ color: '#000000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {STATUS_CHART_DATA.map((status) => (
              <div key={status.name} className="flex items-center text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: status.color }}></span>
                {status.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Hoạt động gần đây</h3>
          <div className="space-y-6 flex-1">
            {MOCK_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 
                  ${act.type === 'order' ? 'bg-blue-100 text-blue-600' : 
                    act.type === 'delivery' ? 'bg-green-100 text-green-600' :
                    act.type === 'cancellation' ? 'bg-red-100 text-red-600' :
                    'bg-amber-100 text-amber-600'}`}>
                  {act.type === 'delivery' ? <span className="material-icons-round text-sm">check</span> : 
                   act.type === 'cancellation' ? <span className="material-icons-round text-sm">close</span> :
                   act.user.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-tight">
                    {act.user} <span className="font-normal text-gray-500">{act.action}</span> <span className="font-semibold text-primary">{act.target}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top món bán chạy</h3>
          <div className="space-y-5">
            {MOCK_TOP_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img alt={item.name} className="w-12 h-12 rounded-lg object-cover shadow-sm bg-gray-100" src={item.image} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">#{item.id}</p>
                </div>
                <span className="text-base font-bold text-primary">{item.sales}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top doanh thu nhà hàng</h3>
          <div className="space-y-6">
            {MOCK_TOP_RESTAURANTS.map((res) => (
              <div key={res.id} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm shrink-0 ${getRestaurantStyles(res.color)}`}>
                  {res.logoInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{res.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">#{res.id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {(res.revenue / 1000000000).toFixed(1)} tỷ <span className="underline decoration-1 underline-offset-2 font-medium">₫</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
