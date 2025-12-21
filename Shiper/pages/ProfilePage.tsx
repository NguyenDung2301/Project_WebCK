
import React, { useState } from 'react';
import { ShipperProfile } from '../types';

interface ProfilePageProps {
  profile: ShipperProfile;
  onSave: (profile: ShipperProfile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<ShipperProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert('Thông tin cá nhân đã được lưu thành công!');
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 animate-page-entry">
      <div className="shrink-0">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-main dark:text-white">Thông tin cá nhân</h2>
        <p className="text-[#9a5f4c] dark:text-gray-400 text-sm mt-1">Quản lý và cập nhật thông tin hồ sơ của bạn</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 flex flex-col items-center p-8 bg-surface-light dark:bg-surface-dark rounded-3xl border border-[#e7d5cf] dark:border-[#3e2b25] shadow-sm">
          <div className="relative group cursor-pointer">
            <div 
              className="w-40 h-40 rounded-full bg-cover bg-center border-4 border-white dark:border-surface-dark shadow-xl group-hover:opacity-80 transition-opacity" 
              style={{ backgroundImage: `url("${formData.avatar}")` }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-black text-text-main dark:text-white tracking-tight">{formData.name}</h3>
          
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              {formData.rank}
            </span>
          </div>
          
          <div className="mt-6 w-full space-y-3">
             {/* Thay thế Trạng thái bằng Thành viên từ */}
             <div className="flex items-center justify-between p-4 rounded-2xl bg-background-light dark:bg-background-dark/50 border border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                  <span className="text-sm font-medium text-text-secondary">Thành viên từ</span>
               </div>
               <span className="text-sm font-bold text-text-main dark:text-white">{formData.joinDate}</span>
             </div>
             
             <div className="flex items-center justify-between p-4 rounded-2xl bg-background-light dark:bg-background-dark/50 border border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">stars</span>
                  <span className="text-sm font-medium text-text-secondary">Xếp hạng</span>
               </div>
               <span className="text-sm font-bold">4.9/5.0</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 lg:p-10 bg-surface-light dark:bg-surface-dark rounded-3xl border border-[#e7d5cf] dark:border-[#3e2b25] shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Họ và tên</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#f0e4e0] dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Email</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#f0e4e0] dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Số điện thoại</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#f0e4e0] dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium font-mono" 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Ngày sinh</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-2xl border border-[#f0e4e0] dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-text-main dark:text-gray-300 pl-1">Địa chỉ thường trú</label>
                <div className="relative group">
                  <input 
                    className="w-full px-5 py-4 rounded-full border border-[#f0e4e0] dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium pr-12" 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] cursor-pointer hover:text-primary transition-colors">
                    edit
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#f0e4e0] dark:border-gray-800 pt-8 flex items-center justify-end gap-4">
              <button 
                className="px-8 py-3 rounded-full border border-[#f0e4e0] dark:border-gray-700 font-bold text-sm text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm active:scale-95" 
                type="button"
                onClick={() => setFormData(profile)}
              >
                Hủy
              </button>
              <button 
                className="px-10 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-xl shadow-primary/25 hover:bg-[#d64517] transition-all active:scale-[0.98]" 
                type="submit"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
