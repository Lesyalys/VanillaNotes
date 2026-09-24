export default class Storage {
  #prefix;

  constructor(prefix = "todo") {
    this.#prefix = prefix;
  }

  #key(key) {
    return `${this.#prefix}:${key}`;
  }

  setItem(key, value) {
    localStorage.setItem(this.#key(key), value, JSON.stringify(value));
  }

  getItem(key) {
    const raw = localStorage.getItem(this.#key(key));
    return raw ? JSON.parse(raw) : null;
  }

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(`${this.#prefix}:`))
      .forEach((k) => localStorage.removeItem(k));
  }

  key(index) {
    return localStorage.key(index);
  }

  getLenght() {
    return Object.keys(localStorage).filter((k) =>
      k.startsWith(`${this.#prefix}:`),
    ).length;
  }
}
