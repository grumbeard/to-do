/*
  PROJECTS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

const projects = (function () {
  function createProject(title) {
    const project = document.createElement('div');
    project.classList.add('project');
    project.innerText = title;

    return project
  }

  return { createProject };
})();

export default projects
