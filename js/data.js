// Данные для отображения комментариев
const COMMENT_PER_PORTION = 5;

// Данные для создания миниатюр
const NAMES = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Сергей',
  'Андрей',
  'Алексей',
  'Артём',
  'Илья',
  'Кирилл',
  'Михаил',
  'Никита',
  'Матвей',
  'Роман',
  'Егор',
  'Арсений',
  'Иван',
  'Денис',
  'Евгений',
  'Тимофей',
  'Владислав',
  'Игорь',
  'Владимир',
  'Павел',
  'Руслан',
  'Марк',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Берег озера',
  'Дорога на пляж',
  'Берег океана',
  'Девушка с фотоаппаратом',
  'Рисовые фигурки',
  'Черный спорткар',
  'Свежая клубника',
  'Ягодный морс',
  'Самолет над пляжем',
  'Выдвижная обувница',
  'Песчаная тропа',
  'Ауди А5',
  'Овощной салат',
  'Суши кот',
  'Мягкие сапоги',
  'Самолет над горами',
  'Хор',
  'Красный Шевроле',
  'Тапки с фонариками',
  'Пальмовая аллея',
  'Блюдо с лаймом',
  'Закат в океане',
  'Краб',
  'Фото с концерта',
  'Бегемот и Defender',
];

const COUNT = 25;

// Данные для валидации
const MAX_QUANTITY_TAGS = 5;
const MAX_LENGTH_TAG = 20;
const IS_VALIDE_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;

const MessageError = {
  REPEAT_HASHTAGS: 'хэш-теги повторяются',
  INVALID_HASHTAG: 'введён невалидный хэш-тег',
  QUANTITY_HASHTAGS: 'превышено количество хэш-тегов',
  MAX_LENGTH_HASHTAG: `максимальная длина одного хэш-тега ${MAX_LENGTH_TAG} символов, включая решётку`,
  RESET_ERROR: '',
};

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

export {
  COMMENT_PER_PORTION,
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  COUNT,
  STEP_VALUE,
  MIN_VALUE,
  MAX_VALUE,
  DEFAULT_VALUE,
  FILTERS,
  MAX_QUANTITY_TAGS,
  MAX_LENGTH_TAG,
  IS_VALIDE_HASHTAGS,
  MessageError
};
