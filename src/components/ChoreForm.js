import React, { useState } from 'react';
import { parseDate, MONTH_NAMES } from '../dateUtils';
import './ChoreForm.css';

function ChoreForm({ chore, date, members, onSubmit, onDelete, onCancel }) {
  const [title, setTitle] = useState(chore?.title || '');
  const [assignee, setAssignee] = useState(chore?.assignee || '');
  const [choreDate, setChoreDate] = useState(chore?.date || date);
  const [recurrence, setRecurrence] = useState(chore?.recurrence || 'none');

  const isEditing = !!chore;

  const formatDisplayDate = (dateStr) => {
    const d = parseDate(dateStr);
    return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      ...(chore || {}),
      title: title.trim(),
      assignee,
      date: choreDate,
      recurrence,
    });
  };

  return (
    <form className="chore-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Chore' : 'New Chore'}</h2>
      <p className="form-date">{formatDisplayDate(choreDate)}</p>

      <div className="form-group">
        <label htmlFor="title">Chore</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Clean kitchen"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="assignee">Assign to</label>
        <select
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Unassigned</option>
          {members.map(member => (
            <option key={member} value={member}>{member}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={choreDate}
          onChange={(e) => setChoreDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="recurrence">Repeat</label>
        <select
          id="recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value="none">Does not repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="form-actions">
        {isEditing && onDelete && (
          <button type="button" className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        )}
        <div className="right-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={!title.trim()}>
            {isEditing ? 'Save' : 'Add Chore'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChoreForm;
