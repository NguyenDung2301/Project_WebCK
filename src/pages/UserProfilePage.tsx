
import React, { useState, useEffect } from 'react';
import { ChevronRight, User as UserIcon, Mail, Phone, Calendar, MapPin, Camera } from 'lucide-react';
import { Header } from '../components/common/Header';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { cn } from '../utils/cn';
import { User } from '../types';

interface UserProfilePageProps {
  onBack: () => void;
  onHome: () => void;
  onSearch: (query: string) => void;
  onProfile: () => void;
  onOrders?: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onBack, onHome, onSearch, onProfile, onOrders }) => {
  const { user, refreshUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || 'Nam',
    address: user?.address || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || 'Nam',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
    };

    const allUsers = userService.getUsers();
    const updatedUsersList = allUsers.map(u => u._id === user._id ? updatedUser : u);
    userService.saveUsersToStorage(updatedUsersList);

    refreshUser(updatedUser);
    alert('Đã cập nhật thông tin thành công!');
    onBack();
  };

  const inputWrapperClass = "bg-[#FCFBF9] border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-4 transition-all focus-within:ring-4 focus-within:ring-primary-50 focus-within:border-primary-100 group";
  const labelClass = "block text-sm font-bold text-gray-400 mb-2 ml-1 uppercase tracking-widest";
  const iconClass = "text-gray-300 group-focus-within:text-primary-500 transition-colors";

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-sans pb-24">
      <Header 
        onHome={onHome}
        onSearch={onSearch}
        onProfile={onProfile}
        onOrders={onOrders}
        showSearch={true}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 text-[15px] font-medium text-[#A8ADB7] mb-12">
           <button className="hover:text-primary-600 transition-colors" onClick={onHome}>Trang chủ</button>
           <ChevronRight size={16} className="text-gray-300" />
           <span className="text-[#1E293B] font-bold uppercase">Thông tin cá nhân</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-28">
             <div className="bg-white rounded-[48px] p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-gray-50 to-gray-100 p-1 mb-8 group">
                   <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img src={user.avatarUrl} className="w-full h-full object-cover" alt={user.name} />
                      ) : (
                        <UserIcon size={96} className="text-gray-300" strokeWidth={1.5} />
                      )}
                   </div>
                   <button className="absolute bottom-2 right-2 w-12 h-12 bg-primary-600 text-white border-4 border-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera size={20} />
                   </button>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{formData.name || 'Người dùng'}</h2>
                <p className="text-sm font-bold text-gray-400 mb-6">{formData.email || 'Chưa cập nhật email'}</p>
                <div className="w-full h-px bg-gray-50 mb-8"></div>
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-xs px-4">
                        <span className="font-black text-gray-300 uppercase tracking-widest">Trạng thái</span>
                        <span className="font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">Đã xác thực</span>
                    </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-8">
             <div className="bg-white rounded-[48px] p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] border border-gray-100">
                <h1 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Cập nhật thông tin</h1>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                   <div>
                      <label className={labelClass}>Họ và tên</label>
                      <div className={inputWrapperClass}>
                         <UserIcon size={20} className={iconClass} />
                         <input 
                           type="text" 
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="flex-1 bg-transparent border-none text-gray-900 font-bold focus:ring-0 p-0"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className={labelClass}>Email</label>
                         <div className={inputWrapperClass}>
                            <Mail size={20} className={iconClass} />
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="flex-1 bg-transparent border-none text-gray-900 font-bold focus:ring-0 p-0"
                            />
                         </div>
                      </div>
                      <div>
                         <label className={labelClass}>Số điện thoại</label>
                         <div className={inputWrapperClass}>
                            <Phone size={20} className={iconClass} />
                            <input 
                              type="text" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="flex-1 bg-transparent border-none text-gray-900 font-bold focus:ring-0 p-0"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className={labelClass}>Ngày sinh</label>
                         <div className={inputWrapperClass}>
                            <Calendar size={20} className={iconClass} />
                            <input 
                              type="date" 
                              name="dob" 
                              value={formData.dob}
                              onChange={handleChange}
                              className="flex-1 bg-transparent border-none text-gray-900 font-bold focus:ring-0 p-0"
                            />
                         </div>
                      </div>
                      <div>
                         <label className={labelClass}>Giới tính</label>
                         <div className="flex items-center gap-8 py-4">
                            {['Nam', 'Nữ', 'Khác'].map((gender) => (
                               <button 
                                 key={gender}
                                 type="button"
                                 onClick={() => handleGenderChange(gender)}
                                 className="flex items-center gap-3 group"
                               >
                                  <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    formData.gender === gender ? "border-primary-500 bg-primary-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-gray-200"
                                  )}>
                                     {formData.gender === gender && <div className="w-2.5 h-2.5 rounded-full bg-primary-600"></div>}
                                  </div>
                                  <span className={cn(
                                    "text-sm font-bold transition-colors",
                                    formData.gender === gender ? "text-gray-900" : "text-gray-400"
                                  )}>{gender}</span>
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div>
                      <label className={labelClass}>Địa chỉ</label>
                      <div className={inputWrapperClass}>
                         <MapPin size={20} className={iconClass} />
                         <input 
                           type="text" 
                           name="address"
                           value={formData.address}
                           onChange={handleChange}
                           className="flex-1 bg-transparent border-none text-gray-900 font-bold focus:ring-0 p-0"
                         />
                      </div>
                   </div>

                   <div className="flex gap-4 pt-10">
                      <button 
                        type="submit"
                        className="flex-1 py-5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 shadow-2xl shadow-primary-200 transition-all uppercase text-xs tracking-widest"
                      >
                         Lưu thay đổi
                      </button>
                      <button 
                        type="button"
                        onClick={onBack}
                        className="flex-1 py-5 bg-white text-gray-400 font-black rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all uppercase text-xs tracking-widest"
                      >
                         Hủy
                      </button>
                   </div>
                </form>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};
