/*
  PROJECTS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

const projects = (function () {

  function createProject(data) {

    const project = document.createElement('div');
    project.classList.add('project');
    project.setAttribute('data-type', 'project');
    project.setAttribute('data-id', data.id);
    project.innerText = data.title;

    return project
  }

  return { createProject };

})();

export default projects
