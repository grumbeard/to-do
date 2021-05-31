/*
  FOLDERS (UI) MODULE
  This module manages changes to the DOM relevant to folders
*/

const folders = (function () {

  function createFolder(data) {

    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.setAttribute('data-type', 'folder');
    folder.setAttribute('data-id', data.id);
    folder.innerText = data.name;

    return folder
  }


  function makeArchive(folder) {
    folder.classList.add('archive');
  }

  return { createFolder, makeArchive };

})();

export default folders
