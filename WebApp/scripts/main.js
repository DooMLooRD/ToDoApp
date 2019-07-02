let todos = document.getElementById("todos");
let todoDescriptionInput = document.getElementById("todoDescription");
let todoTitleInput = document.getElementById("todoTitle");
let todoBtn = document.getElementById("addTodoButton");
todoBtn.onclick = createToDo;
loadToDos();

function loadToDos() {
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild);
  }
  fetch("https://localhost:44325/api/Tasks")
    .then(resp => resp.json())
    .then(resp => {
      resp.forEach(task => {
        addToDo(task);
      });
    });
}

function createToDo() {
  var todoDesc = todoDescriptionInput.value;
  todoDescriptionInput.value = "";
  var todoTitle = todoTitleInput.value;
  todoTitleInput.value = "";
  addToDo({
    title: todoTitle,
    description: todoDesc,
    isDone: false
  });
}



function deleteToDo(id) {
  fetch("https://localhost:44325/api/RemoveTask?id=" + id, {
    method: "delete"
  }).then(() => loadToDos());
}
function addToDo(task) {
  if (task.taskId == null) {
    fetch("https://localhost:44325/api/AddTask", {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json()).then(res => {
        task.taskId = res.taskId;
      });
  }
  var todoText = document.createElement("span");
  todoText.textContent = task.description;
  var todoTitle = document.createElement("span");
  todoTitle.textContent = task.title;
  var todoIsDone = document.createElement("input");
  todoIsDone.type = "checkbox";
  todoIsDone.name = "todoIsDone";
  todoIsDone.value = task.isDone;
  todoIsDone.id = "todoIsDone";
  todoIsDone.contentEditable = false;
  var todoEditBtn = document.createElement("button");
  todoEditBtn.textContent = "Edit";
  todoEditBtn.onclick = function () { deleteToDo(task.taskId); }
  var todoRemoveBtn = document.createElement("button");
  todoRemoveBtn.textContent = "Delete";
  todoRemoveBtn.onclick = function () { deleteToDo(task.taskId); }
  var todoItem = document.createElement("li");
  todoItem.appendChild(todoTitle);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoIsDone);
  todoItem.appendChild(todoEditBtn);
  todoItem.appendChild(todoRemoveBtn);

  todos.appendChild(todoItem);
}
