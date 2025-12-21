
import React, { useState } from 'react';
import { Page, Order, OrderStatus, ShipperProfile } from './types';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';
import PendingOrdersPage from './pages/PendingOrdersPage';
import ActiveDeliveriesPage from './pages/ActiveDeliveriesPage';
import HistoryPage from './pages/HistoryPage';

const INITIAL_PROFILE: ShipperProfile = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  phone: '0909 123 456',
  dob: '1995-08-15',
  gender: 'male',
  address: '123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh',
  joinDate: '05/2022',
  rank: 'Shipper Cao Cấp',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1_LBeo9lnoijv9REQ-tMWVq8TFwtqU64pyIGoWEI_gFra6ySuLfuA5nExlSNuNU6XWgoCZpMRkeeHqE3bDwls9YdA9ghRs_ajBAvEtRA_bvSkVK40f3cewudKICTWuejRWzv7uvGS0Eh8ZidXjSpuhVqViOrBCk_HDiP804TkmQJ0SYKTvSGyy3SjD9AmRcaVrN65IU_gVJWzfxxVn1Rc-zT1gDu3WRpL2UzqOD2b5AoDzjy5Y8ycUIkHZh9zjQhDMZ92iBk4tgF'
};

const MOCK_ORDERS: Order[] = [
  {
    id: '#OD-9921',
    storeName: 'Trà Sữa Koi Thé',
    storeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBga-DWSdI4MG9l3vYqIW-1eJ-JsImP9I6YHkXvZZ51gj0OBy35iwncZV1ADjfKgrKNAh7pkQHgat5xB95l0PbVQX449D2Su7blUH6q6NoCyeAEkkIZfTlFTMEk-6OwGg5QKd9t6i0tmHbK1nOhWKOziGziTVL44H1ijnS5k7UH8541nEtCvPd1pnTncvM9Evb9VoFxwL3Y51ndIzGVsFZvrkXLW8Ta9reCkgshaty5ZxHwzmR-ALV4QojZllZQ5syUeLau18-XswK9',
    storeAddress: '45 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM',
    deliveryAddress: 'Landmark 81, 720A Điện Biên Phủ, Bình Thạnh',
    status: OrderStatus.Preparing,
    paymentMethod: 'Cash',
    time: '14:30',
    items: [
      { name: 'Trà sữa trân châu hoàng kim (L)', price: 55000, quantity: 2 },
      { name: 'Hồng trà macchiato (M)', price: 45000, quantity: 1 }
    ],
    totalAmount: 155000
  },
  {
    id: '#OD-9925',
    storeName: 'Cơm Tấm Sài Gòn',
    storeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI8Z4CIAt5v8IZtTDDVkK0NiBZKZg324g1YIpqY1Qa4qOV8CZ4m5ONYW7fAlQlA3SW4nfKrxlQcTfARoIKqAb2iG4CjW3Eaf-IQB3YMol_3kWp_it4D-AbuNQu0zT2bnIhR_g-9v5Mnje_Pg5BOzsRgX9pEwDQC1UYj37WHZOb2yy_MDJMCi4w-tPLf3vrW6az2__dxIU4c72YEXQRB32gD9z1ipGdd3wVhXOwNzQipSl6kiOYYpU_PGK1geXjLnvX5-4jmR8LGMx4',
    storeAddress: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    deliveryAddress: 'Chung cư Millennium, 132 Bến Vân Đồn, Quận 4',
    status: OrderStatus.Preparing,
    paymentMethod: 'E-Wallet',
    time: '12:15',
    items: [
      { name: 'Cơm sườn bì chả', price: 65000, quantity: 1 },
      { name: 'Canh khổ qua', price: 15000, quantity: 1 },
      { name: 'Trà đá', price: 5000, quantity: 1 }
    ],
    totalAmount: 85000
  },
  {
    id: '#OD-9930',
    storeName: 'Gà Rán Popeyes',
    storeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVuZnj_VNswSWiegSIIGoCDiK-jAr0jqrJ6UrZbkkDRzDL91daiXltMrkUs_d0R5HkfAvWJ2DDaKP9BQrLh2aOlyE8mcmjm1U2Cd5hre2TO4hFtIhoPHeSwtWrtjdHxw16p4uGJUX1J8tz3jJF-n0ba-SG_xePk7g07k4d0Bdgmobcf2hiVis4GNkGFSTLxZ-A9PF99P4041jHevilWp_ll0q-G4xD5p4xyBXly4YRNECfE8eWSFQcbv8MT4z5uIva_yDQk-66MDoT',
    storeAddress: '62 Nguyễn Đức Cảnh, Tân Phong, Quận 7',
    deliveryAddress: 'RMIT University, 702 Nguyễn Văn Linh, Quận 7',
    status: OrderStatus.Preparing,
    paymentMethod: 'Online',
    time: '19:40',
    items: [
      { name: 'Combo gà giòn cay (2 miếng)', price: 89000, quantity: 1 },
      { name: 'Khoai tây chiên (L)', price: 35000, quantity: 1 }
    ],
    totalAmount: 124000
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [profile, setProfile] = useState<ShipperProfile>(INITIAL_PROFILE);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const acceptOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: OrderStatus.Delivering } : o));
    setCurrentPage(Page.Home);
  };

  const completeOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: OrderStatus.Completed } : o));
  };

  const ignoreOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.Profile:
        return <ProfilePage profile={profile} onSave={setProfile} />;
      case Page.Pending:
        return <PendingOrdersPage 
                 orders={orders.filter(o => o.status === OrderStatus.Preparing)} 
                 onAccept={acceptOrder} 
                 onIgnore={ignoreOrder} 
               />;
      case Page.History:
        return <HistoryPage orders={orders.filter(o => o.status === OrderStatus.Completed || o.status === OrderStatus.Cancelled)} />;
      case Page.Home:
      default:
        return <ActiveDeliveriesPage 
                 orders={orders.filter(o => o.status === OrderStatus.Delivering)} 
                 onComplete={completeOrder} 
               />;
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        profile={profile} 
      />
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <header className="px-6 py-4 flex items-center justify-between lg:hidden bg-surface-light dark:bg-surface-dark border-b border-[#e7d5cf] dark:border-[#3e2b25] shrink-0">
          <h1 className="text-lg font-bold">
            {currentPage === Page.Home && 'Trang chủ'}
            {currentPage === Page.History && 'Lịch sử'}
            {currentPage === Page.Pending && 'Đơn hàng cần xử lý'}
            {currentPage === Page.Profile && 'Hồ sơ'}
          </h1>
          <button className="material-symbols-outlined p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">menu</button>
        </header>
        <div className="flex-1 overflow-hidden">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
