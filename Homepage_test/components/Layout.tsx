import React from 'react';
import { Home, ShoppingBag, User, Search, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 rounded-full p-1.5">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">FoodDelivery</span>
          </Link>

          {!isHome && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-orange-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Tìm món ăn, quán ăn..."
              />
            </div>
          )}

          <nav className="flex items-center gap-6">
            <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-orange-500 transition-colors">
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Trang chủ</span>
            </Link>
            <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-orange-500 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Đơn hàng</span>
            </Link>
            <div className="flex flex-col items-center text-gray-600 hover:text-orange-500 transition-colors cursor-pointer">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Tôi</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-orange-600 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="mb-8 border-b border-orange-500 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-full p-1.5">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl font-bold tracking-tight">FoodDelivery</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Business</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li><a href="#" className="hover:text-white">Partner with us</a></li>
                <li><a href="#" className="hover:text-white">Merchant App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Food Street, Hanoi</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +84 123 456 789</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@fooddelivery.com</li>
              </ul>
              <div className="flex gap-4 mt-4">
                 <Facebook className="w-5 h-5 text-orange-100 hover:text-white cursor-pointer" />
                 <Twitter className="w-5 h-5 text-orange-100 hover:text-white cursor-pointer" />
                 <Instagram className="w-5 h-5 text-orange-100 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-orange-200 pt-8 border-t border-orange-500">
            © 2025 FoodDelivery Corporation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};