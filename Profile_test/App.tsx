import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MOCK_USER } from './constants';
import ProfileMenu from './pages/ProfileMenu';
import Vouchers from './pages/Vouchers';
import Favorites from './pages/Favorites';
import Payment from './pages/Payment';
import EditProfile from './pages/EditProfile';
import { BreadcrumbItem, UserProfile } from './types';

// Wrapper for the split layout (Sidebar + Content)
const ProfileLayout: React.FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  
  // Lift user state here so it can be shared between Sidebar and EditProfile
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  const updateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    // Simple breadcrumb logic
    // 'Trang chủ' now points to '#' (representing external home), 'Hồ sơ người dùng' points to '/' (internal profile root)
    const base = [{ label: 'Trang chủ', path: '#' }, { label: 'Hồ sơ người dùng', path: '/' }];
    let current: BreadcrumbItem | null = null;

    switch (location.pathname) {
      case '/vouchers':
        current = { label: 'Ví vouchers' };
        break;
      case '/favorites':
        current = { label: 'Món yêu thích' };
        break;
      case '/payment':
        current = { label: 'Phương thức thanh toán' };
        break;
      case '/edit-profile':
        current = { label: 'Đổi thông tin cá nhân' };
        break;
    }

    if (location.pathname === '/') {
       setBreadcrumbs(base);
    } else {
       setBreadcrumbs(current ? [...base, current] : base);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
                <React.Fragment key={index}>
                {item.path && !isLast ? (
                    item.path === '#' ? (
                      <a 
                        href="#" 
                        className="hover:text-primary-500 hover:underline transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link 
                          to={item.path} 
                          className="hover:text-primary-500 hover:underline transition-colors"
                      >
                          {item.label}
                      </Link>
                    )
                ) : (
                    <span className={isLast ? "font-bold text-gray-800" : ""}>
                        {item.label}
                    </span>
                )}
                {!isLast && <span className="mx-2">›</span>}
                </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Always visible on larger screens */}
          <aside className="lg:col-span-4 xl:col-span-3">
             <Sidebar user={user} />
          </aside>

          {/* Right Content */}
          <section className="lg:col-span-8 xl:col-span-9">
            <Outlet context={{ user, updateUser }} />
          </section>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<ProfileLayout />}>
          <Route path="/" element={<ProfileMenu />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;