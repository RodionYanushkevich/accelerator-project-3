import SlimSelect from '../../vendor/slimselect.es.min.js';


const selectElements = document.querySelectorAll('.form__input[name="city"]');
const [formSelectEl, modalSelectEl] = selectElements;

const wrappers = document.querySelectorAll('.form__wrapper--select');

const [formSelectWrapper, modalSelectWrapper] = wrappers;


const mainFormSelect =
  new SlimSelect({
    select: formSelectEl,

    cssClasses: {
      option: 'select-option'
    },
    a11y: {
      ariaLabel: 'Выберите вариант',
      ariaRequired: true,
    },
    settings: {
      placeholderText: '',
      showSearch: false,
      contentPosition: 'relative',
      contentLocation: formSelectWrapper,
      showOptionTooltips: true
    },
    events: {
      beforeOpen: () => {
        mainFormSelect.open();
      },
    }

  });

const modalFormSlimSelect =
  new SlimSelect({
    select: modalSelectEl,
    cssClasses: {
      option: 'select-option'
    },
    settings: {
      placeholderText: '',
      showSearch: false,
      contentPosition: 'relative',
      contentLocation: modalSelectWrapper,
      showOptionTooltips: true
    },
    a11y: {
      ariaLabel: 'Выберите вариант',
      ariaRequired: true,
    },
    events: {
      beforeOpen: () => {
        modalFormSlimSelect.open();
      },
    }

  });

document.querySelectorAll('.ss-main').forEach((selectNewEl, index) => {
  selectNewEl.classList.add('select');

  selectNewEl.addEventListener('focus', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (index === 0) {
      mainFormSelect.open();
    } else {
      modalFormSlimSelect.open();
    }
  });

});
