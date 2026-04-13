import React, { useState, useCallback, useEffect, useRef } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { drinks, drinkCategories } from '../data/drinks';
import {
  IconDroplet,
  IconCup,
  IconCoffee,
  IconGlass,
  IconCheckCircle,
  IconAlertCircle,
  IconXCircle,
  IconPlus,
  IconTrash,
  IconCamera,
} from './Icons';

const categoryIconMap = {
  droplet: IconDroplet,
  cup: IconCup,
  coffee: IconCoffee,
  glass: IconGlass,
};

const statusConfig = {
  safe: { label: 'Bezpečné', Icon: IconCheckCircle, color: '#34c759', bg: '#dcf8e8' },
  caution: { label: 'Opatrně', Icon: IconAlertCircle, color: '#ff9500', bg: '#fff3e0' },
  unsafe: { label: 'Nevhodné', Icon: IconXCircle, color: '#ff3b30', bg: '#ffe5e5' },
};

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
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ base64: dataUrl.split(',')[1], dataUrl });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function DrinkTracker() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [todayDrinks, setTodayDrinks] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoResult, setPhotoResult] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const fileInputRef = useRef(null);

  const totalMl = todayDrinks.reduce((sum, d) => sum + d.ml, 0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`drinks_${today}`);
    if (saved) {
      try { setTodayDrinks(JSON.parse(saved)); } catch {}
    }
  }, []);

  const saveDrinks = useCallback((newDrinks) => {
    setTodayDrinks(newDrinks);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`drinks_${today}`, JSON.stringify(newDrinks));

    const ref = doc(db, 'dailyLog', today);
    setDoc(ref, {
      drinks: newDrinks,
      drinksTotalMl: newDrinks.reduce((s, d) => s + d.ml, 0),
      date: today,
      timestamp: Timestamp.now(),
    }, { merge: true }).catch(err => console.error('Error saving drinks:', err));
  }, []);

  const addDrink = useCallback((drink, ml) => {
    const entry = { id: drink.id, name: drink.name, ml, status: drink.status, time: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) };
    const newDrinks = [...todayDrinks, entry];
    saveDrinks(newDrinks);
    setSelectedDrink(null);
    setSelectedCategory(null);
  }, [todayDrinks, saveDrinks]);

  const removeDrink = useCallback((index) => {
    const newDrinks = todayDrinks.filter((_, i) => i !== index);
    saveDrinks(newDrinks);
  }, [todayDrinks, saveDrinks]);

  const handlePhotoSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { base64, dataUrl } = await resizeImage(file, 1024);
    setPhotoPreview(dataUrl);
    setPhotoResult(null);

    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    if (!apiKey) { setPhotoResult({ error: 'Nastavte REACT_APP_CLAUDE_API_KEY.' }); return; }

    setPhotoLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 512,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64 } },
              { type: 'text', text: `Podívej se na fotku nápoje. Identifikuj nápoj a zhodnoť jeho vhodnost pro osobu s histaminovou intolerancí.\n\nOdpověz POUZE v JSON: {"nazev":"název nápoje","status":"safe"|"caution"|"unsafe","note":"krátké vysvětlení česky","objem":odhadnutý objem v ml}\n\nOdpověz česky.` },
            ],
          }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) setPhotoResult(JSON.parse(jsonMatch[0]));
      else setPhotoResult({ error: 'Nepodařilo se zpracovat odpověď.' });
    } catch {
      setPhotoResult({ error: 'Nepodařilo se kontaktovat AI.' });
    }
    setPhotoLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const filteredDrinks = selectedCategory
    ? drinks.filter(d => d.category === selectedCategory)
    : [];

  return (
    <div className="page">
      <h1 className="page-title">Nápoje</h1>

      {/* Today summary */}
      <div className="card">
        <div className="drink-summary">
          <div className="drink-total">
            <span className="drink-total-amount">{(totalMl / 1000).toFixed(1)} l</span>
            <span className="drink-total-label">dnes vypito ({todayDrinks.length} nápojů)</span>
          </div>
        </div>
      </div>

      {/* Category selection */}
      <div className="drink-categories">
        {drinkCategories.map((cat) => {
          const CatIcon = categoryIconMap[cat.icon];
          return (
            <div
              key={cat.id}
              className={`card drink-category-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                setSelectedDrink(null);
              }}
            >
              {CatIcon && <CatIcon size={24} stroke={selectedCategory === cat.id ? '#007aff' : '#8e8e93'} />}
              <span className="drink-category-name">{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* Drink list for selected category */}
      {selectedCategory && (
        <div className="card">
          {filteredDrinks.map((drink) => {
            const cfg = statusConfig[drink.status];
            const StatusIcon = cfg.Icon;
            return (
              <div key={drink.id} className="drink-item" onClick={() => setSelectedDrink(selectedDrink === drink.id ? null : drink.id)}>
                <div className="drink-item-header">
                  <span className="drink-item-name">{drink.name}</span>
                  <span className="drink-status-badge" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                    <StatusIcon size={12} stroke={cfg.color} strokeWidth={2} /> {cfg.label}
                  </span>
                </div>
                <p className="drink-item-note">{drink.note}</p>

                {selectedDrink === drink.id && (
                  <div className="drink-sizes">
                    {drink.sizes.map((size) => (
                      <button
                        key={size}
                        className="btn btn-drink-size"
                        onClick={(e) => { e.stopPropagation(); addDrink(drink, size); }}
                      >
                        <IconPlus size={14} /> {size} ml
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Photo analysis */}
      <div className="card photo-section">
        <div className="photo-section-header">
          <span className="photo-section-icon">
            <IconCamera size={28} stroke="#007aff" />
          </span>
          <div>
            <div className="photo-section-title">Analýza fotky nápoje</div>
            <div className="photo-section-desc">Vyfoťte nápoj a AI zhodnotí vhodnost</div>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="photo-file-input" />
        <button className="btn btn-photo" onClick={() => fileInputRef.current?.click()} disabled={photoLoading}>
          <IconCamera size={18} /> Vybrat fotku
        </button>

        {photoPreview && <div className="photo-preview-container"><img src={photoPreview} alt="Náhled" className="photo-preview" /></div>}
        {photoLoading && <div className="photo-loading"><div className="photo-spinner" /><span>Analyzuji nápoj...</span></div>}

        {photoResult && !photoResult.error && (
          <div className="drink-photo-result">
            <div className="drink-photo-name">{photoResult.nazev}</div>
            {(() => {
              const cfg = statusConfig[photoResult.status];
              const StatusIcon = cfg?.Icon;
              return cfg ? (
                <div className="drink-photo-status" style={{ backgroundColor: cfg.bg }}>
                  <StatusIcon size={18} stroke={cfg.color} /> <span style={{ color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                </div>
              ) : null;
            })()}
            <p className="drink-item-note">{photoResult.note}</p>
            {photoResult.objem && (
              <button className="btn btn-primary btn-full" style={{ marginTop: 10 }}
                onClick={() => {
                  addDrink({ id: 'photo', name: photoResult.nazev, status: photoResult.status || 'caution' }, photoResult.objem);
                  setPhotoPreview(null);
                  setPhotoResult(null);
                }}>
                <IconPlus size={16} /> Přidat {photoResult.objem} ml
              </button>
            )}
          </div>
        )}
        {photoResult?.error && <div className="photo-error">{photoResult.error}</div>}
      </div>

      {/* Today's drinks list */}
      {todayDrinks.length > 0 && (
        <>
          <h2 className="section-title">Dnešní nápoje</h2>
          <div className="card">
            {todayDrinks.map((drink, i) => {
              const cfg = statusConfig[drink.status];
              return (
                <div key={i} className="drink-today-item">
                  <div className="drink-today-info">
                    <span className="drink-today-name">{drink.name}</span>
                    <span className="drink-today-detail">
                      {drink.ml} ml · {drink.time}
                    </span>
                  </div>
                  <span className="drink-today-status" style={{ color: cfg?.color }}>
                    {cfg?.label}
                  </span>
                  <button className="drink-today-remove" onClick={() => removeDrink(i)}>
                    <IconTrash size={16} stroke="#ff3b30" />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default DrinkTracker;
