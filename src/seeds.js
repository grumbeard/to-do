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

    // Add task to random project
    let index = Math.floor(Math.random() * folderNames.length);
    seedFolders[index].addProject(proj);
  }

  const seedProjects = Project.list;

  // Generate tasks
  for (let i = 0; i < 20; i++) {
    let task = new Task({ title: `Task No. ${i}` });

    // Add task to random project
    let index = Math.floor(Math.random() * 5);
    seedProjects[index].addTask(task);
  }

}

export default seedData

