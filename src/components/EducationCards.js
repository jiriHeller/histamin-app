import React, { useState } from 'react';
import educationCards from '../data/education';
import {
  IconDna,
  IconHeart,
  IconMicroscope,
  IconUtensils,
  IconPill,
  IconShield,
  IconLotus,
  IconStethoscope,
} from './Icons';

const iconMap = {
  dna: IconDna,
  heart: IconHeart,
  microscope: IconMicroscope,
  utensils: IconUtensils,
  pill: IconPill,
  shield: IconShield,
  lotus: IconLotus,
  stethoscope: IconStethoscope,
};

function EducationCards() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page">
      <h1 className="page-title">Vzdělávání</h1>
      <p className="page-subtitle">Vše o histaminové intoleranci</p>

      <div className="card-list">
        {educationCards.map((card) => {
          const CardIcon = iconMap[card.icon];
          return (
            <div
              key={card.id}
              className="card edu-card"
              onClick={() =>
                setExpanded(expanded === card.id ? null : card.id)
              }
            >
              <div className="edu-header">
                <span className="edu-icon-wrap">
                  {CardIcon && <CardIcon size={26} stroke="#007aff" strokeWidth={1.5} />}
                </span>
                <span className="edu-title">{card.title}</span>
                <span className="edu-chevron">
                  {expanded === card.id ? '▲' : '▼'}
                </span>
              </div>
              {expanded === card.id && (
                <div className="edu-content">
                  {card.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EducationCards;
