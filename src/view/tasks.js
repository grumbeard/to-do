/*
  TASKS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

const tasks = (function () {
  function createTask(title) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.innerText = title;

    return task
  }

  return { createTask };
})();

export default tasks
