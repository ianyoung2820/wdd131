// js/goal.js
export default class Goal {
  constructor(title, dueDate, points, id = Date.now(), completed = false) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;       // ISO string from <input type="date">
    this.points = Number(points);
    this.completed = completed;
  }
}
