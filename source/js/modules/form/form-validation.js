const forms = document.querySelectorAll('.form');

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
});


document.querySelectorAll('form').forEach((form) => {
  form.setAttribute('novalidate', true);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let formIsValid = true;
    const inputs = Array.from(form.querySelectorAll('input, textarea, select'));

    inputs.some((input) => {
      if (!input.checkValidity()) {
        input.classList.add('invalid');
        input.reportValidity();
        input.focus();
        formIsValid = false;
        return true;
      }
      input.classList.remove('invalid');
      return false;
    });

    if (formIsValid) {
      form.submit();
    }
  });
});

