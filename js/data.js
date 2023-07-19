// Данные для отображения комментариев
const COMMENT_PER_PORTION = 5;

// Данные для валидации
const MAX_QUANTITY_TAGS = 5;
const MAX_LENGTH_TAG = 20;
const IS_VALIDE_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;

// Данные для масштаба
const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;

// Данные для эффектов
const FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 0.1,
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

// Форматы загружаемого изображения
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export {
  COMMENT_PER_PORTION,
  STEP_VALUE,
  MIN_VALUE,
  MAX_VALUE,
  DEFAULT_VALUE,
  FILTERS,
  MAX_QUANTITY_TAGS,
  MAX_LENGTH_TAG,
  IS_VALIDE_HASHTAGS,
  FILE_TYPES
};
