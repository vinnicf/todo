import { currentProjectId } from "./project";

// Tasks module - in construction -

class Task {
    constructor(title, projectId = null) {
        this.title = title;
        this.projectId = projectId;
        this.id = new Date().getTime(); // unique ID
    }
}


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Function to render tasks
const renderTasks = (projectId = null) => {

    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    const filteredTasks = projectId ? tasks.filter(task => task.projectId == projectId) : tasks;

    // Loop through each task in the array
    filteredTasks.forEach((task) => {

        const listItemElement = document.createElement('li');

        listItemElement.innerHTML = `
        <i class="fa-regular fa-circle delete-task"></i>
        <p data-id="${task.id}">${task.title}</p> `;

        taskListElement.appendChild(listItemElement);
    });
};





//Addtask decoupled from the form
function addTask(title, projectId = null) {
    const newTask = new Task(title, projectId);
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (currentProjectId) {
        renderTasks(currentProjectId);
    }
    else {
        renderTasks();
    }
}


function addTaskClick() {
    console.log('addTaskClick executed');
    document.getElementById('add-task-button').addEventListener('click', function () {
        // Hide the "+ Add Task" button
        this.style.display = 'none';
        console.log("Add Task Button clicked");

        // Show the input and buttons
        document.querySelector('.add-task-section').style.display = 'block';
    });

    document.getElementById('addButton').addEventListener('click', function () {
        const taskInput = document.getElementById('taskInput');
        const taskTitle = taskInput.value;
        if (taskTitle) {
            addTask(taskTitle, currentProjectId);
            renderTasks(currentProjectId);
            taskInput.value = '';
        }

        document.querySelector('.add-task-section').style.display = 'none';
        document.getElementById('add-task-button').style.display = 'block';
    });

    document.getElementById('cancelButton').addEventListener('click', function () {

        document.querySelector('.add-task-section').style.display = 'none';
        document.getElementById('add-task-button').style.display = 'block';
    });

}

// Function to delete a task by ID
function deleteTask(taskId) {
    // Find the index of the task with the given ID
    const taskIndex = tasks.findIndex(task => task.id === taskId);


    if (taskIndex > -1) {

        tasks.splice(taskIndex, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('In theory, task deleted');
    } else {
        console.warn(`Task with ID ${taskId} not found.`);
    }
}


function deleteTaskonClick() {
    document.getElementById('taskList').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-task')) {
            const taskId = parseInt(event.target.nextElementSibling.getAttribute('data-id'), 10);
            deleteTask(taskId);

            if (currentProjectId) {
                renderTasks(currentProjectId);
            }
            else {
                renderTasks();
            }
        }
    });

}


export { tasks, renderTasks, deleteTaskonClick, addTaskClick };