// Алгоритм взят с https://learn.javascript.ru/task/random-int-min-max
// Если будет передан только один аргумент, то случайное число будет сгенерировано в промежутке от 0 до этого числа.
/**
 * Возвращает случайное число из диапазона.
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @returns {integer} - случайное число
 */
const getRandomNumber = (min, max = 0) => {
  if (max >= 0 && min >= 0 && (Math.abs(max-min) >= 1 )) {
    if (max < min) {
      [min, max] = [max, min];
    }
    return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  }
  throw new Error('Задан некорректный диапазон');
};

getRandomNumber(1, 2);

/**
 * Проверяет допустимой ли длины строка
 * @param {string} string - проверяемая строка
 * @param {integer} maxLength - максимально допустимая длина для строки
 * @returns {boolean} - истинно ли то, что строка допустимого размера
 */
const checkStringLength = (string, maxLength = 140) => string.length <= maxLength;

checkStringLength('string');

const DESCRIPTIONS_LIST = [
  'Это я',
  'Это не я',
  'Теперь это мое',
  'Жаль, что пришлось избавиться от этого',
  'Хочу повторить',
  'Надеюсь, что это было в последний раз',
];
const MESSAGES_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES_LIST = [
  'Антон',
  'Наташа',
  'Александр',
  'Рената',
  'Елена',
  'Егор',
  'Роман',
  'Алёна',
  'Леонид',
];

const idUsedForPublications = []; // числа использованные для генерации id публикаций
const idUsedForComments = []; // числа использованные для генерации id комментариев

/**
 * Генерирует ранее не использованные числа
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @param {array} usedNumbers - массив ранее использованных чисел
 * @returns {integer} - случайное число, которого не было в массиве использованных
 */
const getUniqueRandomNumber = (min, max, usedNumbers) => {
  let randomNumber = getRandomNumber(min, max);
  if (usedNumbers.length !== 0) {
    for(let i = 0; i < usedNumbers.length; i++) {
      if (randomNumber === usedNumbers[i]) {
        randomNumber = getRandomNumber(min, max);
        i = 0;
      }
    }
  }

  usedNumbers.push(randomNumber);
  return randomNumber;
};

/**
 * Получить случайный элемент из массива
 * @param {array} elements - массив с элементами
 * @returns - случайный элемент из массива
 */
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length-1)];

/**
 * Генерирует случайный комментарий к фотографии
 * @returns {object} - сгенерированный комментарий
 */
const createComments = () =>
  ({
    id: getUniqueRandomNumber(0, 250, idUsedForComments),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_LIST),
    name: getRandomArrayElement(NAMES_LIST),
  });

/**
 * Генерирует случайную публикацию
 * @returns {object} - сгенерированная публикация
 */
const createPublication = () =>
  ({
    id: getUniqueRandomNumber(0, 25, idUsedForPublications),
    url: `photos/${getRandomNumber(0, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_LIST),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: 2}, createComments),
  });

Array.from({length: 25}, createPublication);
