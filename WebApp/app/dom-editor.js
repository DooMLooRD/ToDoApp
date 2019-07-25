function create(type, classes) {
  const element = document.createElement(type);
  if (classes) {
    element.className += classes;
  }
  return element;
}

function append(mainElement, ...children) {
  children.forEach(el => mainElement.appendChild(el));
}

function createButton(textContent, classes, onclick) {
  const btn = create("button", "btn " + classes);
  btn.textContent = textContent;
  btn.onclick = onclick;
  return btn;
}

function createInput(value, classes) {
  const input = create("input", "form-control " + classes);
  input.value = value;
  return input;
}

function createSpan(innerText, classes) {
  const span = create("span", classes);
  span.innerText = innerText;
  span.style.display = "block";
  return span;
}

function toggleDisplay(...element) {
  element.forEach(c => {
    c.style.display = c.style.display === "none" ? "inline-block" : "none";
  });
}

function toggleReadOnly(...element) {
  element.forEach(c => {
    c.hasAttribute("readonly")
      ? c.removeAttribute("readonly")
      : c.setAttribute("readonly", true);
  });
}

function removeAttribute(attr, ...element) {
  element.forEach(c => {
    c.removeAttribute(attr);
  });
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}
