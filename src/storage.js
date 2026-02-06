const CHORES_KEY = 'office-chores';
const MEMBERS_KEY = 'office-members';

export function loadChores() {
  try {
    const data = localStorage.getItem(CHORES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveChores(chores) {
  localStorage.setItem(CHORES_KEY, JSON.stringify(chores));
}

export function loadMembers() {
  try {
    const data = localStorage.getItem(MEMBERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMembers(members) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}
