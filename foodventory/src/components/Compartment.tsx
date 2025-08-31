import React from 'react';
import InventorySlot from './InventorySlot';
import AddItemForm from './AddItemForm';
import ItemModal from './ItemModal';
import type { FoodItem, SortOption } from '../types';
import { INVENTORY_SIZE } from '../types';
import { findEmptySlot, generateId, sortItems } from '../utils/inventory';

interface CompartmentProps {
  type: 'refrigerator' | 'freezer';
  title: string;
  items: FoodItem[];
  onUpdateItems: (items: FoodItem[]) => void;
}

const Compartment: React.FC<CompartmentProps> = ({
  type,
  title,
  items,
  onUpdateItems
}) => {
  const [selectedItem, setSelectedItem] = React.useState<FoodItem | null>(null);

  const compartmentItems = items.filter(item => item.compartment === type);

  const handleAddItem = (newItem: {
    name: string;
    category: string;
    quantity: number;
    expiryDate?: string;
    compartment: 'refrigerator' | 'freezer';
  }) => {
    const emptySlot = findEmptySlot(compartmentItems);
    if (emptySlot === -1) {
      alert('인벤토리가 가득 찼습니다!');
      return;
    }

    const item: FoodItem = {
      id: generateId(),
      name: newItem.name,
      icon: getIconForCategory(newItem.category),
      quantity: newItem.quantity,
      expiryDate: newItem.expiryDate,
      category: newItem.category,
      compartment: newItem.compartment,
      position: emptySlot
    };

    onUpdateItems([...items, item]);
  };

  const getIconForCategory = (category: string): string => {
    const icons: Record<string, string> = {
      '육류': '🥩',
      '어류': '🐟',
      '채소': '🥬',
      '과일': '🍎',
      '유제품': '🥛',
      '음료': '🥤',
      '조미료': '🧂',
      '기타': '📦'
    };
    return icons[category] || '📦';
  };

  const handleItemClick = (item: FoodItem) => {
    setSelectedItem(item);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateItems(items.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    onUpdateItems(
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleSort = (sortBy: SortOption) => {
    const sortedItems = sortItems(compartmentItems, sortBy);
    const otherItems = items.filter(item => item.compartment !== type);
    onUpdateItems([...otherItems, ...sortedItems]);
  };

  const handleClearAll = () => {
    if (window.confirm(`${title}의 모든 아이템을 삭제하시겠습니까?`)) {
      onUpdateItems(items.filter(item => item.compartment !== type));
    }
  };

  const renderInventoryGrid = () => {
    const slots = Array(INVENTORY_SIZE).fill(null);
    
    compartmentItems.forEach(item => {
      if (item.position < INVENTORY_SIZE) {
        slots[item.position] = item;
      }
    });

    return slots.map((item, index) => (
      <InventorySlot
        key={index}
        position={index}
        item={item}
        onSlotClick={() => {}} // 빈 슬롯 클릭 시 동작 없음
        onItemClick={handleItemClick}
      />
    ));
  };

  return (
    <div className={`compartment ${type}`}>
      {/* <div className="compartment-title">{title}</div> */}
      
      <AddItemForm compartment={type} onAddItem={handleAddItem} />
      
      <div className="controls">
        <button className="btn sort-btn" onClick={() => handleSort('name')}>
          이름순 정렬
        </button>
        <button className="btn sort-btn" onClick={() => handleSort('category')}>
          카테고리순 정렬
        </button>
        <button className="btn sort-btn" onClick={() => handleSort('quantity')}>
          수량순 정렬
        </button>
        <button className="btn sort-btn" onClick={() => handleSort('expiry')}>
          유통기한순 정렬
        </button>
        <button className="btn clear-btn" onClick={handleClearAll}>
          전체 삭제
        </button>
      </div>
      
      <div className="inventory-grid">
        {renderInventoryGrid()}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDeleteItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </div>
  );
};

export default Compartment;
