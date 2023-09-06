import { addProjectForm, renderProjects, projects, deleteProjectonClick } from './project';
import { updateProjectTitle } from './dommanipulation';
import * as Modal from './modal.js';



//Task constructor 
class Task {
  constructor(title, projectId = null) {
    this.title = title;
    this.projectId = projectId;
    this.id = new Date().getTime(); // unique ID
  }
}


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let currentProjectId = null;

// Function to render tasks
const renderTasks = (projectId = null) => {

  const taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';

  const filteredTasks = projectId ? tasks.filter(task => task.projectId == projectId) : tasks;

  // Loop through each task in the array
  filteredTasks.forEach((task) => {

    const listItemElement = document.createElement('li');
    listItemElement.textContent = task.title;
    listItemElement.setAttribute('data-id', task.id);
    taskListElement.appendChild(listItemElement);
  });
};


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.add-task-button').addEventListener('click', function () {
    // Hide the "+ Add Task" button
    this.style.display = 'none';
    console.log("Button clicked");

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

    // Show the "+ Add Task" button
    document.querySelector('.add-task-button').style.display = 'block';
  });

  document.getElementById('cancelButton').addEventListener('click', function () {
    // Hide the input and buttons
    document.querySelector('.add-task-section').style.display = 'none';

    // Show the "+ Add Task" button
    document.querySelector('.add-task-button').style.display = 'block';
  });

});


document.querySelector('.home-btn').addEventListener('click', function (event) {
  updateProjectTitle('Home');
  currentProjectId = null;
  renderTasks();

});

document.querySelector('.sidebar').addEventListener('click', function (event) {
  const projectId = event.target.getAttribute('data-project-id');
  if (projectId) {
    const project = projects.find(p => p.id == projectId);
    updateProjectTitle(project.name);
    currentProjectId = projectId;
    renderTasks(projectId);
  }

});


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

function editTask(taskId, newTitle) {
  // Find the task with the given ID and update its title
  const taskToEdit = tasks.find(task => task.id === taskId);
  if (taskToEdit) {
    taskToEdit.title = newTitle;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

Modal.setEditTaskFunction(editTask);

// Render tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateProjectTitle();
  renderTasks();
  renderProjects();
  addProjectForm();
  deleteProjectonClick();



});


// Update your existing event listener for task list items
document.getElementById('taskList').addEventListener('click', function (event) {
  const taskId = parseInt(event.target.getAttribute('data-id'), 10);
  const taskTitle = event.target.textContent;

  if (taskId) {
    Modal.openModal(taskId, taskTitle);
  }
});

export { tasks };