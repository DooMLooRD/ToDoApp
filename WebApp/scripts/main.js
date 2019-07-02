let todos = document.getElementById("todos");
let todoDescriptionInput = document.getElementById("todoDescription");
let todoTitleInput = document.getElementById("todoTitle");
let todoBtn = document.getElementById("addTodoButton");
todoBtn.onclick = createToDo;
loadToDos();

function loadToDos() {
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

function addToDo(task) {
  if (task.taskId == null) {
    fetch("https://localhost:44325/api/AddTask", {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
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

  var todoRemoveBtn = document.createElement("button");
  todoRemoveBtn.textContent = "Delete";
  todoRemoveBtn.onclick = function (e) {
    todos.removeChild(todoItem);
    fetch("https://localhost:44325/api/RemoveTask?id=" + task.taskId, {
      method: "delete"
    }).then(response => console.log(response));
  };

  var todoItem = document.createElement("li");
  todoItem.appendChild(todoTitle);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoIsDone);
  todoItem.appendChild(todoRemoveBtn);

  todos.appendChild(todoItem);
}
