
import React, { useState, useEffect } from 'react';
import { ShipperProfile } from '../../types/shipper';
import { getShipperProfileApi } from '../../api/shipperApi';
import { Camera, Calendar, Award, Edit2, User } from 'lucide-react';

export const ShipperProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<ShipperProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getShipperProfileApi();
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thông tin cá nhân đã được lưu thành công!');
  };

  if (loading || !formData) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EE501C]"></div></div>;
  }

  // Check if data exists for display
  const hasData = formData.name !== '';

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
      <div className="shrink-0">
        <h2 className="text-2xl font-black text-gray-900">Thông tin cá nhân</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Quản lý và cập nhật thông tin hồ sơ của bạn</p>
      </div>
      
      {hasData ? (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Avatar & Badges */}
        <div className="lg:col-span-4 flex flex-col items-center p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="relative group cursor-pointer mb-6">
            <div 
              className="w-48 h-48 rounded-full bg-cover bg-center border-4 border-white shadow-xl group-hover:opacity-90 transition-opacity" 
              style={{ backgroundImage: `url("${formData.avatar}")` }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-full bg-black/20">
               <Camera className="text-white drop-shadow-md" size={32} />
            </div>
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 tracking-tight text-center">{formData.name}</h3>
          
          <div className="flex flex-col items-center gap-2 mt-3">
            <span className="px-4 py-1.5 rounded-full bg-[#EE501C]/10 text-[#EE501C] text-xs font-bold border border-[#EE501C]/20 uppercase tracking-wide">
              {formData.rank}
            </span>
          </div>
          
          <div className="mt-8 w-full space-y-4">
             <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50 border border-gray-100">
               <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-[#EE501C]" />
                  <span className="text-sm font-medium text-gray-500">Thành viên từ</span>
               </div>
               <span className="text-sm font-bold text-gray-900">{formData.joinDate}</span>
             </div>
             
             <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50 border border-gray-100">
               <div className="flex items-center gap-3">
                  <Award size={20} className="text-[#EE501C]" />
                  <span className="text-sm font-medium text-gray-500">Xếp hạng</span>
               </div>
               <span className="text-sm font-bold text-gray-900">4.9/5.0</span>
             </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-8 p-8 md:p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Họ và tên</label>
                <div className="relative group">
                    <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium placeholder:text-gray-300" 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Edit2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#EE501C] transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
                <div className="relative group">
                    <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium placeholder:text-gray-300" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Edit2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#EE501C] transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Số điện thoại</label>
                <div className="relative group">
                    <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium font-mono placeholder:text-gray-300" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Edit2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#EE501C] transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Ngày sinh</label>
                <div className="relative group">
                    <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium placeholder:text-gray-300" 
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Địa chỉ thường trú</label>
                <div className="relative group">
                  <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium pr-12 placeholder:text-gray-300" 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <Edit2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#EE501C] transition-colors pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Giới tính</label>
                <div className="relative group w-full md:w-1/2">
                    <select
                        className="w-full px-6 py-4 rounded-[1.5rem] border border-gray-100 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-100 focus:border-orange-200 outline-none transition-all font-medium appearance-none"
                        defaultValue="Nam"
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 flex items-center justify-end gap-4 mt-8">
              <button 
                className="px-10 py-4 rounded-[1.2rem] border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all shadow-sm active:scale-95" 
                type="button"
                onClick={() => alert('Đã hủy thay đổi')}
              >
                Hủy
              </button>
              <button 
                className="px-12 py-4 rounded-[1.2rem] bg-[#EE501C] text-white font-bold text-sm shadow-xl shadow-orange-200 hover:bg-[#d64517] transition-all active:scale-[0.98]" 
                type="submit"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <User size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Không tìm thấy thông tin</h3>
            <p className="text-gray-500">Vui lòng đăng nhập với tài khoản Shipper để xem thông tin.</p>
        </div>
      )}
    </div>
  );
};
