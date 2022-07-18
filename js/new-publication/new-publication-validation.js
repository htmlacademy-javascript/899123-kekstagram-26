import { checkStringLength } from '../utils.js';

// Переменные

const HASHTAG_RE = /^#[a-z,а-я,Ё,ё,0-9]{1,19}$/i;
const MAX_HASHTAGS_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const DESCRIPTION_VALIDATOR_ERROR_MESSAGE = `Не более ${MAX_DESCRIPTION_LENGTH} символов`;

let uploadFormValidator;
let validationErrorMessage;

// Элементы DOM

const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitBtnElement = formElement.querySelector('#upload-submit');

// Валидация данных

/**
 *
 * @returns {string} актуальная ошибка валидации
 */
const getHashtagsValidatorErrorMessage = () => validationErrorMessage;

/**
 * Проверяет строку "#Хэштег"
 * @param {string} hashtagInputValue - Текст, введенный в поле для хэштегов
 * @returns {boolean}
 */
const validateHashtags = (hashtagInputValue) => {
  const hashtags = hashtagInputValue.split(' ');

  submitBtnElement.disabled = false;

  if (hashtagInputValue === '') {
    return true;
  }

  submitBtnElement.disabled = true;

  if (hashtagInputValue.endsWith(' ')) {
    validationErrorMessage = 'Хэштег не должен заканчиваться пробелом';
    return false;
  }

  if (hashtags.includes('')) {
    validationErrorMessage = 'Только один пробел между хэштегами';
    return false;
  }

  if (hashtags.some((hashtag) => !hashtag.startsWith('#'))) {
    validationErrorMessage = 'Хэштег должен начинаться с #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    validationErrorMessage = 'Хэштег не может состоять только из #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH)) {
    validationErrorMessage = `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов`;
    return false;
  }

  if (hashtags.some((hashtag) => !HASHTAG_RE.test(hashtag))) {
    validationErrorMessage = 'Хэштег содержит запрещенные символы';
    return false;
  }

  if ((new Set(hashtags.map((hashtag) => hashtag.toLowerCase()))).size !== hashtags.length) {
    validationErrorMessage = 'Хэштеги не должны повторяться';
    return false;
  }

  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    validationErrorMessage = `Максимальное количество хэштегов - ${MAX_HASHTAGS_AMOUNT}`;
    return false;
  }

  submitBtnElement.disabled = false;
  return true;
};

/**
 * Проверяет строку "Ваш комментарий..."
 * @param {string} - Текст, введенный в поле для комментария
 * @returns {boolean}
 */
const validateDescription = (descriptionInputValue) => checkStringLength(descriptionInputValue, MAX_DESCRIPTION_LENGTH);

const validateUploadForm = () => uploadFormValidator.validate();

const resetUploadFormValidator = () => uploadFormValidator.reset();

/**
 *
 * @returns Объект для валидации формы новой публикации
 */
const createUploadFormValidator = () => {
  uploadFormValidator = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTag: 'div',
    errorTextClass: 'validation-error'
  });

  uploadFormValidator.addValidator(hashtagsInputElement, validateHashtags, getHashtagsValidatorErrorMessage);
  uploadFormValidator.addValidator(descriptionInputElement, validateDescription, DESCRIPTION_VALIDATOR_ERROR_MESSAGE);

  return uploadFormValidator;
};
createUploadFormValidator();

export {
  validateUploadForm,
  resetUploadFormValidator,
};
