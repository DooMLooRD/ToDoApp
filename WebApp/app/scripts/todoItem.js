class TodoDetail {
  constructor(
    todoId,
    title,
    description,
    isDone,
    personId,
    parentId,
    personFullName,
    todos
  ) {
    this.todoId = todoId;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.personId = personId;
    this.parentId = parentId;
    this.personFullName = personFullName;
    this.todos = todos;
  }
}


const currentDocument = document.currentScript.ownerDocument;

class TodoItem extends HTMLElement {
  constructor(
    todoDetail = new TodoDetail(0, "", "", false, 0, 0, "123213", []),
    addMode = false
  ) {
    super();
    this.addMode = addMode;
    this.todoDetail = todoDetail;
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = currentDocument.querySelector("#todo-item-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    console.log(shadowRoot);

    const addMode = this.shadowRoot.querySelector(".addMode");
    const editMode = this.shadowRoot.querySelector(".updateMode");
    const normalMode = this.shadowRoot.querySelector(".normalMode");
    this.insertSubTasks();
    normalMode.style.display = this.addMode ? "none" : "block";
    addMode.style.display = this.addMode ? "block" : "none";
    editMode.style.display = "none";

    this.render();
  }
  
  render() {
    this.todoTitle = this.shadowRoot.querySelector(".todo__title");
    this.todoTitle.value = this.todoDetail.title;
    this.description = this.shadowRoot.querySelector(".todo__description");
    this.description.value = this.todoDetail.description;
  }

  addTodo() {
    const newTodo = new TodoItem(
      new TodoDetail(
        0,
        "",
        "",
        false,
        this.todoDetail.personId,
        this.todoDetail.todoId,
        this.todoDetail.personFullName,
        []
      )
    );
    const todos = this.shadowRoot.querySelector(".todo__todos");
    todos.appendChild(newTodo, true);
  }

  updateTodo() {
    const editMode = this.shadowRoot.querySelector(".editMode");
    const normalMode = this.shadowRoot.querySelector(".normalMode");
    normalMode.style.display = "none";
    editMode.style.display = "display";
  }

  removeTodo() {}
  confirmUpdate() {}
  cancelUpdate() {}
  confirmAdd() {}
  cancelAdd() {}

  insertSubTasks() {
    if (this.todoDetail && this.todoDetail.todos) {
      const todos = this.shadowRoot.querySelector(".todo__todos");
      this.todoDetail.todos.forEach(todo => {
        todos.appendChild(todo, false);
      });
    }
  }
}

customElements.define("todo-item", TodoItem);
