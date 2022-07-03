import { isEscape } from './utils.js';

import { createUploadFormValidator } from './new-publication-validation.js';

const body = document.body;
const form = document.querySelector('#upload-select-image');
const fileInput = form.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('#upload-cancel');

let uploadFormValidator;

// Управление формой

const openForm = () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  form.addEventListener('submit', formSubmitHandler);
  cancelBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);

  uploadFormValidator = createUploadFormValidator();
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

  form.removeEventListener('submit', formSubmitHandler);
  cancelBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', formKeydownHandler);

  uploadFormValidator.destroy();
}

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

function fileInputHandler () {
  // TODO: Открывать форму только если был выбран файл
  fileInput.addEventListener('change', openForm);
}

export { fileInputHandler };
