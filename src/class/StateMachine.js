import { STATES, TRANSITION } from "./constant/states.js";

export default class StateMachine {
  #state = STATES.IDLE;
  #listeners = [];

  get state() {
    return this.#state;
  }

  subscribe(cb) {
    this.#listeners.push(cb);
  }

  transition(next) {
    const allowed = TRANSITION[this.#state] || [];
    if (!allowed.includes(next)) {
      throw new Error(`Недопустимый переход: ${this.#state} - ${next}`);
    }
    this.#state = next;
    this.#listeners.forEach((cb) => cb(next));
  }

  is(state) {
    return this.#state === state;
  }
}
