/*
  TASKS (UI) MODULE
  This module manages changes to the DOM relevant to projects
*/

import createTitle from './shared/title.js'
import createButton from './shared/button.js'

const tasks = (function () {

  function createTask(data) {

    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('data-type', 'task');
    task.setAttribute('data-id', data.id);

    const title = createTitle(
      data.title,
      'task',
      data.id
      );

    let flagIcon = (data.priority) ? 'flag' : 'outlined_flag'

    const priorityBtn = createButton(
      `<span class="material-icons" data-id="${data.id}">${flagIcon}</span>`,
      'priority',
      data.id
      );

    const countdown = document.createElement('div');
    countdown.classList.add('countdown');
    countdown.innerText = data.due;

    task.append(title, priorityBtn, countdown);

    return task
  }

  return { createTask };

})();

export default tasks
