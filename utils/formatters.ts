/**
 * Formatter Utils
 * Các hàm tiện ích để format dữ liệu hiển thị
 */

/**
 * Format date to Vietnamese locale
 * @param date - Date string hoặc Date object
 * @returns Formatted date string (dd/mm/yyyy)
 */
export const formatDateVN = (date: string | Date | null | undefined): string => {
  if (!date) return 'Chưa cập nhật';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Chưa cập nhật';
    
    return dateObj.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'Chưa cập nhật';
  }
};

/**
 * Format date to ISO format (YYYY-MM-DD)
 * @param date - Date string hoặc Date object
 * @returns ISO date string
 */
export const formatDateISO = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    
    return dateObj.toISOString().split('T')[0];
  } catch {
    return '';
  }
};

/**
 * Format currency to Vietnamese Dong
 * @param amount - Amount number
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format currency without symbol
 * @param amount - Amount number
 * @returns Formatted number string with separators
 */
export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

/**
 * Format phone number for display
 * @param phone - Phone number string
 * @returns Formatted phone string
 */
export const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return 'N/A';
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as 0xxx xxx xxx
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  
  // Format as 0xxxx xxx xxx for 11 digits
  if (digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 50)
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Get initials from name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Format relative time (e.g., "2 giờ trước")
 * @param date - Date string hoặc Date object
 * @returns Relative time string
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  
  return formatDateVN(then);
};
