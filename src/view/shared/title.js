function createTitle(value, type, id) {

    const title = document.createElement('p');
    title.classList.add(`${type}-title`, 'title');
    title.setAttribute('data-type', type);
    title.setAttribute('data-id', id);
    title.innerText = value;

    return title;

  }

export default createTitle
