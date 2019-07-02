const todos = document.getElementById("todos");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");
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
    const todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = "";
    const todoTitle = todoTitleInput.value;
    todoTitleInput.value = "";
    addToDo({
        title: todoTitle,
        description: todoDesc,
        isDone: false
    });
}

function deleteToDo(id, todoItem) {
    todos.removeChild(todoItem);
    fetch("https://localhost:44325/api/RemoveTask?id=" + id, {
        method: "delete"
    });
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

    const todoText = document.createElement("span");
    todoText.textContent = task.description;

    const todoTitle = document.createElement("span");
    todoTitle.textContent = task.title;

    const todoIsDone = document.createElement("input");
    todoIsDone.type = "checkbox";
    todoIsDone.name = "todoIsDone";
    todoIsDone.value = task.isDone;
    todoIsDone.id = "todoIsDone";
    todoIsDone.contentEditable = false;

    const todoEditBtn = document.createElement("button");
    todoEditBtn.textContent = "Edit";
    todoEditBtn.onclick = function() { deleteToDo(task.taskId); }

    const todoRemoveBtn = document.createElement("button");
    todoRemoveBtn.textContent = "Delete";
    todoRemoveBtn.onclick = function() { deleteToDo(task.taskId, todoItem); }

    const todoItem = document.createElement("li");
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoIsDone);
    todoItem.appendChild(todoEditBtn);
    todoItem.appendChild(todoRemoveBtn);

    todos.appendChild(todoItem);
}