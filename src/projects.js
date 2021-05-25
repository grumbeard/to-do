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
    this._id = Project._count;
    Project._count++;

  }


  get title() { return this._title; }
  get tasks() { return this._tasks }
  get id() { return this._id; }


  set title(value) {

    if (value.length > 30) {
      alert("Title is too long");
      return;
    }
    this._title = value.toString();

  }


  addTask(task) {

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
  static _count = 0;

}

export default Project
