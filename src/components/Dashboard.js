import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase';
import timeline from '../data/timeline';
import defaultMedications from '../data/medications';
import DailyTip from './DailyTip';
import {
  IconAward,
  IconTarget,
  IconTrendingUp,
  IconPill,
  IconDroplet,
  IconGrid,
  IconSmile,
} from './Icons';

function getPhaseInfo(startDate) {
  if (!startDate) return { phase: null, daysSinceStart: 0, daysInPhase: 0, daysToNext: 0, weekNumber: 0 };

  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diff / 7) + 1;

  let currentPhase;
  if (weekNumber <= 2) currentPhase = timeline[0];
  else if (weekNumber <= 4) currentPhase = timeline[1];
  else if (weekNumber <= 7) currentPhase = timeline[2];
  else if (weekNumber <= 10) currentPhase = timeline[3];
  else currentPhase = timeline[4];

  const phaseWeekRanges = [[1, 2], [3, 4], [5, 7], [8, 10], [11, 84]];
  const phaseIdx = currentPhase.phase - 1;
  const phaseStartWeek = phaseWeekRanges[phaseIdx][0];
  const phaseEndWeek = phaseWeekRanges[phaseIdx][1];
  const phaseTotalDays = (phaseEndWeek - phaseStartWeek + 1) * 7;
  const daysInPhase = diff - ((phaseStartWeek - 1) * 7) + 1;
  const daysToNext = Math.max(0, phaseTotalDays - daysInPhase);

  const totalWeeks = 12;
  const overallProgress = Math.min((weekNumber / totalWeeks) * 100, 100);

  return { phase: currentPhase, daysSinceStart: diff, daysInPhase: Math.max(0, daysInPhase), daysToNext, weekNumber, overallProgress };
}

function getMotivation(daysSinceStart, dailyScore, phaseInfo) {
  const messages = [];

  if (daysSinceStart > 0) {
    messages.push(`Jste v léčbě již ${daysSinceStart} dní. Každý den se počítá!`);
  }

  if (phaseInfo.phase) {
    if (phaseInfo.daysToNext > 0 && phaseInfo.phase.phase < 5) {
      messages.push(`Fáze ${phaseInfo.phase.phase}: ${phaseInfo.phase.title}. Ještě ${phaseInfo.daysToNext} dní do další fáze.`);
    } else if (phaseInfo.phase.phase === 5) {
      messages.push('Jste v udržovací fázi! Vaše tělo se postupně zotavuje.');
    }
  }

  if (dailyScore >= 80) {
    messages.push('Skvělá práce dnes! Držíte se plánu na výbornou.');
  } else if (dailyScore >= 50) {
    messages.push('Dobrý den! Zkuste ještě doplnit léky nebo vodu.');
  } else if (dailyScore > 0) {
    messages.push('Nevzdávejte to! Každý malý krok se počítá na cestě k lepšímu zdraví.');
  } else {
    messages.push('Začněte den — zaznamenejte léky, vodu a jak se cítíte.');
  }

  return messages;
}

function getTip(phase) {
  if (!phase) return 'Nastavte datum zahájení léčby v Profilu pro personalizované tipy.';
  const tasks = phase.tasks;
  const randomIdx = Math.floor(new Date().getDate() % tasks.length);
  return tasks[randomIdx];
}

function Dashboard() {
  const [startDate] = useState(() => localStorage.getItem('treatment_start_date') || '');
  const [todayData, setTodayData] = useState({ meds: 0, medsTotal: 0, water: 0, symptoms: 0, wellbeing: 0 });
  const [userName] = useState(() => localStorage.getItem('user_name') || '');
  const [profilePhoto] = useState(() => localStorage.getItem('profile_photo') || '');

  const phaseInfo = getPhaseInfo(startDate);

  const loadTodayData = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];

    // Medications from localStorage
    const customMeds = localStorage.getItem('custom_medications');
    const meds = customMeds ? JSON.parse(customMeds) : defaultMedications;
    const checkedRaw = localStorage.getItem('medications');
    const checked = checkedRaw ? JSON.parse(checkedRaw) : {};
    const medsCount = meds.filter(m => checked[m.id]).length;

    // Water from localStorage
    const waterRaw = localStorage.getItem('water');
    const water = waterRaw ? JSON.parse(waterRaw) : 0;

    // Symptoms from Firebase
    let symptomsCount = 0;
    try {
      const sympQ = query(collection(db, 'symptoms'), where('date', '==', today));
      const sympSnap = await getDocs(sympQ);
      sympSnap.forEach(doc => {
        const d = doc.data();
        symptomsCount += (d.symptoms?.length || 0);
      });
    } catch (e) { /* ignore */ }

    // Wellbeing from Firebase
    let wellbeingAvg = 0;
    try {
      const wellQ = query(collection(db, 'wellbeing'), where('date', '==', today), orderBy('timestamp', 'desc'), limit(1));
      const wellSnap = await getDocs(wellQ);
      if (!wellSnap.empty) {
        const vals = wellSnap.docs[0].data().values;
        if (vals) {
          const numbers = Object.values(vals);
          wellbeingAvg = Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
        }
      }
    } catch (e) { /* ignore */ }

    setTodayData({ meds: medsCount, medsTotal: meds.length, water, symptoms: symptomsCount, wellbeing: wellbeingAvg });
  }, []);

  useEffect(() => {
    loadTodayData();
  }, [loadTodayData]);

  // Calculate daily score (0-100)
  const medsScore = todayData.medsTotal > 0 ? (todayData.meds / todayData.medsTotal) * 100 : 0;
  const waterScore = Math.min((todayData.water / 3000) * 100, 100);
  const wellbeingScore = todayData.wellbeing * 10;
  const dailyScore = Math.round((medsScore + waterScore + wellbeingScore) / 3);

  const motivations = getMotivation(phaseInfo.daysSinceStart, dailyScore, phaseInfo);
  const tip = getTip(phaseInfo.phase);

  const getScoreColor = (score) => {
    if (score >= 70) return '#34c759';
    if (score >= 40) return '#ff9500';
    return '#ff3b30';
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dobré ráno';
    if (hour < 18) return 'Dobré odpoledne';
    return 'Dobrý večer';
  };

  return (
    <div className="page">
      {/* Greeting */}
      <div className="dash-greeting">
        {profilePhoto && <img src={profilePhoto} alt="" className="dash-avatar" />}
        <div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>{greeting()}{userName ? `, ${userName}` : ''}!</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* Daily Tip */}
      <DailyTip />

      {/* Daily Score Circle */}
      <div className="card dash-score-card">
        <div className="dash-score-circle" style={{ borderColor: getScoreColor(dailyScore) }}>
          <span className="dash-score-number" style={{ color: getScoreColor(dailyScore) }}>{dailyScore}</span>
          <span className="dash-score-label">/ 100</span>
        </div>
        <p className="dash-score-text">Denní skóre</p>

        <div className="dash-quick-stats">
          <div className="dash-stat">
            <IconPill size={16} stroke="#8e8e93" />
            <span className="dash-stat-value">{todayData.meds}/{todayData.medsTotal}</span>
            <span className="dash-stat-name">Léky</span>
          </div>
          <div className="dash-stat">
            <IconDroplet size={16} stroke="#8e8e93" />
            <span className="dash-stat-value">{(todayData.water / 1000).toFixed(1)}l</span>
            <span className="dash-stat-name">Voda</span>
          </div>
          <div className="dash-stat">
            <IconGrid size={16} stroke="#8e8e93" />
            <span className="dash-stat-value">{todayData.symptoms}x</span>
            <span className="dash-stat-name">Symptomy</span>
          </div>
          <div className="dash-stat">
            <IconSmile size={16} stroke="#8e8e93" />
            <span className="dash-stat-value">{todayData.wellbeing}/10</span>
            <span className="dash-stat-name">Pocit</span>
          </div>
        </div>
      </div>

      {/* Treatment Phase */}
      {phaseInfo.phase ? (
        <div className="card dash-phase-card">
          <div className="dash-phase-header">
            <IconTarget size={20} stroke={phaseInfo.phase.color} />
            <div>
              <div className="dash-phase-label" style={{ color: phaseInfo.phase.color }}>
                Fáze {phaseInfo.phase.phase} z 5
              </div>
              <div className="dash-phase-title">{phaseInfo.phase.title}</div>
            </div>
            <span className="dash-phase-week">Týden {phaseInfo.weekNumber}</span>
          </div>

          <div className="dash-phase-progress">
            {timeline.map((t) => (
              <div
                key={t.phase}
                className={`dash-phase-dot ${t.phase <= phaseInfo.phase.phase ? 'active' : ''}`}
                style={{ backgroundColor: t.phase <= phaseInfo.phase.phase ? t.color : '#e5e5ea' }}
              />
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${phaseInfo.overallProgress}%`, backgroundColor: phaseInfo.phase.color }} />
          </div>
        </div>
      ) : (
        <div className="card dash-phase-card">
          <div className="dash-phase-header">
            <IconTarget size={20} stroke="#8e8e93" />
            <div>
              <div className="dash-phase-title">Nastavte datum zahájení</div>
              <div className="dash-phase-label" style={{ color: '#8e8e93' }}>
                V záložce Profil nastavte kdy jste začali léčbu
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivation */}
      <div className="card dash-motivation-card">
        <div className="dash-motivation-header">
          <IconAward size={20} stroke="#ff9500" />
          <span className="dash-motivation-title">Motivace</span>
        </div>
        {motivations.map((msg, i) => (
          <p key={i} className="dash-motivation-text">{msg}</p>
        ))}
      </div>

      {/* Tip of the day */}
      <div className="card dash-tip-card">
        <div className="dash-tip-header">
          <IconTrendingUp size={18} stroke="#007aff" />
          <span className="dash-tip-title">Tip dne</span>
        </div>
        <p className="dash-tip-text">{tip}</p>
      </div>

      {/* Current phase tasks */}
      {phaseInfo.phase && (
        <div className="card">
          <h3 className="dash-tasks-title">Co dělat v této fázi</h3>
          {phaseInfo.phase.tasks.map((task, i) => (
            <div key={i} className="dash-task-item">
              <span className="dash-task-bullet" style={{ color: phaseInfo.phase.color }}>•</span>
              <span className="dash-task-text">{task}</span>
            </div>
          ))}

          {phaseInfo.phase.expectations.length > 0 && (
            <>
              <h3 className="dash-tasks-title" style={{ marginTop: 16 }}>Co můžete očekávat</h3>
              {phaseInfo.phase.expectations.map((exp, i) => (
                <div key={i} className="dash-task-item">
                  <span className="dash-task-bullet" style={{ color: '#34c759' }}>✓</span>
                  <span className="dash-task-text">{exp}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
