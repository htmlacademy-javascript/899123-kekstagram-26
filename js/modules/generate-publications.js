import {
  getRandomPositiveInteger,
  getUniqueRandomPositiveInteger,
  getRandomArrayElement,
} from './utils.js';

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

/**
* Случайное число из массива id для публикаций
* @returns {number} - случайное число из массива id
*/
const getUniqueIdForPublication = getUniqueRandomPositiveInteger(1, 25);

/**
* Случайное число из массива id для комментариев
* @returns {number} - случайное число из массива id для комментариев
*/
const getUniqueIdForComment = getUniqueRandomPositiveInteger(1, 250);

/**
* Случайное число из массива urls
* @returns {number} - случайное число из массива urls
*/
const getUniqueUrl = getUniqueRandomPositiveInteger(1, 25);

/**
 * Генерирует случайный комментарий к фотографии
 * @returns {object} - сгенерированный комментарий
 */
const createComments = () => ({
  id: getUniqueIdForComment(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
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
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(0,5)}, createComments),
});

const generatePublications = () => Array.from({length: 25}, createPublication);
export { generatePublications };
