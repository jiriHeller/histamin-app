import React, { useState } from 'react';
import { getTodaysTip } from '../data/dailyTips';
import {
  IconClove,
  IconGinger,
  IconOnion,
  IconTurmeric,
  IconNettle,
  IconFennel,
  IconChamomile,
  IconCoconut,
  IconGarlic,
  IconOregano,
  IconChevronDown,
  IconSparkles,
  IconAlertCircle,
} from './Icons';

const iconMap = {
  clove: IconClove,
  ginger: IconGinger,
  onion: IconOnion,
  turmeric: IconTurmeric,
  nettle: IconNettle,
  fennel: IconFennel,
  chamomile: IconChamomile,
  coconut: IconCoconut,
  garlic: IconGarlic,
  oregano: IconOregano,
};

function DailyTip() {
  const [expanded, setExpanded] = useState(false);
  const tip = getTodaysTip();
  const TipIcon = iconMap[tip.icon] || IconSparkles;

  return (
    <div className="card daily-tip-card">
      <div className="daily-tip-header" onClick={() => setExpanded(!expanded)}>
        <div className="daily-tip-icon-wrap">
          <TipIcon size={32} stroke="#34c759" strokeWidth={1.5} />
        </div>
        <div className="daily-tip-info">
          <div className="daily-tip-label">Tip dne</div>
          <div className="daily-tip-name">{tip.name}</div>
          <div className="daily-tip-benefit">{tip.benefit}</div>
        </div>
        <div className={`daily-tip-chevron ${expanded ? 'expanded' : ''}`}>
          <IconChevronDown size={18} stroke="#8e8e93" />
        </div>
      </div>

      {expanded && (
        <div className="daily-tip-body">
          <p className="daily-tip-description">{tip.description}</p>

          {tip.preparation && (
            <div className="daily-tip-recipe">
              <h4 className="daily-tip-recipe-title">{tip.preparation.title}</h4>

              <div className="daily-tip-section">
                <div className="daily-tip-section-label">Ingredience</div>
                <ul className="daily-tip-list">
                  {tip.preparation.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="daily-tip-section">
                <div className="daily-tip-section-label">Postup</div>
                <ol className="daily-tip-steps">
                  {tip.preparation.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {tip.preparation.tip && (
                <div className="daily-tip-note">
                  <IconSparkles size={14} stroke="#ff9500" />
                  <span>{tip.preparation.tip}</span>
                </div>
              )}
            </div>
          )}

          {tip.tincture && (
            <div className="daily-tip-recipe">
              <h4 className="daily-tip-recipe-title">{tip.tincture.title}</h4>

              <div className="daily-tip-section">
                <div className="daily-tip-section-label">Ingredience</div>
                <ul className="daily-tip-list">
                  {tip.tincture.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="daily-tip-section">
                <div className="daily-tip-section-label">Postup</div>
                <ol className="daily-tip-steps">
                  {tip.tincture.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {tip.tincture.tip && (
                <div className="daily-tip-note">
                  <IconSparkles size={14} stroke="#ff9500" />
                  <span>{tip.tincture.tip}</span>
                </div>
              )}
            </div>
          )}

          {tip.preparation?.warning && (
            <div className="daily-tip-warning">
              <IconAlertCircle size={14} stroke="#ff3b30" />
              <span>{tip.preparation.warning}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DailyTip;
