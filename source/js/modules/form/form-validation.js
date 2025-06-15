const forms = document.querySelectorAll('.form');
// const phoneInputs = form.querySelectorAll('.form__input[type="tel"]');


const formatPhoneNumber = (value) => {
  const numbers = value.replace(/\D/g, '');
  let formatted = '+7';

  if (numbers.length > 1) {
    formatted += ` (${numbers.substring(1, 4)}`;
  }
  if (numbers.length > 4) {
    formatted += `) ${numbers.substring(4, 7)}`;
  }
  if (numbers.length > 7) {
    formatted += `-${numbers.substring(7, 9)}`;
  }
  if (numbers.length > 9) {
    formatted += `-${numbers.substring(9, 11)}`;
  }

  return formatted;
};

forms.forEach((form) => {
  form.setAttribute('novalidate', '');

  const phoneInput = form.querySelector('.form__input[type="tel"]');
  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhoneNumber(phoneInput.value);
  });

  phoneInput.addEventListener('focus', () => {
    if (phoneInput.value === '') {
      phoneInput.value = '+7';
    }
  });

  phoneInput.addEventListener('blur', () => {
    if (phoneInput.value === '+7') {
      phoneInput.value = '';
    }
  });

  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }
    });
  });

});

forms.forEach((form) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    form.classList.add('validate-on-submit');
    if (!form.checkValidity()) {
      form.reportValidity();

      return;
    }

    form.submit();

  });


});
