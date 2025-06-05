
const navigation = document.querySelector('.navigation');

const [dropdownNavigationButton, dropdownNavigationList] = navigation.children;

const dropdownSubMenuList = navigation.querySelectorAll('.navigation__item--dropdown');

const navLinks = document.querySelectorAll('.navigation__list > *');

const tabindexToggle = () => {
  if (!dropdownNavigationList.classList.contains('navigation__list--open')) {
    navLinks.forEach((link) => {
      link.setAttribute('tabindex', '-1');
    });
  } else {
    navLinks.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
  }
};


dropdownNavigationButton.addEventListener('click', () => {
  navigation.classList.toggle('navigation--open');
  dropdownNavigationList.classList.toggle('navigation__list--open');

  dropdownSubMenuList.forEach((subMenu) => {
    if (subMenu.classList.contains('navigation__item--dropdown-open')) {
      subMenu.classList.remove('navigation__item--dropdown-open');
    }
  });

  tabindexToggle();
  document.body.classList.toggle('body--overlay-shown');
  dropdownNavigationButton.classList.toggle('navigation__button--active');
}
);


navigation.addEventListener('click', (e) => {

  console.log(e.target);
});

tabindexToggle();
