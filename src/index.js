


class Project {
    constructor(name) {
        this.name = name;
        this.id = new Date().getTime();
    }

}


class Task {
    constructor(title,text) {
      this.title = title
      this.text = text;
      this.projectId = projectId;
      this.id = new Date().getTime(); // unique ID
    }
  }


const projects = [new Project('Home'), new Project('Work')];

let tasks = [
    { title: 'Lavar o carro', text:'O carro esta bem sujo ne', projectId: projects[0].id, id: 1693435297401 },
    { title: 'Aprender react', text:'Precisamos disso para evoluir na vida', projectId: projects[0].id, id: 1693435298401 }
  ];



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
      
            renderTasks(tasks);

            taskInput.value = '';
    }
        });

});