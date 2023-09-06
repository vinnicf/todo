// modal.js

let editTaskFunction = null;  // A placeholder for the actual edit task function

// Set the actual edit task function
export function setEditTaskFunction(func) {
  editTaskFunction = func;
}

// Get the modal and its elements
const modal = document.getElementById("editTaskModal");
const btnClose = modal.querySelector(".close");
const btnSave = modal.querySelector("#saveEdit");
const btnCancel = modal.querySelector("#cancelEdit");
const inputField = modal.querySelector("#newTaskTitle");

// Function to open the modal
export function openModal(taskId, taskTitle) {
  inputField.value = taskTitle;
  modal.style.display = "block";

  btnSave.onclick = function buttonsaver() {
    const newTitle = inputField.value;
    if (newTitle.trim() !== '' && typeof editTaskFunction === 'function') {
      editTaskFunction(taskId, newTitle);  // Call the actual edit task function
      modal.style.display = "none";
    }
  };

  btnCancel.onclick = function () {
    modal.style.display = "none";
  };
}

// When the user clicks on <span> (x), close the modal
btnClose.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
