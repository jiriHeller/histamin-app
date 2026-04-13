import React, { useState, useCallback } from 'react';
import foods from '../data/foods';

const statusConfig = {
  safe: { label: 'Bezpečné', emoji: '✅', color: '#34c759', bg: '#dcf8e8' },
  caution: { label: 'Opatrně', emoji: '⚠️', color: '#ff9500', bg: '#fff3e0' },
  unsafe: { label: 'Nevhodné', emoji: '❌', color: '#ff3b30', bg: '#ffe5e5' },
};

function FoodChecker() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [aiMode, setAiMode] = useState(false);

  const checkFood = useCallback(async () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Check local database first
    if (foods[q]) {
      setResult({ ...foods[q], name: query.trim() });
      return;
    }

    // Partial match
    const partial = Object.entries(foods).find(
      ([key]) => key.includes(q) || q.includes(key)
    );
    if (partial) {
      setResult({ ...partial[1], name: query.trim() });
      return;
    }

    // Claude AI fallback
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
    setAiMode(true);
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
    setAiMode(false);
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Kontrola potravin</h1>

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
