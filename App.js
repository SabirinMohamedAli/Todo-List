const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files

let tasks = []; // Array to store tasks

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const task = { id: Date.now(), description: req.body.description, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.description = req.body.description;
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



















































































// const amount = 1;
// if ( amount < 10 ) {
//     console.log('small amount');
// }
// else
//     console.log('large amount');
// console.log("hello  i am sabirina and it's my first time learning about node ");
