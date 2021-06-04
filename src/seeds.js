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
  for (let i = 0; i < 10; i++) {
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
  for (let i = 0; i < 30; i++) {
    let task = new Task({
      title: `Task No. ${i}`,
      priority: (Math.random() > 0.5),
      done: (Math.random() > 0.5),
      due: _getRandomDate(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel elementum ipsum. Praesent sollicitudin felis eros, non laoreet nulla pretium vel.'
    });

    // Add task to random project
    let index1 = Math.floor(Math.random() * 6);
    let folder = seedFolders[index1];
    if (folder.projects.length == 0) folder = seedFolders[0];

    let index2 = Math.floor(Math.random() * folder.projects.length);
    let project = folder.projects[index2]
    project.addTask(task);
  }

  function _getRandomDate() {
    let today = new Date();
    let date = new Date();

    const sign = [1, -1];
    let multiplier = (sign[Math.floor(Math.random() * 2)]);
    date.setDate(today.getDate() + (multiplier * (Math.floor(Math.random() * 100))));

    return date;
  }

}

export default seedData

