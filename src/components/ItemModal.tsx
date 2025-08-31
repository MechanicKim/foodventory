import React from 'react';
import type { FoodItem } from '../types';

interface ItemModalProps {
  item: FoodItem;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onDelete,
  onUpdateQuantity
}) => {
  const [quantity, setQuantity] = React.useState(item.quantity);

  const handleUpdateQuantity = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity);
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete(item.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{item.icon} {item.name}</h3>
        <div>
          <p><strong>카테고리:</strong> {item.category}</p>
          <p><strong>보관 위치:</strong> {item.compartment === 'refrigerator' ? '냉장실' : '냉동실'}</p>
          {item.expiryDate && (
            <p><strong>유통기한:</strong> {item.expiryDate}</p>
          )}
          
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label>수량</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        
        <div className="modal-buttons">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn" onClick={handleUpdateQuantity}>
            수량 변경
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
