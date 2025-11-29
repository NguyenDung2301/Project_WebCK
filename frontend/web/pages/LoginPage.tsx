import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { buildNetworkErrorMessage, getAuthApiBaseUrl, requestJson } from '../utils/api';

type LoginForm = {
  email: string;
  password: string;
};

const initialState: LoginForm = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('loading');
    setMessage(null);

    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
      };

      const data = await requestJson<{ data?: { token?: string } }>(
        `${getAuthApiBaseUrl()}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      const token = data?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      setStatus('success');
      setMessage('Đăng nhập thành công!');
    } catch (error) {
      setStatus('error');
      setMessage(buildNetworkErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Truy cập tài khoản FoodDelivery của bạn"
      helper={
        <p>
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-semibold text-primary hover:text-primary/80">
            Đăng ký ngay
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            placeholder="email@example.com"
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
            placeholder="••••••••"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
            Quên mật khẩu?
          </Link>
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
          {status === 'loading' ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

