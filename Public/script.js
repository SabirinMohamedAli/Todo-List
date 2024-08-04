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
                const deleteBtn = document.createElement('span');
                deleteBtn.innerHTML = '🗑️';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.onclick = function() { deleteTask(task.id); };
                const editBtn = document.createElement('span');
                editBtn.innerHTML = '✏️';
                editBtn.style.cursor = 'pointer';
                editBtn.onclick = function() { editTask(task.id); };
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
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
        fetchTasks();
        document.getElementById('newTask').value = '';
    });
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    }).then(() => {
        fetchTasks();
    });
}

function editTask(id) {
    const newDescription = prompt('Edit the task:');
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: newDescription, completed: false })
    }).then(() => {
        fetchTasks();
    });
}
