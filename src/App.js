import React, { useState } from 'react';
import MedicationTracker from './components/MedicationTracker';
import WaterTracker from './components/WaterTracker';
import SymptomLogger from './components/SymptomLogger';
import FoodChecker from './components/FoodChecker';
import WellbeingTracker from './components/WellbeingTracker';
import TreatmentTimeline from './components/TreatmentTimeline';
import EducationCards from './components/EducationCards';
import './App.css';

const tabs = [
  { id: 'meds', label: 'Léky', icon: '💊' },
  { id: 'water', label: 'Voda', icon: '💧' },
  { id: 'symptoms', label: 'Symptomy', icon: '📋' },
  { id: 'food', label: 'Jídlo', icon: '🍽️' },
  { id: 'wellbeing', label: 'Pocit', icon: '😊' },
  { id: 'timeline', label: 'Plán', icon: '📅' },
  { id: 'education', label: 'Info', icon: '📚' },
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
        return <FoodChecker />;
      case 'wellbeing':
        return <WellbeingTracker />;
      case 'timeline':
        return <TreatmentTimeline />;
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
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
