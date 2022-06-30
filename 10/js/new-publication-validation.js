import { checkStringLength } from './utils.js';

import '../pristine/pristine.min.js';

const ValidatorSettings = {
  hashtagRE: /^#[a-z,а-я,Ё,ё]{1,19}$/i,
  maxHashtagsAmount: 5,
  maxDescriptionLength: 140,
};
const {hashtagRE, maxHashtagsAmount, maxDescriptionLength} = ValidatorSettings;
Object.freeze(ValidatorSettings);

const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

// Валидация данных

let errorMessage;

/**
 *
 * @returns актуальная ошибка
 */
const getErrorMessage = () => errorMessage;

/**
 * Проверяет строку "#Хэштег"
 * @param {string} hashtagInputValue - Текст, введенный в поле для хэштегов
 * @returns {boolean} - результат проверки
 */
const validateHashtags = (hashtagInputValue) => {

  if (hashtagInputValue === '') {
    return true;
  }

  if (hashtagInputValue === '#') {
    errorMessage = 'Хэштег не может состоять только из #';
    return false;
  }

  if (!hashtagInputValue.startsWith('#')) {
    errorMessage = 'Хэштег должен начинаться с #';
    return false;
  }

  if (hashtagInputValue.endsWith(' ')) {
    errorMessage = 'Хэштег не должен заканчиваться пробелом';
    return false;
  }

  const hashtags = hashtagInputValue.split(' ');
  if (hashtags.includes('')) {
    errorMessage = 'Только один пробел между хэштегами';
    return false;
  }

  if (hashtags.length > maxHashtagsAmount) {
    errorMessage = `Максимальное количество хэштегов - ${maxHashtagsAmount}`;
    return false;
  }

  return hashtags.every((hashtag, i) => {
    if (!hashtagRE.test(hashtag)) {
      errorMessage = 'Хэштег может содержать только символы от a до z';
      return false;
    }

    for (++i; i < hashtags.length; i++) {
      if (hashtag.toLowerCase() === hashtags[i].toLowerCase()) {
        errorMessage = 'Хэштеги не должны повторяться';
        return false;
      }
    }

    return true;
  });
};

/**
 * Проверяет строку "Ваш комментарий..."
 * @returns {boolean}
 */
const validateDescription = () => checkStringLength(descriptionInput.value, maxDescriptionLength);

const validator = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTag: 'div',
  errorTextClass: 'validation-error'
});

validator.addValidator(hashtagsInput, validateHashtags, getErrorMessage);
validator.addValidator(descriptionInput, validateDescription, `Не более ${maxDescriptionLength} символов`);

export { validator };
