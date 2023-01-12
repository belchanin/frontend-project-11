import './styles.scss';
import onChange from 'on-change';
import * as yup from 'yup';
import i18next from 'i18next';

import render from './view/watchers';

const app = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {},
    },
  });

  yup.setLocale({
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    formError: document.querySelector('.feedback'),
  };

  const initialState = {
    form: {
      valid: true,
      errors: '',
    },
  };

  const watchedState = onChange(initialState, render(initialState, elements));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [input] = e.target;

    const schema = yup.object().shape({
      link: yup.string().required().url(),
    });

    schema.validate({
      link: input.value,
    }).then(() => {
      watchedState.form.valid = true;
      watchedState.form.errors = '';
      elements.input.value = '';
      elements.input.focus();
    }).catch((err) => {
      watchedState.form.errors = err.message;
      watchedState.form.valid = false;
    });
  });
};

app();
