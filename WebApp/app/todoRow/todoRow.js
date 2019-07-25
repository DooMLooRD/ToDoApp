const currentRowDocument = document.currentScript.ownerDocument;

class TodoRow extends HTMLElement {
  constructor(assigned, todoItem) {
    super();
    this.todoItem = todoItem;
    this.assigned = assigned;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const template = currentRowDocument.querySelector("#todo-row-template");
    const instance = template.content.cloneNode(true);
    this.shadowRoot.appendChild(instance);

    this.render();
  }

  render() {
    this.shadowRoot.querySelector(".todo__assigned").innerHTML = this.assigned;
    this.shadowRoot
      .querySelector(".todo__tasks")
      .appendChild(new TodoItem(this.todoItem));
  }
}

customElements.define("todo-row", TodoRow);
