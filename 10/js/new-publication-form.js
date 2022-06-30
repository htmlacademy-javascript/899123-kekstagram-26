import { isEscape } from './utils.js';

import { validator } from './new-publication-validation.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const fileInput = form.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('#upload-cancel');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorMessageBtn = errorMessage.querySelector('.error__button');

// TODO: Убрать временное отключение
commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

// Управление формой

const openForm = () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);
};

/**
 *
 * @param {boolean} clear - Требуется ли очистить форму?
 */
function closeForm (сlear = true) {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');

  if (сlear) {
    form.reset();
  }

  cancelBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', formKeydownHandler);
}

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

// Обработчики для формы

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validator.validate()) {
    closeForm(false);
    showUploadErrorMessage();
  }
});

/**
 * Закрывает форму при нажатии Escape
 * @param {object} evt - event
 */
function formKeydownHandler (evt) {
  if (!(evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description'))) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      closeForm();
    }
  }
}

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

fileInput.addEventListener('change', openForm);
