const currentDocument = document.currentScript.ownerDocument;

class TodoItem extends HTMLElement {
  constructor(todoDetail = null, isAddMode = false) {
    super();
    this.isAddMode = isAddMode;
    this.todoDetail = todoDetail;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const template = currentDocument.querySelector("#todo-item-template");
    const instance = template.content.cloneNode(true);
    this.shadowRoot.appendChild(instance);
    render(this);
  }

  addTodo(event) {
    const newTodo = new TodoItem(
      new TodoDetail(
        0,
        "",
        "",
        false,
        event.todoDetail.personId,
        event.todoDetail.todoId,
        event.todoDetail.personFullName,
        []
      ),
      true
    );
    event.shadowRoot.querySelector(".todo__todos").appendChild(newTodo);
  }

  removeTodo(event) {
    removeTodo(event.todoDetail.todoId)
      .then(() => {
        if (event.todoDetail.parentId === null) {
          let row = event.parentNode.parentNode.parentNode;
          row.parentNode.removeChild(row);
        } else {
          event.parentNode.removeChild(event);
        }
      })
      .catch(() => alert("Couldn't remove todo!"));
  }

  confirmUpdate(event) {
    let tempTodo = event.createTempTodo(
      event.todoTitle.value,
      event.description.value
    );
    updateTodo(tempTodo)
      .then(res => {
        event.todoDetail = res;
        event.toggleUpdate(event);
      })
      .catch(() => "Couldn't update todo!");
  }

  cancelUpdate(event) {
    event.toggleUpdate(event);
    event.todoTitle.value = event.todoDetail.title;
    event.description.value = event.todoDetail.description;
  }

  toggleUpdate(event) {
    event.toggleDisplay(event.normalMode, event.editMode);
    event.setReadOnly(event.description, event.todoTitle);
  }

  toggleDisplay(...element) {
    element.forEach(c => {
      c.style.display = c.style.display === "none" ? "flex" : "none";
    });
  }

  setReadOnly(...element) {
    element.forEach(c => {
      c.hasAttribute("readonly")
        ? c.removeAttribute("readonly")
        : c.setAttribute("readonly", true);
    });
  }

  confirmAdd(event) {
    let tempTodo = event.createTempTodo(
      event.todoTitle.value,
      event.description.value
    );

    createTodo(tempTodo)
      .then(res => {
        event.todoDetail = res;
        event.toggleDisplay(event.normalMode, event.addMode);
        event.setReadOnly(event.description, event.todoTitle);
      })
      .catch(() => alert("Couldn't add todo!"));
  }

  cancelAdd(event) {
    event.parentNode.removeChild(event);
  }

  validate(event) {
    const btn = event.isAddMode ? event.addButton : event.updateButton;
    if (event.todoTitle.value === "" || event.description.value === "") {
      btn.setAttribute("disabled", true);
    } else {
      btn.removeAttribute("disabled");
    }
  }

  insertSubTasks() {
    if (this.todoDetail && this.todoDetail.todos) {
      const todos = this.shadowRoot.querySelector(".todo__todos");
      this.todoDetail.todos.forEach(todo => {
        todos.appendChild(new TodoItem(todo, false));
      });
    }
  }

  createTempTodo(title, desc) {
    return new Todo(
      this.todoDetail.personId,
      this.todoDetail.todoId,
      title,
      desc,
      this.todoDetail.parentId
    );
  }
}

customElements.define("todo-item", TodoItem);
