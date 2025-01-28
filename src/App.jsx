import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [editTodoId, setEditTodoId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addTodo = (e) => {
        e.preventDefault();
        setTodos((prev) => [...prev, { ...formData }]);
        setFormData({ title: "", description: "" });
    };

    const deleteTodo = (index) => {
        setTodos((prev) => prev.filter((_, i) => i !== index));
    };

    const editTodo = (index) => {
        setEditTodoId(index);
        setFormData(todos[index]);
    };

    const updateTodo = (e) => {
        e.preventDefault();
        setTodos((prev) =>
            prev.map((todo, i) => (i === editTodoId ? formData : todo))
        );
        setEditTodoId(null);
        setFormData({ title: "", description: "" });
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
