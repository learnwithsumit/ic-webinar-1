const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Connect to MongoDB
const MONGO_URI = "mongodb://localhost:27017/todo_app";
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Define Mongoose Schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
});

// Define mongoose model
const Todo = mongoose.model("Todo", todoSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Get all todos
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Add a new todo
app.post("/api/todos", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ error: "Failed to add todo" });
    }
});

// Update a todo
app.put("/api/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: "Failed to update todo" });
    }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
