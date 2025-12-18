
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../components/common/Input';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { Logo } from '../components/common/Logo';
import { userService } from '../services/userService';

interface RegisterPageProps {
  onLogin: () => void;
  onRegisterSuccess: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onHome: () => void;
  onBack: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin, onRegisterSuccess, onTerms, onPrivacy, onHome, onBack }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const email = formData.get('email') as string;

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUsers = userService.getUsers();
    if (existingUsers.some(u => u.email === email)) {
      setError('Email này đã được đăng ký.');
      return;
    }

    // Tạo người dùng mới trong "Database"
    try {
      // Gộp họ và tên
      const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
      formData.set('name', fullName);
      formData.set('role', 'customer'); // Mặc định là khách hàng
      
      userService.createUser(formData);
      
      alert('Đăng ký thành công! Bạn có thể đăng nhập ngay với mật khẩu vừa tạo (hoặc 123456 cho bản demo).');
      onRegisterSuccess();
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-sans px-4 pt-28 pb-10 relative overflow-hidden">
       {/* Global Logo */}
       <div className="absolute top-6 left-6 z-20">
        <Logo onClick={onHome} />
      </div>

      <BackgroundElements />

      <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-10 sm:p-12 w-full max-w-[550px] border border-gray-100 shadow-sm relative z-10">
        <button 
          onClick={onBack} 
          className="absolute top-6 left-6 text-gray-400 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-extrabold text-primary-600 mb-2">Đăng ký</h1>
          <p className="text-gray-500">Tạo tài khoản mới để bắt đầu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Input name="firstName" type="text" placeholder="Họ" required variant="auth" className="flex-1" />
            <Input name="lastName" type="text" placeholder="Tên" required variant="auth" className="flex-1" />
          </div>

          <Input name="email" type="email" placeholder="Email của bạn" required variant="auth" />
          <Input name="password" type="password" placeholder="Mật khẩu" required variant="auth" />
          <Input name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required variant="auth" />

          <button 
            type="submit" 
            className="w-full py-4 mt-4 bg-primary-600 text-white font-bold rounded-[50px] text-lg uppercase tracking-wide hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Đăng Ký
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          Bằng việc đăng ký, bạn đồng ý với 
          <button onClick={onTerms} className="text-primary-600 hover:underline mx-1">Điều khoản dịch vụ</button> 
          và 
          <button onClick={onPrivacy} className="text-primary-600 hover:underline mx-1">Chính sách bảo mật</button> 
          của chúng tôi
        </div>

        <div className="relative text-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative z-10 bg-white/50 px-4 text-sm text-gray-500 rounded-full">Hoặc đăng ký với</span>
        </div>

        <div className="flex justify-center gap-4 mb-6">
            {[
              { color: '#DB4437', path: <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>, extra: [<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>, <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>, <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>] },
              { color: '#000', path: <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/> },
              { color: '#000', path: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> }
            ].map((icon, i) => (
              <button key={i} className="w-[60px] h-[60px] rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={icon.color}>
                   {icon.path}
                   {icon.extra}
                </svg>
              </button>
            ))}
        </div>

        <div className="text-center text-gray-500">
          Đã có tài khoản? <button onClick={onLogin} className="text-primary-600 font-bold hover:underline">Đăng nhập ngay</button>
        </div>
      </div>
    </div>
  );
};
