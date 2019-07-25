const todosTable = document.getElementById("todosTable");
const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");

todoBtn.onclick = addTodo;
loadPersons();
loadToDos();

function loadPersons() {
  getAllPerson().then(resp => {
    resp.forEach(person => {
      let option = create("option");
      option.value = person.pesel;
      option.text = person.name + " " + person.surname;
      todoAssignedInput.add(option);
    });
  });
}

function loadToDos() {
  getAllTodos().then(resp => {
    resp.forEach(task => {
      createRowDOM(task, true);
    });
  });
}

function addTodo() {
  const todoDesc = todoDescriptionInput.value;
  todoDescriptionInput.value = "";
  const todoTitle = todoTitleInput.value;
  todoTitleInput.value = "";
  const todoAssigned = todoAssignedInput.value;
  resetButton();
  let todoEl = new Todo(todoAssigned, 0, todoTitle, todoDesc, null);

  createTodo(todoEl).then(res => {
    todoEl = res;
    createRowDOM(todoEl, false);
  });
}

function deleteTask(id, item) {
  removeTodo(id).then(() => {
    let parent = item.parentNode;
    parent.removeChild(item);

    if (parent.parentNode.parentNode.className == "row") {
      parent = parent.parentNode.parentNode;
      parent.parentNode.removeChild(parent);
    }
  });
}

function createRowDOM(todo, isInit) {
  const todoRowTemplate = document.getElementById("todoRow").cloneNode(true);
  const todoAssigned = document.getElementById("assigned");
  const todoTasks = document.getElementById("tasks");
  const tasksList = create("ul");

  todoAssigned.textContent = todo.personFullName;
  append(todoTasks, tasksList);
  removeAttribute("id", document.getElementById("todoRow"), todoAssigned, todoTasks);

  createTaskDOM(tasksList, todo, isInit);
  append(todosTable, todoRowTemplate);
}

function createTaskDOM(tasksList, task, isInit) {
  let oldTask = { title: task.title, description: task.description };
  const taskElement = create("li");
  const taskContainer = create("div");
  const taskDivElement = create("div");
  const subtaskList = create("ul");
  const title = createInput(task.title, "m-2");
  
  const description = createInput(task.description, "m-2");
  toggleReadOnly(title, description);

  const addSubtaskBtn = createButton("Add subtask", "m-2 btn-primary", () =>
    createSubtaskDOM(subtaskList, task)
  );

  const saveBtn = createButton("Save", "m-2 btn-primary", () =>
    onConfirmUpdate(task, title, description, oldTask, ...buttonPack)
  );

  const cancelBtn = createButton("Cancel", "m-2 btn-danger", () =>
    onCancelUpdate(title, description, oldTask, ...buttonPack)
  );

  const updateTaskBtn = createButton("Update task", "m-2 btn-success", () =>
    onUpdate(title, description, ...buttonPack)
  );

  const removeTaskBtn = createButton("Remove task", "m-2 btn-danger", () =>
    deleteTask(task.todoId, taskElement)
  );
  
  updateTaskValidation(title,description,saveBtn);

  const buttonPack = [addSubtaskBtn, updateTaskBtn, removeTaskBtn, saveBtn, cancelBtn];
  toggleDisplay(saveBtn, cancelBtn);
  append(taskDivElement, title, description, ...buttonPack);
  append(taskContainer, taskDivElement);
  append(taskElement, taskContainer, subtaskList);

  if (isInit) {
    if (task.todos.length > 0) {
      task.todos.forEach(todo => createTaskDOM(subtaskList, todo, isInit));
    }
  }

  append(tasksList, taskElement);
}

function createSubtaskDOM(tasksList, parent) {
  const taskElement = create("li");
  const newTitleInput = createInput("title", "m-2");
  const newDescInput = createInput("description", "m-2");

  const saveBtn = createButton("Save", "m-2 btn-primary", () =>
    onConfirmAdd(parent, newTitleInput, newDescInput, taskElement, tasksList)
  );
  const cancelBtn = createButton("Cancel", "m-2 btn-danger", () =>
    removeElement(taskElement)
  );
 
  append(taskElement, newTitleInput, newDescInput, saveBtn, cancelBtn);
  append(tasksList, taskElement);
  addSubtaskValidation(newTitleInput,newDescInput,saveBtn);
}


function todoDetailToTodo(todoDetail) {
  return new Todo(
    todoDetail.personId,
    todoDetail.todoId,
    todoDetail.title,
    todoDetail.description,
    todoDetail.parentId
  );
}


