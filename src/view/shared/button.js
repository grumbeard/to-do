function createButton(img, type, id) {
    const btn = document.createElement('div');
    btn.classList.add(type);
    btn.classList.add('btn');
    btn.setAttribute('data-id', id);
    btn.innerHTML = img;

    return btn;
  }

export default createButton
