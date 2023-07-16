import { generatePhoto } from './descriptions-photo.js';

// Глобальные переменные
const pictureTemplate = document.querySelector('#picture').content;
const picturesUser = generatePhoto();
const picturesListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

/** Создание постов */
const createItem = (item) => {
  const { url, id, comments, likes, description } = item;
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture').href = url;
  pictureItem.querySelector('.picture').id = id;
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;

  pictureItem.addEventListener('click', (evt) => {
    evt.preventDefault();
  });
  return pictureItem;
};

picturesUser.forEach((picture) => {
  const pictureItem = createItem(picture);
  picturesListFragment.append(pictureItem);
});

picturesList.append(picturesListFragment);

export { picturesUser };
