// Создать функции:
// openModal() - отображение экрана создания записи.
// createTask() - создание записи и помещение ее в массив, очистка поля ввода и скрытие экрана создания записи.
// closeModal() - скрытие экрана создания записи.
// deleteItem(id) - удаление элемента с уникальным id.
// setDone(id) - изменение статуса записи на выполнено\не выполнено.
// renderTodoList() - отображение элементов списка.

export default class ToDoList {
  constructor() {
    this.localStorage = localStorage.getItem("todoList");
  }

  openModal() {}
  createTask() {}
  closeModal() {}
  deleteItem() {}
  setDone() {}
  renderTodoList() {}
}
