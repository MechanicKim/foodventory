export interface FoodItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  expiryDate?: string;
  category: string;
  compartment: 'refrigerator' | 'freezer';
  position: number; // 인벤토리 슬롯 위치 (0-63, 8x8 그리드)
}

export interface InventorySlot {
  position: number;
  item?: FoodItem;
}

export type SortOption = 'name' | 'quantity' | 'expiry' | 'category';

export const FOOD_CATEGORIES = [
  '육류',
  '어류',
  '채소',
  '과일',
  '유제품',
  '음료',
  '조미료',
  '기타'
] as const;

export const FOOD_ICONS: Record<string, string> = {
  '육류': '🥩',
  '어류': '🐟',
  '채소': '🥬',
  '과일': '🍎',
  '유제품': '🥛',
  '음료': '🥤',
  '조미료': '🧂',
  '기타': '📦'
};

export const INVENTORY_SIZE = 64; // 8x8 그리드
