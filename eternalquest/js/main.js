// js/main.js
import { getGoals } from './data.js';
import {
  renderStats,
  renderPreview,
  setupForm,
  renderLibrary,
  setupFilters
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const goals = getGoals();

  // Home page widgets (no-ops on library.html)
  renderStats(goals);
  renderPreview(goals);
  setupForm(goals);

  // Quest Library page
  if (document.getElementById('questList')) {
    renderLibrary(goals);
    setupFilters(goals);
  }
});
