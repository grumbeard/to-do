/*
  PROJECTS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

import createTitle from './shared/title.js'
import createButton from './shared/button.js'

const projects = (function () {

  function createProject(data) {

    const project = document.createElement('div');
    project.classList.add('project');
    project.setAttribute('data-type', 'project');
    project.setAttribute('data-id', data.id);

    const title = createTitle(
      data.title,
      'project',
      data.id
      );
    const archiveBtn = createButton(
      `<span class="material-icons" data-id="${data.id}">inventory_2</span>`,
      'archive',
      data.id
      );
    const deleteBtn = createButton(
      `<span class="material-icons" data-id="${data.id}">cancel</span>`,
      'delete',
      data.id
      );

    project.append(title, archiveBtn, deleteBtn);

    return project
  }

  return { createProject };

})();

export default projects
