// import { compensateOverflowPadding } from '../../util.js';

const navigation = document.querySelector('.navigation');
const navLinks = navigation.querySelectorAll('.navigation__link');
const dropdownSubMenuList = navigation.querySelectorAll('.navigation__item--dropdown');

const [dropdownNavigationButton, dropdownNavigationList] = navigation.children;

let isMenuOpen = false;

const updateTabindex = () => {
  navLinks.forEach((link) => {
    link.tabIndex = isMenuOpen ? 0 : -1;
  });
};


const openNavigation = () => {
  navigation.classList.add('navigation--open');
  dropdownNavigationList.classList.add('navigation__list--open');
  dropdownNavigationButton.classList.add('navigation__button--active');
  document.body.classList.add('body--overlay-shown');

  isMenuOpen = true;

  updateTabindex();

  document.addEventListener('keydown', handleEscapeKey);
  document.addEventListener('click', handleOutsideClick);
};

const closeNavigation = (isClickOutside) => {

  navigation.classList.remove('navigation--open');
  dropdownNavigationList.classList.remove('navigation__list--open');
  document.body.classList.remove('body--overlay-shown');
  isMenuOpen = false;

  updateTabindex();

  dropdownSubMenuList.forEach((subMenu) => {
    subMenu.classList.remove('navigation__item--dropdown-open');
  });

  if (isClickOutside && dropdownNavigationButton.classList.contains('navigation__button--active')) {
    setTimeout(() => {
      dropdownNavigationButton.classList.remove('navigation__button--active');
    }, 500);
    // !!! ПЕРЕМЕННЫЕ ПО РУТ
  } else {
    dropdownNavigationButton.classList.remove('navigation__button--active');
  }

  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleOutsideClick);
};

function handleOutsideClick(e) {
  if (!navigation.contains(e.target) || !e.target.closest('.navigation') && isMenuOpen) {
    closeNavigation(true);
  }
}

function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    closeNavigation(true);
  }
}

dropdownNavigationButton.addEventListener('click', () => {
  if (isMenuOpen) {
    closeNavigation();
  } else {
    openNavigation();
  }
});

updateTabindex();
