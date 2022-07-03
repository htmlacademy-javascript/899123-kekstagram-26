import { isEscape } from './utils.js';

const body = document.body;
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorMessageBtn = errorMessage.querySelector('.error__button');

// Управление окном ошибки загрузки публикации

const closeUploadErrorMessage = () => {
  errorMessage.remove();

  closeErrorMessageBtn.removeEventListener('click', closeUploadErrorMessage);
  document.removeEventListener('keydown', errorMessageKeydownHandler);
  document.removeEventListener('click', errorMessageClickHandler);
};

const showUploadErrorMessage = () => {
  closeErrorMessageBtn.addEventListener('click', closeUploadErrorMessage);
  document.addEventListener('keydown', errorMessageKeydownHandler);
  document.addEventListener('click', errorMessageClickHandler);

  body.appendChild(errorMessage);
};

// Обработчики для окна ошибки

/**
 * Закрывает сообщение при клики на свободное пространство
 * @param {object} evt - event
 */
function errorMessageClickHandler(evt) {
  if (evt.target.classList.contains('error')) {
    evt.preventDefault();
    closeUploadErrorMessage();
  }
}

/**
 * Закрывает сообщение при нажатии Escape
 * @param {object} evt - event
 */
function errorMessageKeydownHandler(evt) {
  if (isEscape(evt.code)) {
    evt.preventDefault();
    closeUploadErrorMessage();
  }
}

export { showUploadErrorMessage };
