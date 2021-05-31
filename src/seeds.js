import Folder from './folders'
import Project from './projects'
import Task from './tasks'

/*
  SEED DATA
  Demo data for initializing ToDo app
*/

function seedData () {

  // Generate folders
  const folderNames = ["Learning Log", "Writing", "Misc", "Experiments", "Compendium", "Archive"];

  folderNames.forEach(folderName => {
    let folder = new Folder({ name: folderName });
  });

  const seedFolders = Folder.list;

  // Generate projects
  for (let i = 0; i < 5; i++) {
    let proj = new Project({ title: `Project No. ${i}` });

    // Add first project to first task
    if (i == 0) {
      seedFolders[0].addProject(proj);
      continue;
    }

    // Add project to random task
    let index = Math.floor(Math.random() * folderNames.length);
    seedFolders[index].addProject(proj);
  }

  // Generate tasks
  for (let i = 0; i < 20; i++) {
    let task = new Task({ title: `Task No. ${i}` });

    // Add task to random project
    let index1 = Math.floor(Math.random() * 5);
    let folder = seedFolders[index1];
    if (folder.projects.length == 0) folder = seedFolders[0];

    let index2 = Math.floor(Math.random() * folder.projects.length);
    let project = folder.projects[index2]
    project.addTask(task);
  }

}

export default seedData

