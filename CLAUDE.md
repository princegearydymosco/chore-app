# Office Chore App

## Project Overview

A client-side office chore management app. Teams can create, assign, and track recurring chores on a calendar interface. All data persists in browser localStorage — there is no backend.

## Tech Stack

- **Runtime:** React 18.2 (hooks-based, no class components)
- **Build:** Create React App (react-scripts 5.0.1)
- **Language:** JavaScript (ES6+) — no TypeScript
- **Styling:** Vanilla CSS, colocated per-component files
- **State:** React useState/useEffect, props drilling
- **Persistence:** Browser localStorage

## Project Structure

```
src/
  App.js            — Root container; owns all state and business logic
  index.js          — Entry point (React 18 createRoot API)
  storage.js        — localStorage read/write helpers
  dateUtils.js      — Date formatting, parsing, recurrence calculation
  components/
    Calendar.js     — Month grid with chore display and navigation
    ChoreForm.js    — Create/edit form (dual-mode via props)
    Modal.js        — Generic overlay wrapper
    TeamMembers.js  — Member list with add/remove
public/
  index.html        — Single HTML shell
```

## Build & Run Commands

| Command         | Purpose                                    |
|-----------------|--------------------------------------------|
| `npm start`     | Dev server (default port 3000)             |
| `npm run build` | Production build to `/build`               |

No test runner is configured. Jest and React Testing Library are available via react-scripts but no test files exist.

## Data Model

A chore object has: `id` (timestamp string), `title`, `assignee`, `date` (ISO YYYY-MM-DD), and `recurrence` (`none` | `daily` | `weekly` | `monthly`). See src/App.js:16-22 for creation and src/dateUtils.js:28-48 for recurrence logic.

## Key Conventions

- All application state lives in App.js and flows down via props; child components communicate back through callback props.
- localStorage keys: `office-chores`, `office-members` (src/storage.js:1-2).
- Dates are always stored and compared as ISO strings (YYYY-MM-DD).
- Completing a recurring chore reschedules it to the next occurrence; completing a non-recurring chore deletes it (src/App.js:62-78).

## Additional Documentation

- [Architectural Patterns](.claude/docs/architectural_patterns.md) — Component architecture, data flow, state management, and recurring design decisions
