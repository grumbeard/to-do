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

      if (data == currentFolderData) _makeActive(folder);
      folder.addEventListener("click", controller.handleSelect);
    });

  }


  function initProjects(projectsData, currentProjectData) {

    _projects.innerHTML = "";
    if (!projectsData) return;
    projectsData.forEach(data => {
      let project = projectsUI.createProject(data);
      _projects.append(project);

      if (data == currentProjectData) _makeActive(project);
      project.addEventListener("click", controller.handleSelect);
    });

  }


  function initTasks(tasksData, currentTaskData) {

    _tasks.innerHTML = "";
    if (!tasksData) return;
    tasksData.forEach(data => {
      let task = tasksUI.createTask(data);
      _tasks.append(task);

      if (data == currentTaskData) _makeActive(task);
      task.addEventListener("click", controller.handleSelect);
    });

  }


  function _makeActive(element) {

    element.classList.add('active');

  }


  return {
    initLayout,
    initFolders,
    initProjects,
    initTasks
  };

})();

export default coordinator
