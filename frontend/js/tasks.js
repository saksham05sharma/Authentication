document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    // Fetch and display all tasks
    async function fetchTasks() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        const response = await fetch('/api/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });

        const result = await response.json();

        if (response.ok) {
            displayTasks(result.allTasks);
        } else {
            alert(result.message);
        }
    }

    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <div class="task-details">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                </div>
                <div>
                    <button onclick="markTaskAsDone('${task._id}')">Done</button>
                    <button onclick="moveTaskToTrash('${task._id}')">Trash</button>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    taskForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        const response = await fetch('/api/task/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ title, description })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            fetchTasks();
        } else {
            alert(result.message);
        }
    });

    window.markTaskAsDone = async function(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        const response = await fetch(`/api/task/mark-as-done/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            fetchTasks();
        } else {
            alert(result.message);
        }
    };

    window.moveTaskToTrash = async function(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        const response = await fetch(`/api/task/trash/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            fetchTasks();
        } else {
            alert(result.message);
        }
    };

    window.deleteTask = async function(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        const response = await fetch(`/api/task/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            fetchTasks();
        } else {
            alert(result.message);
        }
    };

    fetchTasks();
});
