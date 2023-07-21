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
const selectDefaultFilter = () => currentFilter === defaultFilter;

/** Отрисовка слайдера */
const openingSlider = () => {
  levelSliderContainer.classList.remove('hidden');
};

/** Скрытие слайдера */
const closingSlider = () => {
  levelSliderContainer.classList.add('hidden');
};

/** Обновление слайдера */
const updatesSlider = () => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max,
    },
    step: currentFilter.step,
    start: currentFilter.max,
  });
  if (selectDefaultFilter()) {
    closingSlider();
  } else {
    openingSlider();
  }
};

/** Выбор эффекта */
const selectFilter = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${currentFilter.name}`;
  updatesSlider();
};

/** Передача выбранных параметров эффекта */
const passesEffectParameters = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  uploadPreviewImg.style.filter = selectDefaultFilter() ? defaultFilter.style : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectValue.value = sliderValue;
};

/** Сброс эффектов. Удаление обработчика. */
const resetEffects = () => {
  currentFilter = defaultFilter;
  updatesSlider();
  effectsContainer.removeEventListener('change', selectFilter);
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
closingSlider();

/** Добавление обработчиков на эффекты */
const loadEffects = () => {
  effectsContainer.addEventListener('change', selectFilter);
  levelSlider.noUiSlider.on('update', passesEffectParameters);
};

export { resetEffects, loadEffects };
