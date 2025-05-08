document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav ul');
  
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  });
  