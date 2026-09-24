export default class TaskItem {
  #task;
  #el;

  constructor(task) {
    this.#task = task;
  }

  render() {
    const li = document.createElement("li");
    console.log(this.#task);
    li.className = `task ${this.#task.done ? "task--done" : ""}`;
    li.dataset.id = this.#task.id;

    li.innerHTML = `
      <input type="checkbox" class="task__checkbox" ${this.#task.done ? "checked" : ""} />
      <span class="task__text"></span>
      <img class="task__edit" src="./src/image/edit.png" alt="edit" />
      <button class="task__delete" title="Удалить">✖</button>
    `;

    li.querySelector(".task__text").textContent = this.#task.text;

    this.#el = li;
    return li;
  }
}
