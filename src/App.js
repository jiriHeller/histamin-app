import React, { useState } from 'react';
import MedicationTracker from './components/MedicationTracker';
import WaterTracker from './components/WaterTracker';
import SymptomLogger from './components/SymptomLogger';
import FoodAndDrinks from './components/FoodAndDrinks';
import WellbeingTracker from './components/WellbeingTracker';
import CalendarView from './components/CalendarView';
import TreatmentTimeline from './components/TreatmentTimeline';
import EducationCards from './components/EducationCards';
import {
  IconPill,
  IconDroplet,
  IconGrid,
  IconUtensils,
  IconSmile,
  IconCalendar,
  IconBook,
} from './components/Icons';
import './App.css';

const tabs = [
  { id: 'meds', label: 'Léky', Icon: IconPill },
  { id: 'water', label: 'Voda', Icon: IconDroplet },
  { id: 'symptoms', label: 'Symptomy', Icon: IconGrid },
  { id: 'food', label: 'Jídlo', Icon: IconUtensils },
  { id: 'wellbeing', label: 'Pocit', Icon: IconSmile },
  { id: 'calendar', label: 'Deník', Icon: IconCalendar },
  { id: 'education', label: 'Info', Icon: IconBook },
];

function App() {
  const [activeTab, setActiveTab] = useState('meds');

  const renderTab = () => {
    switch (activeTab) {
      case 'meds':
        return <MedicationTracker />;
      case 'water':
        return <WaterTracker />;
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
