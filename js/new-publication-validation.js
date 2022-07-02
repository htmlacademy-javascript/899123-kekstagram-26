import { checkStringLength } from './utils.js';

import '../pristine/pristine.min.js';

const ValidatorSettings = {
  hashtagRE: /^#[a-z,а-я,Ё,ё]{1,19}$/i,
  maxHashtagsAmount: 5,
  maxDescriptionLength: 140,
  maxHashtagLength: 20
};
const {hashtagRE, maxHashtagsAmount, maxDescriptionLength, maxHashtagLength} = ValidatorSettings;
Object.freeze(ValidatorSettings);

const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

// Валидация данных

let validationErrorMessage;

/**
 *
 * @returns {string} актуальная ошибка валидации
 */
const getErrorMessage = () => validationErrorMessage;

/**
 * Проверяет строку "#Хэштег"
 * @param {string} hashtagInputValue - Текст, введенный в поле для хэштегов
 * @returns {boolean}
 */
const validateHashtags = (hashtagInputValue) => {
  const hashtags = hashtagInputValue.split(' ');

  if (hashtagInputValue === '') {
    return true;
  }

  if (hashtagInputValue.endsWith(' ')) {
    validationErrorMessage = 'Хэштег не должен заканчиваться пробелом';
    return false;
  }

  if (hashtags.includes('')) {
    validationErrorMessage = 'Только один пробел между хэштегами';
    return false;
  }

  if (!hashtags.every((hashtag) => hashtag.startsWith('#'))) {
    validationErrorMessage = 'Хэштег должен начинаться с #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    validationErrorMessage = 'Хэштег не может состоять только из #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag.length > maxHashtagLength)) {
    validationErrorMessage = `Максимальная длина хэштега - ${maxHashtagLength} символов`;
    return false;
  }

  if (!hashtags.every((hashtag) => hashtagRE.test(hashtag))) {
    validationErrorMessage = 'Хэштег содержит запрещенные символы';
    return false;
  }

  if ((new Set(hashtags.map((hashtag) => hashtag.toLowerCase()))).size !== hashtags.length) {
    validationErrorMessage = 'Хэштеги не должны повторяться';
    return false;
  }

  if (hashtags.length > maxHashtagsAmount) {
    validationErrorMessage = `Максимальное количество хэштегов - ${maxHashtagsAmount}`;
    return false;
  }

  return true;
};

/**
 * Проверяет строку "Ваш комментарий..."
 * @param {string} - Текст, введенный в поле для комментария
 * @returns {boolean}
 */
const validateDescription = (descriptionInputValue) => checkStringLength(descriptionInputValue, maxDescriptionLength);

/**
 *
 * @returns Объект для валидации формы новой публикации
 */
const createUploadFormValidator = () => {
  const uploadFormValidator = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTag: 'div',
    errorTextClass: 'validation-error'
  });

  uploadFormValidator.addValidator(hashtagsInput, validateHashtags, getErrorMessage);
  uploadFormValidator.addValidator(descriptionInput, validateDescription, `Не более ${maxDescriptionLength} символов`);

  return uploadFormValidator;
};

export { createUploadFormValidator};
