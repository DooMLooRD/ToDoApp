function render(_this) {
  _this.addButton = _this.shadowRoot.querySelector(".confirm-add-button");
  _this.updateButton = _this.shadowRoot.querySelector(".confirm-update-button");

  _this.shadowRoot
    .querySelector(".add-button")
    .addEventListener("click", () => _this.addTodo(_this));

  _this.shadowRoot
    .querySelector(".remove-button")
    .addEventListener("click", () => _this.removeTodo(_this));

  _this.shadowRoot
    .querySelector(".edit-button")
    .addEventListener("click", () => _this.toggleUpdate(_this));

  _this.updateButton.addEventListener("click", () =>
    _this.confirmUpdate(_this)
  );

  _this.addButton.addEventListener("click", () => _this.confirmAdd(_this));

  _this.shadowRoot
    .querySelector(".cancel-update-button")
    .addEventListener("click", () => _this.cancelUpdate(_this));

  _this.shadowRoot
    .querySelector(".cancel-add-button")
    .addEventListener("click", () => _this.cancelAdd(_this));

  _this.addMode = _this.shadowRoot.querySelector(".addMode");
  _this.editMode = _this.shadowRoot.querySelector(".updateMode");
  _this.normalMode = _this.shadowRoot.querySelector(".normalMode");
  _this.todoTitle = _this.shadowRoot.querySelector(".todo__title");
  _this.description = _this.shadowRoot.querySelector(".todo__description");

  _this.todoTitle.addEventListener("keyup", () => _this.validate(_this));
  _this.description.addEventListener("keyup", () => _this.validate(_this));
  _this.normalMode.style.display = _this.isAddMode ? "none" : "flex";
  _this.addMode.style.display = _this.isAddMode ? "flex" : "none";
  _this.editMode.style.display = "none";
  _this.todoTitle.value = _this.todoDetail.title;
  _this.description.value = _this.todoDetail.description;

  if (_this.isAddMode) {
    _this.setReadOnly(_this.todoTitle, _this.description);
    _this.addButton.setAttribute("disabled", true);
  }

  _this.insertSubTasks();
}
