import { STEP_VALUE, MIN_VALUE, MAX_VALUE, DEFAULT_VALUE } from './data.js';

// Глобальные переменные
const uploadImg = document.querySelector('.img-upload');
const smallControl = uploadImg.querySelector('.scale__control--smaller');
const bigControl = uploadImg.querySelector('.scale__control--bigger');
const contolValue = uploadImg.querySelector('.scale__control--value');
const uploadPreviewImg = uploadImg.querySelector('.img-upload__preview img');

/** Вывод результата в поле */
const showResult = (value) => {
  uploadPreviewImg.style.transform = `scale(${value / 100})`;
  contolValue.value = `${value}%`;
};

/** Уменьшение изображения */
const onSmallControlClick = () => {
  const newElement = parseInt(contolValue.value, 10);
  const newValue = newElement - STEP_VALUE;

  if (newValue < MIN_VALUE) {
    showResult(MIN_VALUE);
  } else {
    showResult(newValue);
  }
};

/** Увеличение изображения */
const onBigControlClick = () => {
  const newElement = parseInt(contolValue.value, 10);
  const newValue = newElement + STEP_VALUE;

  if (newValue > MAX_VALUE) {
    showResult(MAX_VALUE);
  } else {
    showResult(newValue);
  }
};

/** Сброс по умолчанию и удаление обработчиков */
const resetScale = () => {
  showResult(DEFAULT_VALUE);
  smallControl.removeEventListener('click', onSmallControlClick);
  bigControl.removeEventListener('click', onBigControlClick);
};

/** Добавление обработчиков */
const loadScale = () => {
  smallControl.addEventListener('click', onSmallControlClick);
  bigControl.addEventListener('click', onBigControlClick);
};

export { resetScale, loadScale };
