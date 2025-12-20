/**
 * Filter Utils
 * Các hàm tiện ích để lọc dữ liệu
 */

/**
 * Lọc danh sách theo từ khóa tìm kiếm trên nhiều trường
 * @param items - Danh sách cần lọc
 * @param searchTerm - Từ khóa tìm kiếm
 * @param fields - Các trường cần tìm kiếm trong object
 */
export const filterBySearch = <T>(items: T[], searchTerm: string, fields: (keyof T)[]): T[] => {
  if (!searchTerm || searchTerm.trim() === '') return items;
  
  const lowerTerm = searchTerm.toLowerCase().trim();
  
  return items.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerTerm);
    });
  });
};

/**
 * Lọc danh sách theo một trường cụ thể (Exact match)
 * @param items - Danh sách cần lọc
 * @param field - Trường cần lọc
 * @param value - Giá trị cần lọc (nếu 'All' hoặc rỗng sẽ trả về toàn bộ)
 */
export const filterByField = <T>(items: T[], field: keyof T, value: any): T[] => {
  if (value === undefined || value === null || value === '' || value === 'All') {
    return items;
  }
  return items.filter((item) => item[field] === value);
};

/**
 * Lọc theo khoảng giá (Placeholder - chưa implement logic chi tiết)
 */
export const filterByPriceRange = <T>(items: T[], field: keyof T, min?: number, max?: number): T[] => {
  return items.filter(item => {
    const val = Number(item[field]);
    if (min !== undefined && val < min) return false;
    if (max !== undefined && val > max) return false;
    return true;
  });
};

/**
 * Lọc theo khoảng thời gian (Placeholder - chưa implement logic chi tiết)
 */
export const filterByDateRange = <T>(items: T[], field: keyof T, startDate?: string, endDate?: string): T[] => {
  // Logic lọc ngày tháng đơn giản
  return items;
};

/**
 * Áp dụng nhiều bộ lọc tuần tự
 * @param items - Danh sách gốc
 * @param filterFns - Mảng các hàm lọc (đã curried hoặc wrapped)
 */
export const applyFilters = <T>(items: T[], filterFns: Array<(items: T[]) => T[]>): T[] => {
  return filterFns.reduce((currentItems, filterFn) => filterFn(currentItems), items);
};
