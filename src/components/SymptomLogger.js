import React, { useState, useCallback } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import symptoms from '../data/symptoms';
import {
  IconEye,
  IconDizzy,
  IconCircleDot,
  IconScratch,
  IconThermometer,
  IconHeartPulse,
  IconDroplets,
  IconFrown,
  IconWind,
  IconArrowDown,
  IconMoon,
  IconAlertTriangle,
  IconDropletOff,
  IconCheckCircle,
} from './Icons';

const iconMap = {
  eye: IconEye,
  dizzy: IconDizzy,
  circleDot: IconCircleDot,
  scratch: IconScratch,
  thermometer: IconThermometer,
  heartPulse: IconHeartPulse,
  droplets: IconDroplets,
  frown: IconFrown,
  wind: IconWind,
  arrowDown: IconArrowDown,
  moon: IconMoon,
  alertTriangle: IconAlertTriangle,
  dropletOff: IconDropletOff,
};

function SymptomLogger({ embedded = false }) {
  const [selected, setSelected] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleSymptom = useCallback((id) => {
    setSelected((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 1 };
    });
  }, []);

  const setIntensity = useCallback((id, value) => {
    setSelected((prev) => ({ ...prev, [id]: value }));
  }, []);

  const save = useCallback(async () => {
    const entries = Object.entries(selected);
    if (entries.length === 0) return;

    setSaving(true);
    try {
      await addDoc(collection(db, 'symptoms'), {
        symptoms: entries.map(([id, intensity]) => ({
          id,
          name: symptoms.find((s) => s.id === id)?.name,
          intensity,
        })),
        timestamp: Timestamp.now(),
        date: new Date().toISOString().split('T')[0],
      });
      setSaved(true);
      setSelected({});
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error saving symptoms:', err);
    }
    setSaving(false);
  }, [selected]);

  const intensityLabels = ['', 'Mírné', 'Střední', 'Silné'];

  const content = (
    <>
      {saved && (
        <div className="card success-card">
          <span className="success-emoji">
            <IconCheckCircle size={20} stroke="#34c759" />
          </span>
          <span>Symptomy uloženy</span>
        </div>
      )}

      <div className="symptom-grid">
        {symptoms.map((symptom) => {
          const isSelected = selected[symptom.id] !== undefined;
          const SymIcon = iconMap[symptom.icon];
          return (
            <div key={symptom.id} className="card symptom-card">
              <div
                className={`symptom-toggle ${isSelected ? 'active' : ''}`}
                onClick={() => toggleSymptom(symptom.id)}
              >
                <span className="symptom-icon-wrap">
                  {SymIcon && (
                    <SymIcon
                      size={26}
                      stroke={isSelected ? '#007aff' : '#8e8e93'}
                      strokeWidth={isSelected ? 1.8 : 1.4}
                    />
                  )}
                </span>
                <span className="symptom-name">{symptom.name}</span>
              </div>
              {isSelected && (
                <div className="intensity-slider">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={selected[symptom.id]}
                    onChange={(e) =>
                      setIntensity(symptom.id, parseInt(e.target.value))
                    }
                  />
                  <span className="intensity-label">
                    {intensityLabels[selected[symptom.id]]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {Object.keys(selected).length > 0 && (
        <button
          className="btn btn-primary btn-full"
          onClick={save}
          disabled={saving}
        >
          {saving ? 'Ukládám...' : 'Uložit symptomy'}
        </button>
      )}
    </>
  );

  if (embedded) return content;

  return (
    <div className="page">
      <h1 className="page-title">Symptomy</h1>
      {content}
    </div>
  );
}

export default SymptomLogger;
