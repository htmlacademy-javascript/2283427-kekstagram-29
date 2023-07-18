import { openBigPicture } from './open-big-picture.js';
import { createThumbnails } from './rendering-thumbnail.js';

// Глобальные переменные
const container = document.querySelector('.pictures');
let pictures = [];
const renderPictureModal = (evt) => {
  const miniature = evt.target.closest('[data-picture-item-id]');
  if (!miniature) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +miniature.dataset.pictureItemId
  );
  openBigPicture(picture);
};

/** Создание галереи */
const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  createThumbnails(pictures, container);
  container.addEventListener('click', renderPictureModal);
};

export { renderGallery };
