
import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { ModalState } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface AdminModalsProps {
  modal: ModalState;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({ modal, onClose, onSave, onDelete }) => {
  
  const inputClass = "block w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm p-2.5 transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

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
               <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-bold border-4 border-white shadow-sm">
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
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.phone}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Ngày sinh</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.dob}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Giới tính</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.gender}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Ngày đăng ký</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.joinDate}</span>
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
        <form onSubmit={onSave} className="space-y-5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className={labelClass}>Họ và tên</label>
                <input required type="text" name="name" defaultValue={modal.data?.name} className={inputClass} placeholder="Nhập họ và tên" />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className={labelClass}>Số điện thoại</label>
                <input required type="tel" name="phone" defaultValue={modal.data?.phone} className={inputClass} placeholder="09xxxxxxx" />
              </div>
           </div>

           <div className="space-y-1">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input required type="email" name="email" defaultValue={modal.data?.email} className={inputClass} placeholder="example@email.com" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1">
                <label htmlFor="gender" className={labelClass}>Giới tính</label>
                <select name="gender" defaultValue={modal.data?.gender || 'Nam'} className={inputClass}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
             </div>
             <div className="space-y-1">
                <label htmlFor="dob" className={labelClass}>Ngày sinh</label>
                <input required type="date" name="dob" defaultValue={modal.data?.dob} className={inputClass} />
             </div>
           </div>

           <div className="space-y-1">
              <label htmlFor="role" className={labelClass}>Vai trò</label>
              <select name="role" defaultValue={modal.data?.role || 'User'} className={inputClass}>
                  <option value="User">Khách hàng (User)</option>
                  <option value="Driver">Tài xế (Driver)</option>
                  <option value="Admin">Quản trị viên (Admin)</option>
              </select>
           </div>

           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
             <Button type="button" variant="secondary" onClick={onClose}>Hủy bỏ</Button>
             <Button type="submit">{modal.type === 'ADD' ? 'Thêm mới' : 'Lưu thay đổi'}</Button>
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