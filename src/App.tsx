import React from 'react';
import Compartment from './components/Compartment';
import type { FoodItem } from './types';
import './index.css';

type TabType = 'refrigerator' | 'freezer';

function App() {
  const [items, setItems] = React.useState<FoodItem[]>([]);
  const [activeTab, setActiveTab] = React.useState<TabType>('refrigerator');

  // 로컬 스토리지에서 데이터 로드
  React.useEffect(() => {
    const savedItems = localStorage.getItem('foodventory-items');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Failed to load items from localStorage:', error);
      }
    }
  }, []);

  // 데이터가 변경될 때마다 로컬 스토리지에 저장
  React.useEffect(() => {
    localStorage.setItem('foodventory-items', JSON.stringify(items));
  }, [items]);

  const getTabTitle = (tab: TabType) => {
    return tab === 'refrigerator' ? '🧊 냉장실' : '❄️ 냉동실';
  };

  const getItemCount = (tab: TabType) => {
    return items.filter(item => item.compartment === tab).length;
  };

  return (
    <div className="app">
      <h1 className="app-title">🧊 냉장고 인벤토리</h1>
      
      <div className="tab-container">
        <div className="tab-header">
          <button 
            className={`tab-button ${activeTab === 'refrigerator' ? 'active' : ''}`}
            onClick={() => setActiveTab('refrigerator')}
          >
            🧊 냉장실 ({getItemCount('refrigerator')})
          </button>
          <button 
            className={`tab-button ${activeTab === 'freezer' ? 'active freezer' : ''}`}
            onClick={() => setActiveTab('freezer')}
          >
            ❄️ 냉동실 ({getItemCount('freezer')})
          </button>
        </div>
        
        <div className="tab-content">
          <Compartment
            type={activeTab}
            title={getTabTitle(activeTab)}
            items={items}
            onUpdateItems={setItems}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
