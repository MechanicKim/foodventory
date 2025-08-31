import React from 'react';
import { FOOD_CATEGORIES, FOOD_ICONS } from '../types';

interface AddItemFormProps {
  compartment: 'refrigerator' | 'freezer';
  onAddItem: (item: {
    name: string;
    category: string;
    quantity: number;
    expiryDate?: string;
    compartment: 'refrigerator' | 'freezer';
  }) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ compartment, onAddItem }) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<string>(FOOD_CATEGORIES[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [expiryDate, setExpiryDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    onAddItem({
      name: name.trim(),
      category,
      quantity,
      expiryDate: expiryDate || undefined,
      compartment
    });

    // 폼 초기화
    setName('');
    setQuantity(1);
    setExpiryDate('');
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>식자재 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 사과, 우유 등"
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {FOOD_ICONS[cat]} {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>수량</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="form-group">
          <label>유통기한 (선택)</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
      </div>
      
      <button type="submit" className="btn">
        {FOOD_ICONS[category]} 추가하기
      </button>
    </form>
  );
};

export default AddItemForm;
