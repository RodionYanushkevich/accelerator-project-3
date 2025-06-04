// const dropdownMenuItems = document.querySelectorAll('.navigation__link[type="button"]');

const dropdownMenubutton = document.querySelectorAll('.navigation__link[type="button"]');

dropdownMenubutton.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {

    const dropdownMenuItem = menuItem.parentNode;
    dropdownMenuItem.classList.toggle('navigation__item--dropdown-open');

    const dropdownList = dropdownMenuItem.querySelector('.navigation__dropdown-list');

    dropdownList.classList.toggle('navigation__dropdown-list--open');
  });

});
