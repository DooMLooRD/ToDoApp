class Todo {
  constructor(personId, todoId, title, description, parentId) {
    this.personId = personId;
    this.todoId = todoId;
    this.title = title;
    this.isDone = false;
    this.description = description;
    this.parentId = parentId;
  }
}
