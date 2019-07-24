const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");

todoBtn.onclick = addToDo;
loadPersons();
loadToDos();

function loadPersons() {
  getAllPerson().then(resp => {
    resp.forEach(person => {
      let option = document.createElement("option");
      option.value = person.pesel;
      option.text = person.name + " " + person.surname;
      todoAssignedInput.add(option);
    });
  });
}

function loadToDos() {
  const todoTasks = document.getElementById("tasks");
  getAllTodos().then(resp => {
    resp.forEach(task => {
      let ite = new TodoItem(task);
      todoTasks.appendChild(ite);
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

  createTodo(todoEl).then(res => {
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
