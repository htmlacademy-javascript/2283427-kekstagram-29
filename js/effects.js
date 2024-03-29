import { FILTERS } from './data.js';

// Глобальные переменные
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const effectValue = document.querySelector('.effect-level__value');
const levelSliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');

const defaultFilter = FILTERS[0];
let currentFilter = defaultFilter;

/** Выбор фильтра по умолчанию */
const isDefault = () => currentFilter === defaultFilter;

/** Отрисовка слайдера */
const openSlider = () => {
  levelSliderContainer.classList.remove('hidden');
};

/** Скрытие слайдера */
const closeSlider = () => {
  levelSliderContainer.classList.add('hidden');
};

/** Обновление слайдера */
const updateSlider = () => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max,
    },
    step: currentFilter.step,
    start: currentFilter.max,
  });
  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

/** Выбор эффекта */
const filtersChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${currentFilter.name}`;
  updateSlider();
};

/** Передача выбранных параметров эффекта */
const onSliderUpdate = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  uploadPreviewImg.style.filter = isDefault() ? defaultFilter.style : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectValue.value = sliderValue;
};

/** Сброс эффектов. Удаление обработчика. */
const resetEffects = () => {
  currentFilter = defaultFilter;
  updateSlider();
  effectsContainer.removeEventListener('change', filtersChange);
};

/** Создание слайдера */
noUiSlider.create(levelSlider, {
  range: {
    min: defaultFilter.min,
    max: defaultFilter.max,
  },
  start: defaultFilter.max,
  step: defaultFilter.step,
  connect: 'lower',
});
closeSlider();

/** Добавление обработчиков на эффекты */
const loadEffects = () => {
  effectsContainer.addEventListener('change', filtersChange);
  levelSlider.noUiSlider.on('update', onSliderUpdate);
};

export { resetEffects, loadEffects };
