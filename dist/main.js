/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _folders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folders */ \"./src/folders.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _seeds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./seeds */ \"./src/seeds.js\");\n/* harmony import */ var _view_coordinator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/coordinator */ \"./src/view/coordinator.js\");\n/*\n  CONTROLLER MODULE\n  This module makes decisions on how and what modules interact\n*/\n\n\n\n\n\n\n\nconst controller = (function () {\n\n  let _folders = null;\n  let _projects = null;\n  let _tasks = null;\n  let _currentFolder = null;\n  let _currentProject = null;\n  let _currentTask = null;\n\n\n  function initToDo() {\n\n    (0,_seeds__WEBPACK_IMPORTED_MODULE_3__.default)();\n    _initFolders();\n    _initProjects();\n    _initTasks();\n    _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.initLayout();\n    _updateDisplay();\n\n  };\n\n\n  function _initFolders() {\n\n    _folders = _folders__WEBPACK_IMPORTED_MODULE_0__.default.list;\n    if (_folders.length != 0) _setCurrent('folder', _folders[0]);\n\n  }\n\n\n  function _initProjects() {\n\n    _projects = _currentFolder.projects;\n    if (_projects.length != 0 ) _setCurrent('project', _projects[0]);\n\n  }\n\n\n  function _initTasks() {\n\n    _tasks = _currentProject.tasks;\n    if (_tasks.length != 0 ) _setCurrent('task', _tasks[0]);\n\n  }\n\n\n  function handleSelect(e) {\n\n    let type = e.target.dataset.type;\n    let id = e.target.dataset.id;\n    let obj = null;\n\n    switch(type) {\n      case 'folder':\n        obj = _folders.find(folder => folder.id == id);\n        break;\n      case 'project':\n        obj = _projects.find(project => project.id == id);\n        break;\n      case 'task':\n        obj = _tasks.find(task => task.id == id);\n        break;\n      default:\n        return;\n    }\n\n    _setCurrent(type, obj);\n    _updateData();\n    _updateDisplay();\n\n  }\n\n\n  function _setCurrent(type, obj) {\n\n    switch(type) {\n      case 'folder':\n        _currentFolder = obj;\n        // Check if folder has projects\n        if (_checkXContainsY(_currentFolder, 'projects')) {\n          _currentProject = obj.projects[0]\n        } else {\n          _currentProject = null;\n          _currentTask = null;\n          return;\n        }\n        // Check if project has tasks\n        if (_checkXContainsY(_currentProject, 'tasks')) {\n          _currentTask = _currentProject.tasks[0]\n        } else {\n          _currentTask = null;\n        }\n        break;\n      case 'project':\n        _currentProject = obj;\n        // Check if project has tasks\n        if (_checkXContainsY(_currentProject, 'tasks')) {\n          _currentTask = obj.tasks[0]\n        } else {\n          _currentTask = null;\n        }\n        break;\n      case 'task':\n        _currentTask = obj;\n        break;\n    }\n\n  }\n\n\n  function _updateData() {\n\n    _folders = _folders__WEBPACK_IMPORTED_MODULE_0__.default.list;\n\n    // Check if folder has projects\n    if (_checkXContainsY(_currentFolder, 'projects')) {\n      _projects = _currentFolder.projects;\n    } else {\n      _projects = null;\n      _tasks = null;\n      return;\n    }\n\n    // Check if project has tasks\n    if (_checkXContainsY(_currentProject, 'tasks')) {\n      _tasks = _currentProject.tasks;\n    } else {\n      _tasks = null;\n      return;\n    }\n\n  }\n\n\n  function _updateDisplay() {\n\n    _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.initFolders(_folders, _currentFolder);\n    _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.initProjects(_projects, _currentProject);\n    _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.initTasks(_tasks, _currentTask);\n\n  }\n\n\n  function _createProject(project) {\n\n    const testProjectData = (project) ? project : { title: \"Project Title 1\" }\n    const newProject = new _projects__WEBPACK_IMPORTED_MODULE_1__.default(testProjectData.title);\n\n    _currentFolder.addProject(newProject);\n    _setCurrentProject(newProject);\n\n  };\n\n\n  function _createTask(task) {\n\n    const testTaskData = (task) ? task : { title: \"Task Title 1\" }\n    const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.default(testTaskData.title);\n\n    _currentProject.addTask(newTask);\n    _setCurrentTask(newTask);\n\n  };\n\n\n  function handleArchive(e) {\n\n    e.stopPropagation();\n\n    const project = _projects.find(proj => proj._id == e.target.dataset.id);\n    const oldProjectFolder = _folders.find(f => f.projects.includes(project))\n    const newProjectFolder = _folders.find(f => f.name == \"Archive\")\n\n    // Move project to Archive folder\n    oldProjectFolder.removeProject(project);\n    newProjectFolder.addProject(project);\n\n    _updateData();\n    _updateDisplay();\n\n  }\n\n\n  function handleDelete(e) {\n\n    e.stopPropagation();\n\n    const project = _projects.find(proj => proj._id == e.target.dataset.id);\n    const folder = _folders.find(f => f.projects.includes(project))\n\n    folder.removeProject(project);\n\n    _updateData();\n    _updateDisplay();\n\n  }\n\n\n  function _deleteProject(project) {\n\n    // Delete all tasks for project\n    _deleteTasks(project);\n\n    // Make project null\n    project.delete();\n\n    // Remove from list of projects\n    let index = _projects.indexOf(project);\n    _projects.splice(index, 1);\n\n  }\n\n\n  function _deleteTasks(project) {\n\n    project.tasks.forEach(task => {\n      // Make task null\n      task.delete();\n\n      // Remove task from project\n      project.removeTask(task);\n    })\n\n  }\n\n\n  function handleTogglePriority(e) {\n\n    e.stopPropagation();\n\n    const task = _tasks.find(t => t._id == e.target.dataset.id);\n    task.priority = !task.priority;\n\n    _updateDisplay();\n\n  }\n\n\n  function handleToggleDone(e) {\n\n    e.stopPropagation();\n\n    const task = _tasks.find(t => t._id == e.target.dataset.id);\n    task.done = !task.done;\n\n    _updateDisplay();\n\n  }\n\n\n  function handleSave(e) {\n\n    e.stopPropagation();\n\n    const task = _tasks.find(t => t._id == e.target.dataset.id);\n\n    const newDue = _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.getFieldValue('due', task.id);\n    const newDescription = _view_coordinator__WEBPACK_IMPORTED_MODULE_4__.default.getFieldValue('description', task.id);\n\n    task.due = newDue;\n    task.description = newDescription;\n\n    _updateDisplay();\n\n  }\n\n\n  function handleDelete(e) {\n\n    e.stopPropagation();\n\n    const task = _tasks.find(t => t._id == e.target.dataset.id);\n    // Make task null\n    task.delete();\n\n    // Remove task from project (assumed to be Current Project)\n    _currentProject.removeTask(task);\n\n    _currentTask = null;\n    _updateDisplay();\n\n  }\n\n\n  function _checkXContainsY(x, y) {\n\n    return (x[y].length == 0) ? false : true;\n\n  }\n\n\n  return {\n    initToDo,\n    handleSelect,\n    handleArchive,\n    handleDelete,\n    handleTogglePriority,\n    handleToggleDone,\n    handleSave,\n    handleDelete\n  };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);\n\n\n//# sourceURL=webpack://to-do/./src/controller.js?");

/***/ }),

/***/ "./src/folders.js":
/*!************************!*\
  !*** ./src/folders.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\n  FOLDERS MODULE\n  This module allows folder objects to be created\n  Each folder allows projects to be added / removed from it\n*/\n\nclass Folder {\n\n  constructor(folderData) {\n\n    this._name = folderData.name;\n    this._projects = folderData.projects || [];\n    this._id = Folder._count;\n    Folder.add(this);\n\n  }\n\n\n  get name() { return this._name; }\n  get projects() { return this._projects; }\n  get id() { return this._id; }\n\n\n  set name(value) {\n\n    if (value.length > 15) {\n      alert(\"Name is too long\");\n      return;\n    }\n    this._name = value.toString();\n\n  }\n\n\n  addProject(project) {\n\n    this.projects.push(project);\n\n  }\n\n\n  removeProject(project) {\n\n    let index = this.projects.indexOf(project);\n    this.projects.splice(index, 1);\n\n  }\n\n\n  // Static Properties\n  static _list = [];\n  static _count = 0;\n\n\n  // Static Methods\n  static get list() { return this._list; }\n\n\n  static add(folder) {\n\n    this._list.push(folder);\n    this._count++;\n\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Folder);\n\n\n//# sourceURL=webpack://to-do/./src/folders.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ \"./src/controller.js\");\n\n\n_controller__WEBPACK_IMPORTED_MODULE_0__.default.initToDo();\n\n\n//# sourceURL=webpack://to-do/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\n  PROJECTS MODULE\n  This module allows project objects to be created / deleted\n  Each project is assigned to one and only one folder\n  Each project allows tasks to be added / removed from it\n*/\n\nclass Project {\n\n  constructor(projectData) {\n\n    this._title = projectData.title;\n    this._tasks = projectData.tasks || [];\n    this._id = Project._count;\n    Project._count++;\n\n  }\n\n\n  get title() { return this._title; }\n  get tasks() { return this._tasks }\n  get id() { return this._id; }\n\n\n  set title(value) {\n\n    if (value.length > 30) {\n      alert(\"Title is too long\");\n      return;\n    }\n    this._title = value.toString();\n\n  }\n\n\n  addTask(task) {\n\n    this._tasks.push(task);\n\n  }\n\n\n  removeTask(task) {\n\n    let index = this._tasks.indexOf(task);\n    this._tasks.splice(index, 1);\n\n  }\n\n\n  delete() {\n\n    Object.keys(this).forEach(prop => {\n      delete this[prop];\n    });\n\n  }\n\n\n  // Static Properties\n  static _count = 0;\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n\n//# sourceURL=webpack://to-do/./src/projects.js?");

/***/ }),

/***/ "./src/seeds.js":
/*!**********************!*\
  !*** ./src/seeds.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _folders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folders */ \"./src/folders.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n\n\n\n\n/*\n  SEED DATA\n  Demo data for initializing ToDo app\n*/\n\nfunction seedData () {\n\n  // Generate folders\n  const folderNames = [\"Learning Log\", \"Writing\", \"Misc\", \"Experiments\", \"Compendium\", \"Archive\"];\n\n  folderNames.forEach(folderName => {\n    let folder = new _folders__WEBPACK_IMPORTED_MODULE_0__.default({ name: folderName });\n  });\n\n  const seedFolders = _folders__WEBPACK_IMPORTED_MODULE_0__.default.list;\n\n  // Generate projects\n  for (let i = 0; i < 5; i++) {\n    let proj = new _projects__WEBPACK_IMPORTED_MODULE_1__.default({ title: `Project No. ${i}` });\n\n    // Add first project to first task\n    if (i == 0) {\n      seedFolders[0].addProject(proj);\n      continue;\n    }\n\n    // Add project to random task\n    let index = Math.floor(Math.random() * folderNames.length);\n    seedFolders[index].addProject(proj);\n  }\n\n  // Generate tasks\n  for (let i = 0; i < 20; i++) {\n    let task = new _tasks__WEBPACK_IMPORTED_MODULE_2__.default({\n      title: `Task No. ${i}`,\n      priority: (Math.random() > 0.5),\n      done: (Math.random() > 0.5),\n      due: _getRandomDate(),\n      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel elementum ipsum. Praesent sollicitudin felis eros, non laoreet nulla pretium vel.'\n    });\n\n    // Add task to random project\n    let index1 = Math.floor(Math.random() * 5);\n    let folder = seedFolders[index1];\n    if (folder.projects.length == 0) folder = seedFolders[0];\n\n    let index2 = Math.floor(Math.random() * folder.projects.length);\n    let project = folder.projects[index2]\n    project.addTask(task);\n  }\n\n  function _getRandomDate() {\n    let today = new Date();\n    let date = new Date();\n\n    const sign = [1, -1];\n    let multiplier = (sign[Math.floor(Math.random() * 2)]);\n    date.setDate(today.getDate() + (multiplier * (Math.floor(Math.random() * 100))));\n\n    return date;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (seedData);\n\n\n\n//# sourceURL=webpack://to-do/./src/seeds.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\n  TASKS MODULE\n  This module allows task objects to be created / deleted\n  Each task is assigned to one and only one project\n*/\n\nclass Task {\n\n  constructor(taskData) {\n\n    this._title = taskData.title;\n    this._description = taskData.description || null;\n    this._due = taskData.due || null;\n    this._priority = taskData.priority || false;\n    this._done = taskData.done || false;\n    this._id = Task._count;\n    Task._count++;\n\n  }\n\n\n  get title() { return this._title; }\n  get description() { return this._description; }\n  get due() { return this._due; }\n  get priority() { return this._priority; }\n  get done() { return this._done; }\n  get id() { return this._id; }\n\n\n  set title(value) {\n\n    if (value.length > 40) {\n      alert(\"Title is too long\");\n      return;\n    }\n    this._title = value.toString();\n\n  }\n\n\n  set description(value) {\n\n    if (value.length > 200) {\n      alert(\"YoU nEeD tO bE mOrE cOnCiSe\");\n      return;\n    }\n    this._description = value.toString();\n\n  }\n\n\n  set due(date) {\n\n    if (!date) {\n      this._due = null;\n    } else if (!(date instanceof Date)) {\n      alert(\"That's not a date\");\n    }\n    this._due = date;\n\n  }\n\n\n  set priority(value) {\n\n    (value) ? this._priority = true : this._priority = false;\n\n  }\n\n\n  set done(value) {\n\n    (value) ? this._done = true : this._done = false;\n\n  }\n\n\n  delete() {\n\n    Object.keys(this).forEach(prop => {\n      delete this[prop];\n    });\n\n  }\n\n\n  // Static Properties\n  static _count = 0;\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n\n//# sourceURL=webpack://to-do/./src/tasks.js?");

/***/ }),

/***/ "./src/view/coordinator.js":
/*!*********************************!*\
  !*** ./src/view/coordinator.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _folders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./folders */ \"./src/view/folders.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/view/projects.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ \"./src/view/tasks.js\");\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller */ \"./src/controller.js\");\n/*\n  COORDINATOR (UI) MODULE\n  This module coordinates DOM changes\n  It translates data provided into data consumable by sub modules\n*/\n\n\n\n\n\n\nconst coordinator = (function () {\n\n  let _app = document.getElementById(\"app\");\n  let _folders;\n  let _projects;\n  let _tasks;\n\n\n  function initLayout() {\n\n    const foldersContainer = document.createElement('div');\n    foldersContainer.id = 'folders-container';\n\n    const projectsContainer = document.createElement('div');\n    projectsContainer.id = 'projects-container';\n\n    const tasksContainer = document.createElement('div');\n    tasksContainer.id = 'tasks-container';\n\n    const footer = _createFooter();\n\n    _app.append(foldersContainer, projectsContainer, tasksContainer, footer);\n    _folders = document.getElementById(\"folders-container\");\n    _projects = document.getElementById(\"projects-container\");\n    _tasks = document.getElementById(\"tasks-container\");\n\n  }\n\n\n  function initFolders(foldersData, currentFolderData) {\n\n    _folders.innerHTML = \"\";\n    foldersData.forEach(data => {\n      let folder = _folders__WEBPACK_IMPORTED_MODULE_0__.default.createFolder(data);\n      _folders.append(folder);\n\n      folder.addEventListener(\"click\", _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleSelect);\n\n      if (data == currentFolderData) _makeActive('folder', folder);\n    });\n\n  }\n\n\n  function initProjects(projectsData, currentProjectData) {\n\n    _projects.innerHTML = \"\";\n    if (!projectsData) return;\n    projectsData.forEach(data => {\n      let project = _projects__WEBPACK_IMPORTED_MODULE_1__.default.createProject(data);\n      _projects.append(project);\n\n      project.addEventListener(\"click\", _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleSelect);\n\n      if (data == currentProjectData) _makeActive('project', project);\n    });\n\n  }\n\n\n  function initTasks(tasksData, currentTaskData) {\n\n    _tasks.innerHTML = \"\";\n    if (!tasksData) return;\n    tasksData.forEach(data => {\n      let task = _tasks__WEBPACK_IMPORTED_MODULE_2__.default.createTask(data);\n      _tasks.append(task);\n\n      task.addEventListener(\"click\", _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleSelect);\n      _bindEventToChild(task, 'priority', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleTogglePriority);\n      _bindEventToChild(task, 'done', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleToggleDone);\n\n      if (data == currentTaskData) _makeActive('task', task);\n    });\n\n  }\n\n\n  function _makeActive(type, element) {\n\n    element.classList.add('active');\n\n    switch(type) {\n\n      case 'folder':\n        break;\n\n      case 'project':\n        _bindEventToChild(element, 'archive', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleArchive);\n        _bindEventToChild(element, 'delete', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleDelete);\n        break;\n\n      case 'task':\n        const taskDetails = element.querySelector('.task-details-container');\n        taskDetails.classList.remove('hide');\n\n        const buttons = element.querySelector('.task-details-btns-container');\n\n        _bindEventToChild(buttons, 'save', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleSave);\n        _bindEventToChild(buttons, 'delete', 'click', _controller__WEBPACK_IMPORTED_MODULE_3__.default.handleDelete);\n        break;\n\n      default:\n        console.log(\"unknown selection type\");\n\n    }\n\n  }\n\n\n  function _bindEventToChild(parent, childClass, event, eventHandler) {\n\n    let target = null;\n\n    parent.childNodes.forEach(element => {\n      if (element.classList.contains(childClass)) target = element;\n    });\n\n    target.addEventListener(event, eventHandler);\n\n  }\n\n\n  function getFieldValue(fieldName, id) {\n\n    const fieldClassNames = {\n      due: '.task-detail-due',\n      description: '.task-detail-do'\n    }\n\n    const field = document.querySelector(fieldClassNames[fieldName]);\n    let fieldValue = null;\n\n    switch(fieldName) {\n      case 'due':\n        fieldValue = field.querySelector('input').valueAsDate;\n        break;\n      case 'description':\n        fieldValue = field.querySelector('textarea').value;\n        break;\n      default:\n        console.log('Invalid field');\n    }\n\n\n    function _createFooter() {\n      const footer = document.createElement('footer');\n\n      const footerContent = document.createElement('a');\n      footerContent.classList.add('footer-content');\n      footerContent.setAttribute('href', 'https://github.com/grumbeard/to-do');\n\n      const footerText = document.createElement('p');\n      footerText.classList.add('footer-text');\n      footerText.innerText = '© 2021 grumbeard'\n\n      footerContent.append(footerText);\n      footer.append(footerContent);\n\n      return footer;\n    }\n\n\n    return fieldValue;\n  }\n\n\n  return {\n    initLayout,\n    initFolders,\n    initProjects,\n    initTasks,\n    getFieldValue\n  };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coordinator);\n\n\n//# sourceURL=webpack://to-do/./src/view/coordinator.js?");

/***/ }),

/***/ "./src/view/folders.js":
/*!*****************************!*\
  !*** ./src/view/folders.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\n  FOLDERS (UI) MODULE\n  This module manages changes to the DOM relevant to folders\n*/\n\nconst folders = (function () {\n\n  function createFolder(data) {\n\n    const folder = document.createElement('div');\n    folder.classList.add('folder');\n    folder.setAttribute('data-type', 'folder');\n    folder.setAttribute('data-id', data.id);\n    folder.innerText = data.name;\n\n    return folder\n  }\n\n\n  function makeArchive(folder) {\n    folder.classList.add('archive');\n  }\n\n  return { createFolder, makeArchive };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (folders);\n\n\n//# sourceURL=webpack://to-do/./src/view/folders.js?");

/***/ }),

/***/ "./src/view/projects.js":
/*!******************************!*\
  !*** ./src/view/projects.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared_title_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/title.js */ \"./src/view/shared/title.js\");\n/* harmony import */ var _shared_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/button.js */ \"./src/view/shared/button.js\");\n/*\n  PROJECTS (UI) MODULE\n  This module manages changes to the DOM relevant to projects\n*/\n\n\n\n\nconst projects = (function () {\n\n  function createProject(data) {\n\n    const project = document.createElement('div');\n    project.classList.add('project');\n    project.setAttribute('data-type', 'project');\n    project.setAttribute('data-id', data.id);\n\n    const title = (0,_shared_title_js__WEBPACK_IMPORTED_MODULE_0__.default)(\n      data.title,\n      'project',\n      data.id\n      );\n    const archiveBtn = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons-outlined\" data-id=\"${data.id}\">inventory_2</span>`,\n      'archive',\n      data.id\n      );\n    const deleteBtn = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons\" data-id=\"${data.id}\">cancel</span>`,\n      'delete',\n      data.id\n      );\n\n    project.append(title, archiveBtn, deleteBtn);\n\n    return project\n  }\n\n  return { createProject };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);\n\n\n//# sourceURL=webpack://to-do/./src/view/projects.js?");

/***/ }),

/***/ "./src/view/shared/button.js":
/*!***********************************!*\
  !*** ./src/view/shared/button.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction createButton(img, type, id) {\n    const btn = document.createElement('div');\n    btn.classList.add(type);\n    btn.classList.add('btn');\n    btn.setAttribute('data-id', id);\n    btn.innerHTML = img;\n\n    return btn;\n  }\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createButton);\n\n\n//# sourceURL=webpack://to-do/./src/view/shared/button.js?");

/***/ }),

/***/ "./src/view/shared/title.js":
/*!**********************************!*\
  !*** ./src/view/shared/title.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction createTitle(value, type, id) {\n\n    const title = document.createElement('p');\n    title.classList.add(`${type}-title`, 'title');\n    title.setAttribute('data-type', type);\n    title.setAttribute('data-id', id);\n    title.innerText = value;\n\n    return title;\n\n  }\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTitle);\n\n\n//# sourceURL=webpack://to-do/./src/view/shared/title.js?");

/***/ }),

/***/ "./src/view/tasks.js":
/*!***************************!*\
  !*** ./src/view/tasks.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared_title_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/title.js */ \"./src/view/shared/title.js\");\n/* harmony import */ var _shared_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/button.js */ \"./src/view/shared/button.js\");\n/*\n  TASKS (UI) MODULE\n  This module manages changes to the DOM relevant to projects\n*/\n\n\n\n\nconst tasks = (function () {\n\n  function createTask(data) {\n\n    const task = document.createElement('div');\n    task.classList.add('task');\n    task.setAttribute('data-type', 'task');\n    task.setAttribute('data-id', data.id);\n\n    const title = (0,_shared_title_js__WEBPACK_IMPORTED_MODULE_0__.default)(\n      data.title,\n      'task',\n      data.id\n      );\n\n    let priorityIcon = (data.priority) ? 'flag' : 'outlined_flag'\n\n    const priorityToggle = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons\" data-id=\"${data.id}\">${priorityIcon}</span>`,\n      'priority',\n      data.id\n      );\n\n    let doneIcon = (data.done) ? 'check_box_outline_blank' : 'check_box'\n\n    const doneToggle = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons\" data-id=\"${data.id}\">${doneIcon}</span>`,\n      'done',\n      data.id\n      );\n\n    const countdown = _createCountdown(data.due);\n\n    const taskDetails = _createTaskDetails(data);\n\n    task.append(countdown, title, priorityToggle, doneToggle, taskDetails);\n\n    return task\n  }\n\n\n  function _createCountdown(dueDate) {\n\n    const countdown = document.createElement('div');\n    countdown.classList.add('countdown-container');\n\n    let today = new Date();\n    let daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));\n\n    if (daysRemaining >= 0) {\n      const countdownNum = document.createElement('p');\n      countdownNum.classList.add('countdown-num');\n      countdownNum.innerText = daysRemaining;\n\n      const countdownLabel = document.createElement('p');\n      countdownLabel.classList.add('countdown-label');\n      countdownLabel.innerText = 'days';\n\n      countdown.append(countdownNum, countdownLabel);\n    } else {\n      const countdownOverdue = document.createElement('p');\n      countdownOverdue.classList.add('countdown-overdue');\n      countdownOverdue.innerText = 'overdue'\n\n      countdown.append(countdownOverdue);\n    }\n\n    return countdown;\n\n  }\n\n\n  function _createTaskDetails(data) {\n\n    const taskDetails = document.createElement('div');\n    taskDetails.classList.add('task-details-container', 'hide');\n\n    const dueDate = _getFormatedDate(data.due);\n    const dateHTML = _getDateHTML(dueDate);\n\n    const textBoxHTML = _getTextBoxHTML(data.description);\n\n    const dueDetail = _createTaskDetail('due', dateHTML.outerHTML);\n    dueDetail.classList.add('task-detail-due');\n\n    const doDetail = _createTaskDetail('do', textBoxHTML.outerHTML);\n    doDetail.classList.add('task-detail-do');\n\n    const buttons = document.createElement('div');\n    buttons.classList.add('task-details-btns-container');\n\n    const taskSave = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons-outlined\" data-id=\"${data.id}\">save</span>`,\n      'save',\n      data.id\n      );\n\n    const taskDelete = (0,_shared_button_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n      `<span class=\"material-icons-outlined\" data-id=\"${data.id}\">delete</span>`,\n      'delete',\n      data.id\n      );\n\n    buttons.append(taskDelete, taskSave);\n\n    taskDetails.append(dueDetail, doDetail, buttons);\n\n    return taskDetails;\n\n  }\n\n\n  function _createTaskDetail(labelText, infoHTML) {\n\n    const taskDetail = document.createElement('div');\n    taskDetail.classList.add('task-detail-container');\n\n    const detailLabel = document.createElement('p');\n    detailLabel.classList.add('task-detail-label');\n    detailLabel.innerText = labelText;\n\n    const detailInfo = document.createElement('p');\n    detailInfo.classList.add('task-detail-info');\n    detailInfo.innerHTML = infoHTML;\n\n    taskDetail.append(detailLabel, detailInfo);\n\n    return taskDetail;\n\n  }\n\n\n  function _getFormatedDate(date) {\n\n    const year = date.getFullYear();\n\n    // NOTE: getMonth() returns 0-indexed value\n    let month = date.getMonth() + 1;\n    if (month < 10) month = `0${month}`\n\n    let day = date.getDate();\n    if (day < 10) day = `0${day}`\n\n    return `${year}-${month}-${day}`\n\n  }\n\n\n  function _getDateHTML(date) {\n\n    const dateHTML = document.createElement('input');\n    dateHTML.setAttribute('type', 'date');\n    dateHTML.setAttribute('value', date);\n\n    return dateHTML;\n\n  }\n\n\n  function _getTextBoxHTML(text) {\n\n    const textBoxHTML = document.createElement('textarea');\n    textBoxHTML.innerText = text;\n\n    return textBoxHTML;\n\n  }\n\n\n  return { createTask };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);\n\n\n//# sourceURL=webpack://to-do/./src/view/tasks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;