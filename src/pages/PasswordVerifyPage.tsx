
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { useAuth } from '../contexts/AuthContext';

interface PasswordVerifyPageProps {
  onBack: () => void;
  onSuccess: () => void;
  onForgotPassword: () => void;
}

export const PasswordVerifyPage: React.FC<PasswordVerifyPageProps> = ({ onBack, onSuccess, onForgotPassword }) => {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Lấy mật khẩu thực tế từ user đang đăng nhập
    const correctPassword = user?.password || '123456';
    
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError('Mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans px-4 relative overflow-hidden">
      <BackgroundElements />

      <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative z-10 animate-in zoom-in-95 duration-500">
        <div className="bg-gradient-to-br from-primary-500 to-orange-600 px-8 pt-12 pb-10 text-center relative">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-inner">
               <div className="relative">
                  <Lock size={28} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center text-[10px] text-white border-2 border-white">
                    <span className="font-black">👤</span>
                  </div>
               </div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Nhập mật khẩu</h2>
          <p className="text-white/80 text-sm font-medium">Để bảo mật, vui lòng xác nhận danh tính</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleConfirm} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-4 ml-1">Mật khẩu tài khoản</label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  autoFocus
                  placeholder="••••••••"
                  className="w-full h-14 pl-6 pr-14 bg-white border-2 border-primary-50 focus:border-primary-500 rounded-full text-gray-900 font-bold transition-all focus:ring-4 focus:ring-primary-50 outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {error && <p className="mt-3 text-xs font-bold text-red-500 ml-5">{error}</p>}
            </div>

            <div className="text-right pr-2">
              <button 
                type="button" 
                onClick={onForgotPassword}
                className="text-xs font-bold text-primary-600 hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onBack}
                className="flex-1 h-14 bg-white text-gray-400 font-black rounded-full border-2 border-gray-100 hover:bg-gray-50 transition-all text-sm uppercase tracking-widest"
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="flex-1 h-14 bg-primary-600 text-white font-black rounded-full hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all active:scale-95 text-sm uppercase tracking-widest"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
