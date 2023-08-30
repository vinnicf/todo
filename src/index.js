class Task {
    constructor(text) {
      this.text = text;
      this.id = new Date().getTime(); // unique ID
    }
  }


  let tasks = [
    { text: 'Esta eh a sua primeira tarefa', id: 1693435297401 },
    { text: 'Esta eh a sua segunda tarefa', id: 1693435298401 }
  ];


// Function to render tasks
const renderTasks = (taskArray) => {
    // Get the task list element
    const taskListElement = document.getElementById('taskList');
  
    // Clear existing tasks from the list
    taskListElement.innerHTML = '';
  
    // Loop through each task in the array
    taskArray.forEach((task) => {
      
      const listItemElement = document.createElement('li');
  
    
      listItemElement.textContent = task.text;
  
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
            // Create a new Task object
            const newTask = new Task(taskText);
      
            // Add the new Task object to the tasks array
            tasks.push(newTask);
      
            // Re-render the task list
            renderTasks(tasks);

            taskInput.value = '';
    }
        });

});