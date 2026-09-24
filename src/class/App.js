import StateMachine from "./StateMachine.js";
import TodoList from "./TodoList.js";
import Storage from "./Storage.js";

import { STATES } from "../constant/states.js";
import { layout } from "../pages/layout.js";
import { views } from "../pages/views.js";

import Modal from "../components/Modal.js";
import TaskList from "../components/TaskList.js";
import EmptyState from "../components/EmptyState.js";

export default class App {
  #fsm = new StateMachine();
  #todo = new TodoList();
  #storage = new Storage("todo");

  #root;
  #slot;
  #editingId = null;

  #modal;
  #taskList;
  #emptyState = new EmptyState();

  constructor(rootSelector) {
    this.#root = document.getElementById(rootSelector);

    this.#modal = new Modal({
      onSubmit: ({ mode, text }) => this.#handleModalSubmit(mode, text),
      onClose: () => this.closeModal(),
    });

    this.#taskList = new TaskList({
      onToggle: (id) => this.setDone(id),
      onDelete: (id) => this.deleteItem(id),
      onEdit: (id) => this.#openEdit(id),
    });

    this.#fsm.subscribe((state) => this.#onStateChange(state));

    this.#loadFromStorage();
  }

  init() {
    this.#root.innerHTML = layout;
    console.log(this.#root);
    this.#slot = this.#root.querySelector("#slot");

    this.#root
      .querySelector("#open-modal")
      .addEventListener("click", () => this.openModal());

    const initial = this.#todo.isEmpty() ? STATES.IDLE : STATES.HAS_TASKS;
    this.#fsm.transition(initial);
  }

  openModal() {
    this.#fsm.transition(STATES.CREATING);
    this.#modal.open({ mode: "create" });
  }

  closeModal() {
    this.#modal.close();
    this.#editingId = null;
    const next = this.#todo.isEmpty() ? STATES.IDLE : STATES.HAS_TASKS;
    this.#fsm.transition(next);
  }

  createTask() {
    this.#modal.open({ mode: "create" });
  }

  deleteItem(id) {
    this.#todo.deleteItem(id);
    this.#saveToStorage();

    if (this.#todo.isEmpty()) {
      this.#fsm.transition(STATES.IDLE);
    } else {
      this.#taskList.render(this.#todo.tasks);
    }
  }

  setDone(id) {
    this.#todo.setDone(id);
    this.#saveToStorage();
    this.#taskList.render(this.#todo.tasks);
  }

  renderTodoList() {
    if (this.#todo.isEmpty()) {
      this.#emptyState.render(this.#slot);
      this.#taskList.destroy();
    } else {
      this.#slot.innerHTML = views.list;
      this.#taskList.mount(this.#slot.querySelector("#todo-list"));
      this.#taskList.render(this.#todo.tasks);
    }
  }

  #openEdit(id) {
    const task = this.#todo.find(id);
    if (!task) return;

    this.#editingId = id;
    this.#fsm.transition(STATES.EDITING);
    this.#modal.open({ mode: "edit", initialText: task.text });
  }

  #handleModalSubmit(mode, text) {
    if (mode === "create") {
      this.#todo.createTask({ text });
    } else {
      this.#todo.updateText(this.#editingId, text);
      this.#editingId = null;
    }
    this.#saveToStorage();
    this.#modal.close();

    this.#fsm.transition(STATES.HAS_TASKS); // это перерисует слот
  }

  #onStateChange(state) {
    this.#root.dataset.state = state;

    if (state === STATES.IDLE) {
      this.#taskList.destroy();
      this.#emptyState.render(this.#slot);
    }

    if (state === STATES.HAS_TASKS) {
      this.#slot.innerHTML = views.list;
      this.#taskList.mount(this.#slot.querySelector("#todo-list"));
      this.#taskList.render(this.#todo.tasks);
    }
  }

  #saveToStorage() {
    this.#storage.setItem("tasks", this.#todo.tasks);
  }

  #loadFromStorage() {
    const tasks = this.#storage.getItem("tasks") || [];
    tasks.forEach((t) => this.#todo.createTask(t));
  }
}
