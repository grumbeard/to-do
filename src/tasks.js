/*
  TASKS MODULE
  This module allows task objects to be created / deleted
  Each task is assigned to one and only one project
*/

class Task {

  constructor(taskData) {

    this._title = taskData.title;
    this._description = taskData.description || null;
    this._due = taskData.due || null;
    this._priority = taskData.priority || false;
    this._done = taskData.done || false;
    this._id = Task._count;
    Task._count++;

  }


  get title() { return this._title; }
  get description() { return this._description; }
  get due() { return this._due; }
  get priority() { return this._priority; }
  get done() { return this._done; }
  get id() { return this._id; }


  set title(value) {

    if (value.length > 40) {
      alert("Title is too long");
      return;
    }
    this._title = value.toString();

  }


  set description(value) {

    if (value.length > 200) {
      alert("YoU nEeD tO bE mOrE cOnCiSe");
      return;
    }
    this._description = value.toString();

  }


  set due(date) {

    if (!date) {
      this._due = null;
    } else if (!(date instanceof Date)) {
      alert("That's not a date");
    }
    this._due = date;

  }


  set priority(value) {

    (value) ? this._priority = true : this._priority = false;

  }


  set done(value) {

    (value) ? this._done = true : this._done = false;

  }


  delete() {

    Object.keys(this).forEach(prop => {
      delete this[prop];
    });

  }


  // Static Properties
  static _count = 0;

}

export default Task
