# Architectural Patterns

## Component Architecture

**Container/Presentational split.** App.js is the single container component — it owns all state (6 useState hooks) and all mutation logic. The four components under `src/components/` are purely presentational: they receive data and callbacks via props and render UI.

- Container: src/App.js
- Presentational: src/components/Calendar.js, ChoreForm.js, Modal.js, TeamMembers.js

**Composition over configuration.** Modal.js is a generic wrapper that accepts `children`. ChoreForm is rendered inside Modal, keeping layout concerns separate from form logic. See src/App.js:130-140.

## State Management

**Centralized state with props drilling.** All state lives in App.js and is passed down. There is no Context API, Redux, or other state library. This works because the component tree is shallow (max 2 levels deep).

State variables (src/App.js:8-13):
- `chores` — array of chore objects
- `members` — array of member name strings
- `selectedDate` — date string or null (controls modal open)
- `editingChore` — chore object or null (controls edit mode)
- `showMembersPanel` — boolean toggle
- `currentMonth` — `{year, month}` object for calendar navigation

**Immutable updates.** State changes always produce new arrays/objects (filter, map, spread). No in-place mutation.

## Persistence Pattern

**useEffect-driven auto-save.** Two effects in App.js watch `chores` and `members` arrays. When either changes, the corresponding save function writes to localStorage. On mount, initial state is loaded from localStorage. See src/App.js:15-28.

**Storage abstraction.** src/storage.js wraps all localStorage access behind named functions with try-catch error handling, keeping serialization details out of components.

localStorage keys:
- `office-chores` — JSON array of chore objects
- `office-members` — JSON array of strings

## Data Flow

```
User interaction (click/submit)
  → Callback prop fires in child component
  → App.js handler updates state (useState setter)
  → React re-renders affected components
  → useEffect detects state change → localStorage sync
```

## Form Pattern

**Dual-mode forms.** ChoreForm handles both creation and editing through the same component. The presence of a `chore` prop (src/components/ChoreForm.js:4) determines the mode:
- Create mode: empty defaults, "Add Chore" button, no delete
- Edit mode: pre-filled fields, "Save" button, delete button visible

Form state is managed with local useState hooks, initialized from props on mount (src/components/ChoreForm.js:5-9).

## Modal Pattern

**Controlled visibility.** Modal rendering is conditional on parent state (`selectedDate !== null`). The modal closes via:
- Backdrop click (handled by comparing event target, src/components/Modal.js:5-9)
- Cancel/submit actions within the form

## Recurring Chore Pattern

When a chore is completed (src/App.js:62-78):
1. If `recurrence === 'none'` → chore is deleted (filtered out)
2. If recurring → `getNextOccurrence()` calculates the next date, and the chore's date is updated in place (via map producing a new array)

Recurrence calculation (src/dateUtils.js:28-48):
- `daily` → +1 day
- `weekly` → +7 days
- `monthly` → +1 month (using Date's auto-overflow for short months)

## CSS Conventions

- One CSS file per component, colocated in the same directory
- No CSS modules or CSS-in-JS — plain class selectors
- Calendar uses CSS Grid (7-column layout)
- Forms and headers use Flexbox
- Modal uses fixed positioning with semi-transparent backdrop
- Color palette: blues for interactive elements (#2563eb primary), grays for structure, red (#d32f2f) for destructive actions
