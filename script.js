let todos = [];
let editTodoId = null;

const addTodoForm = document.getElementById("addTodoForm");
const editTodoForm = document.getElementById("editTodoForm");
const todoTableBody = document.getElementById("todoTableBody");
const editTodoFormContainer = document.getElementById("editTodoFormContainer");

function renderTodos() {
    todoTableBody.innerHTML = "";
    todos.forEach((todo, index) => {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50";
        row.innerHTML = `
                    <td class="py-2 px-4">${index + 1}</td>
                    <td class="py-2 px-4">${todo.title}</td>
                    <td class="py-2 px-4">${todo.description}</td>
                    <td class="py-2 px-4">
                        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editTodo(${index})">Edit</button>
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2" onclick="deleteTodo(${index})">Delete</button>
                    </td>
                `;
        todoTableBody.appendChild(row);
    });
}

function addTodo(event) {
    event.preventDefault();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    todos.push({ title, description });
    addTodoForm.reset();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function editTodo(index) {
    editTodoId = index;
    const todo = todos[index];
    document.getElementById("edit-todo-title").value = todo.title;
    document.getElementById("edit-todo-description").value = todo.description;
    editTodoFormContainer.classList.remove("hidden");
}

function updateTodo(event) {
    event.preventDefault();
    const title = document.getElementById("edit-todo-title").value;
    const description = document.getElementById("edit-todo-description").value;
    todos[editTodoId] = { title, description };
    editTodoFormContainer.classList.add("hidden");
    renderTodos();
}

addTodoForm.addEventListener("submit", addTodo);
editTodoForm.addEventListener("submit", updateTodo);

renderTodos();
