import { getRandomPositiveInteger, createRandomIdFromRangeGenerator, getRandomArrayElement } from './utilities.js';
import { NAMES, MESSAGES, DESCRIPTIONS, COUNT } from './data.js';

// Сгенерированные данные
const generateCommentId = createRandomIdFromRangeGenerator(1, 30);
const arrCards = [];

/** Отрисовка одного или двух предложений в комментарии */
const getRandomMessage = () => {
  if (getRandomPositiveInteger(1, 2) === 1) {
    return getRandomArrayElement(MESSAGES);
  } return `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`;
};

/** Создание поля с комментарием */
const createComment = () => ({
  id : generateCommentId(),
  avatar : `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message : getRandomMessage(),
  name : getRandomArrayElement(NAMES),
});

/**
 * Генерирует комментарии
 * @param {number} quantity - количество сгенерированных комментариев
*/
const getRandomComments = (quantity) => {
  const comments = [];
  for (let i = 1; i <= quantity; i++) {
    comments[i - 1] = createComment(generateCommentId);
  }
  return comments;
};

/** Создание поста */
const createPhoto = (i) => ({
  id: i,
  url: `photos/${i}.jpg` ,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: getRandomComments(getRandomPositiveInteger (0, 30))
});

/** Создание массива из указанного количества постов */
const generatePhoto = () => {
  for (let i = 1; i <= COUNT; i++){
    arrCards[i - 1] = createPhoto(i);
  }

  return arrCards;
};

export { generatePhoto, arrCards };
