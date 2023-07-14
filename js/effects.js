const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit:''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit:'',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit:'%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit:'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit:'',
  }
];

const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const effectValue = document.querySelector('.effect-level__value');
const levelSliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');

const defaultFilter = FILTERS[0];
let currentFilter = defaultFilter;

const isDefault = () => currentFilter === defaultFilter;

const openSlider = () => {
  levelSliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  levelSliderContainer.classList.add('hidden');
};

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

const filtersChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentFilter = FILTERS.find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${currentFilter.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = levelSlider.noUiSlider.get();
  uploadPreviewImg.style.filter = isDefault() ? defaultFilter.style : `${currentFilter.style}(${sliderValue}${currentFilter.unit})`;
  effectValue.value = sliderValue;
};


const resetEffects = () => {
  currentFilter = defaultFilter;
  updateSlider();
  effectsContainer.removeEventListener('change', filtersChange);
};

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

const loadEffects = () => {
  effectsContainer.addEventListener('change', filtersChange);
  levelSlider.noUiSlider.on('update', onSliderUpdate);
};

export { resetEffects, loadEffects };
