import { closesModal, opensModal, isEscapeKey } from './utilities.js';
import { COMMENT_PER_PORTION } from './data.js';

// Глобальные переменные
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const pictureSocialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const pictureComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCountList = bigPicture.querySelector('.social__comment-count');
let commentsShowArray = [];

/** Закрытие по Esc */
const closePhotoEsc = (evt) => {
  if (isEscapeKey(evt)) {
    closePhoto();
  }
};

/** Закрытие картинки */
function closePhoto() {
  closesModal(bigPicture);
  document.removeEventListener('keydown', closePhotoEsc);
  closeButton.removeEventListener('click', closePhoto);
  bigPictureCommentsLoader.removeEventListener('click', getLoadComments);
}

/**
Генерация комментариев
* @param {array} comments - массив комментариев из объекта
*/
const createPictureComments = (comments) => {
  comments.forEach((comment) => {
    const element = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('p');
    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;
    element.append(img);
    element.append(text);
    pictureComments.append(element);
  });
};

/** Отрисовка следующей порции комментариев */
function getLoadComments () {
  if (!commentsShowArray.length) {
    return;
  }
  const additionalComments = commentsShowArray.slice(pictureComments.children.length, pictureComments.children.length + COMMENT_PER_PORTION);
  createPictureComments(additionalComments);
  commentsCountList.textContent = `${pictureComments.children.length} из ${commentsShowArray.length} комментариев`;
  if (commentsShowArray.length <= pictureComments.children.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
}

/**
Отрисовка начальных комментариев
* @param {array} comments - массив комментариев из объекта
*/
function fillComments({comments}) {
  const showFirstComments = comments.slice(0, COMMENT_PER_PORTION);
  createPictureComments(showFirstComments);
  commentsCountList.textContent = `${showFirstComments.length} из ${comments.length} комментариев`;
  if (comments.length % 10 === 1 && comments.length !== 11) {
    commentsCountList.textContent = `${showFirstComments.length} из ${comments.length} комментария`;
  }
  if (showFirstComments.length >= comments.length) {
    commentsCountList.textContent = 'Комментарии:';
    bigPictureCommentsLoader.classList.add('hidden');
  }
  if (showFirstComments.length === 0) {
    commentsCountList.textContent = 'Нет комментариев';
  }
}

/**
Открытие большой картинки при клике на миниатюру
* @param {object} item - объект картинки, которую мы получаем с сервера
*/
const openBigPicture = (item) => {
  pictureComments.innerHTML = '';
  bigPictureCommentsCount.classList.remove('hidden');
  bigPictureCommentsLoader.classList.remove('hidden');
  opensModal(bigPicture);

  commentsShowArray = item.comments;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  pictureSocialCaption.textContent = item.description;
  bigPictureImg.src = item.url;
  fillComments(item);

  bigPictureCommentsLoader.addEventListener('click', getLoadComments);
  document.addEventListener('keydown', closePhotoEsc);
  closeButton.addEventListener('click', closePhoto);
};

export { openBigPicture };
