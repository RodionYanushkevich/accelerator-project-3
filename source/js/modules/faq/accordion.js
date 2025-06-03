const accordions = document.querySelectorAll('.accordion');

const descriprionsCheck = (accordion) => {
  const accordionCurrentDescriptions = accordion.querySelectorAll('p');
  const descriprionsCount = accordionCurrentDescriptions.length;

  if (descriprionsCount > 1) {
    if (!accordion.classList.contains('accordion--open')) {
      accordion.style.gridTemplateRows = `min-content repeat(${descriprionsCount}, 0fr)`;
    }
    if (accordion.classList.contains('accordion--open')) {
      accordion.style.gridTemplateRows = `min-content repeat(${descriprionsCount}, 1fr)`;
    }
  }
};

const classListToggle = (accordion, button) => {
  accordion.classList.toggle('accordion--open');
  button.classList.toggle('accordion__button--open');
  descriprionsCheck(accordion);
};

accordions.forEach((accordion) => {
  const button = accordion.children[1];
  descriprionsCheck(accordion);

  accordion.addEventListener('click', () => {
    classListToggle(accordion, button);
  });

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    classListToggle(accordion, button);
  });
});
