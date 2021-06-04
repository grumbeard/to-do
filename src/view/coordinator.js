/*
  COORDINATOR (UI) MODULE
  This module coordinates DOM changes
  It translates data provided into data consumable by sub modules
*/

import foldersUI from './folders'
import projectsUI from './projects'
import tasksUI from './tasks'
import controller from '../controller'

const coordinator = (function () {

  let _app = document.getElementById("app");
  let _folders;
  let _projects;
  let _tasks;


  function initLayout() {

    const foldersContainer = document.createElement('div');
    foldersContainer.id = 'folders-container';

    const projectsContainer = document.createElement('div');
    projectsContainer.id = 'projects-container';

    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'tasks-container';

    const footer = _createFooter();

    _app.append(foldersContainer, projectsContainer, tasksContainer, footer);
    _folders = document.getElementById("folders-container");
    _projects = document.getElementById("projects-container");
    _tasks = document.getElementById("tasks-container");

  }


  function initFolders(foldersData, currentFolderData) {

    _folders.innerHTML = "";
    foldersData.forEach(data => {
      let folder = foldersUI.createFolder(data);
      _folders.append(folder);

      folder.addEventListener("click", controller.handleSelect);

      if (data == currentFolderData) _makeActive('folder', folder);
    });

  }


  function initProjects(projectsData, currentProjectData) {

    _projects.innerHTML = "";
    if (!projectsData) return;
    projectsData.forEach(data => {
      let project = null;

      if (data == currentProjectData) {
        project = projectsUI.createActiveProject(data)
        _makeActive('project', project);
      } else {
        project = projectsUI.createProject(data);
      }

      _projects.append(project);

      project.addEventListener("click", controller.handleSelect);

    });

  }


  function initTasks(tasksData, currentTaskData) {

    _tasks.innerHTML = "";
    if (!tasksData) return;
    tasksData.forEach(data => {
      let task = tasksUI.createTask(data);
      _tasks.append(task);

      const taskSummary = task.querySelector('.task-summary-container');

      taskSummary.addEventListener("click", controller.handleSelect);
      _bindEventToChild(taskSummary, 'priority', 'click', controller.handleTogglePriority);
      _bindEventToChild(taskSummary, 'done', 'click', controller.handleToggleDone);

      if (data == currentTaskData) _makeActive('task', task);
    });

  }


  function _makeActive(type, element) {

    element.classList.add('active');

    switch(type) {

      case 'folder':
        break;

      case 'project':
        _bindEventToChild(element, 'archive', 'click', controller.handleArchive);
        _bindEventToChild(element, 'delete', 'click', controller.handleDelete);
        break;

      case 'task':
        const taskDetails = element.querySelector('.task-details-container');
        taskDetails.classList.remove('hide');

        const buttons = element.querySelector('.task-details-btns-container');

        _bindEventToChild(buttons, 'save', 'click', controller.handleSave);
        _bindEventToChild(buttons, 'delete', 'click', controller.handleDelete);
        break;

      default:
        console.log("unknown selection type");

    }

  }


  function _bindEventToChild(parent, childClass, event, eventHandler) {

    let target = null;

    parent.childNodes.forEach(element => {
      if (element.classList.contains(childClass)) target = element;
    });

    target.addEventListener(event, eventHandler);

  }


  function getFieldValue(fieldName, id) {

    const fieldClassNames = {
      due: '.task-detail-due',
      description: '.task-detail-do'
    }

    const field = document.querySelector(fieldClassNames[fieldName]);
    let fieldValue = null;

    switch(fieldName) {
      case 'due':
        fieldValue = field.querySelector('input').valueAsDate;
        break;
      case 'description':
        fieldValue = field.querySelector('textarea').value;
        break;
      default:
        console.log('Invalid field');
    }


    return fieldValue;
  }


  function _createFooter() {

    const footer = document.createElement('footer');

    const footerContent = document.createElement('a');
    footerContent.classList.add('footer-content');
    footerContent.setAttribute('href', 'https://github.com/grumbeard/to-do');

    const footerText = document.createElement('p');
    footerText.classList.add('footer-text');
    footerText.innerText = '© 2021 grumbeard'

    footerContent.append(footerText);
    footer.append(footerContent);

    return footer;

  }


  return {
    initLayout,
    initFolders,
    initProjects,
    initTasks,
    getFieldValue
  };

})();

export default coordinator
