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

    let priorityIcon = (data.priority) ? 'flag' : 'outlined_flag'

    const priorityToggle = createButton(
      `<span class="material-icons" data-id="${data.id}">${priorityIcon}</span>`,
      'priority',
      data.id
      );

    let doneIcon = (data.done) ? 'check_box_outline_blank' : 'check_box'

    const doneToggle = createButton(
      `<span class="material-icons" data-id="${data.id}">${doneIcon}</span>`,
      'done',
      data.id
      );

    const countdown = _createCountdown(data.due);

    task.append(countdown, title, priorityToggle, doneToggle);

    return task
  }

  function _createCountdown(dueDate) {

    const countdown = document.createElement('div');
    countdown.classList.add('countdown-container');

    let today = new Date();
    let daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining >= 0) {
      const countdownNum = document.createElement('p');
      countdownNum.classList.add('countdown-num');
      countdownNum.innerText = daysRemaining;

      const countdownLabel = document.createElement('p');
      countdownLabel.classList.add('countdown-label');
      countdownLabel.innerText = 'days';

      countdown.append(countdownNum, countdownLabel);
    } else {
      const countdownOverdue = document.createElement('p');
      countdownOverdue.classList.add('countdown-overdue');
      countdownOverdue.innerText = 'overdue'

      countdown.append(countdownOverdue);
    }

    return countdown;

  }

  return { createTask };

})();

export default tasks
