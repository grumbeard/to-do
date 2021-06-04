/*
  FOLDERS (UI) MODULE
  This module manages changes to the DOM relevant to folders
*/

import createTitle from './shared/title.js'

const folders = (function () {

  function createFolder(data) {

    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.setAttribute('data-type', 'folder');
    folder.setAttribute('data-id', data.id);

    let folderIcon = `<span class="material-icons-outlined">library_books</span>`;

    // Add special styling for Archive folder
    if (data.name == 'Archive') {
      folder.classList.add('archive');
      folderIcon = `<span class="material-icons-outlined">inventory_2</span>`;
    }

    folder.insertAdjacentHTML('afterbegin', folderIcon);

    const title = createTitle(
      data.name,
      'folder',
      data.id
      );
    folder.append(title);

    return folder
  }

  return { createFolder };

})();

export default folders
