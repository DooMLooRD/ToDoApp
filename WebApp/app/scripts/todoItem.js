const currentDocument = document.currentScript.ownerDocument;

class TodoItem extends HTMLElement {
  constructor(
    todoDetail = new TodoDetail(0, "", "", false, 0, 0, "123213", []),
    isAddMode = false
  ) {
    super();
    this.isAddMode = isAddMode;
    this.todoDetail = todoDetail;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const template = currentDocument.querySelector("#todo-item-template");
    const instance = template.content.cloneNode(true);
    this.shadowRoot.appendChild(instance);

    this.shadowRoot
      .querySelector(".add-button")
      .addEventListener("click", () => this.addTodo(this));

    this.shadowRoot
      .querySelector(".remove-button")
      .addEventListener("click", () => this.removeTodo(this));

    this.shadowRoot
      .querySelector(".edit-button")
      .addEventListener("click", () => this.toggleUpdate(this));

    this.shadowRoot
      .querySelector(".confirm-update-button")
      .addEventListener("click", () => this.confirmUpdate(this));

    this.shadowRoot
      .querySelector(".cancel-update-button")
      .addEventListener("click", () => this.cancelUpdate(this));

    this.shadowRoot
      .querySelector(".confirm-add-button")
      .addEventListener("click", () => this.confirmAdd(this));

    this.shadowRoot
      .querySelector(".cancel-add-button")
      .addEventListener("click", () => this.cancelAdd(this));

    this.render();
  }

  render() {
    this.addMode = this.shadowRoot.querySelector(".addMode");
    this.editMode = this.shadowRoot.querySelector(".updateMode");
    this.normalMode = this.shadowRoot.querySelector(".normalMode");
    this.todoTitle = this.shadowRoot.querySelector(".todo__title");
    this.description = this.shadowRoot.querySelector(".todo__description");

    this.normalMode.style.display = this.isAddMode ? "none" : "flex";
    this.addMode.style.display = this.isAddMode ? "flex" : "none";
    this.editMode.style.display = "none";
    this.todoTitle.value = this.todoDetail.title;
    this.description.value = this.todoDetail.description;

    if (this.isAddMode) {
      this.setReadOnly(this.todoTitle, this.description);
    }

    this.insertSubTasks();
  }

  addTodo(event) {
    const newTodo = new TodoItem(
      new TodoDetail(0, "hej", "hej", false, 0, 0, "dupa", []),
      true
    );
    event.shadowRoot.querySelector(".todo__todos").appendChild(newTodo);
  }

  removeTodo(event) {
    event.parentNode.removeChild(event);
  }

  confirmUpdate(event) {
    event.toggleUpdate(event);
    event.todoDetail.title = event.todoTitle.value;
    event.todoDetail.description = event.description.value;
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
    event.toggleDisplay(event.normalMode, event.addMode);
    event.setReadOnly(event.description, event.todoTitle);
    event.todoDetail.title = event.todoTitle.value;
    event.todoDetail.description = event.description.value;
  }

  cancelAdd(event) {
    event.parentNode.removeChild(event);
  }

  validate(event) {
    if (event.todoTitle.value === "" || event.description.value === "") {
      this.setAttribute("disabled", true);
    } else {
      this.removeAttribute("disabled");
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
}

customElements.define("todo-item", TodoItem);
