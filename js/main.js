// Алгоритм взят с https://learn.javascript.ru/task/random-int-min-max
// Если будет передан только один аргумент, то случайное число будет сгенерировано в промежутке от 0 до этого числа.
const getRandomNumber = (min, max = 0) => {
  if (min <= max && min >= 0) {
    return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  } else if (max < min && max >= 0) {
    // В формуле max и min поменяны местами
    // Можно было реализовать с помощью обмена значений min и max, но посчитал, что такой вариант будет производительнее
    return Math.abs(Math.round(max - 0.5 + Math.random() * (min - max + 1)));
  }
  throw new Error('Задан некорректный диапазон');
};

getRandomNumber(50);

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('string');
