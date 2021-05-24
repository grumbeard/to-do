/*
  FOLDERS (UI) MODULE
  This module manages changes to the DOM relevant to folders
*/

const folders = (function () {
  function createFolder(name) {
    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.innerText = name;

    return folder
  }

  function makeArchive(folder) {
    folder.classList.add('archive');
  }

  return { createFolder, makeArchive };
})();

export default folders
