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
  })
    .then(resp => resp.json())
    .catch(() => alert("Couldn't create Todo"));
}

function updateTodo(todo) {
  return fetch(updateTodoUrl + "?id=" + todo.todoId, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" }
  })
    .then(resp => resp.json())
    .catch(() => alert("Couldn't update Todo"));
}

function removeTodo(id) {
  return fetch(removeTodoUrl + "?id=" + id, {
    method: "delete"
  }).catch(() => alert("Couldn't remove Todo"));
}

function getAllTodos() {
  return fetch(getAllTodoUrl)
    .then(resp => resp.json())
    .catch(() => alert("Couldn't load Todos"));
}

function getAllPerson() {
  return fetch(getAllPersonUrl)
    .then(resp => resp.json())
    .catch(() => alert("Couldn't load resources"));
}
