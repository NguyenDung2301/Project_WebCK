
export const generateId = (prefix: string = 'USR'): string => {
  return `${prefix}-${Date.now()}`;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getCurrentDateString = (): string => {
  return new Date().toLocaleDateString('vi-VN');
};
