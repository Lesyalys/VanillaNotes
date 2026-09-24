export default class Storage {
  #prefix;
  constructor(prefix = "todo") {
    this.#prefix = prefix;
  }

  #key(k) {
    return `${this.#prefix}:${k}`;
  }

  setItem(key, value) {
    try {
      localStorage.setItem(this.#key(key), JSON.stringify(value));
    } catch (e) {
      console.error("[Storage.setItem]", e);
    }
  }

  getItem(key) {
    const raw = localStorage.getItem(this.#key(key));
    if (raw === null) return null;

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(
        `[Storage.getItem] Битые данные по ключу "${key}", удаляю`,
        raw,
      );
      this.removeItem(key);
      return null;
    }
  }

  removeItem(key) {
    localStorage.removeItem(this.#key(key));
  }

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(`${this.#prefix}:`))
      .forEach((k) => localStorage.removeItem(k));
  }

  key(index) {
    return localStorage.key(index);
  }

  get length() {
    return Object.keys(localStorage).filter((k) =>
      k.startsWith(`${this.#prefix}:`),
    ).length;
  }
}
