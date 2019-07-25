const todoAssignedInput = document.getElementById("todoAssigned");
const todoDescriptionInput = document.getElementById("todoDescription");
const todoTitleInput = document.getElementById("todoTitle");
const todoBtn = document.getElementById("addTodoButton");
const todoContainer = document.getElementById("todosTable");

todoBtn.onclick = addToDo;
loadPersons();
loadToDos();

function loadPersons() {
  getAllPerson()
    .then(resp => {
      resp.forEach(person => {
        let option = document.createElement("option");
        option.value = person.pesel;
        option.text = person.name + " " + person.surname;
        todoAssignedInput.add(option);
      });
    })
    .catch(() => alert("Couldn't load resources!"));
}

function loadToDos() {
  getAllTodos()
    .then(resp => {
      resp.forEach(task => {
        const ite = new TodoRow(task.personFullName, task);
        todoContainer.appendChild(ite);
      });
    })
    .catch(() => alert("Couldn't load todos!"));
}

function addToDo() {
  const todoDesc = todoDescriptionInput.value;
  todoDescriptionInput.value = "";
  const todoTitle = todoTitleInput.value;
  todoTitleInput.value = "";
  const todoAssigned = todoAssignedInput.value;
  todoAssignedInput.value = "";
  const newTodo = new Todo(todoAssigned, 0, todoTitle, todoDesc, null);

  createTodo(newTodo)
    .then(res => {
      const row = new TodoRow(res.personFullName, res);
      todoContainer.appendChild(row);
    })
    .catch(() => alert("Couldn't add todo!"));
}
