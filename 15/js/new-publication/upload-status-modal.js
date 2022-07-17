import { isEscape } from '../utils.js';

// Элементы DOM

const errorMessageCopyElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorMessageBtnElement = errorMessageCopyElement.querySelector('.error__button');

const successMessageCopyElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const closeSuccessMessageBtnElement = successMessageCopyElement.querySelector('.success__button');

// Управление окнами статуса загрузки публикации

const closeUploadErrorMessage = () => {
  errorMessageCopyElement.remove();

  closeErrorMessageBtnElement.removeEventListener('click', closeUploadErrorMessage);

  document.removeEventListener('keydown', messageKeydownHandler);
  document.removeEventListener('click', messageOutsideClickHandler);
};

const closeUploadSuccessMessage = () => {
  successMessageCopyElement.remove();

  closeSuccessMessageBtnElement.removeEventListener('click', closeUploadSuccessMessage);

  document.removeEventListener('keydown', messageKeydownHandler);
  document.removeEventListener('click', messageOutsideClickHandler);
};

/**
 * Показывает сообщение со статусом загрузки
 * @param {boolean} isSuccess - статус загрузки на сервер
 */
const showUploadStatusMessage = (isSuccess) => {
  if (isSuccess) {
    closeSuccessMessageBtnElement.addEventListener('click', closeUploadSuccessMessage);
    document.body.appendChild(successMessageCopyElement);
  } else {
    closeErrorMessageBtnElement.addEventListener('click', closeUploadErrorMessage);
    document.body.appendChild(errorMessageCopyElement);
  }

  document.addEventListener('keydown', messageKeydownHandler);
  document.addEventListener('click', messageOutsideClickHandler);
};

// Обработчики для окон

/**
 * Закрывает сообщение при клики на свободное пространство
 * @param {object} evt - event
 */
function messageOutsideClickHandler(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    evt.preventDefault();
    closeUploadErrorMessage();
    closeUploadSuccessMessage();
  }
}

/**
 * Закрывает сообщение при нажатии Escape
 * @param {object} evt - event
 */
function messageKeydownHandler(evt) {
  if (isEscape(evt.code)) {
    evt.preventDefault();
    closeUploadErrorMessage();
    closeUploadSuccessMessage();
  }
}

export {
  showUploadStatusMessage,
};
