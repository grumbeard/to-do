/*
  TASKS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

const tasks = (function () {

  function createTask(data) {

    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('data-type', 'task');
    task.setAttribute('data-id', data.id);
    task.innerText = data.title;

    return task
  }

  return { createTask };

})();

export default tasks
