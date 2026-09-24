import TaskItem from "./TaskItem.js";

export default class TaskList {
  #container;
  #onToggle;
  #onDelete;
  #onEdit;

  constructor({ onToggle, onDelete, onEdit }) {
    this.#onToggle = onToggle;
    this.#onDelete = onDelete;
    this.#onEdit = onEdit;
  }

  mount(container) {
    this.#container = container;
    this.#container.addEventListener("click", this.#handleClick);
  }

  #handleClick = (e) => {
    const li = e.target.closest("[data-id]");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.matches(".task__checkbox")) this.#onToggle(id);
    if (e.target.matches(".task__delete")) this.#onDelete(id);
    if (e.target.matches(".task__edit")) this.#onEdit(id);
  };

  render(tasks) {
    if (!this.#container) return;
    this.#container.innerHTML = "";
    tasks.forEach((task) => {
      const node = new TaskItem(task).render();
      this.#container.appendChild(node);
    });
  }

  destroy() {
    this.#container?.removeEventListener("click", this.#handleClick);
    this.#container = null;
  }
}
