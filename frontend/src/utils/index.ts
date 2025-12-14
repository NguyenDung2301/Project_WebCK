/**
 * Utils Index
 * Re-export tất cả utilities từ một nơi
 */

// Filters
export {
  filterBySearch,
  filterByField,
  filterByPriceRange,
  filterByDateRange,
  applyFilters,
} from './filters';

// Formatters
export {
  formatDateVN,
  formatDateISO,
  formatCurrency,
  formatNumber,
  formatPhone,
  truncateText,
  getInitials,
  formatRelativeTime,
} from './formatters';

// Mappers
export {
  ROLE_MAP,
  ROLE_MAP_REVERSE,
  GENDER_MAP,
  GENDER_MAP_REVERSE,
  STATUS_OPTIONS,
  mapRole,
  mapRoleToBackend,
  mapGender,
  mapGenderToBackend,
} from './mappers';

// Pagination
export {
  calculateTotalPages,
  getPageSlice,
  paginate,
  getPageNumbers,
  type PaginationInfo,
  type PaginatedResult,
} from './pagination';

// Storage
export {
  STORAGE_KEYS,
  getItem,
  setItem,
  removeItem,
  removeItems,
  clearAuthData,
  getToken,
  setToken,
  getAdminInfo,
  setAdminInfo,
} from './storage';

// Validation (includes Type Guards)
export {
  // Type Guards
  isValidRole,
  isValidBackendRole,
  isValidGender,
  // Field Validators
  isValidEmail,
  isValidPhone,
  validatePassword,
  validateName,
  validateDob,
  validateRegistrationForm,
  type RegistrationFormData,
  type FormErrors,
} from './validation';
