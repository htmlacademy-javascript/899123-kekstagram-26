import { checkStringLength } from '../utils.js';

const ValidatorSettings = {
  HASHTAG_RE: /^#[a-z,а-я,Ё,ё,0-9]{1,19}$/i,
  MAX_HASHTAGS_AMOUNT: 5,
  MAX_DESCRIPTION_LENGTH: 140,
  MAX_HASHTAG_LENGTH: 20
};
const {HASHTAG_RE, MAX_HASHTAGS_AMOUNT, MAX_DESCRIPTION_LENGTH, MAX_HASHTAG_LENGTH} = ValidatorSettings;
Object.freeze(ValidatorSettings);

const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

// Валидация данных

let uploadFormValidator;
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

  if (hashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH)) {
    validationErrorMessage = `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов`;
    return false;
  }

  if (!hashtags.every((hashtag) => HASHTAG_RE.test(hashtag))) {
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

  return true;
};

/**
 * Проверяет строку "Ваш комментарий..."
 * @param {string} - Текст, введенный в поле для комментария
 * @returns {boolean}
 */
const validateDescription = (descriptionInputValue) => checkStringLength(descriptionInputValue, MAX_DESCRIPTION_LENGTH);

const validateUploadForm = () => uploadFormValidator.validate();

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

  uploadFormValidator.addValidator(hashtagsInputElement, validateHashtags, getErrorMessage);
  uploadFormValidator.addValidator(descriptionInputElement, validateDescription, `Не более ${MAX_DESCRIPTION_LENGTH} символов`);

  return uploadFormValidator;
};

const destroyUploadFormValidator = () => uploadFormValidator.destroy();

export { createUploadFormValidator, validateUploadForm, destroyUploadFormValidator };
