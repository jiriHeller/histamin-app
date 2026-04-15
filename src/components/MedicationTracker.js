import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import defaultMedications from '../data/medications';
import useLocalStorage from '../hooks/useLocalStorage';
import useDailyReset from '../hooks/useDailyReset';
import {
  IconCapsule,
  IconTablet,
  IconSun,
  IconLeaf,
  IconZap,
  IconGem,
  IconShield,
  IconFish,
} from './Icons';

const iconMap = {
  capsule: IconCapsule,
  tablet: IconTablet,
  sun: IconSun,
  leaf: IconLeaf,
  zap: IconZap,
  gem: IconGem,
  shield: IconShield,
  fish: IconFish,
};

const initialState = {};

function MedicationTracker({ embedded = false }) {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('custom_medications');
    return saved ? JSON.parse(saved) : defaultMedications;
  });
  const [checked, setChecked] = useLocalStorage('medications', initialState);
  useDailyReset('medications', setChecked, initialState);

  // Listen for changes to custom_medications in localStorage
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('custom_medications');
      if (saved) setMedications(JSON.parse(saved));
      else setMedications(defaultMedications);
    };
    window.addEventListener('storage', handleStorage);
    // Also check on focus (same tab changes)
    const handleFocus = () => {
      const saved = localStorage.getItem('custom_medications');
      if (saved) setMedications(JSON.parse(saved));
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const toggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setChecked]);

  const count = useMemo(
    () => medications.filter((m) => checked[m.id]).length,
    [checked, medications]
  );
  const progress = medications.length > 0 ? (count / medications.length) * 100 : 0;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const ref = doc(db, 'dailyLog', today);
    setDoc(ref, {
      medications: checked,
      medicationCount: medications.filter((m) => checked[m.id]).length,
      date: today,
      timestamp: Timestamp.now(),
    }, { merge: true }).catch(err => console.error('Error saving meds:', err));
  }, [checked, medications]);

  const content = (
    <>
      <div className="card">
        <div className="progress-header">
          <span className="progress-label">Dnešní pokrok</span>
          <span className="progress-value">{count}/{medications.length}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="card-list">
        {medications.map((med) => {
          const MedIcon = iconMap[med.icon];
          return (
            <div
              key={med.id}
              className={`card med-item ${checked[med.id] ? 'med-done' : ''}`}
              onClick={() => toggle(med.id)}
            >
              <div className="med-left">
                <div className={`checkbox ${checked[med.id] ? 'checked' : ''}`}>
                  {checked[med.id] && '✓'}
                </div>
                <div className="med-icon-wrapper">
                  {MedIcon && <MedIcon size={20} stroke="#8e8e93" />}
                </div>
                <div>
                  <div className="med-name">{med.name}</div>
                  <div className="med-time">{med.time}</div>
                  {med.note && <div className="med-note">{med.note}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  if (embedded) return content;

  return (
    <div className="page">
      <h1 className="page-title">Léky a doplňky</h1>
      {content}
    </div>
  );
}

export default MedicationTracker;
