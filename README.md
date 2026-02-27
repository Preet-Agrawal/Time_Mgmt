# Task & Time Management Web App

**Problem 5** — A task management system that helps users organize tasks with deadlines and priorities. Built with HTML, CSS, and JavaScript; no backend required. Data persists in the browser via `localStorage`.

## Features

| Requirement | Implementation |
|-------------|----------------|
| **Add / Edit / Delete tasks** | Form to add; edit via modal; delete with confirmation. |
| **Priority levels** | Low, Medium, High, Urgent — with visual styling. |
| **Due date tracking** | Date picker, “Today”/“Tomorrow” labels, overdue highlighting. |
| **Filter tasks** | **Today** — due today; **Pending** — not completed; **Completed** — done. |
| **Persistent storage** | All tasks saved in `localStorage` and restored on load. |

## Run locally

1. Clone the repo (or download the project).
2. Open `index.html` in a browser, or serve the folder with a local server, e.g.:
   - `npx serve .`
   - `python3 -m http.server 8000` then open `http://localhost:8000`

No build step or dependencies required.

## Project structure

```
time_mgmt/
├── index.html    # Markup, form, filters, task list, edit modal
├── styles.css    # Layout, theming, priority styles, responsive
├── app.js        # CRUD, filters, localStorage, DOM updates
├── README.md
├── ASSIGNMENT_ANSWER.md   # Source for Answer PDF
├── PRESENTATION.md              # Source for recruiter Presentation PDF
└── PRESENTATION_FOR_RECRUITERS.html  # Open in browser → Print → Save as PDF
```

## Tech stack

- **HTML5** — Semantics, form controls, `aria-*` for accessibility.
- **CSS3** — Custom properties, Flexbox, responsive layout, dark theme.
- **JavaScript (ES6+)** — No frameworks; vanilla JS for data and DOM.

## Browser support

Works in modern browsers that support `localStorage`, `querySelector`, and standard DOM APIs (e.g. Chrome, Firefox, Safari, Edge).

---

*Assignment: Problem 5 — Task & Time Management. Team project (self-selected team of five).*
