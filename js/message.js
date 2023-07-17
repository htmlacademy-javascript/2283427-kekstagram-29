import { isEscapeKey } from './utilities.js';
import { onModalEsc } from './valid-form.js';

// Глобальные переменные
const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

/** Тип сообщения */
const typeMessage = () => document.querySelector('.error, .success');

/** Закрытие сообщения */
const closeMessage = () => {
  const type = typeMessage();
  if (type) {
    type.remove();
  }
  document.removeEventListener('click', closeClickOutside);
  document.removeEventListener('keydown', closeMessageEsc);
};

/** Показывает сообщение об успешной загрузке изображения */
const showSuccessMessage = () => {
  const success = successTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', success);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('click', closeClickOutside);
  document.addEventListener('keydown', closeMessageEsc);
};

/** Показывает сообщение с ошибкой загрузки изображения */
const showErrorMessage = () => {
  const error = errorTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', error);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('click', closeClickOutside);
  document.addEventListener('keydown', closeMessageEsc);
  document.removeEventListener('keydown', onModalEsc);
};

/** Закрытие по Esc */
function closeMessageEsc (evt) {
  if (isEscapeKey(evt) && typeMessage()) {
    evt.preventDefault();
    closeMessage();
  }
}

/** Закрытие по клику вне области сообщения */
function closeClickOutside (evt) {
  const type = typeMessage();
  if (evt.target === type) {
    closeMessage();
  }
}

export {showSuccessMessage, showErrorMessage };
