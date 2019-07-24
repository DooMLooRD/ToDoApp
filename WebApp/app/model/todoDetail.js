class TodoDetail {
  constructor(
    todoId,
    title,
    description,
    isDone,
    personId,
    parentId,
    personFullName,
    todos
  ) {
    this.todoId = todoId;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.personId = personId;
    this.parentId = parentId;
    this.personFullName = personFullName;
    this.todos = todos;
  }
}
