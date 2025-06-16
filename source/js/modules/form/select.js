import SlimSelect from '../../vendor/slimselect.es.min.js';


const selectElements = document.querySelectorAll('.form__input[name="city"]');
const [formSelectEl, modalSelectEl] = selectElements;

const isOpen = false;

const wrappers = document.querySelectorAll('.form__wrapper--select');

const [formSelectWrapper, modalSelectWrapper] = wrappers;


const mainFormSelect =
  new SlimSelect({
    select: formSelectEl,

    cssClasses: {
      // main: 'ss-main',
      option: 'select-option'
    },

    settings: {
      placeholderText: '',
      showSearch: false,
      contentPosition: 'relative',
      contentLocation: formSelectWrapper,
      arrowClose: 'M15.273 7.90918L8.00027 1.36372L0.727539 7.90918',
      arrowOpen: 'M15.273 1.09082L8.00027 7.63628L0.727539 1.09082',
      showOptionTooltips: true
    },
    events: {
      beforeOpen: () => {
        mainFormSelect.open();
        // isOpen = false;
      },
      afterChange: () => {
        // const ssMain = document.querySelector('.ss-main');
        // ssMain.style.opacity = '1';
      }
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
      arrowClose: 'M15.273 7.90918L8.00027 1.36372L0.727539 7.90918',
      arrowOpen: 'M15.273 1.09082L8.00027 7.63628L0.727539 1.09082',
      showOptionTooltips: true
    },
    events: {
      beforeOpen: () => {
        mainFormSelect.open();
        // isOpen = false;
      },
      afterChange: () => {
        // const ssMain = document.querySelector('.ss-main');
        // ssMain.style.opacity = '1';
      }
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
