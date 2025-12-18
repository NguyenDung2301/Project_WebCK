/**
 * Storage Utilities
 * Quản lý localStorage tập trung
 */

// Storage Keys - Định nghĩa tất cả keys ở đây để tránh typo
export const STORAGE_KEYS = {
  TOKEN: 'token',
  ADMIN_NAME: 'adminName',
  ADMIN_EMAIL: 'adminEmail',
} as const;

// Type for storage keys
type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

/**
 * Lấy giá trị từ localStorage
 * @param key - Storage key
 * @returns Giá trị hoặc null
 */
export const getItem = (key: StorageKey): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading from localStorage [${key}]:`, error);
    return null;
  }
};

/**
 * Lưu giá trị vào localStorage
 * @param key - Storage key
 * @param value - Giá trị cần lưu
 */
export const setItem = (key: StorageKey, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error writing to localStorage [${key}]:`, error);
  }
};

/**
 * Xóa giá trị khỏi localStorage
 * @param key - Storage key
 */
export const removeItem = (key: StorageKey): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage [${key}]:`, error);
  }
};

/**
 * Xóa nhiều giá trị cùng lúc
 * @param keys - Danh sách keys cần xóa
 */
export const removeItems = (keys: StorageKey[]): void => {
  keys.forEach(key => removeItem(key));
};

/**
 * Xóa toàn bộ auth data
 */
export const clearAuthData = (): void => {
  removeItems([
    STORAGE_KEYS.TOKEN,
    STORAGE_KEYS.ADMIN_NAME,
    STORAGE_KEYS.ADMIN_EMAIL,
  ]);
};

// ============ Specific Getters/Setters ============

/**
 * Lấy token
 */
export const getToken = (): string | null => {
  return getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Lưu token
 */
export const setToken = (token: string): void => {
  setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Lấy thông tin admin
 */
export const getAdminInfo = (): { name: string | null; email: string | null } => {
  return {
    name: getItem(STORAGE_KEYS.ADMIN_NAME),
    email: getItem(STORAGE_KEYS.ADMIN_EMAIL),
  };
};

/**
 * Lưu thông tin admin
 */
export const setAdminInfo = (name: string, email: string): void => {
  setItem(STORAGE_KEYS.ADMIN_NAME, name);
  setItem(STORAGE_KEYS.ADMIN_EMAIL, email);
};
