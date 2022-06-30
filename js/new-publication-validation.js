import { checkStringLength } from './utils.js';

import '../pristine/pristine.min.js';

const ValidatorSettings = {
  hashtagRE: /^#[a-z]{1,19}$/i,
  maxHashtagsAmount: 5,
  maxDescriptionLength: 140,
};
const {hashtagRE, hashtagsMaxAmount, maxDescriptionLength} = ValidatorSettings;
Object.freeze(ValidatorSettings);

const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

// Валидация данных

/**
 * Проверяет строку "#Хэштег"
 * @param {string} inputValue - Строчка, введенная в строку #ХэшТег
 * @returns {boolean} - результат проверки
 */
const validateHashtags = (inputValue) => {

  const hashtags = inputValue.split(' ');

  if (hashtags.length > hashtagsMaxAmount) {
    return false;
  }

  return hashtags.every((hashtag, i) => {
    if (!hashtagRE.test(hashtag)) {
      return false;
    }

    for (++i; i < hashtags.length; i++) {
      if (hashtag.toLowerCase() === hashtags[i].toLowerCase()) {
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
  errorTextClass: 'hidden'
});

validator.addValidator(hashtagsInput, validateHashtags);
validator.addValidator(descriptionInput, validateDescription);

export { validator };
