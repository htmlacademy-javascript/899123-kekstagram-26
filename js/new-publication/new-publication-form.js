import { isEscape } from '../utils.js';

import {
  showUploadStatusMessage,
} from '../new-publication/upload-status-modal.js';

import {
  validateUploadForm,
  resetUploadFormValidator,
} from './new-publication-validation.js';

import {
  changeScaleClickHandler,
  effectsListClickHandler,
  resetPreviewPhoto,
  hideSlider,
} from './new-publication-effects.js';

import { sendUploadFormData } from '../web-api/ajax-requests.js';

// Переменные

const bodyElement = document.body;
const formElement = document.querySelector('#upload-select-image');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const cancelBtnElement = uploadFormElement.querySelector('#upload-cancel');

const uploadSubmitBtnElement = formElement.querySelector('#upload-submit');

const scaleElement = document.querySelector('.scale');
const effectsListElement = document.querySelector('.effects__list');

// Управление формой

const openUploadForm = () => {
  uploadSubmitBtnElement.disabled = false;
  uploadFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  scaleElement.addEventListener('click', changeScaleClickHandler);
  effectsListElement.addEventListener('click', effectsListClickHandler);

  formElement.addEventListener('submit', formSubmitHandler);
  cancelBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);
};

/**
 *
 * @param {boolean} clear - Требуется ли очистить форму?
 */
function closeForm (isClearForm = true) {
  uploadFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  if (isClearForm) {
    resetUploadFormValidator();
    resetPreviewPhoto();
    hideSlider();
    formElement.reset();
  }

  fileInputElement.value = '';

  scaleElement.removeEventListener('click', changeScaleClickHandler);
  effectsListElement.removeEventListener('click', effectsListClickHandler);

  formElement.removeEventListener('submit', formSubmitHandler);
  cancelBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', formKeydownHandler);
}

// Обработчики для формы

/**
 * Проверяет заполнение формы. Отправляет, если все соответствует.
 * @param {object} evt - event
 */
async function formSubmitHandler (evt) {
  evt.preventDefault();
  if (validateUploadForm()) {
    uploadSubmitBtnElement.disabled = true;
    uploadSubmitBtnElement.textContent = 'Ваша фотография публикуется';

    const clear = await sendUploadFormData(new FormData(formElement), showUploadStatusMessage);
    closeForm(clear);

    uploadSubmitBtnElement.textContent = 'Опубликовать';
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

const addFileInputChangeHandler = () => fileInputElement.addEventListener('change', openUploadForm);

const removeFileInputChangeHandler = () => fileInputElement.removeEventListener('change', openUploadForm);

export {
  addFileInputChangeHandler,
  removeFileInputChangeHandler,
  closeForm,
};
