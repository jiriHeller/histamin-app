import React, { useCallback, useMemo } from 'react';
import medications from '../data/medications';
import useLocalStorage from '../hooks/useLocalStorage';
import useDailyReset from '../hooks/useDailyReset';

const initialState = {};

function MedicationTracker() {
  const [checked, setChecked] = useLocalStorage('medications', initialState);
  useDailyReset('medications', setChecked, initialState);

  const toggle = useCallback((id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, [setChecked]);

  const count = useMemo(
    () => medications.filter((m) => checked[m.id]).length,
    [checked]
  );
  const progress = (count / medications.length) * 100;

  return (
    <div className="page">
      <h1 className="page-title">Léky a doplňky</h1>

      <div className="card">
        <div className="progress-header">
          <span className="progress-label">Dnešní pokrok</span>
          <span className="progress-value">{count}/{medications.length}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="card-list">
        {medications.map((med) => (
          <div
            key={med.id}
            className={`card med-item ${checked[med.id] ? 'med-done' : ''}`}
            onClick={() => toggle(med.id)}
          >
            <div className="med-left">
              <div className={`checkbox ${checked[med.id] ? 'checked' : ''}`}>
                {checked[med.id] && '✓'}
              </div>
              <div>
                <div className="med-name">{med.emoji} {med.name}</div>
                <div className="med-time">{med.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicationTracker;
