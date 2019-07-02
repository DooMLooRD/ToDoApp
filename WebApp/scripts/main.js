const todosTable = document.getElementById("todosTable");
const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");
todoBtn.onclick = addToDo;
loadToDos();

function loadToDos() {
  insertTaskRow(
    {
      person: "person",
      todoId: 0,
      title: "title1",
      description: "description",
      Todos: [
        {
          person: "person",
          todoId: 1,
          title: "title2",
          description: "description",
          Todos: [
            {
              person: "person",
              todoId: 0,
              title: "title1",
              description: "description",
              Todos: [
                {
                  person: "person",
                  todoId: 1,
                  title: "title2",
                  description: "description",
                  Todos: []
                },
                {
                  person: "person",
                  todoId: 2,
                  title: "title3",
                  description: "description",
                  Todos: []
                }
              ]
            }
          ]
        },
        {
          person: "person",
          todoId: 2,
          title: "title3",
          description: "description",
          Todos: [
            {
              person: "person",
              todoId: 0,
              title: "title1",
              description: "description",
              Todos: [
                {
                  person: "person",
                  todoId: 1,
                  title: "title2",
                  description: "description",
                  Todos: []
                },
                {
                  person: "person",
                  todoId: 2,
                  title: "title3",
                  description: "description",
                  Todos: []
                }
              ]
            }
          ]
        }
      ]
    },
    true
  );
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
  const todoEl = {
    person: todoAssigned,
    todoId: 2,
    title: todoTitle,
    description: todoDesc
  };
  insertTaskRow(todoEl, false);
  //   if (task.todoId == null) {
  //     fetch("https://localhost:44325/api/AddTask", {
  //       method: "POST",
  //       body: JSON.stringify(task),
  //       headers: { "Content-Type": "application/json" }
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         task.todoId = res.todoId;
  //       });
  //   }
}

function deleteTask(id, item) {
  let parent = item.parentNode;
  parent.removeChild(item);
  while (parent.firstChild == null) {
    let tempParent = parent.parentNode;
    parent.parentNode.removeChild(parent);
    parent = tempParent;
  }
  if (parent.nodeName == "TR") {
    parent.parentNode.removeChild(parent);
  }
  //   fetch("https://localhost:44325/api/RemoveTask?id=" + id, {
  //     method: "delete"
  //   });
}

function insertTaskRow(todo, isInit) {
  const row = todosTable.insertRow(-1);
  const person = row.insertCell(0);
  const task = row.insertCell(1);
  const tasksList = document.createElement("ul");
  person.innerHTML = todo.person;
  task.appendChild(tasksList);
  insertTaskElement(tasksList, todo, isInit);
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
  addSubtaskBtn.className += "m-2 btn btn-primary";
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
      task.title = newTitleInput.value;
      task.description = newDescInput.value;
      //   fetch("https://localhost:44325/api/UpdateTask?id=" + task.todoId, {
      //     method: "PUT",
      //     body: JSON.stringify(task),
      //     headers: { "Content-Type": "application/json" }
      //   }).then(response => {
      //     response.json();
      //   });
      taskContainer.removeChild(editDivElement);
      taskDivElement.style.display = "block";
    };
  };

  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.className += "m-2 btn btn-primary";
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
    if (task.Todos.length > 0) {
      task.Todos.forEach(todo => insertTaskElement(subtaskList, todo));
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
      parent.person,
      null,
      newTitleInput.value,
      newDescInput.value,
      parent.todoId
    );
    // fetch("https://localhost:44325/api/AddTask", {
    //   method: "POST",
    //   body: JSON.stringify(todo),
    //   headers: { "Content-Type": "application/json" }
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     task.todoId = res.todoId;
    //   });
    taskElement.parentNode.removeChild(taskElement);
    insertTaskElement(tasksList, todo, false);
  };
  tasksList.appendChild(taskElement);
}

function createTodo(person, todoId, title, description, parentId) {
  return {
    person: person,
    todoId: todoId,
    title: title,
    description: description,
    parentId: parentId
  };
}
