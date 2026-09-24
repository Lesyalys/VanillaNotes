export default class TodoList {
  #tasks = [];

  constructor(initialTask = []) {
    this.#tasks = initialTask;
  }

  get tasks() {
    return this.#tasks;
  }

  createTask({ text, id = crypto.randomUUID(), done = false }) {
    const task = { id, text, done: false, createdAt: Date.now() };
    this.#tasks.push(task);
    return task;
  }

  deleteItem(id) {
    this.#tasks = this.#tasks.filter((e) => e.id !== id);
  }

  setDome(id) {
    const task = this.#tasks.find((e) => e.id === id);
    if (task) task.done = !task.done;
    return task;
  }

  updateText(id, text) {
    const task = this.#tasks.find((e) => e.id === id);
    if (task) task.text = text;
    return task;
  }

  find(id) {
    return this.#tasks.find((e) => e.id === id);
  }

  setDone(id) {
    const task = this.find(id);
    if (task) task.done = !task.done;
    return task;
  }

  isEmpty() {
    return this.#tasks.length === 0;
  }
}
