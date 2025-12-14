/**
 * Pagination Utilities
 * Các hàm phân trang dùng chung cho toàn bộ ứng dụng
 */

/**
 * Thông tin phân trang
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

/**
 * Kết quả phân trang
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * Tính số trang tổng cộng
 * @param totalItems - Tổng số items
 * @param itemsPerPage - Số items mỗi trang
 * @returns Tổng số trang
 * 
 * @example
 * calculateTotalPages(100, 10); // 10
 * calculateTotalPages(95, 10);  // 10
 */
export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  if (itemsPerPage <= 0) return 0;
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Lấy một trang dữ liệu từ danh sách
 * @param items - Danh sách items
 * @param page - Số trang (bắt đầu từ 1)
 * @param itemsPerPage - Số items mỗi trang
 * @returns Danh sách items của trang đó
 * 
 * @example
 * // Lấy trang 2, mỗi trang 10 items
 * getPageSlice(users, 2, 10);
 */
export const getPageSlice = <T>(items: T[], page: number, itemsPerPage: number): T[] => {
  if (page < 1 || itemsPerPage <= 0) return [];
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return items.slice(startIndex, endIndex);
};

/**
 * Phân trang danh sách với đầy đủ thông tin
 * @param items - Danh sách items
 * @param page - Số trang hiện tại (bắt đầu từ 1)
 * @param itemsPerPage - Số items mỗi trang
 * @returns Kết quả phân trang với data và thông tin pagination
 * 
 * @example
 * const { data, pagination } = paginate(users, 1, 10);
 * // data: users của trang 1
 * // pagination: { currentPage: 1, totalPages: 5, hasNextPage: true, ... }
 */
export const paginate = <T>(
  items: T[],
  page: number,
  itemsPerPage: number
): PaginatedResult<T> => {
  const totalItems = items.length;
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);
  
  // Đảm bảo page nằm trong khoảng hợp lệ
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const data = items.slice(startIndex, endIndex);
  
  return {
    data,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: totalItems > 0 ? startIndex + 1 : 0, // 1-indexed for display
      endIndex,
    },
  };
};

/**
 * Tạo mảng số trang để hiển thị pagination UI
 * @param currentPage - Trang hiện tại
 * @param totalPages - Tổng số trang
 * @param maxVisible - Số trang tối đa hiển thị (mặc định 5)
 * @returns Mảng số trang
 * 
 * @example
 * getPageNumbers(5, 10, 5); // [3, 4, 5, 6, 7]
 * getPageNumbers(1, 10, 5); // [1, 2, 3, 4, 5]
 * getPageNumbers(10, 10, 5); // [6, 7, 8, 9, 10]
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const half = Math.floor(maxVisible / 2);
  let start = currentPage - half;
  let end = currentPage + half;
  
  if (start < 1) {
    start = 1;
    end = maxVisible;
  }
  
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxVisible + 1;
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Tính offset cho API pagination (dùng cho backend)
 * @param page - Số trang (bắt đầu từ 1)
 * @param limit - Số items mỗi trang
 * @returns Offset để gửi lên API
 * 
 * @example
 * getOffset(1, 10); // 0
 * getOffset(2, 10); // 10
 * getOffset(3, 10); // 20
 */
export const getOffset = (page: number, limit: number): number => {
  return (Math.max(1, page) - 1) * limit;
};

/**
 * Tạo query params cho API pagination
 * @param page - Số trang
 * @param limit - Số items mỗi trang
 * @param useOffset - Dùng offset thay vì page (mặc định false)
 * @returns Object query params
 * 
 * @example
 * getPaginationParams(2, 10);       // { page: 2, limit: 10 }
 * getPaginationParams(2, 10, true); // { offset: 10, limit: 10 }
 */
export const getPaginationParams = (
  page: number,
  limit: number,
  useOffset: boolean = false
): Record<string, number> => {
  if (useOffset) {
    return { offset: getOffset(page, limit), limit };
  }
  return { page, limit };
};
