const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;
const DATA_FILE = path.join(__dirname, "todos.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to read/write data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Routes

// Get all todos
app.get("/api/todos", (req, res) => {
    const todos = readData();
    res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
    const todos = readData();
    const newTodo = req.body;
    todos.push(newTodo);
    writeData(todos);
    res.status(201).json(newTodo);
});

// Update a todo
app.put("/api/todos/:id", (req, res) => {
    const todos = readData();
    const { id } = req.params;
    const updatedTodo = req.body;

    todos[id] = updatedTodo;
    writeData(todos);
    res.json(updatedTodo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
    const todos = readData();
    const { id } = req.params;

    todos.splice(id, 1);
    writeData(todos);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
