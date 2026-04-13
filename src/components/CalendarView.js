import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import medications from '../data/medications';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPill,
  IconDroplet,
  IconGrid,
  IconSmile,
} from './Icons';

const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(d);
  }
  return days;
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function getDayColor(dayData) {
  if (!dayData) return '#d1d1d6';

  const hasWellbeing = dayData.wellbeing && dayData.wellbeing.values;
  const hasMeds = dayData.medicationCount !== undefined;
  const hasSymptoms = dayData.symptoms && dayData.symptoms.length > 0;

  if (!hasWellbeing && !hasMeds && !hasSymptoms) return '#d1d1d6';

  let score = 0;
  let factors = 0;

  if (hasWellbeing) {
    const vals = Object.values(dayData.wellbeing.values);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    score += avg;
    factors++;
  }

  if (hasMeds) {
    const medScore = (dayData.medicationCount / medications.length) * 10;
    score += medScore;
    factors++;
  }

  if (hasSymptoms) {
    const symptomPenalty = Math.min(dayData.symptoms.length * 1.5, 8);
    score += (10 - symptomPenalty);
    factors++;
  }

  const avg = factors > 0 ? score / factors : 0;

  if (avg >= 7) return '#34c759';
  if (avg >= 4) return '#ff9500';
  return '#ff3b30';
}

function CalendarView() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthData, setMonthData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadMonth = useCallback(async (y, m) => {
    setLoading(true);
    const startDate = `${y}-${pad(m + 1)}-01`;
    const endDate = `${y}-${pad(m + 1)}-${new Date(y, m + 1, 0).getDate()}`;

    const data = {};

    try {
      const logQ = query(
        collection(db, 'dailyLog'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const logSnap = await getDocs(logQ);
      logSnap.forEach((doc) => {
        const d = doc.data();
        data[d.date] = { ...data[d.date], ...d };
      });

      const sympQ = query(
        collection(db, 'symptoms'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const sympSnap = await getDocs(sympQ);
      sympSnap.forEach((doc) => {
        const d = doc.data();
        if (!data[d.date]) data[d.date] = {};
        if (!data[d.date].symptoms) data[d.date].symptoms = [];
        data[d.date].symptoms.push(...(d.symptoms || []));
      });

      const wellQ = query(
        collection(db, 'wellbeing'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const wellSnap = await getDocs(wellQ);
      wellSnap.forEach((doc) => {
        const d = doc.data();
        if (!data[d.date]) data[d.date] = {};
        data[d.date].wellbeing = d;
      });
    } catch (err) {
      console.error('Error loading calendar data:', err);
    }

    setMonthData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMonth(year, month);
  }, [year, month, loadMonth]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const days = getMonthDays(year, month);
  const todayStr = today.toISOString().split('T')[0];

  const selectedDate = selectedDay
    ? `${year}-${pad(month + 1)}-${pad(selectedDay)}`
    : null;
  const selectedData = selectedDate ? monthData[selectedDate] : null;

  const getColor = (val) => {
    if (val <= 3) return '#ff3b30';
    if (val <= 5) return '#ff9500';
    if (val <= 7) return '#ffcc00';
    return '#34c759';
  };

  return (
    <div className="page">
      <h1 className="page-title">Deník</h1>

      <div className="card">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={prevMonth}>
            <IconChevronLeft size={20} />
          </button>
          <span className="calendar-month">{MONTHS[month]} {year}</span>
          <button className="calendar-nav" onClick={nextMonth}>
            <IconChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-weekdays">
          {DAYS.map((d) => (
            <div key={d} className="calendar-weekday">{d}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="calendar-cell empty" />;
            }
            const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
            const dayData = monthData[dateStr];
            const color = getDayColor(dayData);
            const isToday = dateStr === todayStr;
            const isSelected = day === selectedDay;

            return (
              <div
                key={day}
                className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
              >
                <span className="calendar-day-number">{day}</span>
                <span className="calendar-dot" style={{ backgroundColor: color }} />
              </div>
            );
          })}
        </div>

        {loading && <div className="calendar-loading">Načítám...</div>}
      </div>

      {selectedDay && (
        <div className="card calendar-detail">
          <h3 className="calendar-detail-date">
            {selectedDay}. {MONTHS[month]} {year}
          </h3>

          {!selectedData ? (
            <p className="calendar-no-data">Žádná data pro tento den</p>
          ) : (
            <>
              {selectedData.medicationCount !== undefined && (
                <div className="calendar-detail-section">
                  <div className="calendar-detail-header">
                    <IconPill size={16} stroke="#8e8e93" />
                    <span>Léky</span>
                    <span className="calendar-detail-value">
                      {selectedData.medicationCount}/{medications.length}
                    </span>
                  </div>
                  <div className="progress-bar progress-bar-sm">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(selectedData.medicationCount / medications.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedData.water !== undefined && (
                <div className="calendar-detail-section">
                  <div className="calendar-detail-header">
                    <IconDroplet size={16} stroke="#8e8e93" />
                    <span>Voda</span>
                    <span className="calendar-detail-value">
                      {(selectedData.water / 1000).toFixed(1)} l z 3 l
                    </span>
                  </div>
                  <div className="progress-bar progress-bar-sm">
                    <div
                      className="progress-fill water-fill"
                      style={{
                        width: `${Math.min((selectedData.water / 3000) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedData.symptoms && selectedData.symptoms.length > 0 && (
                <div className="calendar-detail-section">
                  <div className="calendar-detail-header">
                    <IconGrid size={16} stroke="#8e8e93" />
                    <span>Symptomy</span>
                    <span className="calendar-detail-value">
                      {selectedData.symptoms.length}x
                    </span>
                  </div>
                  <div className="calendar-symptoms-list">
                    {selectedData.symptoms.map((s, i) => (
                      <span key={i} className="calendar-symptom-tag">
                        {s.name}
                        <span className="calendar-symptom-intensity">
                          {s.intensity === 1 ? ' .' : s.intensity === 2 ? ' ..' : ' ...'}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedData.wellbeing && selectedData.wellbeing.values && (
                <div className="calendar-detail-section">
                  <div className="calendar-detail-header">
                    <IconSmile size={16} stroke="#8e8e93" />
                    <span>Pocit</span>
                  </div>
                  <div className="calendar-wellbeing-list">
                    {Object.entries(selectedData.wellbeing.values).map(([key, val]) => (
                      <div key={key} className="calendar-wellbeing-row">
                        <span className="calendar-wellbeing-label">{key}</span>
                        <div className="calendar-wellbeing-bar-wrap">
                          <div
                            className="calendar-wellbeing-bar"
                            style={{
                              width: `${val * 10}%`,
                              backgroundColor: getColor(val),
                            }}
                          />
                        </div>
                        <span className="calendar-wellbeing-val" style={{ color: getColor(val) }}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarView;
