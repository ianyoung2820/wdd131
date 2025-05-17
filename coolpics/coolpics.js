document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-toggle');
  const menu       = document.querySelector('nav .menu');
  const gallery    = document.querySelector('.gallery');

  function toggleMenu() {
    menu.classList.toggle('hide');
  }
  menuButton.addEventListener('click', toggleMenu);

  function handleResize() {
    if (window.innerWidth > 1000) {
      menu.classList.remove('hide');
    } else {
      menu.classList.add('hide');
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  gallery.addEventListener('click', event => {
    const img = event.target.closest('img');
    if (!img) return;

    const dlg     = document.createElement('dialog');
    const base    = img.src.split('-')[0];
    const fullSrc = base + '-full.jpeg';

    dlg.innerHTML = `
      <img src="${fullSrc}" alt="${img.alt}">
      <button class="close-viewer">X</button>
    `;
    document.body.appendChild(dlg);
    dlg.showModal();

    dlg.querySelector('.close-viewer')
       .addEventListener('click', () => dlg.close());

    dlg.addEventListener('click', e => {
      if (e.target === dlg) dlg.close();
    });

    dlg.addEventListener('close', () => dlg.remove());
  });
});
