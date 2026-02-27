# Assignment Answer — Problem 5: Task & Time Management Web App

**Course/Assignment:** [Fill in your course name and assignment details]  
**Team:** [Names of 5 team members]  
**Date:** [Submission date]

---

## 1. Problem Statement Addressed

We implemented **Problem 5: Task & Time Management Web App** — a system to organize tasks with deadlines and priorities.

---

## 2. Mandatory Features and How They Were Met

### 2.1 Add / Edit / Delete tasks

- **Add:** A form at the top accepts task title, priority, and due date. On submit, the task is appended to the list and saved to `localStorage`.
- **Edit:** Each task has an “Edit” (✎) button. Clicking it opens a modal with the same fields; saving updates the task and refreshes the list and storage.
- **Delete:** Each task has a “Delete” (🗑) button. Confirmation is shown before removal; the task is then removed from the list and from `localStorage`.

### 2.2 Priority levels

- Four levels: **Low**, **Medium**, **High**, **Urgent**.
- Stored with each task and shown as a badge; list items have a colored left border (e.g. grey for Low, yellow for Medium, red for High/Urgent) for quick scanning.

### 2.3 Due date tracking

- Every task has a **due date** (date input; minimum is today for new tasks).
- Display shows “Today” or “Tomorrow” when applicable, otherwise a short date (e.g. “28 Feb 2025”).
- Tasks that are past due and not completed are visually highlighted (e.g. red “Due: …” text).

### 2.4 Filter tasks (Today / Pending / Completed)

- **All:** Shows every task.
- **Today:** Shows only tasks whose due date is today.
- **Pending:** Shows only tasks that are not completed.
- **Completed:** Shows only tasks that are completed.

Filter is applied client-side; the list updates immediately when the user switches tabs.

### 2.5 Persistent storage

- All tasks are stored in the browser’s **localStorage** under a single key.
- On page load, data is read from `localStorage`, parsed, and rendered.
- Every add, edit, delete, or toggle-complete operation updates `localStorage` immediately so that closing and reopening the page (or the browser) keeps the data.

---

## 3. Technologies Used

- **HTML:** Structure, form elements, modal, list, and basic ARIA attributes for accessibility.
- **CSS:** Custom properties (colors, spacing), Flexbox, responsive layout, dark theme, priority-based styling.
- **JavaScript:** Vanilla JS (no frameworks). Handles:
  - Reading/writing `localStorage`
  - CRUD and filter logic
  - DOM updates (rendering list, showing/hiding empty state and modal)

---

## 4. Deliverables

1. **Answer PDF (this document):** Export this Markdown to PDF (e.g. via VS Code, Pandoc, or any Markdown-to-PDF tool) and submit as the assignment answer.
2. **GitHub repository:** [Insert your repository URL here after uploading.]
3. **Presentation PDF for recruiters:** See `PRESENTATION.md` in the repo; export to PDF and keep it in the repo (and/or attach where required) for recruiters.

---

## 5. How to Run

1. Clone the repository (or download the project folder).
2. Open `index.html` in a modern web browser, or run a local static server (e.g. `npx serve .` or `python3 -m http.server 8000`) and open the URL in the browser.

No installation or build step is required.

---

**Team signatures / names:**  
[Member 1], [Member 2], [Member 3], [Member 4], [Member 5]
