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
  let _tasks = null;
  let _currentFolder = null;
  let _currentProject = null;
  let _currentTask = null;


  function initToDo() {

    seedData();
    _initFolders();
    _initProjects();
    _initTasks();
    viewCoordinator.initLayout();
    _updateDisplay();

  };


  function _initFolders() {

    _folders = Folder.list;
    if (_folders.length != 0) _setCurrent('folder', _folders[0]);

  }


  function _initProjects() {

    _projects = _currentFolder.projects;
    if (_projects.length != 0 ) _setCurrent('project', _projects[0]);

  }


  function _initTasks() {

    _tasks = _currentProject.tasks;
    if (_tasks.length != 0 ) _setCurrent('task', _tasks[0]);

  }


  function handleSelect(e) {

    let type = e.target.dataset.type;
    let id = e.target.dataset.id;
    let obj = null;

    switch(type) {
      case 'folder':
        obj = _folders.find(folder => folder.id == id);
        break;
      case 'project':
        obj = _projects.find(project => project.id == id);
        break;
      case 'task':
        obj = _tasks.find(task => task.id == id);
        break;
      default:
        return;
    }

    _setCurrent(type, obj);
    _updateData();
    _updateDisplay();

  }


  function _setCurrent(type, obj) {

    switch(type) {
      case 'folder':
        _currentFolder = obj;
        // Check if folder has projects
        if (_checkXContainsY(_currentFolder, 'projects')) {
          _currentProject = obj.projects[0]
        } else {
          _currentProject = null;
          _currentTask = null;
          return;
        }
        // Check if project has tasks
        if (_checkXContainsY(_currentProject, 'tasks')) {
          _currentTask = _currentProject.tasks[0]
        } else {
          _currentTask = null;
        }
        break;
      case 'project':
        _currentProject = obj;
        // Check if project has tasks
        if (_checkXContainsY(_currentProject, 'tasks')) {
          _currentTask = obj.tasks[0]
        } else {
          _currentTask = null;
        }
        break;
      case 'task':
        _currentTask = obj;
        break;
    }

  }


  function _updateData() {

    _folders = Folder.list;

    // Check if folder has projects
    if (_checkXContainsY(_currentFolder, 'projects')) {
      _projects = _currentFolder.projects;
    } else {
      _projects = null;
      _tasks = null;
      return;
    }

    if (_checkXContainsY(_currentProject, 'tasks')) {
      _tasks = _currentProject.tasks;
    } else {
      _tasks = null;
      return;
    }

  }


  function _updateDisplay() {

    viewCoordinator.initFolders(_folders, _currentFolder);
    viewCoordinator.initProjects(_projects, _currentProject);
    viewCoordinator.initTasks(_tasks, _currentTask);

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


  function handleArchive(e) {

    e.stopPropagation();

    let project = _projects.find(proj => proj._id == e.target.dataset.id);
    let oldProjectFolder = _folders.find(f => f.projects.includes(project))
    let newProjectFolder = _folders.find(f => f.name == "Archive")

    // Move project to Archive folder
    oldProjectFolder.removeProject(project);
    newProjectFolder.addProject(project);

    _updateData();
    _updateDisplay();

  }


  function handleDelete(e) {

    e.stopPropagation();

    let project = _projects.find(proj => proj._id == e.target.dataset.id);
    let folder = _folders.find(f => f.projects.includes(project))

    folder.removeProject(project);

    _updateData();
    _updateDisplay();

  }

  function _deleteProject(project) {

    // Delete all tasks for project
    _deleteTasks(project);

    // Make project null
    project.delete();

    // Remove from list of projects
    let index = _projects.indexOf(project);
    _projects.splice(index, 1);

  }

  function _deleteTasks(project) {
    project.tasks.forEach(task => {
      // Make task null
      task.delete();

      // Remove task from project
      project.removeTask(task);
    })

  }


  function _checkXContainsY(x, y) {

    return (x[y].length == 0) ? false : true;

  }


  return {
    initToDo,
    handleSelect,
    handleArchive,
    handleDelete
  };

})();

export default controller
