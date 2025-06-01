const accordionButtons = document.querySelectorAll('.accordion__button');
const accordions = document.querySelectorAll('.accordion');

// const descriprionsCheck = (accordion) => {
//   const accordionCurrentDescriptions = accordion.querySelectorAll('p');
//   const descriprionsCount = accordionCurrentDescriptions.length;

//   if (descriprionsCount > 1) {
//     if (accordion.classList.contains('accordion--hidden')) {
//       accordion.style.gridTemplateRows = `min-content repeat(${descriprionsCount}, 0fr)`;
//     }
//     if (accordion.classList.contains('accordion--unhidden')){
//       accordion.style.gridTemplateRows = `min-content repeat(${descriprionsCount}, 1fr)`;
//     }
//   }
// };

// const hideShowToggle = (accordionCurrent) => {
//   accordionCurrent.classList.toggle('accordion--hidden');
//   accordionCurrent.classList.toggle('accordion--unhidden');

// };

// accordions.forEach((accordion) => {
//   if (!accordion.classList.contains('accordion--unhidden')) {
//     accordion.classList.add('accordion--hidden');
//   }
//   descriprionsCheck(accordion);
// });


accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordionCurrent = button.parentNode;

    // hideShowToggle(accordionCurrent);

    // if (accordionCurrent.querySelectorAll('p').length > 1) {
    //   descriprionsCheck(accordionCurrent);
    // }
    accordionCurrent.classList.toggle('accordion--open');
    button.classList.toggle('accordion__button--open');
  });
});
