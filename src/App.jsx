import axios from "axios";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

const API_URL = "http://localhost:8000/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [editTodoId, setEditTodoId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    // Fetch todos from the backend on component mount
    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => setTodos(response.data))
            .catch((error) => console.error("Error fetching todos:", error));
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new todo
    const addTodo = (e) => {
        e.preventDefault();
        axios
            .post(API_URL, formData)
            .then((response) => {
                setTodos((prev) => [...prev, response.data]); // Append new todo from server response
                setFormData({ title: "", description: "" });
            })
            .catch((error) => console.error("Error adding todo:", error));
    };

    // Delete a todo by its MongoDB _id
    const deleteTodo = (id) => {
        axios
            .delete(`${API_URL}/${id}`)
            .then(() => {
                setTodos((prev) => prev.filter((todo) => todo._id !== id)); // Filter out deleted todo
            })
            .catch((error) => console.error("Error deleting todo:", error));
    };

    // Edit a todo: Populate form with existing data
    const editTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo._id === id);
        setEditTodoId(id);
        setFormData({
            title: todoToEdit.title,
            description: todoToEdit.description,
        });
    };

    // Update an existing todo
    const updateTodo = (e) => {
        e.preventDefault();
        axios
            .put(`${API_URL}/${editTodoId}`, formData)
            .then((response) => {
                setTodos((prev) =>
                    prev.map((todo) =>
                        todo._id === editTodoId ? response.data : todo
                    )
                ); // Replace updated todo
                setEditTodoId(null);
                setFormData({ title: "", description: "" });
            })
            .catch((error) => console.error("Error updating todo:", error));
    };

    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen">
            <h1 className="text-3xl font-bold text-center my-6">
                Todo Application
            </h1>
            <TodoForm
                onSubmit={editTodoId !== null ? updateTodo : addTodo}
                formData={formData}
                handleInputChange={handleInputChange}
                isEditing={editTodoId !== null}
            />
            <TodoTable
                todos={todos}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default App;
