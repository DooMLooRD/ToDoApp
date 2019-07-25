function onConfirmAdd(parent, newTitleInput, newDescInput, taskElement, tasksList) {
  let todo = new Todo(
    parent.personId,
    0,
    newTitleInput.value,
    newDescInput.value,
    parent.todoId
  );

  createTodo(todo).then(res => {
    todo = res;
    removeElement(taskElement);
    createTaskDOM(tasksList, todo, false);
  });
}

function addSubtaskValidation(newDescInput,newTitleInput,saveBtn){
  newDescInput.onkeyup=() =>{
    if(newDescInput.value==='' || newTitleInput.value==='' ){
      saveBtn.disabled=true;
    }else{
      saveBtn.disabled=false;
    }
  }
  newTitleInput.onkeyup=() =>{
    if(newDescInput.value==='' || newTitleInput.value==='' ){
      saveBtn.disabled=true;
    }else{
      saveBtn.disabled=false;
    }
  }
}

function updateTaskValidation(title,description,saveBtn) {
  title.onkeyup=() =>{
   if(title.value==='' || description.value==='' ){
     saveBtn.disabled=true;
   }else{
     saveBtn.disabled=false;
   }
 }
 
 description.onkeyup=() =>{
  if(title.value==='' || description.value==='' ){
    saveBtn.disabled=true;
  }else{
    saveBtn.disabled=false;
  }
}
}

function ifAddTodoButtonActive () {
  if(todoTitleInput.value=="" || todoDescriptionInput.value=="") { 
    todoBtn.disabled = true; 
     } else { 
      todoBtn.disabled = false;
     }
 } 

function resetButton(){
  todoBtn.disabled = true; 
}

function onUpdate(title, description, ...buttons) {
  toggle(title, description, ...buttons);
}

function onConfirmUpdate(task, title, description, oldTask, ...buttons) {
  task.title = title.value;
  task.description = description.value;
  updateTodo(todoDetailToTodo(task))
    .then(() => {
      oldTask.title = task.title;
      oldTask.description = task.description;
      toggle(title, description, ...buttons);
    })
    .catch(exception => {
      task.title = oldTask.title;
      task.description = oldTask.description;
      alert(exception);
    });
}

function onCancelUpdate(title, description, oldTask, ...buttons) {
  title.value = oldTask.title;
  description.value = oldTask.description;
  toggle(title, description, ...buttons);
}

function toggle(title, description, ...buttons) {
  toggleReadOnly(title, description);
  toggleDisplay(...buttons);
}