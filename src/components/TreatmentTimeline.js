import React, { useState } from 'react';
import timeline from '../data/timeline';

function TreatmentTimeline() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page">
      <h1 className="page-title">Plán léčby</h1>
      <p className="page-subtitle">12týdenní protokol pro histaminovou intoleranci</p>

      <div className="timeline">
        {timeline.map((phase, index) => (
          <div key={phase.phase} className="timeline-item">
            <div className="timeline-line-container">
              <div
                className="timeline-dot"
                style={{ backgroundColor: phase.color }}
              />
              {index < timeline.length - 1 && (
                <div className="timeline-line" />
              )}
            </div>

            <div
              className="card timeline-card"
              onClick={() =>
                setExpanded(expanded === phase.phase ? null : phase.phase)
              }
            >
              <div className="timeline-header">
                <div>
                  <div className="timeline-phase" style={{ color: phase.color }}>
                    Fáze {phase.phase}
                  </div>
                  <div className="timeline-title">{phase.title}</div>
                  <div className="timeline-weeks">Týden {phase.weeks}</div>
                </div>
                <span className="timeline-chevron">
                  {expanded === phase.phase ? '▲' : '▼'}
                </span>
              </div>

              {expanded === phase.phase && (
                <div className="timeline-detail">
                  <div className="timeline-section">
                    <h4>Úkoly</h4>
                    <ul>
                      {phase.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="timeline-section">
                    <h4>Co očekávat</h4>
                    <ul>
                      {phase.expectations.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TreatmentTimeline;
