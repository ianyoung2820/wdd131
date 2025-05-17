let tasks = [];

// 1. Render the tasks array into the <ul> as a list of <li>
function renderTasks() {
  const list = document.getElementById('todoList');
  // clear out any existing items
  list.innerHTML = '';

  // build up the new list
  list.innerHTML = tasks
    .map(
      (task) => `
    <li${task.completed ? ' class="strike"' : ''}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>
  `
    )
    .join('');
}

// 2. Grab the input value, push a new task object, then re-render
function newTask() {
  const input = document.getElementById('todo');
  const detail = input.value.trim();
  if (!detail) return;               // bail if the input is empty

  tasks.push({ detail, completed: false });
  input.value = '';                  // clear the box
  renderTasks();                     // show the updated list
}

// 3. Delegate clicks inside the UL to delete or toggle complete
function manageTasks(event) {
  const action = event.target.dataset.action;
  if (!action) return;               // clicked somewhere else

  // find the <li> that this icon lives in
  const taskElement = event.target.closest('li');

  if (action === 'delete') {
    removeTask(taskElement);
  } else if (action === 'complete') {
    completeTask(taskElement);
  }
}

// 4. Wire up the button and the list
document
  .getElementById('submitTask')
  .addEventListener('click', newTask);

document
  .getElementById('todoList')
  .addEventListener('click', manageTasks);
