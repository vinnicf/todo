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

// Modal.js
export default openModal;
  