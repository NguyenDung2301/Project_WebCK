/**
 * Filter Utilities
 * Các hàm lọc và tìm kiếm dùng chung cho toàn bộ ứng dụng
 */

/**
 * Tìm kiếm trong danh sách theo nhiều trường
 * @param items - Danh sách items
 * @param searchTerm - Từ khóa tìm kiếm
 * @param fields - Các trường cần tìm
 * @returns Danh sách đã lọc
 * 
 * @example
 * // Tìm user theo name, email, phone
 * filterBySearch(users, 'john', ['name', 'email', 'phone']);
 * 
 * // Tìm món ăn theo tên và mô tả
 * filterBySearch(foods, 'pizza', ['name', 'description']);
 * 
 * // Tìm nhà hàng theo tên và địa chỉ
 * filterBySearch(restaurants, 'hanoi', ['name', 'address']);
 */
export const filterBySearch = <T>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm || searchTerm.trim() === '') return items;
  
  const term = searchTerm.toLowerCase().trim();
  
  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(term);
    })
  );
};

/**
 * Lọc theo một trường cụ thể
 * @param items - Danh sách items
 * @param field - Trường cần lọc
 * @param value - Giá trị cần lọc (nếu 'All' hoặc undefined sẽ trả về tất cả)
 * @returns Danh sách đã lọc
 * 
 * @example
 * // Lọc user theo role
 * filterByField(users, 'role', 'Admin');
 * 
 * // Lọc món ăn theo category
 * filterByField(foods, 'category_id', 'cat123');
 * 
 * // Lọc đơn hàng theo status
 * filterByField(orders, 'status', 'pending');
 */
export const filterByField = <T>(
  items: T[],
  field: keyof T,
  value: unknown
): T[] => {
  if (value === 'All' || value === undefined || value === null || value === '') {
    return items;
  }
  return items.filter(item => item[field] === value);
};

/**
 * Lọc theo khoảng giá
 * @param items - Danh sách items
 * @param priceField - Trường giá
 * @param minPrice - Giá tối thiểu
 * @param maxPrice - Giá tối đa
 * @returns Danh sách đã lọc
 * 
 * @example
 * // Lọc món ăn theo giá 50k - 200k
 * filterByPriceRange(foods, 'price', 50000, 200000);
 */
export const filterByPriceRange = <T>(
  items: T[],
  priceField: keyof T,
  minPrice?: number,
  maxPrice?: number
): T[] => {
  return items.filter(item => {
    const price = Number(item[priceField]);
    if (isNaN(price)) return false;
    
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    
    return true;
  });
};

/**
 * Lọc theo khoảng ngày
 * @param items - Danh sách items
 * @param dateField - Trường ngày
 * @param startDate - Ngày bắt đầu
 * @param endDate - Ngày kết thúc
 * @returns Danh sách đã lọc
 * 
 * @example
 * // Lọc đơn hàng trong tuần này
 * filterByDateRange(orders, 'created_at', startOfWeek, endOfWeek);
 */
export const filterByDateRange = <T>(
  items: T[],
  dateField: keyof T,
  startDate?: Date | string,
  endDate?: Date | string
): T[] => {
  return items.filter(item => {
    const dateValue = item[dateField];
    if (!dateValue) return false;
    
    const itemDate = new Date(dateValue as string | number | Date);
    if (isNaN(itemDate.getTime())) return false;
    
    if (startDate && itemDate < new Date(startDate)) return false;
    if (endDate && itemDate > new Date(endDate)) return false;
    
    return true;
  });
};

/**
 * Lọc theo trạng thái boolean
 * @param items - Danh sách items
 * @param field - Trường boolean
 * @param value - true/false hoặc undefined (trả về tất cả)
 * @returns Danh sách đã lọc
 * 
 * @example
 * // Lọc món ăn đang available
 * filterByBoolean(foods, 'is_available', true);
 * 
 * // Lọc nhà hàng đang mở cửa
 * filterByBoolean(restaurants, 'is_open', true);
 */
export const filterByBoolean = <T>(
  items: T[],
  field: keyof T,
  value?: boolean
): T[] => {
  if (value === undefined) return items;
  return items.filter(item => item[field] === value);
};

/**
 * Kết hợp nhiều filter
 * @param items - Danh sách items
 * @param filters - Mảng các hàm filter
 * @returns Danh sách đã lọc qua tất cả filters
 * 
 * @example
 * const result = applyFilters(foods, [
 *   (items) => filterBySearch(items, searchTerm, ['name']),
 *   (items) => filterByField(items, 'category', category),
 *   (items) => filterByPriceRange(items, 'price', minPrice, maxPrice),
 *   (items) => filterByBoolean(items, 'is_available', true),
 * ]);
 */
export const applyFilters = <T>(
  items: T[],
  filters: ((items: T[]) => T[])[]
): T[] => {
  return filters.reduce((result, filter) => filter(result), items);
};
