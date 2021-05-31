/*
  FOLDERS MODULE
  This module allows folder objects to be created
  Each folder allows projects to be added / removed from it
*/

class Folder {

  constructor(folderData) {

    this._name = folderData.name;
    this._projects = folderData.projects || [];
    this._id = Folder._count;
    Folder.add(this);

  }


  get name() { return this._name; }
  get projects() { return this._projects; }
  get id() { return this._id; }


  set name(value) {

    if (value.length > 15) {
      alert("Name is too long");
      return;
    }
    this._name = value.toString();

  }


  addProject(project) {

    this.projects.push(project);

  }


  removeProject(project) {

    let index = this.projects.indexOf(project);
    this.projects.splice(index, 1);

  }


  // Static Properties
  static _list = [];
  static _count = 0;


  // Static Methods
  static get list() { return this._list; }


  static add(folder) {

    this._list.push(folder);
    this._count++;

  }

}

export default Folder
