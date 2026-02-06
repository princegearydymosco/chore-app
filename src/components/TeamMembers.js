import React, { useState } from 'react';
import './TeamMembers.css';

function TeamMembers({ members, onAddMember, onRemoveMember, onClose }) {
  const [newMember, setNewMember] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMember.trim()) {
      onAddMember(newMember);
      setNewMember('');
    }
  };

  return (
    <div className="team-panel">
      <div className="team-header">
        <h2>Team Members</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <form className="add-member-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add team member..."
        />
        <button type="submit" disabled={!newMember.trim()}>Add</button>
      </form>

      <ul className="members-list">
        {members.length === 0 ? (
          <li className="empty-state">No team members yet</li>
        ) : (
          members.map(member => (
            <li key={member} className="member-item">
              <span>{member}</span>
              <button
                className="remove-btn"
                onClick={() => onRemoveMember(member)}
                title="Remove member"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TeamMembers;
