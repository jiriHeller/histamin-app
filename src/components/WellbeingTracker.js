import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  IconCamera,
} from './Icons';

function resizeImage(file, maxSize) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) { height = Math.round((height * maxSize) / width); width = maxSize; }
          else { width = Math.round((width * maxSize) / height); height = maxSize; }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

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
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);
  const photoInputRef = useRef(null);

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

  const handlePhotoSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImage(file, 800);
    setPhoto(dataUrl);
    if (photoInputRef.current) photoInputRef.current.value = '';
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const entry = {
        values,
        timestamp: Timestamp.now(),
        date: new Date().toISOString().split('T')[0],
      };
      if (note.trim()) entry.note = note.trim();
      if (photo) entry.photo = photo;

      await addDoc(collection(db, 'wellbeing'), entry);
      setSaved(true);
      setNote('');
      setPhoto(null);
      setTimeout(() => setSaved(false), 2000);
      loadHistory();
    } catch (err) {
      console.error('Error saving wellbeing:', err);
    }
    setSaving(false);
  }, [values, note, photo, loadHistory]);

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

        {/* Note */}
        <div className="wellbeing-note-section">
          <label className="wellbeing-note-label">Co mi dnes bylo?</label>
          <textarea
            className="wellbeing-textarea"
            placeholder="Popište svůj stav, co jste jedli, jak jste se cítili..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        {/* Photo */}
        <div className="wellbeing-photo-section">
          <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
          <button
            className="btn btn-photo"
            onClick={() => photoInputRef.current?.click()}
            style={{ marginBottom: photo ? 10 : 0 }}
          >
            <IconCamera size={18} /> {photo ? 'Změnit fotku' : 'Přidat fotku stavu'}
          </button>
          {photo && (
            <div className="wellbeing-photo-preview">
              <img src={photo} alt="Stav" className="photo-preview" />
              <button className="btn btn-text" onClick={() => setPhoto(null)} style={{ color: '#ff3b30', marginTop: 6 }}>
                Odstranit fotku
              </button>
            </div>
          )}
        </div>

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
              {entry.note && (
                <div className="history-note">
                  <span className="history-note-text">{entry.note}</span>
                </div>
              )}
              {entry.photo && (
                <div className="history-photo">
                  <img src={entry.photo} alt="Stav" className="history-photo-img" />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default WellbeingTracker;
