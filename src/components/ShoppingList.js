import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { generateShoppingList, calculateDailyNeeds, categoryLabels } from '../data/nutrition';
import { IconPlus, IconTrash, IconTarget } from './Icons';

function ShoppingList() {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('shopping_list');
    return saved ? JSON.parse(saved) : null;
  });
  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('shopping_custom');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [needs, setNeeds] = useState(null);
  const [generating, setGenerating] = useState(false);

  const bodyStats = JSON.parse(localStorage.getItem('body_stats') || '{}');

  const generate = useCallback(async () => {
    setGenerating(true);

    // Load recent food log from Firebase
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];

    let recentFoods = [];
    try {
      const q = query(collection(db, 'foodLog'), where('date', '>=', weekAgoStr));
      const snap = await getDocs(q);
      recentFoods = snap.docs.map(d => d.data().food);
    } catch (e) { /* ignore */ }

    const result = generateShoppingList(bodyStats, recentFoods);
    setList(result.list);
    setNeeds(result.needs);
    localStorage.setItem('shopping_list', JSON.stringify(result.list));
    setGenerating(false);
  }, [bodyStats]);

  useEffect(() => {
    if (!needs) {
      const n = calculateDailyNeeds(bodyStats);
      setNeeds(n);
    }
  }, [bodyStats, needs]);

  const toggleItem = useCallback((category, index) => {
    setList(prev => {
      const updated = { ...prev };
      updated[category] = [...updated[category]];
      updated[category][index] = { ...updated[category][index], checked: !updated[category][index].checked };
      localStorage.setItem('shopping_list', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addCustomItem = useCallback(() => {
    if (!newItem.trim()) return;
    const updated = [...customItems, { name: newItem.trim(), checked: false }];
    setCustomItems(updated);
    localStorage.setItem('shopping_custom', JSON.stringify(updated));
    setNewItem('');
  }, [newItem, customItems]);

  const toggleCustom = useCallback((index) => {
    setCustomItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], checked: !updated[index].checked };
      localStorage.setItem('shopping_custom', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeCustom = useCallback((index) => {
    setCustomItems(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('shopping_custom', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const goalLabel = { lose: 'Shodit', maintain: 'Udržet', gain: 'Přibrat' };

  return (
    <div className="page">
      <h1 className="page-title">Nákupní seznam</h1>

      {/* Daily needs summary */}
      {needs && (
        <div className="card shopping-needs">
          <div className="shopping-needs-header">
            <IconTarget size={18} stroke="#007aff" />
            <span className="shopping-needs-title">
              Denní potřeba {bodyStats.goal ? `(${goalLabel[bodyStats.goal] || 'Udržet'})` : ''}
            </span>
          </div>
          <div className="shopping-macros">
            <div className="shopping-macro">
              <span className="shopping-macro-value">{needs.calories}</span>
              <span className="shopping-macro-label">kcal</span>
            </div>
            <div className="shopping-macro">
              <span className="shopping-macro-value">{needs.protein}g</span>
              <span className="shopping-macro-label">bílkoviny</span>
            </div>
            <div className="shopping-macro">
              <span className="shopping-macro-value">{needs.carbs}g</span>
              <span className="shopping-macro-label">sacharidy</span>
            </div>
            <div className="shopping-macro">
              <span className="shopping-macro-value">{needs.fat}g</span>
              <span className="shopping-macro-label">tuky</span>
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      <button className="btn btn-primary btn-full" onClick={generate} disabled={generating}
        style={{ margin: '0 16px 16px', width: 'calc(100% - 32px)' }}>
        {generating ? 'Generuji...' : list ? 'Přegenerovat seznam' : 'Vygenerovat nákupní seznam'}
      </button>

      {/* Shopping list */}
      {list && Object.entries(list).map(([cat, items]) => (
        <div key={cat} className="card" style={{ marginBottom: 12 }}>
          <div className="shopping-cat-title">{categoryLabels[cat] || cat}</div>
          {items.map((item, i) => (
            <div key={i} className={`shopping-item ${item.checked ? 'checked' : ''}`}
              onClick={() => toggleItem(cat, i)}>
              <div className={`checkbox ${item.checked ? 'checked' : ''}`}>
                {item.checked && '✓'}
              </div>
              <span className="shopping-item-name">{item.name}</span>
              <span className="shopping-item-amount">{item.amount}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Custom items */}
      <div className="card">
        <div className="shopping-cat-title">Vlastní položky</div>
        {customItems.map((item, i) => (
          <div key={i} className={`shopping-item ${item.checked ? 'checked' : ''}`}>
            <div className={`checkbox ${item.checked ? 'checked' : ''}`}
              onClick={() => toggleCustom(i)}>
              {item.checked && '✓'}
            </div>
            <span className="shopping-item-name" onClick={() => toggleCustom(i)}>{item.name}</span>
            <button className="shopping-item-delete" onClick={() => removeCustom(i)}>
              <IconTrash size={14} stroke="#ff3b30" />
            </button>
          </div>
        ))}
        <div className="food-input-row" style={{ marginTop: 8 }}>
          <input type="text" className="food-input" placeholder="Přidat položku..."
            value={newItem} onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomItem()} />
          <button className="btn btn-primary" onClick={addCustomItem} disabled={!newItem.trim()}>
            <IconPlus size={18} />
          </button>
        </div>
      </div>

      {!bodyStats.weight && (
        <div className="card" style={{ textAlign: 'center', color: '#ff9500', padding: 16 }}>
          Pro přesnější výpočet vyplňte tělesné údaje v Profilu.
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
