function updateProjectTitle(projectName = 'Home') {
    const projectTitleElement = document.getElementById('projectTitle');
    if (projectTitleElement) {
      projectTitleElement.textContent = projectName;
    }
  }


  export { updateProjectTitle };