


class Project {
    constructor(name) {
        this.name = name;
        this.id = new Date().getTime();
    }

}



let projects = JSON.parse(localStorage.getItem('projects')) || [];


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
      projectItem.innerHTML = `<i class="fas fa-folder"></i><p>${project.name}</p>`;
      projectList.appendChild(projectItem);
    });
  }
  

document.querySelector('.add-project').addEventListener('click', function() {

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

  
class Task {
    constructor(title,text) {
      this.title = title
      this.text = text;
      this.projectId = projectId;
      this.id = new Date().getTime(); // unique ID
    }
  }



let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Function to render tasks
const renderTasks = (taskArray) => {
    // Get the task list element
    const taskListElement = document.getElementById('taskList');
  
    taskListElement.innerHTML = '';
  
    // Loop through each task in the array
    taskArray.forEach((task) => {
      
      const listItemElement = document.createElement('li');
  
    
      listItemElement.textContent = task.title;
  
      // Append the list item to the task list
      taskListElement.appendChild(listItemElement);
    });
  };

  // Render tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(tasks);
    renderProjects()
 
    const addTaskForm = document.getElementById('addTaskForm');

    addTaskForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // Get the input field
        const taskInput = document.getElementById('taskInput');

        const taskText = taskInput.value;

        if (taskText) {
            
            const newTask = new Task(taskText);
      
            tasks.push(newTask);

            localStorage.setItem('tasks', JSON.stringify(tasks));
      
            renderTasks(tasks);

            taskInput.value = '';
    }
        });

});