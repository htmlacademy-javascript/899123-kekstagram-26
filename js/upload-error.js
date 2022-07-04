import { isEscape } from './utils.js';

const bodyElement = document.body;
const errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorMessageBtnElement = errorMessageElement.querySelector('.error__button');

// Управление окном ошибки загрузки публикации

const closeUploadErrorMessage = () => {
  errorMessageElement.remove();

  closeErrorMessageBtnElement.removeEventListener('click', closeUploadErrorMessage);
  document.removeEventListener('keydown', errorMessageKeydownHandler);
  document.removeEventListener('click', errorMessageClickHandler);
};

const showUploadErrorMessage = () => {
  closeErrorMessageBtnElement.addEventListener('click', closeUploadErrorMessage);
  document.addEventListener('keydown', errorMessageKeydownHandler);
  document.addEventListener('click', errorMessageClickHandler);

  bodyElement.appendChild(errorMessageElement);
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
