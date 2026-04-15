import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import FoodAndDrinks from './components/FoodAndDrinks';
import CalendarView from './components/CalendarView';
import ShoppingList from './components/ShoppingList';
import ProfileAdmin from './components/ProfileAdmin';
import {
  IconHome,
  IconUtensils,
  IconCalendar,
  IconShoppingCart,
  IconUser,
} from './components/Icons';
import './App.css';

const tabs = [
  { id: 'dashboard', label: 'Domů', Icon: IconHome },
  { id: 'food', label: 'Jídlo', Icon: IconUtensils },
  { id: 'calendar', label: 'Deník', Icon: IconCalendar },
  { id: 'shopping', label: 'Nákup', Icon: IconShoppingCart },
  { id: 'profile', label: 'Profil', Icon: IconUser },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'food':
        return <FoodAndDrinks />;
      case 'calendar':
        return <CalendarView />;
      case 'shopping':
        return <ShoppingList />;
      case 'profile':
        return <ProfileAdmin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <div className="content">{renderTab()}</div>

      <nav className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">
              <tab.Icon size={22} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
            </span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
