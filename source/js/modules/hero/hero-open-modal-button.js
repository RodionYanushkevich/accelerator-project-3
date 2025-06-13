

const openModalButtons = document.querySelectorAll('.hero-card__button');
const modal = document.querySelector('.modal');

const closeModal = () => {
  modal.close();
  document.body.classList.remove('body--modal-open');
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
  modal.showModal();
  document.body.classList.add('body--modal-open');
  modal.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

};


openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal();
  });
});
// openModal();
