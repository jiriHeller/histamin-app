import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import MedicationTracker from './components/MedicationTracker';
import SymptomLogger from './components/SymptomLogger';
import FoodAndDrinks from './components/FoodAndDrinks';
import WellbeingTracker from './components/WellbeingTracker';
import CalendarView from './components/CalendarView';
import EducationCards from './components/EducationCards';
import ProfileAdmin from './components/ProfileAdmin';
import {
  IconHome,
  IconPill,
  IconGrid,
  IconUtensils,
  IconSmile,
  IconCalendar,
  IconBook,
  IconUser,
} from './components/Icons';
import './App.css';

const tabs = [
  { id: 'dashboard', label: 'Domů', Icon: IconHome },
  { id: 'meds', label: 'Léky', Icon: IconPill },
  { id: 'symptoms', label: 'Symptomy', Icon: IconGrid },
  { id: 'food', label: 'Jídlo', Icon: IconUtensils },
  { id: 'wellbeing', label: 'Pocit', Icon: IconSmile },
  { id: 'calendar', label: 'Deník', Icon: IconCalendar },
  { id: 'education', label: 'Info', Icon: IconBook },
  { id: 'profile', label: 'Profil', Icon: IconUser },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'meds':
        return <MedicationTracker />;
      case 'symptoms':
        return <SymptomLogger />;
      case 'food':
        return <FoodAndDrinks />;
      case 'wellbeing':
        return <WellbeingTracker />;
      case 'calendar':
        return <CalendarView />;
      case 'education':
        return <EducationCards />;
      case 'profile':
        return <ProfileAdmin />;
      default:
        return <MedicationTracker />;
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
