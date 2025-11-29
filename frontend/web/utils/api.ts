const DEFAULT_BACKEND_URL = 'http://127.0.0.1:5000';

const normalizeUrl = (raw?: string) => {
  if (!raw || typeof raw !== 'string') {
    return DEFAULT_BACKEND_URL;
  }

  const trimmed = raw.trim();
  return trimmed.length ? trimmed.replace(/\/$/, '') : DEFAULT_BACKEND_URL;
};

export const getBackendBaseUrl = () => normalizeUrl(import.meta.env.VITE_BACKEND_URL);

export const getAuthApiBaseUrl = () => `${getBackendBaseUrl()}/api/auth`;

type ApiEnvelope = {
  success?: boolean;
  message?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const requestJson = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, init);
  const data = await response.json().catch(() => ({}));

  const envelope = (isRecord(data) ? (data as ApiEnvelope) : undefined) ?? {};

  if (!response.ok || envelope.success === false) {
    const message = typeof envelope.message === 'string'
      ? envelope.message
      : 'Đã xảy ra lỗi, vui lòng thử lại.';
    throw new Error(message);
  }

  return data as T;
};

export const buildNetworkErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Không thể kết nối tới backend. Vui lòng đảm bảo server đang chạy.';
};

