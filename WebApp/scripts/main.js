let todos = document.getElementById('todos');
let todoDescriptionInput = document.getElementById('todoDescription');
let todoTitleInput = document.getElementById('todoTitle');
let todoBtn = document.getElementById('addTodoButton');
todoBtn.onclick = createToDo;
loadToDos();

function loadToDos() {
    fetch("https://localhost:44325/api/Tasks")
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(task => {
           addToDo(task);
        })
    })
}

function createToDo() {
    var todoDesc = todoDescriptionInput.value;
    todoDescriptionInput.value = '';
    var todoTitle= todoTitleInput.value;
    todoTitleInput.value= '';
    addToDo( {
        title: todoTitle,
        decription: todoDesc,
        isDone: false
    });
}

function addToDo(task) {
    if(task.id==null){
        //TODO: send todo to server then fetch id and assign to task.id
    }
    var todoText = document.createElement('span');
    todoText.textContent = task.decription;
    var todoTitle = document.createElement('span');
    todoTitle.textContent = task.title;
    var todoIsDone = document.createElement('input'); 
    todoIsDone.type = "checkbox"; 
    todoIsDone.name = "todoIsDone"; 
    todoIsDone.value = task.isDone; 
    todoIsDone.id = "todoIsDone"; 

    var todoRemoveBtn = document.createElement('button');
    todoRemoveBtn.textContent = 'Delete';
    todoRemoveBtn.onclick = function(e) {
        todos.removeChild(todoItem);
        //TODO: remove from server using task.id
    }

    var todoItem = document.createElement('li');
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoIsDone);
    todoItem.appendChild(todoRemoveBtn);

    todos.appendChild(todoItem);
  
}