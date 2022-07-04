import { isEscape } from '../utils.js';

import {
  createUploadFormValidator,
  validateUploadForm,
  destroyUploadFormValidator,
} from './new-publication-validation.js';

import {
  changeScaleClickHandler,
  effectsListClickHandler,
  createSlider,
  destroySlider,
  resetPreviewPhoto,
} from './new-publication-effects.js';

const bodyElement = document.body;
const formElement = document.querySelector('#upload-select-image');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const cancelBtnElement = uploadFormElement.querySelector('#upload-cancel');

const scaleElement = document.querySelector('.scale');
const effectsListElement = document.querySelector('.effects__list');

// Управление формой

const openUploadForm = () => {
  uploadFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  scaleElement.addEventListener('click', changeScaleClickHandler);
  effectsListElement.addEventListener('click', effectsListClickHandler);

  formElement.addEventListener('submit', formSubmitHandler);
  cancelBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);

  createSlider();
  createUploadFormValidator();
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

  scaleElement.removeEventListener('click', changeScaleClickHandler);
  effectsListElement.removeEventListener('click', effectsListClickHandler);
  resetPreviewPhoto();

  formElement.removeEventListener('submit', formSubmitHandler);
  cancelBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', formKeydownHandler);

  destroySlider();
  destroyUploadFormValidator();
}

// Обработчики для формы

/**
 * Проверяет заполнение формы. Отправляет, если все соответствует.
 * @param {object} evt - event
 */
function formSubmitHandler (evt) {
  evt.preventDefault();
  if (validateUploadForm()) {
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

const addFileInputChangeHandler = () => fileInputElement.addEventListener('change', openUploadForm);

const removeFileInputChangeHandler = () => fileInputElement.removeEventListener('change', openUploadForm);


export { addFileInputChangeHandler, removeFileInputChangeHandler };
