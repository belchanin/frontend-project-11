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
      ru: {
        translation: {
          errors: {
            isNotValid: 'Ссылка должна быть валидным URL',
            noData: 'Ресурс не содержит валидный RSS',
          },

          success: 'RSS успешно загружен',
        },
      },
    },
  });

  yup.setLocale({
    string: {
      url: i18next.t('errors.isNotValid'),
    },
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    formError: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
  };

  const initialState = {
    form: {
      valid: true,
      errors: '',
    },
    isLoaded: false,
    posts: [],
  };

  const watchedState = onChange(initialState, render(initialState, elements));

  const parseData = (data) => {
    const parser = new DOMParser();
    const result = parser.parseFromString(data, 'text/html');
    const items = result.querySelectorAll('item');

    if (!items.length) {
      watchedState.form.errors = i18next.t('errors.noData');
      return;
    }

    const newData = [...items].map((item) => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').nextSibling.textContent;
      const description = item.querySelector('description').textContent;

      return { title, link, description };
    });

    watchedState.posts = [...watchedState.posts, ...newData];
    watchedState.isLoaded = true;
  };

  const getOrigins = (link) => {
    fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => parseData(data.contents));
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [input] = e.target;

    const schema = yup.object().shape({
      link: yup.string().required().url(),
    });

    const link = input.value;

    schema.validate({
      link,
    }).then(() => {
      watchedState.form.valid = true;
      watchedState.form.errors = '';
      watchedState.isLoaded = false;

      getOrigins(link);

      elements.input.value = '';
      elements.input.focus();
    }).catch((err) => {
      watchedState.form.errors = err.message;
      watchedState.form.valid = false;
    });
  });
};

app();
