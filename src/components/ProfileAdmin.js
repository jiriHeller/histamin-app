import React, { useState, useCallback, useRef } from 'react';
import defaultMedications from '../data/medications';
import {
  IconUser,
  IconLock,
  IconLogout,
  IconCamera,
  IconPlus,
  IconTrash,
  IconEdit,
} from './Icons';

const ADMIN_PASSWORD = '123456';

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
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function ProfileAdmin() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('admin_logged_in') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || '');
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem('profile_photo') || '');
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('custom_medications');
    return saved ? JSON.parse(saved) : defaultMedications.map(m => ({ ...m, note: '' }));
  });
  const [treatmentStart, setTreatmentStart] = useState(() => localStorage.getItem('treatment_start_date') || '');
  const [bodyStats, setBodyStats] = useState(() => {
    const saved = localStorage.getItem('body_stats');
    return saved ? JSON.parse(saved) : { weight: '', height: '', fat: '', muscle: '', bone: '', bodyWater: '', goal: 'maintain', targetWeight: '' };
  });
  const [editingMed, setEditingMed] = useState(null);
  const [newMed, setNewMed] = useState(null);
  const photoInputRef = useRef(null);

  const handleLogin = useCallback(() => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem('admin_logged_in', 'true');
      setError('');
    } else {
      setError('Špatné heslo');
    }
  }, [password]);

  const handleLogout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
  }, []);

  const handleNameChange = useCallback((val) => {
    setUserName(val);
    localStorage.setItem('user_name', val);
  }, []);

  const handleStartDateChange = useCallback((val) => {
    setTreatmentStart(val);
    localStorage.setItem('treatment_start_date', val);
  }, []);

  const updateBodyStat = useCallback((field, value) => {
    setBodyStats(prev => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('body_stats', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handlePhotoSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImage(file, 256);
    setProfilePhoto(dataUrl);
    localStorage.setItem('profile_photo', dataUrl);
  }, []);

  const saveMedications = useCallback((meds) => {
    setMedications(meds);
    localStorage.setItem('custom_medications', JSON.stringify(meds));
  }, []);

  const updateMed = useCallback((id, field, value) => {
    const updated = medications.map(m => m.id === id ? { ...m, [field]: value } : m);
    saveMedications(updated);
  }, [medications, saveMedications]);

  const deleteMed = useCallback((id) => {
    saveMedications(medications.filter(m => m.id !== id));
    setEditingMed(null);
  }, [medications, saveMedications]);

  const addMed = useCallback(() => {
    if (!newMed?.name) return;
    const id = newMed.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    saveMedications([...medications, { id, name: newMed.name, time: newMed.time || '', icon: 'tablet', note: newMed.note || '' }]);
    setNewMed(null);
  }, [newMed, medications, saveMedications]);

  const resetToDefault = useCallback(() => {
    const defaults = defaultMedications.map(m => ({ ...m, note: '' }));
    saveMedications(defaults);
    setEditingMed(null);
  }, [saveMedications]);

  // Login screen
  if (!loggedIn) {
    return (
      <div className="page">
        <h1 className="page-title">Profil</h1>

        <div className="card profile-login">
          <div className="profile-login-icon">
            <IconLock size={48} stroke="#8e8e93" />
          </div>
          <p className="profile-login-text">Zadejte heslo pro přístup</p>

          <input
            type="password"
            className="food-input profile-password-input"
            placeholder="Heslo..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <p className="profile-error">{error}</p>}

          <button className="btn btn-primary btn-full" onClick={handleLogin} style={{ marginTop: 12 }}>
            Přihlásit se
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="profile-header-row">
        <h1 className="page-title">Profil</h1>
        <button className="profile-logout-btn" onClick={handleLogout}>
          <IconLogout size={20} stroke="#ff3b30" />
        </button>
      </div>

      {/* Profile photo & name */}
      <div className="card profile-card">
        <div className="profile-photo-section">
          <div className="profile-photo-wrap" onClick={() => photoInputRef.current?.click()}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profil" className="profile-photo-img" />
            ) : (
              <div className="profile-photo-placeholder">
                <IconUser size={40} stroke="#8e8e93" />
              </div>
            )}
            <div className="profile-photo-overlay">
              <IconCamera size={16} stroke="white" />
            </div>
          </div>
          <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
        </div>

        <div className="profile-name-section">
          <label className="profile-label">Jméno</label>
          <input
            type="text"
            className="food-input"
            placeholder="Vaše jméno..."
            value={userName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <div className="profile-name-section" style={{ marginTop: 12 }}>
          <label className="profile-label">Datum zahájení léčby</label>
          <input
            type="date"
            className="food-input"
            value={treatmentStart}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </div>
      </div>

      {/* Body stats */}
      <h2 className="section-title" style={{ padding: '0 16px' }}>Tělesné údaje</h2>
      <div className="card">
        <div className="body-stats-grid">
          <div className="body-stat-field">
            <label className="profile-label">Váha (kg)</label>
            <input type="number" className="food-input" placeholder="75" value={bodyStats.weight} onChange={(e) => updateBodyStat('weight', e.target.value)} />
          </div>
          <div className="body-stat-field">
            <label className="profile-label">Výška (cm)</label>
            <input type="number" className="food-input" placeholder="175" value={bodyStats.height} onChange={(e) => updateBodyStat('height', e.target.value)} />
          </div>
        </div>

        {bodyStats.weight && bodyStats.height && (
          <div className="body-stat-bmi">
            <span className="profile-label">BMI</span>
            <span className="body-stat-bmi-value">
              {(bodyStats.weight / ((bodyStats.height / 100) ** 2)).toFixed(1)}
            </span>
          </div>
        )}

        <div className="body-stats-grid">
          <div className="body-stat-field">
            <label className="profile-label">Tuk (%)</label>
            <input type="number" className="food-input" placeholder="20" value={bodyStats.fat} onChange={(e) => updateBodyStat('fat', e.target.value)} />
          </div>
          <div className="body-stat-field">
            <label className="profile-label">Svaly (%)</label>
            <input type="number" className="food-input" placeholder="40" value={bodyStats.muscle} onChange={(e) => updateBodyStat('muscle', e.target.value)} />
          </div>
        </div>

        <div className="body-stats-grid">
          <div className="body-stat-field">
            <label className="profile-label">Kosti (kg)</label>
            <input type="number" className="food-input" placeholder="3.2" step="0.1" value={bodyStats.bone} onChange={(e) => updateBodyStat('bone', e.target.value)} />
          </div>
          <div className="body-stat-field">
            <label className="profile-label">Voda v těle (%)</label>
            <input type="number" className="food-input" placeholder="55" value={bodyStats.bodyWater} onChange={(e) => updateBodyStat('bodyWater', e.target.value)} />
          </div>
        </div>

        <div className="body-stat-goal-section">
          <label className="profile-label">Cíl</label>
          <div className="food-tabs" style={{ marginTop: 6 }}>
            {[['lose', 'Shodit'], ['maintain', 'Udržet'], ['gain', 'Přibrat']].map(([val, label]) => (
              <button key={val} className={`food-tab ${bodyStats.goal === val ? 'active' : ''}`}
                onClick={() => updateBodyStat('goal', val)}>{label}</button>
            ))}
          </div>
        </div>

        {bodyStats.goal !== 'maintain' && (
          <div className="body-stat-field" style={{ marginTop: 10 }}>
            <label className="profile-label">Cílová váha (kg)</label>
            <input type="number" className="food-input" placeholder="70" value={bodyStats.targetWeight} onChange={(e) => updateBodyStat('targetWeight', e.target.value)} />
          </div>
        )}
      </div>

      {/* Medications editor */}
      <div className="profile-meds-header">
        <h2 className="section-title">Moje léky</h2>
        <button className="btn btn-text" onClick={resetToDefault} style={{ fontSize: 12 }}>
          Obnovit výchozí
        </button>
      </div>

      <div className="card">
        {medications.map((med) => (
          <div key={med.id} className="profile-med-item">
            {editingMed === med.id ? (
              <div className="profile-med-edit">
                <input
                  className="food-input profile-med-input"
                  value={med.name}
                  onChange={(e) => updateMed(med.id, 'name', e.target.value)}
                  placeholder="Název léku"
                />
                <input
                  className="food-input profile-med-input"
                  value={med.time}
                  onChange={(e) => updateMed(med.id, 'time', e.target.value)}
                  placeholder="Kdy (ráno, večer...)"
                />
                <input
                  className="food-input profile-med-input"
                  value={med.note || ''}
                  onChange={(e) => updateMed(med.id, 'note', e.target.value)}
                  placeholder="Účinná látka / poznámka"
                />
                <div className="profile-med-edit-actions">
                  <button className="btn btn-text" onClick={() => setEditingMed(null)}>Hotovo</button>
                  <button className="btn btn-text" style={{ color: '#ff3b30' }} onClick={() => deleteMed(med.id)}>
                    <IconTrash size={14} stroke="#ff3b30" /> Smazat
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-med-view" onClick={() => setEditingMed(med.id)}>
                <div className="profile-med-info">
                  <span className="profile-med-name">{med.name}</span>
                  <span className="profile-med-time">{med.time}</span>
                  {med.note && <span className="profile-med-note">{med.note}</span>}
                </div>
                <IconEdit size={16} stroke="#8e8e93" />
              </div>
            )}
          </div>
        ))}

        {/* Add new medication */}
        {newMed ? (
          <div className="profile-med-new">
            <input
              className="food-input profile-med-input"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              placeholder="Název léku"
              autoFocus
            />
            <input
              className="food-input profile-med-input"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              placeholder="Kdy (ráno, večer...)"
            />
            <input
              className="food-input profile-med-input"
              value={newMed.note}
              onChange={(e) => setNewMed({ ...newMed, note: e.target.value })}
              placeholder="Účinná látka / poznámka"
            />
            <div className="profile-med-edit-actions">
              <button className="btn btn-primary" onClick={addMed}>Přidat</button>
              <button className="btn btn-text" onClick={() => setNewMed(null)}>Zrušit</button>
            </div>
          </div>
        ) : (
          <button
            className="profile-add-med-btn"
            onClick={() => setNewMed({ name: '', time: '', note: '' })}
          >
            <IconPlus size={18} stroke="#007aff" /> Přidat lék
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileAdmin;
