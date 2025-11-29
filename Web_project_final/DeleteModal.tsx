import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { DeleteModalProps } from '../types';

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-[500px] transform transition-all scale-100 border border-gray-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3d1a1a] flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-[#ef4444]" strokeWidth={2.5} />
            </div>
            <h2 
              id="modal-title" 
              className="text-2xl font-bold text-gray-900"
            >
              Xóa tài khoản
            </h2>
          </div>

          {/* Body Text */}
          <div className="mb-8">
            <p className="text-gray-900 text-[17px] leading-relaxed">
              Bạn có chắc chắn muốn xóa tài khoản này không? Tất cả dữ liệu liên quan đến tài khoản này sẽ bị xóa vĩnh viễn. 
              <br />
              Hành động này không thể được hoàn tác.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-md text-white bg-[#c9302c] hover:bg-[#b02a27] transition-colors font-semibold text-lg shadow-sm w-full sm:w-auto text-center"
            >
              Hủy bỏ
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 rounded-md text-white bg-[#c9302c] hover:bg-[#b02a27] transition-colors font-semibold text-lg shadow-sm w-full sm:w-auto text-center"
            >
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};