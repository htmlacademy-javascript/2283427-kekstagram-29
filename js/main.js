// 4.16. Больше деталей

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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const createComment = function () {
  const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
  const randomNamesIndex = getRandomInteger(0, NAMES.length - 1);
  const generateId = createRandomIdFromRangeGenerator(0, 30);
  return {
    id: generateId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[randomMessageIndex],
    name: NAMES[randomNamesIndex],
  };
};

const createDescriptionPhoto = function () {
  const generateId = createRandomIdFromRangeGenerator(1, 25);
  const generateUrl = createRandomIdFromRangeGenerator(1, 25);
  const generateLikes = getRandomInteger(15, 200);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return {
    id: generateId(),
    url: `photos/${generateUrl()}.jpg`,
    description: DESCRIPTIONS[randomDescriptionIndex],
    likes: generateLikes,
    comments: createComment(),
  };
};

const descriptionsPhoto = [];
for (let i = 0; i < 25; i++) {
  descriptionsPhoto.push(createDescriptionPhoto());
}

// console.log(descriptionsPhoto);
// В консоль попадет массив из 25 карточек.
