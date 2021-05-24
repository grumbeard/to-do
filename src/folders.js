/*
  FOLDERS MODULE
  This module allows folder objects to be created
  Each folder allows projects to be added / removed from it
*/

const folderFactory = function (folderData) {
  const folder = {
    name: folderData.name,
    projects: folderData.projects || []
  };

  Object.assign(folder, factoryProto);

  return folder;
}

const factoryProto = {
  addProject: function (project) {
    this.projects.push(project);
  },
  removeProject: function (project) {
    let index = this.projects.indexOf(project);
    this.projects.splice(index, 1);
  }
};

export default folderFactory
