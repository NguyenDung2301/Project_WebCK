/**
 * API Configuration and HTTP Client (Axios)
 * File này chứa cấu hình base URL và các hàm tiện ích cho HTTP requests
 */

import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const DEFAULT_BACKEND_URL = 'http://127.0.0.1:5000';

const normalizeUrl = (raw?: string) => {
  if (!raw || typeof raw !== 'string') {
    return DEFAULT_BACKEND_URL;
  }

  const trimmed = raw.trim();
  return trimmed.length ? trimmed.replace(/\/$/, '') : DEFAULT_BACKEND_URL;
};

// Base URL configuration
export const getBackendBaseUrl = () => normalizeUrl(import.meta.env.VITE_BACKEND_URL);
export const getAuthApiBaseUrl = () => `${getBackendBaseUrl()}/api/auth`;
export const getUsersApiBaseUrl = () => `${getBackendBaseUrl()}/api/users`;

// API Response Types
type ApiEnvelope = {
  success?: boolean;
  message?: string;
};

// Create Axios instance
export const apiClient = axios.create({
  baseURL: getBackendBaseUrl(),
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Tự động thêm token vào mọi request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý response và errors
apiClient.interceptors.response.use(
  (response) => {
    // Check if API returns success: false
    const data = response.data as ApiEnvelope;
    if (data?.success === false) {
      const message = typeof data.message === 'string'
        ? data.message
        : 'Đã xảy ra lỗi, vui lòng thử lại.';
      return Promise.reject(new Error(message));
    }
    return response;
  },
  (error: AxiosError<ApiEnvelope>) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Không thể kết nối tới backend. Vui lòng đảm bảo server đang chạy.'));
    }

    // Handle HTTP errors
    const status = error.response.status;
    const data = error.response.data;
    
    let message = typeof data?.message === 'string'
      ? data.message
      : status === 401
        ? 'Token không hợp lệ'
        : status === 403
          ? 'Bạn không có quyền truy cập'
          : `Đã xảy ra lỗi (${status}). Vui lòng thử lại.`;

    return Promise.reject(new Error(message));
  }
);

/**
 * Generic JSON request function with error handling (using Axios)
 * @param input - URL string
 * @param init - Request options (method, headers, body, etc.)
 * @returns Promise<T> - Parsed JSON response
 */
export const requestJson = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const url = typeof input === 'string' ? input : input.toString();
  
  const config: AxiosRequestConfig = {
    url,
    method: (init?.method as AxiosRequestConfig['method']) || 'GET',
    headers: init?.headers as Record<string, string>,
    data: init?.body ? JSON.parse(init.body as string) : undefined,
  };

  const response = await apiClient.request<T>(config);
  return response.data;
};

/**
 * Build user-friendly error message from error object
 * @param error - Error object or unknown
 * @returns User-friendly error message string
 */
export const buildNetworkErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Không thể kết nối tới backend. Vui lòng đảm bảo server đang chạy.';
};

/**
 * Get authorization header with token
 * @returns Headers object with Authorization Bearer token
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};
