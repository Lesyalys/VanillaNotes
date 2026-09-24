export default class Modal {
  #root = null;
  #onSubmit;
  #onClose;
  #mode = "create"; // 'create' | 'edit'

  constructor({ onSubmit, onClose }) {
    this.#onSubmit = onSubmit;
    this.#onClose = onClose;
  }

  open({ mode = "create", initialText = "" } = {}) {
    this.#mode = mode;
    if (this.#root) return; // уже открыта

    this.#root = document.createElement("div");
    this.#root.className = "modal";
    this.#root.innerHTML = `
      <div class="modal" id="modal">
  <div class="modal__content">
    <div class="modal__topbar">
      <button class="modal__back" data-action="close" aria-label="Назад">←</button>
      <button class="modal__confirm" data-action="submit" aria-label="Сохранить">✓</button>
    </div>
    <input type="text" class="modal__input" placeholder="Add New Task..." autocomplete="off" />
  </div>
</div>
    `;

    const input = this.#root.querySelector(".modal__input");
    input.value = initialText;
    input.focus();

    this.#root.addEventListener("click", this.#handleClick);
    input.addEventListener("keydown", this.#handleKeydown);

    document.body.appendChild(this.#root);
  }

  close() {
    if (!this.#root) return;
    const input = this.#root.querySelector(".modal__input");
    input?.removeEventListener("keydown", this.#handleKeydown);
    this.#root.removeEventListener("click", this.#handleClick);
    this.#root.remove();
    this.#root = null;
  }

  #handleClick = (e) => {
    const action = e.target.dataset.action;
    if (action === "close") return this.#onClose();

    if (action === "submit") {
      const text = this.#root.querySelector(".modal__input").value.trim();
      if (!text) return;
      this.#onSubmit({ mode: this.#mode, text });
    }
  };

  #handleKeydown = (e) => {
    if (e.key === "Enter") {
      const text = e.currentTarget.value.trim();
      if (!text) return;
      this.#onSubmit({ mode: this.#mode, text });
    }
    if (e.key === "Escape") this.#onClose();
  };
}
