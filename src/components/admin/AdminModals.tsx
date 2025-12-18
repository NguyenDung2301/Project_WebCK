
import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ModalState } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface AdminModalsProps {
  modal: ModalState;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({ modal, onClose, onSave, onDelete }) => {
  
  // Update to rounded-2xl for Apple consistency
  const selectClass = "block w-full rounded-2xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm px-4 py-2.5 transition-shadow shadow-sm outline-none";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1 ml-1";

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
                 <span className="text-sm font-medium text-gray-900 col-span-2 font-mono">{modal.data._id}</span>
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
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.dob || 'Chưa cập nhật'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Giới tính</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{modal.data.gender || 'Chưa cập nhật'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4">
                 <span className="text-sm text-gray-500 col-span-1">Ngày đăng ký</span>
                 <span className="text-sm font-medium text-gray-900 col-span-2">{new Date(modal.data.createdAt).toLocaleDateString('vi-VN')}</span>
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
              <Input 
                label="Họ và tên"
                required 
                type="text" 
                name="name" 
                defaultValue={modal.data?.name} 
                placeholder="Nhập họ và tên"
                variant="admin"
              />
              <Input 
                label="Số điện thoại"
                required 
                type="tel" 
                name="phone" 
                defaultValue={modal.data?.phone} 
                placeholder="09xxxxxxx"
                variant="admin"
              />
           </div>

           <Input 
              label="Email"
              required 
              type="email" 
              name="email" 
              defaultValue={modal.data?.email} 
              placeholder="example@email.com"
              variant="admin"
           />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1">
                <label htmlFor="gender" className={labelClass}>Giới tính</label>
                <select name="gender" defaultValue={modal.data?.gender || 'Nam'} className={selectClass}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
             </div>
             <Input 
                label="Ngày sinh"
                required 
                type="date" 
                name="dob" 
                defaultValue={modal.data?.dob}
                variant="admin"
             />
           </div>

           <div className="space-y-1">
              <label htmlFor="role" className={labelClass}>Vai trò</label>
              <select name="role" defaultValue={modal.data?.role || 'customer'} className={selectClass}>
                  <option value="customer">Khách hàng</option>
                  <option value="driver">Tài xế</option>
                  <option value="restaurant">Đối tác/Nhà hàng</option>
                  <option value="admin">Quản trị viên (Admin)</option>
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
