console.log('mission.js loaded');  
const themeSelector = document.querySelector('#theme-select');
console.log('themeSelector:', themeSelector);  
function changeTheme() {
  console.log('changeTheme fired, value =', themeSelector.value);
  const logo = document.querySelector('.logo-img');
  if (!logo) console.error('Cannot find .logo-img');

  if (themeSelector.value === 'dark') {
    document.body.classList.add('dark');
    logo.src = 'byui-logo_white.png';
  } else {
    document.body.classList.remove('dark');
    logo.src = 'byui-logo_blue.webp';
  }
}

if (themeSelector) {
  themeSelector.addEventListener('change', changeTheme);
} else {
  console.error('#theme-select not found');
}
