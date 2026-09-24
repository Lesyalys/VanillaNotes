import { views } from "../pages/views.js";

export default class EmptyState {
  render(container) {
    container.innerHTML = views.empty;
  }
}
