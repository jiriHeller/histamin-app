import React, { useState } from 'react';
import FoodChecker from './FoodChecker';
import DrinkTracker from './DrinkTracker';
import FoodLog from './FoodLog';

function FoodAndDrinks() {
  const [activeTab, setActiveTab] = useState('food');

  const renderContent = () => {
    switch (activeTab) {
      case 'food': return <FoodChecker />;
      case 'drinks': return <DrinkTracker />;
      case 'log': return <FoodLog />;
      default: return <FoodChecker />;
    }
  };

  return (
    <div>
      <div className="food-tabs-wrapper">
        <div className="food-tabs">
          <button className={`food-tab ${activeTab === 'food' ? 'active' : ''}`}
            onClick={() => setActiveTab('food')}>Jídlo</button>
          <button className={`food-tab ${activeTab === 'drinks' ? 'active' : ''}`}
            onClick={() => setActiveTab('drinks')}>Nápoje</button>
          <button className={`food-tab ${activeTab === 'log' ? 'active' : ''}`}
            onClick={() => setActiveTab('log')}>Deník</button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

export default FoodAndDrinks;
