export default (state, elements) => (path, value) => {
  switch (path) {
    case 'form.valid': {
      const { input, formError } = elements;
      if (value) {
        input.classList.remove('is-invalid');
        formError.textContent = '';
      } else {
        input.classList.add('is-invalid');
        formError.textContent = state.form.errors;
      }
      break;
    }
    default: {
      break;
    }
  }
};
