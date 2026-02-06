import React from 'react';
import { getMonthData, formatDate, MONTH_NAMES, DAY_NAMES } from '../dateUtils';
import './Calendar.css';

function Calendar({
  chores,
  currentMonth,
  onMonthChange,
  onDateClick,
  onChoreClick,
  onCompleteChore
}) {
  const { year, month } = currentMonth;
  const { startPadding, daysInMonth } = getMonthData(year, month);
  const today = formatDate(new Date());

  const prevMonth = () => {
    if (month === 0) {
      onMonthChange({ year: year - 1, month: 11 });
    } else {
      onMonthChange({ year, month: month - 1 });
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      onMonthChange({ year: year + 1, month: 0 });
    } else {
      onMonthChange({ year, month: month + 1 });
    }
  };

  const goToToday = () => {
    const now = new Date();
    onMonthChange({ year: now.getFullYear(), month: now.getMonth() });
  };

  const getChoresForDate = (dateStr) => {
    return chores.filter(chore => chore.date === dateStr);
  };

  const renderDays = () => {
    const days = [];

    // Empty cells for padding
    for (let i = 0; i < startPadding; i++) {
      days.push(<div key={`pad-${i}`} className="calendar-day empty" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const dayChores = getChoresForDate(dateStr);
      const isToday = dateStr === today;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''}`}
          onClick={() => onDateClick(dateStr)}
        >
          <span className="day-number">{day}</span>
          <div className="day-chores">
            {dayChores.slice(0, 3).map(chore => (
              <div
                key={chore.id}
                className="chore-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onChoreClick(chore);
                }}
              >
                <span className="chore-title">{chore.title}</span>
                <button
                  className="complete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompleteChore(chore);
                  }}
                  title="Mark complete"
                >
                  ✓
                </button>
              </div>
            ))}
            {dayChores.length > 3 && (
              <div className="more-chores">+{dayChores.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>‹</button>
        <div className="month-year">
          <span>{MONTH_NAMES[month]} {year}</span>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        <button className="nav-btn" onClick={nextMonth}>›</button>
      </div>

      <div className="calendar-weekdays">
        {DAY_NAMES.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderDays()}
      </div>
    </div>
  );
}

export default Calendar;
