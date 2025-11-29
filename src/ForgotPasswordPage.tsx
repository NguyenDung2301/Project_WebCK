import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onRegister: () => void;
  onHome: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin, onRegister, onHome }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Email đã được gửi thành công! Vui lòng kiểm tra hộp thư của bạn.');
    onBackToLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-sans px-4 pt-28 pb-10 relative">
      {/* Global Logo */}
      <div className="absolute top-6 left-6 z-20 cursor-pointer" onClick={onHome}>
        <span className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors">FoodDelivery</span>
      </div>

      <div className="bg-white rounded-[40px] p-10 sm:p-12 w-full max-w-[500px] shadow-xl border border-gray-100 relative">
        <button 
          onClick={onBackToLogin} 
          className="absolute top-6 left-6 text-gray-400 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-4">Quên mật khẩu</h1>
          <p className="text-gray-500 text-sm">Nhập email của bạn để lấy lại mật khẩu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="email" className="block text-gray-700 font-medium ml-2">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Nhập email của bạn"
              required
              className="w-full px-5 py-4 bg-white border border-gray-300 rounded-[50px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 shadow-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary-600 text-white font-bold rounded-[50px] text-lg uppercase tracking-wide hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-primary-500/30"
          >
            Gửi Email
          </button>
        </form>

        <div className="text-center mt-8 text-gray-500 text-sm">
          Chưa có tài khoản? <button onClick={onRegister} className="text-primary-600 font-bold hover:underline">Đăng ký ngay</button>
        </div>
      </div>
    </div>
  );
};