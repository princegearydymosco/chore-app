import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import ChoreForm from './components/ChoreForm';
import TeamMembers from './components/TeamMembers';
import Modal from './components/Modal';
import { loadChores, saveChores, loadMembers, saveMembers } from './storage';
import { getNextOccurrence } from './dateUtils';
import './App.css';

function App() {
  const [chores, setChores] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingChore, setEditingChore] = useState(null);
  const [showMembersPanel, setShowMembersPanel] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  useEffect(() => {
    setChores(loadChores());
    setMembers(loadMembers());
  }, []);

  useEffect(() => {
    saveChores(chores);
  }, [chores]);

  useEffect(() => {
    saveMembers(members);
  }, [members]);

  const addChore = (chore) => {
    const newChore = {
      ...chore,
      id: Date.now().toString(),
    };
    setChores([...chores, newChore]);
    setSelectedDate(null);
  };

  const updateChore = (updatedChore) => {
    setChores(chores.map(c => c.id === updatedChore.id ? updatedChore : c));
    setEditingChore(null);
  };

  const deleteChore = (choreId) => {
    setChores(chores.filter(c => c.id !== choreId));
    setEditingChore(null);
  };

  const completeChore = (chore) => {
    if (chore.recurrence && chore.recurrence !== 'none') {
      const nextDate = getNextOccurrence(chore, chore.date);
      if (nextDate) {
        setChores(chores.map(c =>
          c.id === chore.id ? { ...c, date: nextDate } : c
        ));
      } else {
        setChores(chores.filter(c => c.id !== chore.id));
      }
    } else {
      setChores(chores.filter(c => c.id !== chore.id));
    }
  };

  const addMember = (name) => {
    if (name.trim() && !members.includes(name.trim())) {
      setMembers([...members, name.trim()]);
    }
  };

  const removeMember = (name) => {
    setMembers(members.filter(m => m !== name));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingChore(null);
  };

  const handleChoreClick = (chore) => {
    setEditingChore(chore);
    setSelectedDate(null);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setEditingChore(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Office Chores</h1>
        <button
          className="team-btn"
          onClick={() => setShowMembersPanel(!showMembersPanel)}
        >
          Team ({members.length})
        </button>
      </header>

      <div className="main-content">
        <Calendar
          chores={chores}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onDateClick={handleDateClick}
          onChoreClick={handleChoreClick}
          onCompleteChore={completeChore}
        />

        {showMembersPanel && (
          <TeamMembers
            members={members}
            onAddMember={addMember}
            onRemoveMember={removeMember}
            onClose={() => setShowMembersPanel(false)}
          />
        )}
      </div>

      {selectedDate && (
        <Modal onClose={closeModal}>
          <ChoreForm
            date={selectedDate}
            members={members}
            onSubmit={addChore}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {editingChore && (
        <Modal onClose={closeModal}>
          <ChoreForm
            chore={editingChore}
            members={members}
            onSubmit={updateChore}
            onDelete={() => deleteChore(editingChore.id)}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
