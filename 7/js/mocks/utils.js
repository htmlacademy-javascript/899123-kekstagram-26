// Алгоритм взят с https://learn.javascript.ru/task/random-int-min-max
// Если будет передан только один аргумент, то случайное число будет сгенерировано в промежутке от 0 до этого числа.
/**
 * Возвращает случайное число из диапазона.
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @returns {integer} - случайное число
 */
const getRandomPositiveInteger = (min, max = 0) => {
  if (max < 0 || min < 0 || max % 1 !== 0 || min % 1 !== 0) {
    throw new Error('Задан некорректный диапазон');
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
};

/**
 * Проверяет допустимой ли длины строка
 * @param {string} string - проверяемая строка
 * @param {integer} maxLength - максимально допустимая длина для строки
 * @returns {boolean} - истинно ли то, что строка допустимого размера
 */
const checkStringLength = (string, maxLength = 140) => string.length <= maxLength;

checkStringLength('Lorem ipsum');

/**
 * Генерирует ранее не использованные числа
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @returns {function} - функция генерирующая уникальное значение в зависимости от переданного окружения
 */
const getUniqueRandomPositiveInteger = (min, max) => {
  if (max < 0 || min < 0 || max % 1 !== 0 || min % 1 !== 0) {
    throw new Error('Задан некорректный диапазон');
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  return () => Number(numbers.splice(getRandomPositiveInteger(0, numbers.length - 1), 1));
};

/**
 * Получить случайный элемент из массива
 * @param {array} elements - массив с элементами
 * @returns - случайный элемент из массива
 */
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length-1)];


export {
  getRandomPositiveInteger,
  checkStringLength,
  getUniqueRandomPositiveInteger,
  getRandomArrayElement
};
