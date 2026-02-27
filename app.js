/**
 * Task & Time Management - Frontend logic
 * Uses localStorage for persistent storage. No backend required.
 */

const STORAGE_KEY = 'time_mgmt_tasks';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskTitle = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const taskDue = document.getElementById('task-due');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editId = document.getElementById('edit-id');
const editTitle = document.getElementById('edit-title');
const editPriority = document.getElementById('edit-priority');
const editDue = document.getElementById('edit-due');

let tasks = [];
let currentFilter = 'all';

// Set minimum due date to today for new tasks
function setMinDueDate() {
  const today = new Date().toISOString().slice(0, 10);
  taskDue.min = today;
  if (editDue) editDue.min = today;
}
setMinDueDate();

// Load tasks from localStorage
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    tasks = [];
  }
  return tasks;
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  renderTasks();
}

// Check if a date is today (local date)
function isToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr === today;
}

// Check if due date is in the past
function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr < today;
}

// Filter tasks by current filter
function getFilteredTasks() {
  const todayStr = new Date().toISOString().slice(0, 10);
  switch (currentFilter) {
    case 'today':
      return tasks.filter(t => isToday(t.dueDate));
    case 'pending':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    default:
      return [...tasks];
  }
}

// Add task
function addTask(title, priority, dueDate) {
  const id = 'task_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  tasks.push({
    id,
    title: title.trim(),
    priority: priority || 'medium',
    dueDate: dueDate || new Date().toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date().toISOString()
  });
  saveTasks();
}

// Update task
function updateTask(id, payload) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return;
  tasks[index] = { ...tasks[index], ...payload };
  saveTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
}

// Toggle completed
function toggleCompleted(id) {
  const t = tasks.find(t => t.id === id);
  if (t) {
    t.completed = !t.completed;
    saveTasks();
  }
}

// Open edit modal
function openEditModal(task) {
  editId.value = task.id;
  editTitle.value = task.title;
  editPriority.value = task.priority;
  editDue.value = task.dueDate;
  editModal.hidden = false;
  editTitle.focus();
}

// Close edit modal
function closeEditModal() {
  editModal.hidden = true;
}

// Format date for display
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateStr === today.toISOString().slice(0, 10)) return 'Today';
  if (dateStr === tomorrow.toISOString().slice(0, 10)) return 'Tomorrow';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

// Build one task list item element
function buildTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '') + ' priority-' + task.priority;
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', 'Mark as ' + (task.completed ? 'incomplete' : 'complete'));
  checkbox.addEventListener('change', () => toggleCompleted(task.id));

  const content = document.createElement('div');
  content.className = 'task-content';

  const titleEl = document.createElement('p');
  titleEl.className = 'task-title';
  titleEl.textContent = task.title;

  const meta = document.createElement('div');
  meta.className = 'task-meta';

  const prioritySpan = document.createElement('span');
  prioritySpan.className = 'task-priority ' + task.priority;
  prioritySpan.textContent = task.priority;

  const dueSpan = document.createElement('span');
  dueSpan.className = 'task-due' + (isOverdue(task.dueDate) && !task.completed ? ' overdue' : '');
  dueSpan.textContent = 'Due: ' + formatDisplayDate(task.dueDate);
  dueSpan.title = task.dueDate;

  meta.append(prioritySpan, dueSpan);
  content.append(titleEl, meta);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'btn btn-icon';
  editBtn.setAttribute('aria-label', 'Edit task');
  editBtn.textContent = '✎';
  editBtn.addEventListener('click', () => openEditModal(task));

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-icon danger';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.textContent = '🗑';
  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this task?')) deleteTask(task.id);
  });

  actions.append(editBtn, deleteBtn);
  li.append(checkbox, content, actions);
  return li;
}

// Render task list based on current filter
function renderTasks() {
  const filtered = getFilteredTasks();
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  filtered.forEach(task => {
    taskList.appendChild(buildTaskElement(task));
  });
}

// Filter tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderTasks();
  });
});

// Submit new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDue.value;
  if (!title || !dueDate) return;
  addTask(title, priority, dueDate);
  taskForm.reset();
  setMinDueDate();
  taskTitle.focus();
});

// Submit edit
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = editId.value;
  const title = editTitle.value.trim();
  const priority = editPriority.value;
  const dueDate = editDue.value;
  if (!id || !title || !dueDate) return;
  updateTask(id, { title, priority, dueDate });
  closeEditModal();
});

// Cancel edit
document.querySelector('.cancel-edit')?.addEventListener('click', closeEditModal);
editModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeEditModal);

// Escape to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !editModal.hidden) closeEditModal();
});

// Init
loadTasks();
renderTasks();
