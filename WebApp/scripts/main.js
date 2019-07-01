let todos = document.getElementById('todos');
let todoDescriptionInput = document.getElementById('todoDescription');
let todoBtn = document.getElementById('addTodoButton');
todoBtn.onclick = createToDo;
loadToDos();

function loadToDos() {
    //TODO: Load from server here
    for (let i = 0; i < 10; i++) {
        addToDo('desc ' + i);
    }
}

function createToDo() {
    var todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = '';
    addToDo(todoDesc);
}

function addToDo(description) {
    var todoText = document.createElement('span');
    todoText.textContent = description;
    var todoRemoveBtn = document.createElement('button');
    todoRemoveBtn.textContent = 'Delete';
    todoRemoveBtn.onclick = function(e) {
        todos.removeChild(todoItem);
        //TODO: remove from server
    }

    var todoItem = document.createElement('li');
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoRemoveBtn);

    todos.appendChild(todoItem);
    //TODO: send to server
}