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

// Элементы DOM

const formElement = document.querySelector('#upload-select-image');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const cancelBtnElement = uploadFormElement.querySelector('#upload-cancel');

const uploadSubmitBtnElement = formElement.querySelector('#upload-submit');

const scaleElement = document.querySelector('.scale');
const effectsListElement = document.querySelector('.effects__list');

//

const changePreviewPhoto = () => {
  imgPreviewElement.src = URL.createObjectURL(fileInputElement.files[0]);
  effectsListElement.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = `url(${imgPreviewElement.src}`;
  });
};

// Управление формой

const openForm = () => {
  changePreviewPhoto();

  uploadSubmitBtnElement.disabled = false;
  uploadFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleElement.addEventListener('click', changeScaleClickHandler);
  effectsListElement.addEventListener('click', effectsListClickHandler);

  formElement.addEventListener('submit', formSubmitHandler);
  cancelBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', formKeydownHandler);
};

/**
 *
 * @param {boolean} isClearForm - Требуется ли очистить форму?
 */
function closeForm (isClearForm = true) {
  uploadFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

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

const successUploadHandler = () => {
  showUploadStatusMessage(true);
  closeForm(true);
};

const failureUploadHandler = () => {
  showUploadStatusMessage(false);
  closeForm(false);
};

/**
 * Проверяет заполнение формы. Отправляет, если все соответствует.
 * @param {object} evt - event
 */
function formSubmitHandler (evt) {
  evt.preventDefault();
  if (validateUploadForm()) {
    uploadSubmitBtnElement.disabled = true;
    uploadSubmitBtnElement.textContent = 'Ваша фотография публикуется...';

    sendUploadFormData(new FormData(formElement), successUploadHandler, failureUploadHandler);

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

const addFileInputChangeHandler = () => fileInputElement.addEventListener('change', openForm);

const removeFileInputChangeHandler = () => fileInputElement.removeEventListener('change', openForm);

export {
  addFileInputChangeHandler,
  removeFileInputChangeHandler,
  closeForm,
};
