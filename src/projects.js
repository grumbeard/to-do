/*
  PROJECTS MODULE
  This module allows project objects to be created / deleted
  Each project is assigned to one and only one folder
  Each project allows tasks to be added / removed from it
*/

class Project {
  constructor(projectData) {
    this._title = projectData.title;
    this._tasks = projectData.tasks || [];
    Project._list.push(this);
  }

  get title() { return this._title; }

  set title(value) {
    if (value.length > 30) {
      alert("Title is too long");
      return;
    }
    this._title = value.toString();
  }

  get tasks() { return this._tasks }

  addTask(task) {
    console.log(this);
    console.log(this._tasks);
    this._tasks.push(task);
  }

  removeTask(task) {
    let index = this._task.indexOf(task);
    this._tasks.splice(index, 1);
  }

  delete() {
    Object.keys(this).forEach(prop => {
      delete this[prop];
    });
  }

  // Static Properties
  static _list = [];

  // Static Methods
  static get list() { return this._list; }

  static delete(project) {
    let index = this._list.indexOf(project);
    this._list.splice(index, 1);

    project.delete();
  }
}

export default Project
