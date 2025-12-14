import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/common/AuthLayout';
import { register } from '@/services/authService';
import { isValidPhone, validatePassword } from '@/utils';

type RegisterForm = {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
};

const initialState: RegisterForm = {
  fullname: '',
  email: '',
  password: '',
  phoneNumber: '',
  birthday: '',
  gender: '',
};

export const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate using utils
    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid) {
      setStatus('error');
      setMessage(passwordValidation.message || 'Mật khẩu không hợp lệ');
      return;
    }

    if (form.phoneNumber && !isValidPhone(form.phoneNumber)) {
      setStatus('error');
      setMessage('Số điện thoại phải gồm 10-11 chữ số.');
      return;
    }

    setStatus('loading');
    setMessage(null);

    const result = await register({
      fullname: form.fullname.trim(),
      email: form.email.trim(),
      password: form.password,
      phone_number: form.phoneNumber ? form.phoneNumber.trim() : undefined,
      birthday: form.birthday || undefined,
      gender: form.gender as 'Male' | 'Female' | undefined,
    });

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setForm(initialState);
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  return (
    <AuthLayout
      title="Đăng ký"
      subtitle="Tạo tài khoản FoodDelivery trong vài bước đơn giản"
      helper={
        <div className="space-y-3">
          <p>
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
              Đăng nhập
            </Link>
          </p>
          <p>
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary">
              ← Quay lại trang chủ
            </Link>
          </p>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="fullname" className="text-sm font-semibold text-gray-600">
            Họ và tên
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            required
            value={form.fullname}
            onChange={handleChange}
            //placeholder="Nguyễn Văn A"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            //placeholder="email@example.com"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-gray-600">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Yêu cầu ít nhất 6 ký tự"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-600">
            Số điện thoại (tùy chọn)
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            pattern="\d{10,11}"
            value={form.phoneNumber}
            onChange={handleChange}
            //placeholder="0912345678"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="birthday" className="text-sm font-semibold text-gray-600">
              Ngày sinh (tùy chọn)
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-semibold text-gray-600">
              Giới tính (tùy chọn)
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>
        </div>

        {message && (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-2xl bg-primary py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-[#d43f0f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
    </AuthLayout>
  );
};


