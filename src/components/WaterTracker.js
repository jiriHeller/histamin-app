import React, { useCallback, useMemo, useEffect } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useLocalStorage from '../hooks/useLocalStorage';
import useDailyReset from '../hooks/useDailyReset';
import { IconDropletSmall, IconCheckCircle } from './Icons';

const GOAL = 3000;

function WaterTracker() {
  const [ml, setMl] = useLocalStorage('water', 0);
  useDailyReset('water', setMl, 0);

  const add = useCallback((amount) => {
    setMl((prev) => Math.min(prev + amount, 5000));
  }, [setMl]);

  const reset = useCallback(() => setMl(0), [setMl]);

  const progress = useMemo(() => Math.min((ml / GOAL) * 100, 100), [ml]);
  const glasses = useMemo(() => Math.floor(ml / 250), [ml]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const ref = doc(db, 'dailyLog', today);
    setDoc(ref, {
      water: ml,
      date: today,
      timestamp: Timestamp.now(),
    }, { merge: true }).catch(err => console.error('Error saving water:', err));
  }, [ml]);

  return (
    <div className="page">
      <h1 className="page-title">Pitný režim</h1>

      <div className="card water-main">
        <div className="water-amount">{(ml / 1000).toFixed(1)} l</div>
        <div className="water-goal">z {GOAL / 1000} l denního cíle</div>

        <div className="progress-bar progress-bar-lg">
          <div
            className="progress-fill water-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="water-glasses">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`water-glass ${i < glasses ? 'filled' : ''}`}
            >
              <IconDropletSmall size={22} strokeWidth={i < glasses ? 1.8 : 1.2} />
            </span>
          ))}
        </div>

        <div className="water-buttons">
          <button className="btn btn-water" onClick={() => add(250)}>
            +250 ml
          </button>
          <button className="btn btn-water" onClick={() => add(500)}>
            +500 ml
          </button>
        </div>

        {ml > 0 && (
          <button className="btn btn-text" onClick={reset}>
            Resetovat
          </button>
        )}
      </div>

      {progress >= 100 && (
        <div className="card success-card">
          <span className="success-emoji">
            <IconCheckCircle size={22} stroke="#34c759" />
          </span>
          <span>Splněno! Denní cíl dosažen.</span>
        </div>
      )}
    </div>
  );
}

export default WaterTracker;
