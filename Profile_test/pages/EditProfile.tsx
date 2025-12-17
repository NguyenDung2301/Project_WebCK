import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { UserContextType } from '../types';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useOutletContext<UserContextType>();
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    updateUser(formData);
    alert('Đã cập nhật thông tin thành công!');
  };

  const handleCancel = () => {
    setFormData(user);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800">Cập nhật thông tin</h2>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <div className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Họ và tên</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                </div>
                <input 
                    type="text" 
                    value={formData.name}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={16} />
                    </div>
                    <input 
                        type="email" 
                        value={formData.email}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>
            
             {/* Phone */}
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Số điện thoại</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Phone size={16} />
                    </div>
                    <input 
                        type="tel" 
                        value={formData.phone}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
             {/* Birthday */}
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Ngày sinh</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Calendar size={16} />
                    </div>
                    <input 
                        type="date" 
                        value={formData.birthday}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50"
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                    />
                </div>
            </div>

            {/* Gender */}
            <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Giới tính</label>
                 <div className="flex gap-6 py-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="text-primary-500 focus:ring-primary-500"
                            checked={formData.gender === 'male'}
                            onChange={() => setFormData({...formData, gender: 'male'})}
                        />
                        <span className="text-gray-700">Nam</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="text-primary-500 focus:ring-primary-500"
                            checked={formData.gender === 'female'}
                            onChange={() => setFormData({...formData, gender: 'female'})}
                        />
                        <span className="text-gray-700">Nữ</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="text-primary-500 focus:ring-primary-500"
                            checked={formData.gender === 'other'}
                            onChange={() => setFormData({...formData, gender: 'other'})}
                        />
                        <span className="text-gray-700">Khác</span>
                    </label>
                 </div>
            </div>
          </div>

           {/* Address */}
           <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Địa chỉ</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <MapPin size={16} />
                    </div>
                    <input 
                        type="text" 
                        value={formData.address}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all bg-gray-50"
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </div>
            </div>

        </div>

        <div className="mt-8 flex gap-4">
            <button 
                onClick={handleSave}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-primary-500/30 transition-all flex-1 md:flex-none"
            >
                Lưu thay đổi
            </button>
            <button 
                onClick={handleCancel}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-8 py-3 rounded-xl font-bold transition-all flex-1 md:flex-none"
            >
                Hủy
            </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;