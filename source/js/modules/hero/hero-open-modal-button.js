

const openModalButtons = document.querySelectorAll('.hero-card__button');
const modal = document.querySelector('.modal');

let savedScrollPosition = 0;

const closeModal = () => {
  document.body.style.top = '0';
  document.body.classList.remove('body--modal-open');

  window.scrollTo({
    top: savedScrollPosition,
    behavior: 'instant'
  });

  modal.close();

  modal.removeEventListener('click', handleOutsideClick);
  document.removeEventListener('keydown', handleEscapeKey);

};
function handleOutsideClick(e) {
  if (e.target === modal) {
    closeModal();
  }
}

function handleEscapeKey(e) {
  if (e.key === 'Escape' && modal.open) {
    closeModal();
  }
}

const openModal = () => {

  savedScrollPosition = window.scrollY;

  document.body.classList.add('body--modal-open');
  document.body.style.top = `-${savedScrollPosition}px`;
  modal.showModal();

  modal.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

};

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal();
  });
});
