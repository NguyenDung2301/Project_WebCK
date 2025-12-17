import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { User, Ticket, Heart, CreditCard, Wallet, LogOut, ChevronRight } from 'lucide-react';
import { UserContextType } from '../types';

const ProfileMenu: React.FC = () => {
  const { user } = useOutletContext<UserContextType>();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Cài đặt tài khoản</h3>

      {/* Profile Info Link */}
      <Link to="/edit-profile" className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-colors">
            <User size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Đổi thông tin cá nhân</p>
            <p className="text-xs text-gray-500">Cập nhật tên, email, số điện thoại và địa chỉ</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      {/* Vouchers Link */}
      <Link to="/vouchers" className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-colors">
            <Ticket size={20} />
          </div>
          <div>
             <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">Ví vouchers</p>
                <span className="bg-primary-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
             </div>
            <p className="text-xs text-gray-500">3 mã giảm giá đang chờ bạn</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      {/* Favorites Link */}
      <Link to="/favorites" className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-colors">
            <Heart size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Món yêu thích</p>
            <p className="text-xs text-gray-500">Danh sách các món ăn đã lưu</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      {/* Payment Methods Link */}
      <Link to="/payment" className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-100 transition-colors">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Phương thức thanh toán</p>
            <p className="text-xs text-gray-500">Quản lý thẻ ngân hàng và ví điện tử</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      {/* Balance Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
            <Wallet size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Số dư tài khoản</p>
            <p className="text-lg font-bold text-primary-500">{formatCurrency(user.balance)}</p>
          </div>
        </div>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full font-medium text-sm transition-colors">
          Nạp tiền
        </button>
      </div>

       {/* Logout */}
       <button className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-4 group w-full">
            <LogOut size={20} className="text-gray-500 group-hover:text-red-500 transition-colors"/>
            <span className="font-semibold text-gray-800 group-hover:text-red-500 transition-colors">Đăng xuất</span>
       </button>

    </div>
  );
};

export default ProfileMenu;