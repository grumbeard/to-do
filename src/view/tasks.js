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

    const taskDetails = _createTaskDetails(data);

    task.append(countdown, title, priorityToggle, doneToggle, taskDetails);

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


  function _createTaskDetails(taskData) {

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details-container', 'hide');

    const dueDate = _getFormatedDate(taskData.due);
    const dateHTML = _getDateHTML(dueDate);

    const textBoxHTML = _getTextBoxHTML(taskData.description);

    const dueDetail = _createTaskDetail('due', dateHTML.outerHTML);
    dueDetail.classList.add('task-detail-due');
    const doDetail = _createTaskDetail('do', textBoxHTML.outerHTML);
    doDetail.classList.add('task-detail-do');

    const buttons = document.createElement('div');
    buttons.classList.add('task-details-btns-container');

    taskDetails.append(dueDetail, doDetail, buttons);

    return taskDetails;

  }


  function _createTaskDetail(labelText, infoHTML) {

    const taskDetail = document.createElement('div');
    taskDetail.classList.add('task-detail-container');

    const detailLabel = document.createElement('p');
    detailLabel.classList.add('task-detail-label');
    detailLabel.innerText = labelText;

    const detailInfo = document.createElement('p');
    detailInfo.classList.add('task-detail-info');
    detailInfo.innerHTML = infoHTML;

    taskDetail.append(detailLabel, detailInfo);

    return taskDetail;

  }


  function _getFormatedDate(date) {

    const year = date.getFullYear();

    // NOTE: getMonth() returns 0-indexed value
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`

    // NOTE: getMonth() returns 0-indexed value
    let day = date.getDay() + 1;
    if (day < 10) day = `0${day}`

    return `${year}-${month}-${day}`

  }


  function _getDateHTML(date) {

    const dateHTML = document.createElement('input');
    dateHTML.setAttribute('type', 'date');
    dateHTML.setAttribute('value', date);

    return dateHTML;

  }


  function _getTextBoxHTML(text) {

    const textBoxHTML = document.createElement('textarea');
    textBoxHTML.innerText = text;

    return textBoxHTML;

  }


  return { createTask };

})();

export default tasks
