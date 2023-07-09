import { picturesUser } from './rendering-thumbnail.js';

const COMMENT_PER_PORTION = 5;

const body = document.querySelector('body');
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

const onPictureEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePhoto();
  }
};

// Закрытие картинки
function closePhoto() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEsc);
  closeButton.removeEventListener('click', closePhoto);
  bigPictureCommentsLoader.removeEventListener('click', getLoadComments);
}

/**
Генерация комментариев
* @param {array} comments - массив комментариев из объекта
*/
function createPictureComments(comments) {
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
}

/**
Отрисовка следующей порции комментариев
*/
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
* @param {string} picture - DOM-элемент миниатюры, по которой мы кликаем
* @param {object} item - объект картинки, которую мы генирировали в descriptions-photo. Сюда передается именно объект той миниатюры по который мы кликнули. Передаем сюда этот объект в файле main.js
*/
function openBigPicture(picture, item) {
  picture.addEventListener('click', () => {
    pictureComments.innerHTML = '';
    bigPictureCommentsCount.classList.remove('hidden');
    bigPictureCommentsLoader.classList.remove('hidden');
    commentsShowArray = item.comments;
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    pictureSocialCaption.textContent = item.description;
    bigPictureCommentsLoader.addEventListener('click', getLoadComments);

    fillComments(item);
    document.addEventListener('keydown', onPictureEsc);
    closeButton.addEventListener('click', closePhoto);
  });
}

const pictures = document.querySelectorAll('.picture');

for (let i = 0; i < pictures.length; i++) {
  openBigPicture(pictures[i], picturesUser[i]);
}
