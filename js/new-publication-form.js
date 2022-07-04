import { isEscape } from './utils.js';

import { createUploadFormValidator } from './new-publication-validation.js';

const bodyElement = document.body;
const formElement = document.querySelector('#upload-select-image');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const cancelBtnElement = uploadFormElement.querySelector('#upload-cancel');

let uploadFormValidator;

// Управление формой

const openForm = () => {
  uploadFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  formElement.addEventListener('submit', formSubmitHandler);
  cancelBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);

  uploadFormValidator = createUploadFormValidator();
};

/**
 *
 * @param {boolean} clear - Требуется ли очистить форму?
 */
function closeForm (сlear = true) {
  uploadFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  if (сlear) {
    formElement.reset();
  }

  formElement.removeEventListener('submit', formSubmitHandler);
  cancelBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', formKeydownHandler);

  uploadFormValidator.destroy();
}

const addFileInputChangeHandler = () => {
  // TODO: Открывать форму только если был выбран файл
  fileInputElement.addEventListener('change', openForm);
};

// Обработчики для формы

/**
 * Проверяет заполнение формы. Отправляет, если все соответствует.
 * @param {object} evt - event
 */
function formSubmitHandler (evt) {
  evt.preventDefault();
  if (uploadFormValidator.validate()) {
    closeForm();
  }
}

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

export { addFileInputChangeHandler };
