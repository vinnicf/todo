import { tasks } from './index';

class Project {
  constructor(name) {
    this.name = name;
    this.id = new Date().getTime();
  }

}

export let projects = JSON.parse(localStorage.getItem('projects')) || [];

function addProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projects));
}


function renderProjects() {
  const projectList = document.querySelector('.sidebar-projects');
  projectList.innerHTML = ''; // Clear existing projects
  projects.forEach(project => {
    const projectItem = document.createElement('div');
    projectItem.classList.add('sidebar-item');
    projectItem.innerHTML = `
      <i class="fas fa-folder"></i>
      <p data-project-id="${project.id}">${project.name}</p>
      <i class="fas fa-times delete-project"></i>`;
    projectList.appendChild(projectItem);
  });
}


function addProjectForm() {
  //Add Project field and buttons
  document.querySelector('.add-project').addEventListener('click', function () {

    this.style.display = 'none';

    //Input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter project name';
    input.id = 'new-project-name';
    input.classList.add('project-input');

    //  'Save' button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.classList.add('save-project');

    // 'Cancel' button
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancel-project');

    const sidebar = document.querySelector('.sidebar');
    sidebar.appendChild(input);
    sidebar.appendChild(saveButton);
    sidebar.appendChild(cancelButton);

    // Event Listener for the 'Save' button
    saveButton.addEventListener('click', () => {
      const name = input.value;
      if (name) {
        addProject(name);
        renderProjects();
        // Remove input and buttons
        input.remove();
        saveButton.remove();
        cancelButton.remove();
        // Show the 'Add Project' button again
        document.querySelector('.add-project').style.display = 'flex';
      }
    });


    // Event Listener for the 'Cancel' button
    cancelButton.addEventListener('click', () => {
      // Remove input and buttons
      input.remove();
      saveButton.remove();
      cancelButton.remove();
      // Show the 'Add Project' button again
      document.querySelector('.add-project').style.display = 'flex';
    });

  });


}


function deleteProject(projectId) {
  // Check if there are any tasks associated with this project
  const associatedTasks = tasks.filter(task => task.projectId == projectId);

  if (associatedTasks.length === 0) {
    // No tasks are associated, so it's safe to delete the project
    const projectIndex = projects.findIndex(project => project.id === projectId);
    if (projectIndex > -1) {
      projects.splice(projectIndex, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      renderProjects();  // Re-render the projects
    }
  } else {
    // Tasks are associated, so we can't delete the project
    alert('Cannot delete a project that has tasks.');
  }
}


function deleteProjectonClick() {
  document.querySelector('.sidebar-projects').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-project')) {
      const projectId = parseInt(event.target.previousElementSibling.getAttribute('data-project-id'), 10);
      deleteProject(projectId);
    }
  });

}



export { addProjectForm, renderProjects, deleteProjectonClick };