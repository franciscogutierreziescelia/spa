class TodoList {
  constructor() {
    const listaGuardada = localStorage.getItem('lista');
    if (listaGuardada) {
      this.tareas = JSON.parse(listaGuardada);
    } else {
      this.tareas = [
        { id: 1, descripcion: "Esta es la primera tarea", completado: false }
      ];
      localStorage.setItem('lista', JSON.stringify(this.tareas));
    }
    this.renderTareas();
    this.createCloseButtons();
    this.setupCloseButtonEvents();
    this.setupListCheckboxEvent();
    this.setupAddButtonEvent();
  }
  // Render all tasks from the array
  renderTareas() {
    const ul = document.getElementById("myUL");
    ul.innerHTML = '';
    this.tareas.forEach(tarea => {
      const li = document.createElement("li");
      li.dataset.id = tarea.id; // data-id attribute for easy querying
      li.id = `tarea-${tarea.id}`; // Optional: direct id for targeting
      li.appendChild(document.createTextNode(tarea.descripcion));
      if (tarea.completado) {
        li.classList.add("checked");
      }
      ul.appendChild(li);
    });
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
  // Click on a close button to remove the current list item
  setupCloseButtonEvents() {
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      // Remover cualquier evento anterior para evitar duplicados si se llama varias veces
      close[i].onclick = (e) => {
        const li = e.currentTarget.parentElement;
        const taskId = parseInt(li.dataset.id, 10);
        
        // Remove the task from the array
        this.tareas = this.tareas.filter(t => t.id !== taskId);
        localStorage.setItem('lista', JSON.stringify(this.tareas));
        console.log("Estado de la lista tras eliminar:", this.tareas);
        
        // Remove the element from the DOM completely
        li.remove();
      };
    }
  }
  // Add a "checked" symbol when clicking on a list item
  setupListCheckboxEvent() {
    const list = document.querySelector('ul');
    list.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        
        // Find the task in the array and toggle its completed status
        const taskId = parseInt(ev.target.dataset.id, 10);
        const tareaIndex = this.tareas.findIndex(t => t.id === taskId);
        if (tareaIndex > -1) {
          this.tareas[tareaIndex].completado = !this.tareas[tareaIndex].completado;
          localStorage.setItem('lista', JSON.stringify(this.tareas));
          console.log("Estado actualizado de la lista tras completar/desmarcar:", this.tareas);
        }
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
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      const nuevoId = this.tareas.length > 0 ? Math.max(...this.tareas.map(t => t.id)) + 1 : 1;
      const nuevaTarea = {
        id: nuevoId,
        descripcion: inputValue,
        completado: false
      };
      // Añadir la nueva tarea a la lista (array)
      this.tareas.push(nuevaTarea);
      localStorage.setItem('lista', JSON.stringify(this.tareas));
      console.log("Estado de la lista de tareas:", this.tareas);

      // Render updated list and rebind events
      this.renderTareas();
      this.createCloseButtons();
      this.setupCloseButtonEvents();
    }
    document.getElementById("myInput").value = "";
  }
}
// Initialize the TodoList app
const todoApp = new TodoList();