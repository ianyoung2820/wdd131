// Templates.js

/**
 * Returns the HTML string for a participant section,
 * with all IDs suffixed by the given count.
 */
export function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}">First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" required />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" min="0" value="0" required />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date<span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" required />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}" name="grade${count}" required>
        <option disabled selected value=""></option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  </section>`;
}

/**
 * Returns the HTML string for the post‐submit success message,
 * given the registrant name, participant count, and total fees.
 */
export function successTemplate({ name, count, total }) {
  return `
    <p>
      Thank you <strong>${name}</strong> for registering.
      You have registered <strong>${count}</strong> participants
      and owe <strong>$${total.toFixed(2)}</strong> in fees.
    </p>`;
}
