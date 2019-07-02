const todosTable = document.getElementById("todosTable");
const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addToDoButton");
todoBtn.onclick = addToDo;
loadToDos();

function loadToDos() {
    createToDoElement(createTodo("assigned_" + 0, 0, "title_" + 0, "description_" + 0, null));

    // for (let i = 0; i < 4; i += 2) {
    //     createToDoElement(createTodo("assigned_" + i + 1, i + 1, "title_" + i + 1, "description_" + i + 1, i));
    //     createToDoElement(createTodo("assigned_" + i + 2, i + 2, "title_" + i + 1, "description_" + i + 2, i));
    // }
    // fetch("https://localhost:44325/api/Tasks")
    //     .then(resp => resp.json())
    //     .then(resp => {
    //         resp.forEach(task => {
    //             createToDoElement(task);
    //         });
    //     });
}

function addToDo() {
    const todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = "";
    const todoTitle = todoTitleInput.value;
    todoTitleInput.value = "";
    const todoAssigned = todoAssignedInput.value;
    todoAssignedInput.value = "";
    createToDoElement({
        assigned: todoAssigned,
        title: todoTitle,
        description: todoDesc,
        isDone: false,
        parentId: null
    });
}

function deleteToDo(id, todoItem) {
    const i = todoItem.parentNode.parentNode.rowIndex;
    todosTable.deleteRow(i);
    fetch("https://localhost:44325/api/RemoveTask?id=" + id, {
        method: "delete"
    });
}

function updateToDo(task) {
    const editDiv = document.createElement("div");
    const newTitleInput = document.createElement("input");
    const newDescInput = document.createElement("input");
    const saveBtn = document.createElement("button");
    newTitleInput.value = task.title;
    newDescInput.value = task.description;
    saveBtn.textContent = "Save";
    editDiv.appendChild(newTitleInput);
    editDiv.appendChild(newDescInput);
    editDiv.appendChild(saveBtn);
    todoEditBtn.parentNode.appendChild(editDiv);
    saveBtn.onclick = function() {
        title.innerHTML = newTitleInput.value;
        description.innerHTML = newDescInput.value;
        task.title = newTitleInput.value;
        task.description = newDescInput.value;
        fetch("https://localhost:44325/api/UpdateTask?id=" + task.todoId, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            response.json();
            todoEditBtn.parentNode.removeChild(editDiv);
        });
    }
}

function createToDoElement(todo) {
    // if (task.todoId == null) {
    //     fetch("https://localhost:44325/api/AddTask", {
    //             method: "POST",
    //             body: JSON.stringify(task),
    //             headers: { "Content-Type": "application/json" }
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             task.todoId = res.todoId;
    //         });
    // }
    if (todo.parentId == null) {
        const row = todosTable.insertRow(-1);
        const assigned = row.insertCell(0);
        const task = row.insertCell(1);
        const tasksTable = document.createElement("table");
        assigned.innerHTML = todo.assigned;
        task.appendChild(tasksTable);
        const taskRow = tasksTable.insertRow(-1);
        const title = taskRow.insertCell(0);
        const description = taskRow.insertCell(1);
        const buttons = taskRow.insertCell(2);
        const subtasksTable = document.createElement("table");
        subtasksTable.id = "table_" + todo.todoId;
        const substasks = taskRow.insertCell(3);
        substasks.appendChild(subtasksTable);
        title.innerHTML = todo.title;
        description.innerHTML = todo.description;

        const addSubtaskBtn = document.createElement("button");
        addSubtaskBtn.textContent = "Add subtask";
        addSubtaskBtn.onclick = function() {
            createSubtask(todo, subtasksTable);
        }
        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.textContent = "Remove task";
        buttons.appendChild(addSubtaskBtn);
        buttons.appendChild(removeTaskBtn);
    } else {
        createSubtaskElement(todo.parentId, todo);
    }
}

function createSubtaskElement(parentId, todo) {
    const tasksTable = document.getElementById("table_" + parentId);
    const taskRow = tasksTable.insertRow(-1);
    const title = taskRow.insertCell(0);
    const description = taskRow.insertCell(1);
    const buttons = taskRow.insertCell(2);
    const subtasksTable = document.createElement("table");
    subtasksTable.id = "table_" + todo.todoId;
    const substasks = taskRow.insertCell(3);
    substasks.appendChild(subtasksTable);
    title.innerHTML = todo.title;
    description.innerHTML = todo.description;

    const addSubtaskBtn = document.createElement("button");
    addSubtaskBtn.textContent = "Add subtask";
    addSubtaskBtn.onclick = function() {
        createSubtask(subtasksTable);
    }
    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.textContent = "Remove task";
    buttons.appendChild(addSubtaskBtn);
    buttons.appendChild(removeTaskBtn);
}

function createSubtask(parent, tasksTable) {
    const taskRow = tasksTable.insertRow(-1);
    const subtasksTable = document.createElement("table");
    const title = taskRow.insertCell(0);
    const description = taskRow.insertCell(1);
    const buttons = taskRow.insertCell(2);
    const substasks = taskRow.insertCell(3);
    substasks.appendChild(subtasksTable);
    const titleInput = document.createElement("input");
    const descInput = document.createElement("input");
    const saveBtn = document.createElement("button");
    saveBtn.onclick = function() {
        const task = createTodo(parent.assigned, null, titleInput.value, descInput.value, parent.todoId);
        console.log(task);
        fetch("https://localhost:44325/api/AddTask", {
                method: "POST",
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(res => {
                task.todoId = res.todoId;
            });
        tasksTable.deleteRow(taskRow.parentNode.parentNode.rowIndex);
    }
    titleInput.value = "";
    descInput.value = "";
    saveBtn.textContent = "Save";
    title.appendChild(titleInput);
    description.appendChild(descInput);
    buttons.appendChild(saveBtn);
}

function createTodo(assigned, todoId, title, description, parentId) {
    return {
        assigned: assigned,
        todoId: todoId,
        title: title,
        description: description,
        parentId: parentId
    }
}