// public/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const apiUrl = 'http://localhost:5000'; // Update this if needed

    // Fetch and display tasks
    async function fetchTasks() {
        const response = await fetch(`${apiUrl}/tasks`);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.description;
            taskList.appendChild(li);
        });
    }

    fetchTasks();

    // Add a new task
    taskForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const description = taskInput.value;
        const response = await fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });
        const newTask = await response.json();
        const li = document.createElement('li');
        li.textContent = newTask.description;
        taskList.appendChild(li);
        taskInput.value = '';
    });
});
