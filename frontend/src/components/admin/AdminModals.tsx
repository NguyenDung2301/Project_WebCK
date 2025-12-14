import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ModalState, AdminModalsProps, UserFormData } from '@/types/admin';
import { 
  FormErrors, 
  isValidEmail, 
  isValidPhone, 
  validatePassword, 
  validateName, 
  validateDob,
  formatDateVN 
} from '@/utils';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export const AdminModals: React.FC<AdminModalsProps> = ({ modal, onClose, onSave, onDelete, existingUsers = [] }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: modal.data?.name || '',
    email: modal.data?.email || '',
    phone: modal.data?.phone || '',
    password: '',
    gender: modal.data?.gender || 'Nam',
    dob: modal.data?.dob || '',
    role: modal.data?.role || 'User',
  });

  // Reset formData whenever modal opens or modal.data changes
  useEffect(() => {
    setFormData({
      name: modal.data?.name || '',
      email: modal.data?.email || '',
      phone: modal.data?.phone || '',
      password: '',
      gender: modal.data?.gender || 'Nam',
      dob: modal.data?.dob || '',
      role: modal.data?.role || 'User',
    });
    setFormErrors({});
  }, [modal.type, modal.data]);
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // CSS Classes
  const inputClass = "block w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400 focus:border-[#EE501C] focus:ring-1 focus:ring-[#EE501C] sm:text-sm p-2.5 transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorTextClass = "text-xs text-red-600 mt-1 flex items-center gap-1";

  /**
   * Validate form using utils/validation.ts
   */
  const validateForm = useCallback((): FormErrors => {
    const errors: FormErrors = {};

    // Validate name
    const nameResult = validateName(formData.name);
    if (!nameResult.isValid) {
      errors.name = nameResult.message;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email không hợp lệ';
    } else if (existingUsers.some(u => u.email === formData.email && u.id !== modal.data?.id)) {
      errors.email = 'Email này đã được sử dụng';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = 'Số điện thoại không được để trống';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ (phải 10-11 chữ số)';
    } else if (existingUsers.some(u => u.phone === formData.phone && u.id !== modal.data?.id)) {
      errors.phone = 'Số điện thoại này đã được sử dụng';
    }

    // Validate password (only for ADD modal)
    if (modal.type === 'ADD') {
      const passwordResult = validatePassword(formData.password);
      if (!passwordResult.isValid) {
        errors.password = passwordResult.message;
      }
    }

    // Validate DOB
    const dobResult = validateDob(formData.dob);
    if (!dobResult.isValid) {
      errors.dob = dobResult.message;
    }

    return errors;
  }, [formData, existingUsers, modal.data?.id, modal.type]);

  // Memoized errors for UI display
  const errors = useMemo(() => validateForm(), [validateForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      e.preventDefault();
      return;
    }
    
    // Update form data in the form element before submitting
    Object.entries(formData).forEach(([key, value]) => {
      const input = e.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement;
      if (input) {
        input.value = String(value);
      }
    });
    
    onSave(e);
  };

  return (
    <>
      {/* VIEW USER DETAILS MODAL */}
      <Modal 
        isOpen={modal.type === 'VIEW'} 
        onClose={onClose} 
        title="Chi tiết người dùng"
      >
        {modal.data && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center text-[#EE501C] text-3xl font-bold border-4 border-white shadow-sm">
                  {modal.data.name.charAt(0)}
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-gray-900">{modal.data.name}</h2>
                  <span className="text-sm text-gray-500 capitalize">{modal.data.role}</span>
               </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">User ID</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2 font-mono">{modal.data.id}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Email</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Số điện thoại</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.phone || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Ngày sinh</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">
                   {modal.data.dob ? formatDateVN(modal.data.dob) : 'Chưa cập nhật'}
                 </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Giới tính</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.gender || 'Chưa cập nhật'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Ngày đăng ký</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{formatDateVN(modal.data.joinDate)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <span className="text-sm text-gray-500 col-span-1">Vai trò</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2 capitalize">{modal.data.role}</span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <Button variant="secondary" onClick={onClose}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ADD / EDIT USER MODAL */}
      <Modal 
        isOpen={modal.type === 'ADD' || modal.type === 'EDIT'} 
        onClose={onClose} 
        title={modal.type === 'ADD' ? 'Thêm người dùng mới' : 'Chỉnh sửa vai trò người dùng'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {modal.type === 'ADD' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className={labelClass}>Họ và tên <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="Nhập họ và tên" 
                  />
                  {errors.name && (
                    <div className={errorTextClass}>
                      <AlertCircle size={14} />
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className={labelClass}>Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="09xxxxxxx" 
                  />
                  {errors.phone && (
                    <div className={errorTextClass}>
                      <AlertCircle size={14} />
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${inputClass} ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="example@email.com" 
                />
                {errors.email && (
                  <div className={errorTextClass}>
                    <AlertCircle size={14} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className={labelClass}>Mật khẩu <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputClass} ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="••••••••" 
                />
                {errors.password && (
                  <div className={errorTextClass}>
                    <AlertCircle size={14} />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="gender" className={labelClass}>Giới tính</label>
                  <select 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`${inputClass} border-gray-300`}
                  >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="dob" className={labelClass}>Ngày sinh</label>
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.dob ? 'border-red-500' : 'border-gray-300'}`} 
                  />
                  {errors.dob && (
                    <div className={errorTextClass}>
                      <AlertCircle size={14} />
                      {errors.dob}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="role" className={labelClass}>Vai trò</label>
                <select 
                  name="role" 
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`${inputClass} border-gray-300`}
                >
                    <option value="User">User</option>
                    <option value="Shipper">Shipper</option>
                    
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Hiện tại chỉ có thể chỉnh sửa vai trò của người dùng. Các thông tin khác cần được cập nhật bởi chính người dùng đó.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Họ và tên</label>
                  <input type="text" value={modal.data?.name || ''} className={`${inputClass} border-gray-300`} disabled />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={modal.data?.email || ''} className={`${inputClass} border-gray-300`} disabled />
                </div>
                <div className="space-y-1">
                  <label htmlFor="role" className={labelClass}>Vai trò</label>
                  <select 
                    name="role" 
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`${inputClass} border-gray-300`}
                  >
                      <option value="User">User</option>
                      <option value="Shipper">Shipper</option>
                  </select>
                </div>
              </div>
            </>
          )}

           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
             <Button type="button" variant="secondary" onClick={onClose}>Hủy bỏ</Button>
             <Button type="submit" disabled={modal.type === 'ADD' && Object.keys(errors).length > 0}>{modal.type === 'ADD' ? 'Thêm mới' : 'Lưu thay đổi'}</Button>
           </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal 
        isOpen={modal.type === 'DELETE'} 
        onClose={onClose}
        maxWidth="sm"
      >
        <div className="flex flex-col items-center text-center p-2">
           <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-5">
              <AlertTriangle size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Xóa tài khoản</h3>
           <p className="text-sm text-gray-500 mb-8 leading-relaxed">
             Bạn có chắc chắn muốn xóa tài khoản <strong className="text-gray-900">{modal.data?.name}</strong> này không? 
             Tất cả dữ liệu liên quan đến tài khoản này sẽ bị xóa vĩnh viễn. 
             Hành động này không thể được hoàn tác.
           </p>
           
           <div className="flex w-full gap-3">
             <Button 
                variant="secondary" 
                className="flex-1" 
                onClick={onClose}
             >
                Hủy bỏ
             </Button>
             <Button 
                variant="danger" 
                className="flex-1" 
                onClick={onDelete}
             >
                Xóa tài khoản
             </Button>
           </div>
        </div>
      </Modal>
    </>
  );
};

