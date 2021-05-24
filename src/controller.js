/*
  CONTROLLER MODULE
  This module makes decisions on how and what modules interact
*/

import Folder from './folders'
import Project from './projects'
import Task from './tasks'
import seedData from './seeds'
import viewCoordinator from './view/coordinator'

const controller = (function () {
  let _folders = null;
  let _projects = null;
  let _currentFolder = null;
  let _currentProject = null;
  let _currentTask = null;

  function initToDo() {
    seedData();
    viewCoordinator.initLayout();
    _initFolders();
    viewCoordinator.initFolders(_folders, _currentFolder);
    _initProjects();
    viewCoordinator.initProjects(_currentFolder.projects, _currentProject);
    _initTasks();
    viewCoordinator.initTasks(_currentProject.tasks, _currentTask);
  };

  function _initFolders() {
    _folders = Folder.list;
    if (_folders) _setCurrentFolder(_folders[0]);
  }

  function _initProjects() {
    _projects = Project.list;
    if (_currentFolder.projects) _setCurrentProject(_currentFolder.projects[0]);

  }

  function _initTasks() {
    if (_currentProject.tasks) _setCurrentTask(_currentProject.tasks[0]);
  }

  function _setCurrentFolder(folder) {
    let testFolder = (folder) ? folder : _folders[1];
    _currentFolder = testFolder;
  }

  function _setCurrentProject(project) {
    let testProject = (project) ? project : _projects[1];
    _currentProject = testProject;
  }

  function _setCurrentTask(task) {
    let testTask =  (task) ? task : _currentProject.tasks[0];
    _currentTask = testTask;
  }

  function _createProject(project) {
    let testProjectData = (project) ? project : { title: "Project Title 1" }
    const newProject = new Project(testProjectData.title);

    _currentFolder.addProject(newProject);
    _setCurrentProject(newProject);
  };

  function _createTask(task) {
    let testTaskData = (task) ? task : { title: "Task Title 1" }
    const newTask = new Task(testTaskData.title);

    _currentProject.addTask(newTask);
    _setCurrentTask(newTask);
  };

  return { initToDo };
})();

export default controller
