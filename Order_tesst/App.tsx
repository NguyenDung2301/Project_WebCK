import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { OrderCard } from './components/OrderCard';
import { TABS, MOCK_ORDERS } from './data';
import { TabId } from './types';
import { ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [loading, setLoading] = useState(false);

  // Filter orders based on active tab
  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return MOCK_ORDERS;
      case 'ordering':
        return MOCK_ORDERS.filter(o => o.status === 'pending');
      case 'delivering':
        return MOCK_ORDERS.filter(o => o.status === 'delivering');
      case 'delivered':
        // delivered tab usually shows 'completed' history and 'delivered' (waiting confirm)
        return MOCK_ORDERS.filter(o => o.status === 'completed' || o.status === 'delivered' || o.status === 'cancelled');
      case 'rating':
        return MOCK_ORDERS.filter(o => o.status === 'rate_pending');
      default:
        return MOCK_ORDERS;
    }
  }, [activeTab]);

  // Simulate loading effect on tab change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-10">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-gray-500 mb-2 gap-1">
          <span className="hover:text-gray-700 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Đơn hàng của tôi</span>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Đơn hàng của tôi</h1>
          <p className="text-sm text-gray-500">Quản lý và theo dõi trạng thái các đơn hàng của bạn</p>
        </div>

        {/* Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Orders List */}
        <div className="min-h-[400px]">
          {loading ? (
             <div className="space-y-4">
                 {[1, 2].map((i) => (
                   <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
                     <div className="flex gap-4">
                       <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                       <div className="flex-1 space-y-2">
                         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                       </div>
                     </div>
                   </div>
                 ))}
             </div>
          ) : filteredOrders.length > 0 ? (
            <>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
              
              {/* Load More Button (Simulated) */}
              {activeTab === 'all' && (
                <div className="flex justify-center mt-6">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Xem thêm đơn hàng cũ hơn
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <FileText size={40} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Chưa có đơn hàng nào</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">Các đơn hàng bạn đã đặt sẽ hiển thị tại đây.</p>
              <button className="mt-4 px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Đặt món ngay
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Icon needed for empty state
import { FileText } from 'lucide-react';

export default App;