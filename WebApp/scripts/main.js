const todosTable = document.getElementById("todosTable");
const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");
const todoApiUrl = "https://localhost:44325/api/";
const addTodoUrl = todoApiUrl + "AddTask";
const updateTodoUrl = todoApiUrl + "UpdateTask";
const removeTodoUrl = todoApiUrl + "RemoveTask";
const getAllTodoUrl = todoApiUrl + "Tasks";
const getAllPerson = "https://localhost:44325/api/persons";

todoBtn.onclick = addToDo;
loadPersons();
loadToDos();

function formValidator() {
    if(document.getElementById('todoTitle').value=="" || document.getElementById('todoDescription').value==""  ) { 
           document.getElementById('addTodoButton').disabled = true; 
       } else { 
           document.getElementById('addTodoButton').disabled = false;
       }
   }

function loadPersons() {
    fetch(getAllPerson)
        .then(resp => resp.json())
        .then(resp => {
            resp.forEach(person => {
                let option = document.createElement("option");
                option.value = person.pesel;
                option.text = person.name + " " + person.surname;
                todoAssignedInput.add(option);
            });
        });

}

function loadToDos() {
    fetch(getAllTodoUrl)
        .then(resp => resp.json())
        .then(resp => {
            resp.forEach(task => {
                insertTaskRow(task, true);
            });
        });
}

function addToDo() {
    const todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = "";
    const todoTitle = todoTitleInput.value;
    todoTitleInput.value = "";
    const todoAssigned = todoAssignedInput.value;
    todoAssignedInput.value = "";
    let todoEl = createTodo(todoAssigned, 0, todoTitle, todoDesc, null);

    fetch(addTodoUrl, {
            method: "POST",
            body: JSON.stringify(todoEl),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(res => {
                    todoEl = res;
                    insertTaskRow(todoEl, false);
                });
            } else {
                return res.text().then(text => alert(text));
            }
        });

}

function deleteTask(id, item) {
    let parent = item.parentNode;
    parent.removeChild(item);

    if (parent.parentNode.parentNode.className == "row") {
        //dont ask
        parent = parent.parentNode.parentNode;
        parent.parentNode.removeChild(parent);

    }
    fetch(removeTodoUrl + "?id=" + id, {
        method: "delete"
    });
}

function insertTaskRow(todo, isInit) {
    const todoRowTemplate = document.getElementById("todoRow").cloneNode(true);
    const todoAssigned = document.getElementById("assigned");
    const todoTasks = document.getElementById("tasks");
    const tasksList = document.createElement("ul");

    todoAssigned.textContent = todo.personFullName;
    todoTasks.appendChild(tasksList);

    document.getElementById("todoRow").removeAttribute("id");
    todoAssigned.removeAttribute("id");
    todoTasks.removeAttribute("id");

    insertTaskElement(tasksList, todo, isInit);
    todosTable.appendChild(todoRowTemplate);
}

function insertTaskElement(tasksList, task, isInit) {
    const taskElement = document.createElement("li");
    const taskContainer = document.createElement("div");
    const taskDivElement = document.createElement("div");
    const subtaskList = document.createElement("ul");

    const title = document.createElement("span");
    title.classList.add("m-2");
    title.innerText = task.title;

    const description = document.createElement("span");
    description.classList.add("m-2");
    description.innerText = task.description;

    const addSubtaskBtn = document.createElement("button");
    addSubtaskBtn.textContent = "Add subtask";
    addSubtaskBtn.className += "btn btn-success";
    addSubtaskBtn.onclick = function() {
        createSubtask(subtaskList, task);
    };

    const updateTaskBtn = document.createElement("button");
    updateTaskBtn.className += "m-2 btn btn-primary";
    updateTaskBtn.textContent = "Update task";
    updateTaskBtn.onclick = function() {
        taskDivElement.style.display = "none";
        const editDivElement = document.createElement("div");
        const newTitleInput = document.createElement("input");
        const newDescInput = document.createElement("input");
        const saveBtn = document.createElement("button");
        newTitleInput.value = task.title;
        newTitleInput.className += "m-2 form-control";
        newDescInput.value = task.description;
        newDescInput.className += "m-2 form-control";
        saveBtn.textContent = "Save";
        saveBtn.className += "m-2 btn btn-primary";
        editDivElement.appendChild(newTitleInput);
        editDivElement.appendChild(newDescInput);
        editDivElement.appendChild(saveBtn);
        taskContainer.appendChild(editDivElement);
        saveBtn.onclick = function() {
            title.innerText = newTitleInput.value;
            description.innerText = newDescInput.value;
            const updatedTask = createTodo(task.personId, task.todoId, newTitleInput.value, newDescInput.value, task.parentId);
            task.title = newTitleInput.value;
            task.description = newDescInput.value;
            fetch(updateTodoUrl + "?id=" + task.todoId, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
                headers: { "Content-Type": "application/json" }
            }).then(() => {
                taskContainer.removeChild(editDivElement);
                taskDivElement.style.display = "block";
            }).catch((exception) => {
                alert(exception);
            });

        };
    };

    const removeTaskBtn = document.createElement("button");
    
    removeTaskBtn.className += "btn btn-danger";
    removeTaskBtn.textContent = "Remove task";
    removeTaskBtn.onclick = function() {
        deleteTask(task.todoId, taskElement);
    };

    taskDivElement.appendChild(title);
    taskDivElement.appendChild(description);
    taskDivElement.appendChild(addSubtaskBtn);
    taskDivElement.appendChild(updateTaskBtn);
    taskDivElement.appendChild(removeTaskBtn);
    taskContainer.appendChild(taskDivElement);
    taskElement.appendChild(taskContainer);
    taskElement.appendChild(subtaskList);

    if (isInit) {
        if (task.todos.length > 0) {
            task.todos.forEach(todo => insertTaskElement(subtaskList, todo, isInit));
        }
    }

    tasksList.appendChild(taskElement);
}

function createSubtask(tasksList, parent) {
    const taskElement = document.createElement("li");
    const newTitleInput = document.createElement("input");
    const newDescInput = document.createElement("input");
    const saveBtn = document.createElement("button");
    newTitleInput.value = "title";
    newTitleInput.className += "m-2 form-control";
    newDescInput.value = "description";
    newDescInput.className += "m-2 form-control";
    saveBtn.textContent = "Save";
    saveBtn.className += "m-2 btn btn-primary";
    taskElement.appendChild(newTitleInput);
    taskElement.appendChild(newDescInput);
    taskElement.appendChild(saveBtn);
    saveBtn.onclick = function() {

        let todo = createTodo(
            parent.personId,
            0,
            newTitleInput.value,
            newDescInput.value,
            parent.todoId
        );

        fetch(addTodoUrl, {
                method: "POST",
                body: JSON.stringify(todo),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(res => {
                todo = res;
                taskElement.parentNode.removeChild(taskElement);
                insertTaskElement(tasksList, todo, false);
            });

    };
    tasksList.appendChild(taskElement);
}

function createTodo(personId, todoId, title, description, parentId) {
    return {
        personId: personId,
        todoId: todoId,
        title: title,
        isDone: false,
        description: description,
        parentId: parentId
    };
}