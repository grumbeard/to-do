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

    _app.append(foldersContainer, projectsContainer, tasksContainer);
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
      let project = projectsUI.createProject(data);
      _projects.append(project);

      project.addEventListener("click", controller.handleSelect);

      if (data == currentProjectData) _makeActive('project', project);
    });

  }


  function initTasks(tasksData, currentTaskData) {

    _tasks.innerHTML = "";
    if (!tasksData) return;
    tasksData.forEach(data => {
      let task = tasksUI.createTask(data);
      _tasks.append(task);

      task.addEventListener("click", controller.handleSelect);
      _bindEventToChild(task, 'priority', 'click', controller.handleTogglePriority);
      _bindEventToChild(task, 'done', 'click', controller.handleToggleDone);

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


  return {
    initLayout,
    initFolders,
    initProjects,
    initTasks
  };

})();

export default coordinator
