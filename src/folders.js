/*
  FOLDERS MODULE
  This module allows folder objects to be created
  Each folder allows projects to be added / removed from it
*/

class Folder {
  constructor(folderData) {
    this._name = folderData.name;
    this._projects = folderData.projects || [];
    Folder.list.push(this);
  }

  get name() { return this._name; }

  set name(value) {
    if (value.length > 15) {
      alert("Name is too long");
      return;
    }
    this._name = value.toString();
  }

  get projects() { return this._projects; }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    let index = this.projects.indexOf(project);
    this.projects.splice(index, 1);
  }

  // Static Properties
  static _list = [];

  // Static Methods
  static get list() { return this._list; }
}

export default Folder
