import { getRandomPositiveInteger, createRandomIdFromRangeGenerator, getRandomArrayElement } from './utilities.js';

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

const generateId = createRandomIdFromRangeGenerator(1, 25);
const generateUrl = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 30);

const getRandomMessage = () => {
  if (getRandomPositiveInteger(1, 2) === 1) {
    return getRandomArrayElement(MESSAGES);
  } return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

const createDescription = () => ({
  id: generateId(),
  url: `photos/${generateUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: getRandomPositiveInteger(0, 30) }, createComment),
});

const someCreateDescription = () => Array.from({ length: COUNT }, createDescription);

export { someCreateDescription };
