function onAdd() {}
function onConfirmAdd(parent, newTitleInput, newDescInput, taskElement, tasksList) {
  let todo = new Todo(
    parent.personId,
    0,
    newTitleInput.value,
    newDescInput.value,
    parent.todoId
  );

  createTodo(todo).then(res => {
    todo = res;
    removeElement(taskElement);
    createTaskDOM(tasksList, todo, false);
  });
}
function onCancelAdd() {}
function onUpdate(title, description, ...buttons) {
  toggle(title, description, ...buttons);
}

function onConfirmUpdate(task, title, description, oldTask, ...buttons) {
  task.title = title.value;
  task.description = description.value;
  updateTodo(todoDetailToTodo(task))
    .then(() => {
      oldTask.title = task.title;
      oldTask.description = task.description;
      toggle(title, description, ...buttons);
    })
    .catch(exception => {
      task.title = oldTask.title;
      task.description = oldTask.description;
      alert(exception);
    });
}

function onCancelUpdate(title, description, oldTask, ...buttons) {
  title.value = oldTask.title;
  description.value = oldTask.description;
  toggle(title, description, ...buttons);
}

function onRemove() {}

function toggle(title, description, ...buttons) {
  toggleReadOnly(title, description);
  toggleDisplay(...buttons);
}
