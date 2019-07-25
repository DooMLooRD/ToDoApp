const todoApiUrl = "https://localhost:44325/api/";
const addTodoUrl = todoApiUrl + "AddTask";
const updateTodoUrl = todoApiUrl + "UpdateTask";
const removeTodoUrl = todoApiUrl + "RemoveTask";
const getAllTodoUrl = todoApiUrl + "Tasks";
const getAllPersonUrl = todoApiUrl + "persons";

function createTodo(todo) {
  return fetch(addTodoUrl, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" }
  }).then(resp => resp.json());
}

function updateTodo(todo) {
  return fetch(updateTodoUrl + "?id=" + todo.todoId, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" }
  }).then(resp => resp.json());
}

function removeTodo(id) {
  return fetch(removeTodoUrl + "?id=" + id, {
    method: "delete"
  });
}

function getAllTodos() {
  return fetch(getAllTodoUrl).then(resp => resp.json());
}

function getAllPerson() {
  return fetch(getAllPersonUrl).then(resp => resp.json());
}
