import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  IconSmile,
  IconZap,
  IconSparkles,
  IconActivity,
  IconBrain,
  IconCheckCircle,
} from './Icons';

const categories = [
  { id: 'celkovy', name: 'Celkový pocit', Icon: IconSmile },
  { id: 'energie', name: 'Energie', Icon: IconZap },
  { id: 'kuze', name: 'Stav kůže', Icon: IconSparkles },
  { id: 'traveni', name: 'Trávení', Icon: IconActivity },
  { id: 'hlava', name: 'Hlava a zrak', Icon: IconBrain },
];

function WellbeingTracker() {
  const [values, setValues] = useState(
    Object.fromEntries(categories.map((c) => [c.id, 5]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'wellbeing'),
        orderBy('timestamp', 'desc'),
        limit(7)
      );
      const snap = await getDocs(q);
      setHistory(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('Error loading history:', err);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await addDoc(collection(db, 'wellbeing'), {
        values,
        timestamp: Timestamp.now(),
        date: new Date().toISOString().split('T')[0],
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      loadHistory();
    } catch (err) {
      console.error('Error saving wellbeing:', err);
    }
    setSaving(false);
  }, [values, loadHistory]);

  const getColor = (val) => {
    if (val <= 3) return '#ff3b30';
    if (val <= 5) return '#ff9500';
    if (val <= 7) return '#ffcc00';
    return '#34c759';
  };

  return (
    <div className="page">
      <h1 className="page-title">Jak se cítím</h1>

      {saved && (
        <div className="card success-card">
          <span className="success-emoji">
            <IconCheckCircle size={20} stroke="#34c759" />
          </span>
          <span>Záznam uložen</span>
        </div>
      )}

      <div className="card">
        {categories.map((cat) => (
          <div key={cat.id} className="wellbeing-item">
            <div className="wellbeing-header">
              <span className="wellbeing-label">
                <cat.Icon size={18} stroke={getColor(values[cat.id])} />
                {' '}{cat.name}
              </span>
              <span
                className="wellbeing-value"
                style={{ color: getColor(values[cat.id]) }}
              >
                {values[cat.id]}/10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={values[cat.id]}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [cat.id]: parseInt(e.target.value),
                }))
              }
              className="wellbeing-slider"
              style={{
                accentColor: getColor(values[cat.id]),
              }}
            />
          </div>
        ))}

        <button
          className="btn btn-primary btn-full"
          onClick={save}
          disabled={saving}
          style={{ marginTop: '16px' }}
        >
          {saving ? 'Ukládám...' : 'Uložit záznam'}
        </button>
      </div>

      {history.length > 0 && (
        <>
          <h2 className="section-title">Historie (posledních 7 dní)</h2>
          {history.map((entry) => (
            <div key={entry.id} className="card history-card">
              <div className="history-date">{entry.date}</div>
              {categories.map((cat) => {
                const val = entry.values?.[cat.id] || 0;
                return (
                  <div key={cat.id} className="history-row">
                    <span className="history-label">
                      <cat.Icon size={14} stroke="#8e8e93" />
                      {' '}{cat.name}
                    </span>
                    <div className="history-bar-container">
                      <div
                        className="history-bar"
                        style={{
                          width: `${val * 10}%`,
                          backgroundColor: getColor(val),
                        }}
                      />
                    </div>
                    <span className="history-val">{val}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default WellbeingTracker;
