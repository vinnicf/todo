


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
      projectItem.innerHTML = `<i class="fas fa-folder"></i><p data-project-id="${project.id}">${project.name}</p>`;
      projectList.appendChild(projectItem);
    });
  }
  
//Add Project field and buttons
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

function updateProjectTitle(projectName = 'Home') {
  const projectTitleElement = document.getElementById('projectTitle');
  if (projectTitleElement) {
    projectTitleElement.textContent = projectName;
  }
}






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


   
  document.querySelector('.add-task-button').addEventListener('click', function() {
    // Hide the "+ Add Task" button
    this.style.display = 'none';
  
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'New Task';
    input.id = 'taskInput';
    
    // Create 'Add' button
    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add';
    addButton.id = 'addButton';
  
    // Create 'Cancel' button
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.id = 'cancelButton';
  
    // Append the elements
    const mainDiv = document.querySelector('.main');
    mainDiv.appendChild(input);
    mainDiv.appendChild(addButton);
    mainDiv.appendChild(cancelButton);
  
    // Add event listener to 'Add' button
    addButton.addEventListener('click', function() {
      const taskTitle = input.value;
      if (taskTitle) {
        addTask(taskTitle, currentProjectId); // Assuming you have a variable called currentProjectId
        renderTasks(currentProjectId);
      }
      // Remove the form and show the "+ Add Task" button again
      input.remove();
      addButton.remove();
      cancelButton.remove();
      document.querySelector('.add-task-button').style.display = 'block';
    });
  
    // Add event listener to 'Cancel' button
    cancelButton.addEventListener('click', function() {
      input.remove();
      addButton.remove();
      cancelButton.remove();
      document.querySelector('.add-task-button').style.display = 'block';
    });
  });
  

document.querySelector('.home-btn').addEventListener('click', function(event) {
  updateProjectTitle('Home');
  currentProjectId = null;
  renderTasks();
  
});

document.querySelector('.sidebar').addEventListener('click', function(event) {
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
  

  
  
// Render tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateProjectTitle();
    renderTasks();
    renderProjects();
    


});


// Get the modal and its elements
const modal = document.getElementById("editTaskModal");
const btnClose = modal.querySelector(".close");
const btnSave = modal.querySelector("#saveEdit");
const btnCancel = modal.querySelector("#cancelEdit");
const inputField = modal.querySelector("#newTaskTitle");

// Function to open the modal
function openModal(taskId, taskTitle) {
  inputField.value = taskTitle;
  modal.style.display = "block";

  btnSave.onclick = function() {
    const newTitle = inputField.value;
    if (newTitle.trim() !== '') {
      editTask(taskId, newTitle);
      modal.style.display = "none";
    }
  };

  btnCancel.onclick = function() {
    modal.style.display = "none";
  };
}

// When the user clicks on <span> (x), close the modal
btnClose.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



// Update your existing event listener for task list items
document.getElementById('taskList').addEventListener('click', function(event) {
  const taskId = parseInt(event.target.getAttribute('data-id'), 10);
  const taskTitle = event.target.textContent;

  if (taskId) {
    openModal(taskId, taskTitle);
  }
});