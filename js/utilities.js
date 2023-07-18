
/** keyCode Esc */
const isEscapeKey = (evt) => evt.key === 'Escape';

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

/** Устранение дребезга */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  isEscapeKey,
  closesModal,
  opensModal,
  checksDuplicateElements,
  normalizeString,
  debounce
};
