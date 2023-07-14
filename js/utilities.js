/** Выбирает случайное число из массива */
const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

/** Выбирает положительное число из диапазона */
const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/** Генерирует ID */
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/** Закрывает окно */
const closesModal = (item) => {
  document.body.classList.remove('modal-open');
  item.classList.add('hidden');
};

/** Открывает окно */
const opensModal = (item) => {
  document.body.classList.add('modal-open');
  item.classList.remove('hidden');
};

/** Проверяет массив на наличие повторяющихся элементов */
const checksDuplicateElements = (arr) => arr.length === new Set(arr).size;

/** Приводит строку к нижнему регистру и удаляет концевые пробелы */
const normalizeString = (str) => str.trim().split(' ').filter((string) => Boolean(string.length));

export { getRandomArrayElement, getRandomPositiveInteger, createRandomIdFromRangeGenerator, closesModal, opensModal, checksDuplicateElements, normalizeString };
