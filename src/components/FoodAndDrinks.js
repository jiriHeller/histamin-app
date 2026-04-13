import React, { useState } from 'react';
import FoodChecker from './FoodChecker';
import DrinkTracker from './DrinkTracker';

function FoodAndDrinks() {
  const [activeTab, setActiveTab] = useState('food');

  return (
    <div>
      <div className="food-tabs-wrapper">
        <div className="food-tabs">
          <button
            className={`food-tab ${activeTab === 'food' ? 'active' : ''}`}
            onClick={() => setActiveTab('food')}
          >
            Jídlo
          </button>
          <button
            className={`food-tab ${activeTab === 'drinks' ? 'active' : ''}`}
            onClick={() => setActiveTab('drinks')}
          >
            Nápoje
          </button>
        </div>
      </div>
      {activeTab === 'food' ? <FoodChecker /> : <DrinkTracker />}
    </div>
  );
}

export default FoodAndDrinks;
