document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    let taskText = document.getElementById('new-task').value;
    if (taskText) {
        let newTask = createTaskElement(taskText);
        document.getElementById('tasks-list').appendChild(newTask);
        document.getElementById('new-task').value = '';
        saveTasks();
    }
}

function createTaskElement(taskText, completed = false) {
    let newTask = document.createElement('div');
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    if (completed) {
        newTask.classList.add('completed');
    }

    newTask.querySelector('.delete-btn').addEventListener('click', function() {
        this.parentElement.remove();
        saveTasks();
    });

    newTask.addEventListener('click', function() {
        this.classList.toggle('completed');
        saveTasks();
    });

    return newTask;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#tasks-list div').forEach(taskElement => {
        let taskText = taskElement.textContent.replace('Delete', '').trim();
        let completed = taskElement.classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            let newTask = createTaskElement(task.text, task.completed);
            document.getElementById('tasks-list').appendChild(newTask);
        });
    }
}
