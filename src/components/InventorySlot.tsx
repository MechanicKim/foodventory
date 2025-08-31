import React from 'react';
import type { FoodItem } from '../types';

interface InventorySlotProps {
  position: number;
  item?: FoodItem;
  onSlotClick: (position: number) => void;
  onItemClick?: (item: FoodItem) => void;
}

const InventorySlot: React.FC<InventorySlotProps> = ({
  position,
  item,
  onSlotClick,
  onItemClick
}) => {
  const handleClick = () => {
    if (item && onItemClick) {
      onItemClick(item);
    } else {
      onSlotClick(position);
    }
  };

  return (
    <div 
      className={`inventory-slot ${item ? 'occupied' : ''}`}
      onClick={handleClick}
      title={item ? `${item.name} (${item.quantity}개)` : `빈 슬롯 ${position + 1}`}
    >
      {item && (
        <>
          <div className="item-icon">{item.icon}</div>
          <div className="item-name">{item.name}</div>
          <div className="item-quantity">{item.quantity}개</div>
        </>
      )}
    </div>
  );
};

export default InventorySlot;
