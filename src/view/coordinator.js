/*
  COORDINATOR (UI) MODULE
  This module coordinates DOM changes
*/

import foldersUI from './folders'
import projectsUI from './projects'

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
    foldersData.forEach(data => {
      let folder = foldersUI.createFolder(data.name);
      _folders.append(folder);

      if (data == currentFolderData) makeActive(folder);
    });
  }

  function initProjects(projectsData, currentProjectData) {
    projectsData.forEach(data => {
      let project = projectsUI.createProject(data.title);
      _projects.append(project);

      if (data == currentProjectData) makeActive(project);
    });
  }

  function initTasks(tasksData, currentTaskData) {
    tasksData.forEach(data => {
      let task = tasksUI.createTask(data.title);
      _tasks.append(task);

      if (data == currentTaskData) makeActive(task);
    });
  }

  function makeActive(element) {
    element.classList.add('active');
  }

  return {
    initLayout,
    initFolders,
    initProjects,
  };
})();

export default coordinator
