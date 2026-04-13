import React, { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { IconPlus, IconCheckCircle } from './Icons';

const mealTypes = [
  { id: 'breakfast', name: 'Snídaně' },
  { id: 'lunch', name: 'Oběd' },
  { id: 'snack', name: 'Svačina' },
  { id: 'dinner', name: 'Večeře' },
];

function FoodLog() {
  const [food, setFood] = useState('');
  const [meal, setMeal] = useState('lunch');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [todayLog, setTodayLog] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const loadToday = useCallback(async () => {
    try {
      const q = query(collection(db, 'foodLog'), where('date', '==', today), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      setTodayLog(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error('Error loading food log:', e); }
  }, [today]);

  useEffect(() => { loadToday(); }, [loadToday]);

  const addEntry = useCallback(async () => {
    if (!food.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'foodLog'), {
        food: food.trim(),
        meal,
        date: today,
        time: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Timestamp.now(),
      });
      setFood('');
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      loadToday();
    } catch (e) { console.error('Error saving food log:', e); }
    setSaving(false);
  }, [food, meal, today, loadToday]);

  return (
    <div className="page">
      <h1 className="page-title">Deník jídla</h1>

      {saved && (
        <div className="card success-card">
          <IconCheckCircle size={20} stroke="#34c759" />
          <span>Záznam uložen</span>
        </div>
      )}

      <div className="card">
        <div className="food-tabs" style={{ marginBottom: 12 }}>
          {mealTypes.map(m => (
            <button key={m.id} className={`food-tab ${meal === m.id ? 'active' : ''}`}
              onClick={() => setMeal(m.id)}>{m.name}</button>
          ))}
        </div>

        <div className="food-input-row">
          <input
            type="text"
            className="food-input"
            placeholder="Co jste jedli? (např. kuřecí s rýží)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addEntry()}
          />
          <button className="btn btn-primary" onClick={addEntry} disabled={saving || !food.trim()}>
            <IconPlus size={18} />
          </button>
        </div>
      </div>

      {todayLog.length > 0 && (
        <>
          <h2 className="section-title">Dnes</h2>
          {mealTypes.map(mealType => {
            const entries = todayLog.filter(e => e.meal === mealType.id);
            if (entries.length === 0) return null;
            return (
              <div key={mealType.id} className="card">
                <div className="foodlog-meal-title">{mealType.name}</div>
                {entries.map(entry => (
                  <div key={entry.id} className="foodlog-entry">
                    <span className="foodlog-food">{entry.food}</span>
                    <span className="foodlog-time">{entry.time}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}

      {todayLog.length === 0 && (
        <div className="card" style={{ textAlign: 'center', color: '#8e8e93', padding: 30 }}>
          Zatím žádné záznamy. Přidejte co jste dnes jedli.
        </div>
      )}
    </div>
  );
}

export default FoodLog;
