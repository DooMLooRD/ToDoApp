const todosTable = document.getElementById("todosTable");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addToDoButton");
todoBtn.onclick = addToDo;
loadToDos();

function loadToDos() {
    fetch("https://localhost:44325/api/Tasks")
        .then(resp => resp.json())
        .then(resp => {
            resp.forEach(task => {
                createToDoElement(task);
            });
        });
}

function addToDo() {
    const todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = "";
    const todoTitle = todoTitleInput.value;
    todoTitleInput.value = "";
    createToDoElement({
        title: todoTitle,
        description: todoDesc,
        isDone: false
    });
}

function deleteToDo(id, todoItem) {
    const i = todoItem.parentNode.parentNode.rowIndex;
    todosTable.deleteRow(i);
    fetch("https://localhost:44325/api/RemoveTask?id=" + id, {
        method: "delete"
    });
}

function createToDoElement(task) {
    if (task.todoId == null) {
        fetch("https://localhost:44325/api/AddTask", {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json()).then(res => {
                task.todoId = res.todoId;
            });
    }
    const row = todosTable.insertRow(-1);
    const description = row.insertCell(0);
    const title = row.insertCell(1);
    const isDone = row.insertCell(2);
    const updateBtn = row.insertCell(3);
    const removeBtn = row.insertCell(4);
    description.innerHTML = task.description;

    title.innerHTML = task.title;

    const todoIsDone = document.createElement("input");
    todoIsDone.type = "checkbox";
    todoIsDone.name = "todoIsDone";
    todoIsDone.value = task.isDone;
    todoIsDone.id = "todoIsDone";
    todoIsDone.contentEditable = false;
    isDone.appendChild(todoIsDone);

    const todoEditBtn = document.createElement("button");
    todoEditBtn.textContent = "Edit";
    todoEditBtn.onclick = function() { deleteToDo(task.todoId); }
    updateBtn.appendChild(todoEditBtn);
    const todoRemoveBtn = document.createElement("button");
    todoRemoveBtn.textContent = "Delete";
    todoRemoveBtn.onclick = function() { deleteToDo(task.todoId, row); }
    removeBtn.appendChild(todoRemoveBtn);

}