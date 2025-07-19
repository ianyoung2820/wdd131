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
  // show up to 5 most recent
  goals.slice(-5).reverse().forEach(g => {
    const li = document.createElement('li');
    li.textContent = `${g.title} (Due: ${new Date(g.dueDate).toLocaleDateString()})`;
    list.appendChild(li);
  });
}

export function setupForm(goals) {
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('openFormBtn');
  const closeBtn = document.getElementById('closeModal');
  const form   = document.getElementById('questForm');

  openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title   = form.title.value.trim();
    const dueDate = form.dueDate.value;
    const points  = form.points.value;

    if (!title) return alert('Please enter a title.');

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
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = g.completed;
    cb.addEventListener('change', () => {
      g.completed = cb.checked;
      saveGoals(goals);
      renderLibrary(goals, filter);
    });

    const spanTitle = document.createElement('span');
    spanTitle.textContent = g.title;
    if (g.completed) spanTitle.classList.add('completed');
    else if (new Date(g.dueDate) < new Date()) spanTitle.classList.add('overdue');

    const spanDue = document.createElement('span');
    spanDue.textContent = `Due: ${new Date(g.dueDate).toLocaleDateString()}`;

    const btnDetail = document.createElement('button');
    btnDetail.textContent = '>';
    btnDetail.addEventListener('click', () => {
      alert(`Details: "${g.title}" due ${spanDue.textContent}`);
    });

    li.append(cb, spanTitle, spanDue, btnDetail);
    list.appendChild(li);
  });
}

export function setupFilters(goals) {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLibrary(goals, btn.dataset.filter);
    });
  });
}
