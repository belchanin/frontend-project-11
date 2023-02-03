import i18next from 'i18next';

import renderPosts from '../utils/renderPosts';

export default (state, elements) => (path, value) => {
  switch (path) {
    case 'form.valid': {
      const { input, formError } = elements;
      if (value) {
        input.classList.remove('is-invalid');
        formError.textContent = '';
      } else {
        input.classList.add('is-invalid');
        formError.classList.remove('text-success');
        formError.classList.add('text-danger');
        formError.textContent = state.form.errors;
      }
      break;
    }

    case 'form.errors': {
      const { formError } = elements;
      formError.textContent = state.form.errors;
      break;
    }

    case 'posts': {
      const { posts } = elements;
      renderPosts(posts, value);

      break;
    }

    case 'isLoaded': {
      const { formError } = elements;

      formError.classList.remove('text-danger');
      formError.classList.add('text-success');
      formError.textContent = i18next.t('success');
      break;
    }

    default: {
      break;
    }
  }
};
