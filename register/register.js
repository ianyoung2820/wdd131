import { participantTemplate, successTemplate } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
  let participantCount = 1;
  const addBtn    = document.getElementById('add');
  const form      = document.getElementById('registrationForm');
  const summaryEl = document.getElementById('summary');

  // hide until after submit
  summaryEl.style.display = 'none';

  // Add Participant
  addBtn.addEventListener('click', e => {
    e.preventDefault();
    participantCount++;
    addBtn.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
  });

  // Sum Fees
  function totalFees() {
    return Array.from(document.querySelectorAll('[id^=fee]'))
                .reduce((sum, input) => sum + Number(input.value || 0), 0);
  }

  // Submit Handler
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('adult_name').value.trim();
    const total = totalFees();

    form.style.display      = 'none';
    summaryEl.innerHTML     = successTemplate({ name, count: participantCount, total });
    summaryEl.style.display = 'block';
  });
});
