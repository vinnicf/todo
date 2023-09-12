import { addProjectForm, renderProjects, projects, deleteProjectonClick, currentProjectId } from './project';
import { renderTasks, addTaskClick, tasks, deleteTaskonClick } from './tasks';
import { updateProjectTitle } from './dommanipulation';
import * as Modal from './modal.js';


//Update the list and title when home is clicked
document.querySelector('.home-btn').addEventListener('click', function (event) {
  updateProjectTitle('Home');
  currentProjectId = null;
  renderTasks();

});

//Update the task list and Project title when project is clicked
document.querySelector('.sidebar').addEventListener('click', function (event) {
  const projectId = event.target.getAttribute('data-project-id');
  if (projectId) {
    const project = projects.find(p => p.id == projectId);
    updateProjectTitle(project.name);
    currentProjectId = projectId;
    renderTasks(projectId);
    renderProjects();
  }

});



function editTask(taskId, newTitle) {
  // Find the task with the given ID and update its title
  const taskToEdit = tasks.find(task => task.id === taskId);
  if (taskToEdit) {
    taskToEdit.title = newTitle;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(currentProjectId);
  }
}

Modal.setEditTaskFunction(editTask);

document.addEventListener('DOMContentLoaded', () => {
  updateProjectTitle();
  renderTasks();
  renderProjects();
  addProjectForm();
  deleteProjectonClick();
  deleteTaskonClick();
  addTaskClick();


});


// Task editing
document.getElementById('taskList').addEventListener('click', function (event) {
  if (event.target.tagName === 'P') {
    const taskId = parseInt(event.target.getAttribute('data-id'), 10);
    const taskTitle = event.target.textContent;

    if (taskId) {
      Modal.openModal(taskId, taskTitle);
    }
  }
});


