import React, { useState, useCallback, useRef } from 'react';
import foods from '../data/foods';

const statusConfig = {
  safe: { label: 'Bezpečné', emoji: '✅', color: '#34c759', bg: '#dcf8e8' },
  caution: { label: 'Opatrně', emoji: '⚠️', color: '#ff9500', bg: '#fff3e0' },
  unsafe: { label: 'Nevhodné', emoji: '❌', color: '#ff3b30', bg: '#ffe5e5' },
};

const photoBadgeConfig = {
  ok: { label: 'OK', color: '#34c759', bg: '#dcf8e8' },
  pozor: { label: 'Pozor', color: '#ff9500', bg: '#fff3e0' },
  ne: { label: 'Ne', color: '#ff3b30', bg: '#ffe5e5' },
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
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64 = dataUrl.split(',')[1];
        resolve({ base64, dataUrl });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function FoodChecker() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoResult, setPhotoResult] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const fileInputRef = useRef(null);

  const checkFood = useCallback(async () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    if (foods[q]) {
      setResult({ ...foods[q], name: query.trim() });
      return;
    }

    const partial = Object.entries(foods).find(
      ([key]) => key.includes(q) || q.includes(key)
    );
    if (partial) {
      setResult({ ...partial[1], name: query.trim() });
      return;
    }

    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    if (!apiKey) {
      setResult({
        status: 'caution',
        name: query.trim(),
        note: 'Potravina nenalezena v databázi. Nastavte REACT_APP_CLAUDE_API_KEY pro AI vyhledávání.',
      });
      return;
    }

    setLoading(true);
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
          max_tokens: 200,
          messages: [
            {
              role: 'user',
              content: `Je "${query.trim()}" bezpečné pro osobu s histaminovou intolerancí? Odpověz POUZE v tomto JSON formátu, nic jiného: {"status": "safe"|"caution"|"unsafe", "note": "krátké vysvětlení česky"}`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResult({ ...parsed, name: query.trim(), ai: true });
      } else {
        setResult({
          status: 'caution',
          name: query.trim(),
          note: 'AI odpověděla, ale výsledek nelze zpracovat.',
        });
      }
    } catch {
      setResult({
        status: 'caution',
        name: query.trim(),
        note: 'Nepodařilo se kontaktovat AI. Zkontrolujte připojení.',
      });
    }
    setLoading(false);
  }, [query]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') checkFood();
    },
    [checkFood]
  );

  const clear = useCallback(() => {
    setQuery('');
    setResult(null);
  }, []);

  const handlePhotoSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { base64, dataUrl } = await resizeImage(file, 1024);
    setPhotoPreview(dataUrl);
    setPhotoResult(null);

    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    if (!apiKey) {
      setPhotoResult({
        error: 'Nastavte REACT_APP_CLAUDE_API_KEY pro analýzu fotek.',
      });
      return;
    }

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
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: 'image/jpeg',
                    data: base64,
                  },
                },
                {
                  type: 'text',
                  text: `Podívej se na tuto fotku jídla. Identifikuj VŠECHNY potraviny a ingredience, které vidíš. Každou potravinu zařaď podle vhodnosti pro osobu s histaminovou intolerancí.

Odpověz POUZE v tomto JSON formátu, nic jiného:
{"ok":["potravina1","potravina2"],"pozor":["potravina3"],"ne":["potravina4"],"zhodnoceni":"Krátké celkové zhodnocení jídla česky, 1-2 věty."}

ok = bezpečné pro HIT
pozor = záleží na toleranci, opatrně
ne = nevhodné, vysoký histamin

Odpověz česky.`,
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setPhotoResult(parsed);
      } else {
        setPhotoResult({ error: 'Nepodařilo se zpracovat odpověď AI.' });
      }
    } catch {
      setPhotoResult({ error: 'Nepodařilo se kontaktovat AI.' });
    }
    setPhotoLoading(false);

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const clearPhoto = useCallback(() => {
    setPhotoPreview(null);
    setPhotoResult(null);
    setRecipe(null);
  }, []);

  const suggestRecipe = useCallback(async () => {
    const okFoods = photoResult?.ok;
    if (!okFoods || okFoods.length === 0) return;

    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    if (!apiKey) return;

    setRecipeLoading(true);
    setRecipe(null);
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
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Napiš jednoduchý recept vhodný pro osobu s histaminovou intolerancí. Použij tyto bezpečné ingredience: ${okFoods.join(', ')}. Můžeš přidat i další bezpečné ingredience (rýže, brambory, olivový olej, sůl, čerstvé bylinky apod.).

Odpověz POUZE v tomto JSON formátu:
{"nazev":"Název receptu","ingredience":["ingredience 1","ingredience 2"],"postup":["krok 1","krok 2","krok 3"],"cas":"XX minut","tip":"Krátký tip pro HIT pacienty"}

Odpověz česky.`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setRecipe(JSON.parse(jsonMatch[0]));
      }
    } catch {
      // Silently fail
    }
    setRecipeLoading(false);
  }, [photoResult]);

  return (
    <div className="page">
      <h1 className="page-title">Kontrola potravin</h1>

      {/* Text search */}
      <div className="card">
        <div className="food-input-row">
          <input
            type="text"
            className="food-input"
            placeholder="Zadejte potravinu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary"
            onClick={checkFood}
            disabled={loading || !query.trim()}
          >
            {loading ? '...' : 'Ověřit'}
          </button>
        </div>
      </div>

      {/* Text result */}
      {result && (
        <div
          className="card food-result"
          style={{ backgroundColor: statusConfig[result.status]?.bg }}
        >
          <div className="food-result-header">
            <span className="food-result-emoji">
              {statusConfig[result.status]?.emoji}
            </span>
            <div>
              <div className="food-result-name">{result.name}</div>
              <div
                className="food-result-status"
                style={{ color: statusConfig[result.status]?.color }}
              >
                {statusConfig[result.status]?.label}
              </div>
            </div>
          </div>
          <p className="food-result-note">{result.note}</p>
          {result.ai && (
            <div className="food-ai-badge">🤖 Odpověď od AI</div>
          )}
          <button className="btn btn-text" onClick={clear}>
            Nové hledání
          </button>
        </div>
      )}

      {/* Photo analysis */}
      <div className="card photo-section">
        <div className="photo-section-header">
          <span className="photo-section-icon">📸</span>
          <div>
            <div className="photo-section-title">Analýza fotky jídla</div>
            <div className="photo-section-desc">
              Vyfoťte jídlo a AI zhodnotí vhodnost pro HIT
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoSelect}
          className="photo-file-input"
        />

        <button
          className="btn btn-photo"
          onClick={() => fileInputRef.current?.click()}
          disabled={photoLoading}
        >
          📷 Vybrat fotku
        </button>

        {photoPreview && (
          <div className="photo-preview-container">
            <img src={photoPreview} alt="Náhled jídla" className="photo-preview" />
          </div>
        )}

        {photoLoading && (
          <div className="photo-loading">
            <div className="photo-spinner" />
            <span>Analyzuji jídlo...</span>
          </div>
        )}

        {photoResult && !photoResult.error && (
          <div className="photo-results">
            {['ok', 'pozor', 'ne'].map((category) => {
              const items = photoResult[category];
              if (!items || items.length === 0) return null;
              const cfg = photoBadgeConfig[category];
              return (
                <div key={category} className="photo-category">
                  <div className="photo-category-label" style={{ color: cfg.color }}>
                    {category === 'ok' && '✅ Bezpečné'}
                    {category === 'pozor' && '⚠️ Opatrně'}
                    {category === 'ne' && '❌ Nevhodné'}
                  </div>
                  <div className="photo-badges">
                    {items.map((item, i) => (
                      <span
                        key={i}
                        className="photo-badge"
                        style={{
                          backgroundColor: cfg.bg,
                          color: cfg.color,
                          borderColor: cfg.color,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {photoResult.zhodnoceni && (
              <div className="photo-assessment">
                <span className="photo-assessment-icon">🤖</span>
                <p>{photoResult.zhodnoceni}</p>
              </div>
            )}

            {photoResult.ok?.length > 0 && !recipe && (
              <button
                className="btn btn-recipe"
                onClick={suggestRecipe}
                disabled={recipeLoading}
              >
                {recipeLoading ? (
                  <>
                    <span className="btn-recipe-spinner" />
                    Generuji recept...
                  </>
                ) : (
                  '🍳 Navrhnout recept z bezpečných surovin'
                )}
              </button>
            )}

            {recipe && (
              <div className="recipe-card">
                <div className="recipe-header">
                  <span className="recipe-icon">🍳</span>
                  <div>
                    <div className="recipe-title">{recipe.nazev}</div>
                    {recipe.cas && (
                      <div className="recipe-time">⏱ {recipe.cas}</div>
                    )}
                  </div>
                </div>

                <div className="recipe-section">
                  <div className="recipe-section-title">Ingredience</div>
                  <ul className="recipe-list">
                    {recipe.ingredience?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <div className="recipe-section-title">Postup</div>
                  <ol className="recipe-steps">
                    {recipe.postup?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {recipe.tip && (
                  <div className="recipe-tip">
                    <span>💡</span> {recipe.tip}
                  </div>
                )}
              </div>
            )}

            <button className="btn btn-text" onClick={clearPhoto}>
              Nová fotka
            </button>
          </div>
        )}

        {photoResult?.error && (
          <div className="photo-error">{photoResult.error}</div>
        )}
      </div>

      {/* Legend */}
      <div className="card food-legend">
        <h3>Legenda</h3>
        <div className="legend-item">
          <span>✅</span> Bezpečné — můžete jíst bez obav
        </div>
        <div className="legend-item">
          <span>⚠️</span> Opatrně — záleží na toleranci, zkuste malé množství
        </div>
        <div className="legend-item">
          <span>❌</span> Nevhodné — vyhněte se této potravině
        </div>
      </div>
    </div>
  );
}

export default FoodChecker;
