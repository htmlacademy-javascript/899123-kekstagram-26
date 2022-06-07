// Алгоритм взят с https://learn.javascript.ru/task/random-int-min-max
// Если будет передан только один аргумент, то случайное число будет сгенерировано в промежутке от 0 до этого числа.
/**
 * Возвращает случайное число из диапазона.
 * @param {number} min - минимальное число из диапазона
 * @param {number} max - максимальное число из диапазона
 * @returns {integer} - случайное число
 */
const getRandomNumber = (min, max = 0) => {
  if (max >= 0 && min >= 0) {
    if (max < min) {
      [min, max] = [max, min];
    }
    return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  }
  throw new Error('Задан некорректный диапазон');
};

getRandomNumber(0, 10);

/**
 * Проверяет допустимой ли длины строка
 * @param {string} string - проверяемая строка
 * @param {integer} maxLength - максимально допустимая длина для строки
 * @returns {boolean} - истинно ли то, что строка допустимого размера
 */
const checkStringLength = (string, maxLength = 140) => string.length <= maxLength;

checkStringLength('string');
