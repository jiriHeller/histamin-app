import React, { useCallback, useMemo, useEffect } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import medications from '../data/medications';
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

function MedicationTracker() {
  const [checked, setChecked] = useLocalStorage('medications', initialState);
  useDailyReset('medications', setChecked, initialState);

  const toggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setChecked]);

  const count = useMemo(
    () => medications.filter((m) => checked[m.id]).length,
    [checked]
  );
  const progress = (count / medications.length) * 100;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const ref = doc(db, 'dailyLog', today);
    setDoc(ref, {
      medications: checked,
      medicationCount: medications.filter((m) => checked[m.id]).length,
      date: today,
      timestamp: Timestamp.now(),
    }, { merge: true }).catch(err => console.error('Error saving meds:', err));
  }, [checked]);

  return (
    <div className="page">
      <h1 className="page-title">Léky a doplňky</h1>

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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MedicationTracker;
