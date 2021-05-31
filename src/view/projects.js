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

    const title = _createTitle(data.title);
    const archiveBtn = _createButton(
      `<span class="material-icons" data-id="${data.id}">inventory_2</span>`,
      'archive'
      );
    const deleteBtn = _createButton(
      `<span class="material-icons" data-id="${data.id}">cancel</span>`,
      'delete'
      );

    project.append(title, archiveBtn, deleteBtn);

    return project
  }


  function _createTitle(value) {

    const title = document.createElement('p');
    title.classList.add('project-title');
    title.innerText = value;

    return title;

  }


  function _createButton(img, type) {
    const btn = document.createElement('div');
    btn.classList.add(type);
    btn.classList.add('btn');
    btn.innerHTML = img;

    return btn;
  }


  return { createProject };

})();

export default projects
