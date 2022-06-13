// Алгоритм взят с https://learn.javascript.ru/task/random-int-min-max
// Если будет передан только один аргумент, то случайное число будет сгенерировано в промежутке от 0 до этого числа.
/**
 * Возвращает случайное число из диапазона.
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @returns {integer} - случайное число
 */
const getRandomNumber = (min, max = 0) => {
  if (max >= 0 && min >= 0 && (max % 1 === 0 && min % 1 === 0)) {
    if (max < min) {
      [min, max] = [max, min];
    }
    return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  }
  throw new Error('Задан некорректный диапазон');
};

/**
 * Проверяет допустимой ли длины строка
 * @param {string} string - проверяемая строка
 * @param {integer} maxLength - максимально допустимая длина для строки
 * @returns {boolean} - истинно ли то, что строка допустимого размера
 */
const checkStringLength = (string, maxLength = 140) => string.length <= maxLength;

checkStringLength('string');

const DESCRIPTIONS_LIST = [
  'Мне это нужно',
  'Жаль, что пришлось избавиться от этого',
  'Хочу повторить',
  'Надеюсь, что это было в последний раз',
  'Очень хочу попробовать это блюдо',
  'Антон тоже сейчас отдыхает в этих местах',
  'Наташе бы это точно понравилось',
  'Елене это пришлось бы по душе',
  'Это определенно в стиле Егора Беседина',
  'У Ренаты Назмеевой тоже такое есть',
  'Встретились с Романом Бизикиным',
  'Это благодаря Алёне'
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
  'Ника',
  'Ольга',
  'Валерия',
  'Софья',
];

const publicationsId = []; // массив чисел для генерации id публикаций
const commentsId = []; // массив чисел для генерации id комментариев
const urls = []; // массив чисел для генерации url

/**
 * Генерирует ранее не использованные числа
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @param {array} array - массив для записи доступных значений
 * @returns {function} - функция генерирующая уникальное значение в зависимости от переданного окружения
 */
const getUniqueRandomNumber = (min, max, array) => {
  if (max < min) {
    [min, max] = [max, min];
  }
  if (!array[0]) {
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
  }

  return () => Number(array.splice(getRandomNumber(0, array.length - 1), 1));
};
/**
 * Случайное число из массива id для публикаций
 * @returns {number} - случайное число из массива id
 */
const getUniqueIdForPublication = getUniqueRandomNumber(1, 25, publicationsId);

/**
 * Случайное число из массива id для комментариев
 * @returns {number} - случайное число из массива id
 */
const getUniqueIdForComment = getUniqueRandomNumber(1, 250, commentsId);

/**
 * Случайное число из массива urls
 * @returns {number} - случайное число из массива urls
 */
const getUniqueUrl = getUniqueRandomNumber(1, 25, urls);

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
const createComments = () => ({
  id: getUniqueIdForComment(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES_LIST),
  name: getRandomArrayElement(NAMES_LIST),
});

/**
 * Генерирует случайную публикацию
 * @returns {object} - сгенерированная публикация
 */
const createPublication = () => ({
  id: getUniqueIdForPublication(),
  url: `photos/${getUniqueUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_LIST),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: 2}, createComments),
});

const final = Array.from({length: 25}, createPublication);
final.indexOf(); // Это для того чтобы записать результат в переменную и линтер не ругался
