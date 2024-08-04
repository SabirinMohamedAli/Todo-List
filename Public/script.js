window.onload = function() {
    fetchTasks();
};

function fetchTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(data => {
            const tasks = document.getElementById('tasks');
            tasks.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.description + (task.completed ? ' (completed)' : '');
                tasks.appendChild(li);
            });
        });
}

function addTask() {
    const newTask = document.getElementById('newTask').value;
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: newTask })
    })
    .then(response => response.json())
    .then(() => {
        fetchTasks(); // Refresh the list
        document.getElementById('newTask').value = ''; // Clear the input
    });
}
