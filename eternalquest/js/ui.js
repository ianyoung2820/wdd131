// js/ui.js
import Goal from './goal.js';
import { getGoals, saveGoals } from './data.js';

export function renderStats(goals) {
  const completed = goals.filter(g => g.completed).length;
  const totalPoints = goals
    .filter(g => g.completed)
    .reduce((sum, g) => sum + g.points, 0);

  document.getElementById('completedCount').textContent = completed;
  document.getElementById('totalPoints').textContent = totalPoints;
}

export function renderPreview(goals) {
  const list = document.getElementById('previewList');
  if (!list) return;
  list.innerHTML = '';
  goals
    .slice(-5)           // last 5 quests
    .reverse()
    .forEach(g => {
      const li = document.createElement('li');
      li.textContent = `${g.title} (Due: ${new Date(g.dueDate).toLocaleDateString()})`;
      list.appendChild(li);
    });
}

export function setupForm(goals) {
  const modal    = document.getElementById('modal');
  const openBtn  = document.getElementById('openFormBtn');
  const closeBtn = document.getElementById('closeModal');
  const form     = document.getElementById('questForm');

  if (!modal || !openBtn || !closeBtn || !form) {
    console.error('Modal setup failed—missing elements:', { modal, openBtn, closeBtn, form });
    return;
  }

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title   = form.title.value.trim();
    const dueDate = form.dueDate.value;
    const points  = form.points.value;

    if (!title) {
      alert('Please enter a title.');
      return;
    }

    const newQuest = new Goal(title, dueDate, points);
    goals.push(newQuest);
    saveGoals(goals);

    renderStats(goals);
    renderPreview(goals);

    form.reset();
    modal.classList.add('hidden');
  });
}

export function renderLibrary(goals, filter = 'all') {
  const list = document.getElementById('questList');
  if (!list) return;
  list.innerHTML = '';

  let filtered = goals;
  if (filter === 'active')    filtered = goals.filter(g => !g.completed);
  if (filter === 'completed') filtered = goals.filter(g => g.completed);

  filtered.forEach(g => {
    const li = document.createElement('li');

    // checkbox
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = g.completed;
    cb.addEventListener('change', () => {
      g.completed = cb.checked;
      saveGoals(goals);
      renderLibrary(goals, filter);
    });

    // title
    const spanTitle = document.createElement('span');
    spanTitle.textContent = g.title;
    if (g.completed)      spanTitle.classList.add('completed');
    else if (new Date(g.dueDate) < new Date()) spanTitle.classList.add('overdue');

    // due date
    const spanDue = document.createElement('span');
    spanDue.textContent = `Due: ${new Date(g.dueDate).toLocaleDateString()}`;

    // detail button
    const btnDetail = document.createElement('button');
    btnDetail.textContent = '>';
    btnDetail.addEventListener('click', () => {
      alert(`"${g.title}" is due ${spanDue.textContent}`);
    });

    li.append(cb, spanTitle, spanDue, btnDetail);
    list.appendChild(li);
  });
}

export function setupFilters(goals) {
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLibrary(goals, btn.dataset.filter);
    });
  });
}
