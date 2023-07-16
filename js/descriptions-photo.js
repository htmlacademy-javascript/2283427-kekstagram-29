import { getRandomPositiveInteger, createRandomIdFromRangeGenerator, getRandomArrayElement } from './utilities.js';
import { NAMES, MESSAGES, DESCRIPTIONS, COUNT } from './data.js';

// Сгенерированные данные
const generateId = createRandomIdFromRangeGenerator(1, 25);
const generateUrl = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 30);

/** Отрисовка одного или двух предложений в комментарии */
const getRandomMessage = () => {
  if (getRandomPositiveInteger(1, 2) === 1) {
    return getRandomArrayElement(MESSAGES);
  } return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

/** Создание поля с комментарием */
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

/** Создание поста */
const createDescription = () => ({
  id: generateId(),
  url: `photos/${generateUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: getRandomPositiveInteger(0, 30) }, createComment),
});

/** Создание массива из указанного количества постов */
const generatePhoto = () => Array.from({ length: COUNT }, createDescription);

export { generatePhoto };
