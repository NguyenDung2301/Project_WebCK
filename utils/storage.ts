/**
 * Storage Utilities
 * Quản lý lưu trữ IN-MEMORY (RAM)
 * Thay thế hoàn toàn localStorage theo yêu cầu: "không sử dụng localstronge nữa"
 */

// In-memory storage (mất khi F5)
const memoryStorage = new Map<string, string>();

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  ADMIN_NAME: 'adminName',
  ADMIN_EMAIL: 'adminEmail',
} as const;

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

/**
 * Lấy giá trị (In-Memory)
 */
export const getItem = (key: StorageKey): string | null => {
  return memoryStorage.get(key) || null;
};

/**
 * Lưu giá trị (In-Memory)
 */
export const setItem = (key: StorageKey, value: string): void => {
  memoryStorage.set(key, value);
};

/**
 * Xóa giá trị (In-Memory)
 */
export const removeItem = (key: StorageKey): void => {
  memoryStorage.delete(key);
};

/**
 * Xóa nhiều giá trị
 */
export const removeItems = (keys: StorageKey[]): void => {
  keys.forEach(key => removeItem(key));
};

/**
 * Xóa toàn bộ auth data
 */
export const clearAuthData = (): void => {
  memoryStorage.clear();
};

// ============ Specific Getters/Setters ============

export const getToken = (): string | null => getItem(STORAGE_KEYS.TOKEN);
export const setToken = (token: string): void => setItem(STORAGE_KEYS.TOKEN, token);

export const getAdminInfo = (): { name: string | null; email: string | null } => {
  return {
    name: getItem(STORAGE_KEYS.ADMIN_NAME),
    email: getItem(STORAGE_KEYS.ADMIN_EMAIL),
  };
};

export const setAdminInfo = (name: string, email: string): void => {
  setItem(STORAGE_KEYS.ADMIN_NAME, name);
  setItem(STORAGE_KEYS.ADMIN_EMAIL, email);
};