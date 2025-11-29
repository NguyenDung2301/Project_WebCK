import React, { useState } from 'react';
import { X } from 'lucide-react';
import CustomSelect from './CustomSelect';
import { UserRole, SelectOption } from '../types';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleOptions: SelectOption[] = [
  { label: 'User', value: UserRole.USER },
  { label: 'Shipper', value: UserRole.SHIPPER },
  { label: 'Chef', value: UserRole.CHEF },
];

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#F9F9F9] rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Chỉnh sửa vai trò người dùng
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-2">
          <label className="block text-gray-700 font-medium text-base mb-2">
            Vai trò
          </label>
          <div className="relative">
            <CustomSelect 
              options={roleOptions} 
              value={selectedRole} 
              onChange={setSelectedRole} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pt-8 pb-6 flex justify-end items-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              console.log('Saved role:', selectedRole);
              onClose();
            }}
            className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;