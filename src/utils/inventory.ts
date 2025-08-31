import type { FoodItem, SortOption } from '../types';
import { INVENTORY_SIZE } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const findEmptySlot = (items: FoodItem[]): number => {
  const occupiedSlots = new Set(items.map(item => item.position));
  for (let i = 0; i < INVENTORY_SIZE; i++) {
    if (!occupiedSlots.has(i)) {
      return i;
    }
  }
  return -1; // 빈 슬롯이 없음
};

export const sortItems = (items: FoodItem[], sortBy: SortOption): FoodItem[] => {
  const sorted = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'quantity':
        return b.quantity - a.quantity;
      case 'expiry':
        if (!a.expiryDate && !b.expiryDate) return 0;
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // 정렬된 아이템들을 새로운 위치로 재배치
  return sorted.map((item, index) => ({
    ...item,
    position: index
  }));
};

export const isExpiringSoon = (expiryDate?: string): boolean => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
};

export const isExpired = (expiryDate?: string): boolean => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  return expiry.getTime() < today.getTime();
};
