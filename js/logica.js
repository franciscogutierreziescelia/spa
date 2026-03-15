class TodoList {
  constructor() {
    this.createCloseButtons();
    this.setupCloseButtonEvents();
    this.setupListCheckboxEvent();
    this.setupAddButtonEvent();
  }
  // Create a "close" button and append it to each list item
  createCloseButtons() {
    const myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
      const span = document.createElement("SPAN");
      const txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
    }
  }
  // Click on a close button to hide the current list item
  setupCloseButtonEvents() {
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = (e) => {
        const div = e.currentTarget.parentElement;
        div.style.display = "none";
      };
    }
  }
  // Add a "checked" symbol when clicking on a list item
  setupListCheckboxEvent() {
    const list = document.querySelector('ul');
    list.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);
  }
  // Bind Add button event
  setupAddButtonEvent() {
    const addBtn = document.querySelector('.addBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.newElement());
    }
  }
  // Create a new list item when clicking on the "Add" button
  newElement() {
    const li = document.createElement("li");
    const inputValue = document.getElementById("myInput").value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    // Bind close event for the new item
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = (e) => {
        const div = e.currentTarget.parentElement;
        div.style.display = "none";
      };
    }
  }
}
// Initialize the TodoList app
const todoApp = new TodoList();