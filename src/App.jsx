import axios from "axios";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

const API_URL = "http://localhost:8000/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [editTodoId, setEditTodoId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        // Fetch todos on component mount
        axios
            .get(API_URL)
            .then((response) => setTodos(response.data))
            .catch((error) => console.error("Error fetching todos:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addTodo = (e) => {
        e.preventDefault();
        axios
            .post(API_URL, formData)
            .then((response) => {
                setTodos((prev) => [...prev, response.data]);
                setFormData({ title: "", description: "" });
            })
            .catch((error) => console.error("Error adding todo:", error));
    };

    const deleteTodo = (index) => {
        axios
            .delete(`${API_URL}/${index}`)
            .then(() => {
                setTodos((prev) => prev.filter((_, i) => i !== index));
            })
            .catch((error) => console.error("Error deleting todo:", error));
    };

    const editTodo = (index) => {
        setEditTodoId(index);
        setFormData(todos[index]);
    };

    const updateTodo = (e) => {
        e.preventDefault();
        axios
            .put(`${API_URL}/${editTodoId}`, formData)
            .then((response) => {
                setTodos((prev) =>
                    prev.map((todo, i) =>
                        i === editTodoId ? response.data : todo
                    )
                );
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
